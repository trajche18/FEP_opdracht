import { Component, OnInit, Input, ViewChild, ElementRef, TemplateRef} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LeningService} from "../shared/lening.service";
import {AuthService} from "../../core/auth.service";
import {Lening} from "../shared/lening";
import {element} from "protractor";
import * as _ from 'lodash';
import {HardwareService} from "../../hardware/shared/hardware.service";
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {UsersService} from "../../users/shared/users.service";
import {MailSenderService} from "../../mail/mail-sender.service";
import {User} from "../../users/shared/user";

@Component({
  selector: 'lening-verlengen',
  templateUrl: './lening-verlengen.component.html',
  styleUrls: ['./lening-verlengen.component.scss']
})
export class LeningVerlengenComponent implements OnInit {
  // Initialisatie
  selectedHardware = '';
  verlengenToestaan = false;
  allLeningen : any;
  user: User;
  isSendingRequest = false;
  verlengenForm: FormGroup;
  closeResult: string;
  @ViewChild('success') successModal: ElementRef;
  @ViewChild('content') contentModal: ElementRef;
  @ViewChild('failure') failureModal: ElementRef;

  formErrors = {
    'hardware': '',
  };
  validationMessages = {
    'hardware': {
      'required': 'Hardware must be a valid hardware.'
    },
  };

  constructor(private modalService: NgbModal, private fb: FormBuilder, private leningService: LeningService,
              private auth: AuthService, private hardwareService: HardwareService, private userService: UsersService, private mailService : MailSenderService) {
    // Haalt alle leningen op
    this.leningService.getLeningen().snapshotChanges().subscribe((lening) => {
      this.allLeningen = [];
      lening.forEach(elem => {
        let x = elem.payload.toJSON();
        x['$key'] = elem.key;
        this.allLeningen.push(x as Lening);
      })
      // Koppelt de user informatie aan de leningen van de ingelogde gebruikers
      auth.currentUserObservable.subscribe((user) => {
              // this.allLeningen.map(len => len.gebruikersId !== user.uid);
          this.allLeningen = _.filter(this.allLeningen, function (o) { return o.gebruikersId === user.uid;});
          for (let i = 0; i < this.allLeningen.length; i++){
            let hardwareid = this.allLeningen[i].hardware;
            hardwareService.getHardware(hardwareid).subscribe((hardware) => {
              this.allLeningen[i].hardware = hardware;
              console.log(this.allLeningen[i]);
            })

            this.userService.getUser(this.allLeningen[i].gebruikersId).subscribe((user) => {
              this.allLeningen[i].gebruiker = user;
              this.user = user;
            })

          }
      })

    })

  }

  // Selecteerd een hardware
  selectChangedHandler(event: any) {
    this.selectedHardware = event.target.value;
  }

  // Bouwt het formulier
  buildForm(): void {
    this.verlengenForm = this.fb.group({
      'hardware': ['', [
        Validators.required
      ]
      ]
    });

    this.verlengenForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.verlengenForm) { return; }
    const form = this.verlengenForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  // Verlengd de lening en stuurt een mailtje
  open(content) {
    this.modalService.open(content).result.then((result) => {
      console.log(this.selectedHardware['status']);
      if (this.selectedHardware['status'] !== 'Verlengd') {
        this.leningService.editLening(this.selectedHardware, {nieuw_blok: this.leningService.nextBlok(this.selectedHardware['nieuw_blok']), status: 'Verlengd'}).then(()=>{
          this.sendMail(this.user.email, 'Lening verlengd', 'Uw lening met referentienummer: '+this.selectedHardware['referentienummer']+' is zojuist verlengd van '+this.selectedHardware['huidige_blok']+' naar '+ this.selectedHardware['nieuw_blok'] +' \n' + '');
        })
        this.selectedHardware['nieuw_blok'] = this.leningService.nextBlok(this.selectedHardware['nieuw_blok']);
        this.selectedHardware['status'] = 'Verlengd';
        this.modalService.open(this.successModal);
      } else {
        // Popup geven
        this.modalService.open(this.failureModal);
      }
    }, (reason) => {
    });
  }

  // Verstuurt een mailtje via de service
  async sendMail(emailTo, subject, body) {
    try {
      this.isSendingRequest = true;

      await this.mailService.sendMail(
          'Mailgun Sandbox <postmaster@sandbox6a0d333799544b709fbcfea8f4580bae.mailgun.org>',
          emailTo,
          subject,
          body
      );

      console.log("Worked");
    } catch (error) {
      console.log("Not worked", error);
    } finally {
      this.isSendingRequest = false;
    }
  }

  // Bouwt het formulier
  ngOnInit() {
    this.buildForm();
  }

}

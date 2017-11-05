import { Component, OnInit, Input, ViewChild, ElementRef, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {Lening} from '../shared/lening';
import {LeningService} from "../shared/lening.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../../core/auth.service";
import {Router} from "@angular/router";
import {HardwareService} from "../../hardware/shared/hardware.service";
import {Hardware} from "../../hardware/shared/hardware";
import {User} from "../../users/shared/user";
import {UsersService} from "../../users/shared/users.service";
import {MailSenderService} from "../../mail/mail-sender.service";

@Component({
  selector: 'lening-form',
  templateUrl: 'lening-form.component.html',
  styleUrls: ['lening-form.component.scss']
})
export class LeningFormComponent implements OnInit {
  // Initialisatie
  hardwares: any;
 // lening: Lening = new Lening();
  leningForm: FormGroup;
  leningInformation = {hardware:  '',huidige_blok: '',nieuw_blok: '', referentienummer: '', gebruikersId: '', status: '', geplaatst_datum: ''};
  submitted = false;
  errors = [];
  userId: string;
  user: User;
  isSendingRequest = false;
  @ViewChild('success') successModal: ElementRef;
  @ViewChild('error') errorModal: ElementRef;
  @ViewChild('errorLenen') errorLenenModal: ElementRef;

  formErrors = {
    'hardware': '',
    'blok': '',
  };
  validationMessages = {
    'hardware': {
      'required': 'Hardware must be a valid hardware.'
    },

    'blok': {
      'required': 'Blok must be a valid blok.'
    },
  };

  constructor(private leningService : LeningService, private userService: UsersService, private hardwareService : HardwareService, private fb: FormBuilder, private auth: AuthService, public router: Router, private modalService: NgbModal, private mailService: MailSenderService) {
    auth.currentUserObservable.subscribe((user) => {
      this.userId = user.uid;
      this.userService.getUser(user.uid).subscribe((user) => {
        this.user = user;
      })
    })

    // Haalt een lijst op van alle hardwares
    this.hardwareService.getHardwareList().snapshotChanges().subscribe(hardware => {
      this.hardwares = [];
      hardware.forEach(elemenmt => {
        var x = elemenmt.payload.toJSON();
        x["$key"] = elemenmt.key;
        this.hardwares.push(x as Hardware);
      });
    })
  }

  ngOnInit(): void {
    this.buildForm();
  }


  // Maakt een lening aan
  createLening() {
    this.leningInformation.hardware = this.leningForm.value['hardware'].$key;
    this.leningInformation.huidige_blok = this.leningForm.value['blok'];
    this.leningInformation.nieuw_blok = this.leningService.nextBlok(this.leningForm.value['blok']);
    this.leningInformation.referentienummer = this.generateReferentieNummer();
    this.leningInformation.gebruikersId = this.userId;
    this.leningInformation.status = "In behandeling";
    this.leningInformation.geplaatst_datum = new Date().toString();
    if(!this.leningForm.valid || this.leningService.geleend || this.leningForm.value['hardware'].aantal == 0) {
      if(this.leningService.geleend)
        this.modalService.open(this.errorLenenModal);
      else
        this.modalService.open(this.errorModal);
    } else {
      this.leningService.createLening(this.leningInformation as Lening);
      this.hardwareService.editHardware(this.leningForm.value['hardware'], {'aantal': this.leningForm.value['hardware'].aantal-1});
      this.sendMail(this.user.email, 'Lening bevestiging', 'U heeft zojuist een lening geplaatst. Bij deze ontvangt u een bevestiging met wat u heeft geleend: \n' +
          '\n Referentienummer: ('+this.leningInformation.referentienummer+')' +
          '\n Studentnummer: '+this.user.studentnummer+'' +
          '\n Huidige blok: '+this.leningInformation.huidige_blok+'' +
          '\n Retour blok: '+this.leningInformation.nieuw_blok+'' +
          '\n Hardware: '+this.leningForm.value['hardware'].naam+'' +
          '\n');
      this.modalService.open(this.successModal);

      this.leningService.geleend = true;
      let self = this;
      setTimeout(function () {
        self.leningService.geleend = false;
      }, 3600000);
    }
  }

  // Bouwt formulier
  buildForm(): void {
    this.leningForm = this.fb.group({
      'hardware': ['', [
        Validators.required
      ]
      ],
      'blok': ['', [
        Validators.required
      ]
      ],

    });

    this.leningForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  // Verstuurt mail via de service
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

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.leningForm) { return; }
    const form = this.leningForm;
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

  // Genereert een random int
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Genereert een referentienummer
  generateReferentieNummer() {
    return this.getRandomInt(1, 10000);
  }
}

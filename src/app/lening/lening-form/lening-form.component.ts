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
    // 'password': {
    //   'required': 'Password is required.',
    //   'pattern': 'Password must be include at one letter and one number.',
    //   'minlength': 'Password must be at least 4 characters long.',
    //   'maxlength': 'Password cannot be more than 40 characters long.',
    // },
    // 'voornaam': {
    //   'required': 'Voornaam is verplicht',
    // },
    // 'achternaam': {
    //   'required': 'Achternaam is verplicht',
    // },
    // 'studentnummer': {
    //   'required': 'Studentnummer is verplicht',
    //   'pattern': 'Studentnummer dient numeriek te zijn',
    // }
  };

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateReferentieNummer() {
    return this.getRandomInt(1, 10000);
  }

  constructor(private leningService : LeningService, private userService: UsersService, private hardwareService : HardwareService, private fb: FormBuilder, private auth: AuthService, public router: Router, private modalService: NgbModal, private mailService: MailSenderService) {
    //this.hardwares = this.hardwareService.getHardwares();
    auth.currentUserObservable.subscribe((user) => {
      this.userId = user.uid;
      this.userService.getUser(user.uid).subscribe((user) => {
        this.user = user;
      })
    })



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

    //this.hardwareService.getHardwares().subscribe(item => )
  }
  createLening() {
    this.leningInformation.hardware = this.leningForm.value['hardware'].$key;
    this.leningInformation.huidige_blok = this.leningForm.value['blok'];
    this.leningInformation.nieuw_blok = this.leningService.nextBlok(this.leningForm.value['blok']);
    this.leningInformation.referentienummer = this.generateReferentieNummer();
    this.leningInformation.gebruikersId = this.userId;
    this.leningInformation.status = "In behandeling";
    this.leningInformation.geplaatst_datum = new Date().toString();
    if(!this.leningForm.valid || this.leningService.geleend) {
      if(this.leningService.geleend)
        this.modalService.open(this.errorLenenModal);
      else
        this.modalService.open(this.errorModal);
    } else {
      this.leningService.createLening(this.leningInformation as Lening);
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

   // this.lening = new Lening() // reset de lening
  }

  signup(): void {
    this.submitted = true;
    this.errors = [''];
  //  this.leningInformation = {hardware: this.leningForm.value['hardware'], blok: this.leningForm.value['blok'], studentnummer: this.leningForm.value['studentnummer']};
    this.auth.emailSignUp(this.leningForm.value['email'], this.leningForm.value['password'], this.leningInformation)
      .catch(error => {
        this.errors = [];
        this.errors.push(error.message);
      }).then((success) => {
      if(this.errors[0] === '')
        this.errors = [];
      setTimeout(() => {
        this.router.navigate(['/lening/dashboard']);
      }, 2000);

    })
  }


  // login(): void {
  //   this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password'])
  // }

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
}

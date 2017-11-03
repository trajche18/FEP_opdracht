import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {Lening} from '../shared/lening';
import {LeningService} from "../shared/lening.service";
import {AuthService} from "../../core/auth.service";
import {Router} from "@angular/router";
import {HardwareService} from "../../hardware/shared/hardware.service";

@Component({
  selector: 'lening-form',
  templateUrl: 'lening-form.component.html',
  styleUrls: ['lening-form.component.scss']
})
export class LeningFormComponent implements OnInit {
  hardwares: any;
 // lening: Lening = new Lening();
  leningForm: FormGroup;
  leningInformation = {hardwareid:  '',huidige_blok: '',nieuw_blok: '', referentienummer: '', gebruikersId: '', status: ''};
  submitted = false;
  newUser = true; // to toggle login or signup form
  errors = [];

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

  constructor(private leningService : LeningService, private hardwareService : HardwareService, private fb: FormBuilder, private auth: AuthService, public router: Router) {
    //this.hardwares = this.hardwareService.getHardwares();
    this.hardwareService.getHardwareList().subscribe((hardware) => {this.hardwares = hardware});
  }

  ngOnInit(): void {
    this.buildForm();

    //this.hardwareService.getHardwares().subscribe(item => )
  }
  createLening() {
   // this.leningService.createLening(this.lening)
   // this.lening = new Lening() // reset de lening
  }

  toggleForm() {
    this.newUser = !this.newUser;
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

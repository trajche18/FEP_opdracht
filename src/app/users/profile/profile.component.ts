import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userForm: FormGroup;
  userInformation = {voornaam:  '', achternaam: '', studentnummer: ''};
  submitted = false;
  newUser = true; // to toggle login or signup form
  errors = [];

  formErrors = {
    'voornaam': '',
    'achternaam': '',
    'studentnummer': '',
  };
  validationMessages = {
    'voornaam': {
      'required': 'Voornaam is verplicht',
    },
    'achternaam': {
      'required': 'Achternaam is verplicht',
    },
    'studentnummer': {
      'required': 'Studentnummer is verplicht',
      'pattern': 'Studentnummer dient numeriek te zijn',
    }
  };

  constructor(private fb: FormBuilder, private auth: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  toggleForm() {
    this.newUser = !this.newUser;
  }

  updateProfile(): void {
    this.submitted = true;
    this.errors = [];
    this.userInformation = {voornaam: this.userForm.value['voornaam'], achternaam: this.userForm.value['achternaam'], studentnummer: this.userForm.value['studentnummer']};
    this.auth.updateProfile(this.userInformation).then((result)=> {
      this.router.navigate(['/user/dashboard']);
    });
  }

  login(): void {
    this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password'])
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      'voornaam': ['', [
        Validators.required,
      ]
      ],
      'achternaam': ['', [
        Validators.required,
      ]
      ],
      'studentnummer': ['', [
        Validators.required,
        Validators.pattern('^(0|[1-9][0-9]*)$'),
      ]
      ],
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;
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

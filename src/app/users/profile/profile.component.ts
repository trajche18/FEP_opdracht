import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    'email': '',
    'password': '',
    'voornaam': '',
    'achternaam': '',
    'studentnummer': '',
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email'
    },
    'password': {
      'required': 'Password is required.',
      'pattern': 'Password must be include at one letter and one number.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 40 characters long.',
    },
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

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  toggleForm() {
    this.newUser = !this.newUser;
  }

  signup(): void {
    this.submitted = true;
    this.errors = [''];
    this.userInformation = {voornaam: this.userForm.value['voornaam'], achternaam: this.userForm.value['achternaam'], studentnummer: this.userForm.value['studentnummer']};
    this.auth.emailSignUp(this.userForm.value['email'], this.userForm.value['password'], this.userInformation)
        .catch(error => {
          this.errors = [];
          this.errors.push(error.message);
        }).then((success) => {
      if(this.errors[0] === '')
        this.errors = [];
    })
  }

  login(): void {
    this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password'])
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
      ],
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

import { Component, OnInit, Input, ViewChild, ElementRef, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import {Lening} from "../shared/lening";
import {LeningService} from "../shared/lening.service";
import {MailSenderService} from "../../mail/mail-sender.service";
@Component({
  selector: 'lening-detail-user',
  templateUrl: './lening-detail-user.component.html',
  styleUrls: ['./lening-detail-user.component.scss']
})
export class LeningDetailUserComponent implements OnInit {

  // Initialisatie
  @Input() lening: Lening;
  @ViewChild('content') modal:ElementRef;
  leningForm: FormGroup;
  displayForm = false;
  submitted = false;

  formErrors = {
    'status': '',
  };
  validationMessages = {
    'status': {
      'required': 'Status is verplicht'
    },
  };
  isSendingRequest = false;

  constructor( private mailSenderService : MailSenderService, private leningService: LeningService, private fb: FormBuilder, private modalService: NgbModal ) { }


  ngOnInit(): void {
    this.buildForm();

  }

  // Bouwt het formulier
  buildForm(): void {
    this.leningForm = this.fb.group({
      'status': ['', [
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

  editStatus(lening) {
    this.lening = lening;
    this.modalService.open(this.modal).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  saveStatus(email) {
    this.submitted = true;
    let self = this;
    setTimeout(function () {
      self.submitted = false;
    }, 2000);
    this.lening.status = this.leningForm.value['status'];
    this.leningService.editLening(this.lening, {'status' : this.leningForm.value['status']}).then(() => {
      this.sendMail(email, 'Status wijziging lening', 'De status van uw lening met referentienummer ('+this.lening.referentienummer+') is zojuist aangepast naar "'+ this.lening.status +'"');
    });
  }

  async sendMail(emailTo, subject, body) {
    try {
      this.isSendingRequest = true;

      await this.mailSenderService.sendMail(
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

  // Toggled de status balk
  toggleStatus() {
    if(!this.displayForm) {
      this.displayForm = true;
    } else {
      this.displayForm = false;
    }
  }


}

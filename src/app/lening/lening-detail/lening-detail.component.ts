import { Component, OnInit, Input, ViewChild, ElementRef, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import {Lening} from "../shared/lening";
import {LeningService} from "../shared/lening.service";
import {MailSenderService} from "../../mail/mail-sender.service";


@Component({
  selector: 'lening-detail',
  templateUrl: './lening-detail.component.html',
  styleUrls: ['./lening-detail.component.scss']
})
export class LeningDetailComponent implements OnInit {

  @Input() lening: Lening;
  @ViewChild('content') modal:ElementRef;

  @ViewChild('success') successModal:ElementRef;
  @ViewChild('failure') failureModal:ElementRef;

  leningForm: FormGroup;
  displayForm = false;
  submitted = false;
  isSendingRequest = false;

  formErrors = {
    'status': '',
  };
  validationMessages = {
    'status': {
      'required': 'Status is verplicht'
    },
  };

  constructor( private mailSenderService : MailSenderService, private leningService: LeningService, private fb: FormBuilder, private modalService: NgbModal ) { }


  ngOnInit(): void {
    this.buildForm();

    //this.hardwareService.getHardwares().subscribe(item => )
  }

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
    }, 3000);
    this.lening.status = this.leningForm.value['status'];
    this.leningService.editLening(this.lening, {'status' : this.leningForm.value['status']}).then(() => {
      this.sendMail(email, 'Status wijziging lening', 'De status van uw lening met referentienummer ('+this.lening.referentienummer+') is zojuist aangepast naar "'+ this.lening.status +'"');
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
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

  toggleStatus() {
    if(!this.displayForm) {
      this.displayForm = true;
    } else {
      this.displayForm = false;
    }
  }

  // updateTimeStamp() {
  //   const date = new Date().getTime()
  //   this.leningSvc.updateLening(this.lening.$key, { timeStamp: date })
  // }
  //
  // updateActive(value: boolean) {
  //   this.leningSvc.updateLening(this.lening.$key, { active: value })
  // }
  /*  deleteItem() {
   this.hardwareSerive.de(this.lening.$key)
   }*/
}

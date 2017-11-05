import { Component, OnInit, Input, ViewChild, ElementRef, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {Hardware} from "../shared/hardware";
import {HardwareService} from "../shared/hardware.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

@Component({
  selector: 'hardware-detail',
  templateUrl: './hardware-detail.component.html',
  styleUrls: ['./hardware-detail.component.scss']
})
export class HardwareDetailComponent implements OnInit {

  // Initialisatie
  @Input() hardware: Hardware;
  @ViewChild('content') modal:ElementRef;
  hardwareForm: FormGroup;
  selectedHardware : Hardware;
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


  constructor(private hardwareService: HardwareService, private fb: FormBuilder, private modalService: NgbModal ) { }


  ngOnInit(): void {
    this.buildForm();

    //this.hardwareService.getHardwares().subscribe(item => )
  }

  // Bouwt het formulier
  buildForm(): void {
    this.hardwareForm = this.fb.group({
      'status': ['', [
        Validators.required
      ]
      ],
    });

    this.hardwareForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.hardwareForm) { return; }
    const form = this.hardwareForm;
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

  // Laat informatie zien van de geselecteerde hardware in een modal met een status balk die je kan aanpassen
  editStatus(hardware) {
    this.hardware = hardware;
    this.modalService.open(this.modal).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // Slaat status op via de service
  saveStatus() {
    this.submitted = true;
    let self = this;
    setTimeout(function () {
      self.submitted = false;
    }, 2000);
    this.hardware.status = this.hardwareForm.value['status'];
    this.hardwareService.editHardware(this.hardware, {'status' : this.hardwareForm.value['status']});
  }

  // Schakelt de status balk in en uit
  toggleStatus() {
      if(!this.displayForm) {
        this.displayForm = true;
      } else {
        this.displayForm = false;
      }
  }
}

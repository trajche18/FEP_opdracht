import { Component, OnInit, Input, ViewChild, ElementRef, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {Hardware} from "../shared/hardware";
import {HardwareService} from "../shared/hardware.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

@Component({
  selector: 'hardware-detail-user',
  templateUrl: './hardware-detail-user.component.html',
  styleUrls: ['./hardware-detail-user.component.scss']
})
export class HardwareDetailUserComponent implements OnInit {

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

  editStatus(hardware) {
    this.hardware = hardware;
    this.modalService.open(this.modal).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  saveStatus() {
    this.submitted = true;
    let self = this;
    setTimeout(function () {
      self.submitted = false;
    }, 2000);
    this.hardware.status = this.hardwareForm.value['status'];
    this.hardwareService.editHardware(this.hardware, {'status' : this.hardwareForm.value['status']});
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

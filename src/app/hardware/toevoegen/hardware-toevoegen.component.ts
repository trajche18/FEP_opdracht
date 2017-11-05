import { Component, OnInit, Input, ViewChild, ElementRef, TemplateRef} from '@angular/core';
import {Hardware} from "../shared/hardware";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HardwareService} from "../shared/hardware.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'hardware-toevoegen',
  templateUrl: './hardware-toevoegen.component.html',
  styleUrls: ['./hardware-toevoegen.component.scss']
})
export class HardwareToevoegenComponent implements OnInit {
  hardwareForm: FormGroup;
  hardwareInformatie = {aantal: 0,beschrijving: '',naam: '', serienummer: '', status: ''};
  submitted = false;
  errors = [];
  @ViewChild('success') successModal: ElementRef;
  @ViewChild('content') contentModal: ElementRef;
  @ViewChild('error') errorModal: ElementRef;

  formErrors = {
    'naam': '',
    'aantal': 0,
    'beschrijving': '',
    'serienummer': '',
    'status': '',
  };
  validationMessages = {
    'naam': {
      'required:': 'Je moet een naam invullen!'
    },
    'aantal': {
      'required': 'Je moet nog een aantal invullen!'
    },
    'beschrijving': {
      'required': 'Je moet nog een beschrijving invullen!'
    },
    'serienummer': {
      'required': 'Je moet nog een serienummer invullen!'
    },
  };
  constructor(private hardwareServ: HardwareService, private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit() {
    this.buildForm();
  }

  // Hardware toevoegen via de service nadat de bevestiging modal is vertoond.
  createHardware() {
    this.modalService.open(this.contentModal).result.then((result) => {
      this.hardwareInformatie.naam = this.hardwareForm.value['naam'];
      this.hardwareInformatie.aantal = this.hardwareForm.value['aantal'];
      this.hardwareInformatie.beschrijving = this.hardwareForm.value['beschrijving'];
      this.hardwareInformatie.serienummer = this.hardwareForm.value['serienummer'];
      this.hardwareInformatie.status = 'beschikbaar';
      if(this.hardwareForm.valid) {
        this.hardwareServ.createHardware(this.hardwareInformatie as Hardware);
        this.modalService.open(this.successModal);
      } else {
        this.modalService.open(this.errorModal);
      }
    }, () => { console.log('cancelled'); });

  }

  // Bouwt het formulier
  buildForm(): void {
    this.hardwareForm = this.fb.group({
      'naam': ['', [
        Validators.required
      ]
      ],
      'aantal': [0, [
        Validators.required
      ]
      ],
      'beschrijving': ['', [
        Validators.required
      ]
      ],
      'serienummer': ['', [
        Validators.required
      ]
      ],
    });

    this.hardwareForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  // Houdt in de gaten of er data is veranderd in de input velden
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
}

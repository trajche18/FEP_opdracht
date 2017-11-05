import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {Lening} from '../shared/lening';
import {LeningService} from "../shared/lening.service";
import {AuthService} from "../../core/auth.service";
import {Router} from "@angular/router";
import {HardwareService} from "../../hardware/shared/hardware.service";
import {Hardware} from "../../hardware/shared/hardware";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'lening-form',
  templateUrl: 'lening-form.component.html',
  styleUrls: ['lening-form.component.scss']
})
export class LeningFormComponent implements OnInit {
  @ViewChild('success') successModal: ElementRef;
  @ViewChild('error') errorModal: ElementRef;

  hardwares: any;
 // lening: Lening = new Lening();
  leningForm: FormGroup;
  leningInformation = {hardware:  '',huidige_blok: '',nieuw_blok: '', referentienummer: '', gebruikersId: '', status: ''};
  submitted = false;
  errors = [];
  userId: string;
  closeResult: string;
  //error: any;
  //success: any;

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

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  generateReferentieNummer() {
    return this.getRandomInt(1, 10000);
  }

  constructor(private leningService : LeningService, private hardwareService : HardwareService, private fb: FormBuilder, private auth: AuthService, public router: Router, private modalService: NgbModal) {
    //this.hardwares = this.hardwareService.getHardwares();
    auth.currentUserObservable.subscribe((user) => {
      this.userId = user.uid;
      // this.userService.getUser(this.allLeningen[i].gebruikersId).subscribe((user) => {
      //   this.allLeningen[i].gebruiker = user;
      // })
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
    this.leningInformation.hardware = this.leningForm.value['hardware'];
    this.leningInformation.huidige_blok = this.leningForm.value['blok'];
    this.leningInformation.nieuw_blok = this.leningService.nextBlok(this.leningForm.value['blok']);
    this.leningInformation.referentienummer = this.generateReferentieNummer();
    this.leningInformation.gebruikersId = this.userId;
    this.leningInformation.status = "In behandeling";

    //this.hardwares = this.leningForm.value['hardware'];
    //this.selectedBlok = this.leningForm.value['blok'];
    if(this.leningForm.valid){
      this.modalService.open(this.successModal).result.then((result) =>{});
      this.leningService.createLening(this.leningInformation as Lening);
    }
    else {
      this.modalService.open(this.errorModal).result.then((result) =>{});
    }
    console.log(this.leningInformation);
   // this.lening = new Lening() // reset de lening
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

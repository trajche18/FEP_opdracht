import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LeningService} from "../shared/lening.service";
import {AuthService} from "../../core/auth.service";
import {Lening} from "../shared/lening";
import {element} from "protractor";
import * as _ from 'lodash';
import {HardwareService} from "../../hardware/shared/hardware.service";
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';

// git add .
//   git commit -m "asd"
// git push

@Component({
  selector: 'lening-verlengen',
  templateUrl: './lening-verlengen.component.html',
  styleUrls: ['./lening-verlengen.component.scss']
})
export class LeningVerlengenComponent implements OnInit {

  selectedHardware = '';
  verlengenToestaan = false;
  allLeningen : any;
  verlengenForm: FormGroup;

  // dbHardware: FirebaseListObservable<any[]>;

  formErrors = {
    'hardware': '',
  };
  validationMessages = {
    'hardware': {
      'required': 'Hardware must be a valid hardware.'
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
  selectChangedHandler(event: any) {
    this.selectedHardware = event.target.value;
  }






  closeResult: string;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private leningService: LeningService, private auth: AuthService, private hardwareService: HardwareService) {
    this.leningService.getLeningen().snapshotChanges().subscribe((lening) => {
      this.allLeningen = [];
      lening.forEach(elem => {
        let x = elem.payload.toJSON();
        x['$key'] = elem.key;
        this.allLeningen.push(x as Lening);
      })
      auth.currentUserObservable.subscribe((user) => {
              // this.allLeningen.map(len => len.gebruikersId !== user.uid);
          this.allLeningen = _.filter(this.allLeningen, function (o) { return o.gebruikersId === user.uid;});
          for (let i = 0; i < this.allLeningen.length; i++){
            let hardwareid = this.allLeningen[i].hardware;
            hardwareService.getHardware(hardwareid).subscribe((hardware) => {
              this.allLeningen[i].hardware = hardware;
              console.log(this.allLeningen[i]);
            })

          }
      })

    })

  }
  buildForm(): void {
    this.verlengenForm = this.fb.group({
      'hardware': ['', [
        Validators.required
      ]
      ]
    });

    this.verlengenForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.verlengenForm) { return; }
    const form = this.verlengenForm;
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

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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

  // constructor(db: AngularFireDatabase) {
  //   db.list('/hardware')
  //     .subscribe(dbHard => {
  //       this.dbHardware = dbHard;
  //       console.log(this.dbHardware);
  //   });
  // }

  ngOnInit() {
    this.buildForm();
  }

}

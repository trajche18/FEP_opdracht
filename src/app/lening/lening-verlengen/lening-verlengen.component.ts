import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LeningService} from "../shared/lening.service";
import {AuthService} from "../../core/auth.service";
import {Lening} from "../shared/lening";
import {element} from "protractor";

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
  allLeningen = Lening[];


  // dbHardware: FirebaseListObservable<any[]>;

  selectChangedHandler(event: any) {
    this.selectedHardware = event.target.value;
  }






  closeResult: string;

  constructor(private modalService: NgbModal, private leningService: LeningService, private auth: AuthService) {
    this.leningService.getLeningen().snapshotChanges().subscribe((lening) => {
      this.allLeningen = [];
      lening.forEach(elem => {
        let x = elem.payload.toJSON();
        x['$key'] = elem.key;
        this.allLeningen.push(x as Lening);
      })
      auth.currentUserObservable.subscribe((user) => {
              this.allLeningen.map(len => len.gebruikersId === user.uid);
              console.log()
      })

    })

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
  }

}

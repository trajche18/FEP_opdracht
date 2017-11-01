import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

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
  // dbHardware: FirebaseListObservable<any[]>;

  selectChangedHandler(event: any) {
    this.selectedHardware = event.target.value;
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

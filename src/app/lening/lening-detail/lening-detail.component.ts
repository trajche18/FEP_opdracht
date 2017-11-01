import { Component, OnInit, Input } from '@angular/core';
import { LeningService } from '../shared/lening.service';
import { Lening } from '../shared/lening';

@Component({
  selector: 'lening-detail',
  templateUrl: './lening-detail.component.html',
  styleUrls: ['./lening-detail.component.scss']
})
export class LeningDetailComponent implements OnInit {

  @Input() lening: Lening;

  constructor(private leningSvc: LeningService) { }

  ngOnInit() {
  }

  // updateTimeStamp() {
  //   const date = new Date().getTime()
  //   this.leningSvc.updateLening(this.lening.$key, { timeStamp: date })
  // }
  //
  // updateActive(value: boolean) {
  //   this.leningSvc.updateLening(this.lening.$key, { active: value })
  // }

  deleteItem() {
    this.leningSvc.deleteLening(this.lening.$key)
  }
}

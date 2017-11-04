import { Component, OnInit } from '@angular/core';
import { LeningService } from '../shared/lening.service';
import { Lening } from '../shared/lening';

@Component({
  selector: 'lening-list',
  templateUrl: 'lening-list.component.html',
  styleUrls: ['lening-list.component.scss']
})
export class LeningListComponent implements OnInit {
  leningen: any // Observable<Item[]>;
  showSpinner = true;

  constructor(private leningService: LeningService) {
    this.leningen = this.leningService.getLeningenList()
  }

  ngOnInit() {
    this.leningen.subscribe(x => {
      this.showSpinner = false
    })
  }



}

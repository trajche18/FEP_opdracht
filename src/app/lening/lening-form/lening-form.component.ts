import { Component, OnInit } from '@angular/core';
import {LeningService} from "../shared/lening.service";

@Component({
  selector: 'lening-form',
  templateUrl: 'lening-form.component.html',
  styleUrls: ['lening-form.component.scss']
})
export class LeningFormComponent implements OnInit {

  constructor(private leningService : LeningService) { }

  ngOnInit() {
  }

}

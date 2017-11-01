import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Lening} from '../shared/lening';
import {LeningService} from "../shared/lening.service";

@Component({
  selector: 'lening-form',
  templateUrl: 'lening-form.component.html',
  styleUrls: ['lening-form.component.scss']
})
export class LeningFormComponent implements OnInit {

  lening: Lening = new Lening();

  constructor(private leningService : LeningService) { }

  ngOnInit() {
  }

  createLening() {
    this.leningService.createLening(this.lening)
    this.lening = new Lening() // reset de lening
  }
}

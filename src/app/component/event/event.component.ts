import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

import {MatNativeDateModule} from '@angular/material';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor() { }
  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${event.value}`);
  }

  ngOnInit() {
  }

}
import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as moment from 'moment';
import {MatNativeDateModule} from '@angular/material';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor() { }
  events: string[] = [];

  date: any;
  time: any;
  finalDate: any;

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${event.value}`);
  }

  ngOnInit() {
  }

  onButton() {
    console.log(this.date);
    console.log(this.time);
    this.finalDate = moment(this.date).hours(this.time.hour).minutes(this.time.minute).toString();
    console.log(this.finalDate);    
  }

}

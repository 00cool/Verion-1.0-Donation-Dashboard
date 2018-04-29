import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

import {MatNativeDateModule} from '@angular/material';
import {DpDatePickerModule} from 'ng2-date-picker';
import {DatePickerComponent} from 'ng2-date-picker';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @ViewChild('dayPicker') datePicker: DatePickerComponent;

  open() {
      this.datePicker.api.open();
  }

  close() {
       this.datePicker.api.close();
  }

  constructor() { }
  events: string[] = [];

  date: any;
  time: any;

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${event.value}`);
  }

  ngOnInit() {
  }
  onButton() {
    console.log(this.date);
    console.log(this.time);
  }
}

import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as moment from 'moment';
import {MatNativeDateModule} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { RadioControlValueAccessor } from '@angular/forms';
import { Timestamp } from 'rxjs/operators/timestamp';

export interface event {date : Date;}
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
  final_date : any;

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${event.value}`);
  }

  ngOnInit() {
  }


  
  onButton() {
    console.log(this.date);
    console.log(this.time);
    this.finalDate = moment(this.date).hours(this.time.hour).minutes(this.time.minute).toString();
    this.final_date = moment(this.finalDate).format('DD MMMM YYYY hh:mm:ss')
    var isoDate = moment.utc(this.final_date).format();
    
    console.log(this.finalDate);    
    console.log(isoDate);
  }

}

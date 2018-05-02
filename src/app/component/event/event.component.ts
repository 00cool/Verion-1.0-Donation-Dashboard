import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as moment from 'moment';
import {MatNativeDateModule} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { RadioControlValueAccessor } from '@angular/forms';
import { Timestamp } from 'rxjs/operators/timestamp';

export interface event {date : Date;name : string;time : string};
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  update_id: string;
  state = '';
  isshow = false;

  Event: Observable<any[]>;
  private eventCollection: AngularFirestoreCollection<event>;


  constructor(db: AngularFirestore)
   { 
    this.eventCollection = db.collection<event>('event_temp');
    this.Event = db.collection('event_temp').valueChanges(); 
   }
  events: string[] = [];

  date: any;
  time: any;
  finalDate: any;
  final_date : any;

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${event.value}`);
  }
  addevent()
  {
      console.log("calling event method");
      var event = (document.getElementById('event_name') as HTMLInputElement).value;
      console.log(event);
      var event_time = (document.getElementById('time') as HTMLInputElement).value;
      console.log(event_time);
      //this.finalDate = moment(this.date).hours(this.time.hour).minutes(this.time.minute).toString();
      var db_date = new Date(this.date);
      console.log(db_date);
      console.log(this.date);

      const items : event ={name:event , time : event_time, date : db_date};
      console.log(items);
      this.eventCollection.add(items).then((res) => {
        console.log(res);
      })
  }

  ngOnInit() {
  }


  
  onButton() {
    console.log(this.date);
    console.log(this.time);
    this.finalDate = moment(this.date).hours(this.time.hour).minutes(this.time.minute).toString();
    this.final_date = moment(this.finalDate).format('DD MMMM YYYY hh:mm:ss')
    var isoDate = moment.utc(this.final_date).format();

    var db_date = new Date(this.finalDate);
    console.log(db_date);
    
    console.log(this.finalDate);    
    console.log(isoDate);
  }

  show() {
    console.log('call....show  ===>' + event.srcElement.id);
    let id;
    let val;
    val = event.srcElement.id;

    let data;

    const res = (this.eventCollection.ref.where('name', '==', val).get().then(
      function a(querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log('this' + doc.id);
          id = doc.id;
          console.log(doc.data());
          console.log(doc.data().name);
          console.log("time===>" +doc.data().time);
          console.log("date====> "+ doc.data().date);
          data = doc.data();
          console.log('idddddd===>>>' + id);

        });
      }
    )).then(() => { 
      (document.getElementById('event_name') as HTMLInputElement).value = data.name;

      (document.getElementById('time') as HTMLInputElement).value = data.time;
      var date_func = moment(data.date).format('MM/DD/YYYY');
      (document.getElementById('date') as HTMLInputElement).value = date_func;
      (document.getElementById('add') as HTMLInputElement).innerHTML = 'update';
      (document.getElementById('h5') as HTMLInputElement).innerHTML = 'Update Event';
      this.update_id = id;
      console.log(this.update_id);
      
      this.openModule();
    });
  }
  update() {
    console.log('Calling  update');
    const val = (document.getElementById('event_name') as HTMLInputElement).value;
    val.trim();
    const val1 = (document.getElementById('time') as HTMLInputElement).value;
    val1.trim();
    var db_date = new Date(this.date);
    
      const item: event = { name: val ,time : val1 , date :db_date};
      console.log(item);
      console.log(this.update_id);
      console.log(this.eventCollection.doc(this.update_id).update(item).then((res) => {
        // location.reload(true);
        console.log(res);
      
      }));
  }
  checkButton() {
    console.log('call button');

    const val = (document.getElementById('add') as HTMLInputElement).innerHTML;
    console.log(val);
    console.log(val.localeCompare('ADD'));
    // tslint:disable-next-line:curly
    if (0 === val.localeCompare('ADD'))
     this.addevent();
    // tslint:disable-next-line:curly
    else
     this.update();
  }

  delete() {
    console.log('call....delete  ===>' + event.srcElement.id);
    let val;
    val = event.srcElement.id;
    let id;
    const res = (this.eventCollection.ref.where('name', '==', val).get().then(
      function a(querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id);
          id = doc.id;
     });
      }
    )).then(() => {
console.log("iddddddd" + id);
      this.eventCollection.doc(id).delete().then((res) =>
    {
    //  console.log(res);
      //location.reload(true);
    });
    });

  


  }

  openModule() {

    document.getElementById('myModal').style.display = 'block';
  }
  spanClick() {
    document.getElementById('myModal').style.display = 'none';

  }

}

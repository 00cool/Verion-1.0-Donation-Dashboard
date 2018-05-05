import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface weekly {name : string; time : Date};
@Component({
  selector: 'app-weekly-course',
  templateUrl: './weekly-course.component.html',
  styleUrls: ['./weekly-course.component.css']
})
export class WeeklyCourseComponent implements OnInit {
  StartTime : any = {hour: '', minute: '', meriden: "PM", format: 24};
  date : any;
  hour : any;
  minute : any;
  
  finalstartdate : any;
  update_id: string;

  Weekly : Observable<any[]>;
  public weeklyCollection : AngularFirestoreCollection<weekly>;

  constructor(db: AngularFirestore)
   {
      this.weeklyCollection = db.collection<weekly>('weekly_courses');
      this.Weekly = db.collection('weekly_courses').valueChanges();
    }

  ngOnInit() {
  }

  addweeklycourse()
  {
      console.log("calling add weekly course ");
      var weeklycourse = (document.getElementById('weekly_name') as HTMLInputElement).value;
      console.log(weeklycourse);
      console.log(this.StartTime);
      this.finalstartdate = moment(this.date).hours(this.StartTime.hour).minutes(this.StartTime.minute).toString();
      
      var dbdate = new Date(this.finalstartdate);
      console.log(dbdate);
      const items : weekly = {name:weeklycourse,time:dbdate};
      console.log(items);
      this.weeklyCollection.add(items).then((res) => {
        location.reload(true);
        console.log(res);
      })

  }
  show() {
    console.log('call....show  ===>' + event.srcElement.id);
    let id;
    let val;
    val = event.srcElement.id;

    let data;

    const res = (this.weeklyCollection.ref.where('name', '==', val).get().then(
      function a(querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log('this' + doc.id);
          id = doc.id;
          console.log(doc.data());
          console.log(doc.data().name);
        
          data = doc.data();
          console.log('idddddd===>>>' + id);

        });
      }
    )).then(() => { 
      (document.getElementById('weekly_name') as HTMLInputElement).value = data.name;

   
      var date_func = moment(data.date).format('MM/DD/YYYY');
      this.StartTime.hour = moment(data.date).hour();
      this.StartTime.minute = moment(data.date).minute();
      console.log('hour '+ this.StartTime.hour );
      console.log('minute '+ this.StartTime.minute );
      

      console.log(date_func);
      (document.getElementById('StartDate') as HTMLInputElement).value = date_func;
      var date_func1 = moment(data.end_date).format('MM/DD/YYYY');
      console.log(date_func1);
      (document.getElementById('add') as HTMLInputElement).innerHTML = 'update';
      (document.getElementById('h5') as HTMLInputElement).innerHTML = 'Update Weekly Course';
      this.update_id = id;
      console.log(this.update_id);
      
      this.openModule();
    });
  }

  checkButton() {
    console.log('call button');

    const val = (document.getElementById('add') as HTMLInputElement).innerHTML;
    console.log(val);
    console.log(val.localeCompare('ADD'));
    // tslint:disable-next-line:curly
    if (0 === val.localeCompare('ADD'))
     this.addweeklycourse();
    // tslint:disable-next-line:curly
    else
     this.update();
  }
  update()
  {
    console.log("Calling Update Method");
    const val = (document.getElementById('weekly_name') as HTMLInputElement).value;
    val.trim();
    this.finalstartdate = moment(this.date).hours(this.StartTime.hour).minutes(this.StartTime.minute).toString();
    console.log("date n time" + this.finalstartdate);

    const item : weekly = {name : val , time : this.finalstartdate};
    console.log(item);
    console.log(this.update_id);

    this.weeklyCollection.doc(this.update_id).update(item).then((res) => 
  {
    console.log(res);
    location.reload(true);
  })
  }
  delete() {
    console.log('call....delete  ===>' + event.srcElement.id);
    let val;
    val = event.srcElement.id;
    let id;
    const res = (this.weeklyCollection.ref.where('name', '==', val).get().then(
      function a(querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id);
          id = doc.id;
     });
      }
    )).then(() => {
console.log("iddddddd" + id);
      this.weeklyCollection.doc(id).delete().then((res) =>
    {
      console.log(res);
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

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { HtmlAstPath } from '@angular/compiler';




export interface Country { name: string; }
export interface Temple { id: string; name: string; }


@Component({
  selector: 'app-select-temple',
  templateUrl: './select-temple.component.html',
  styleUrls: ['./select-temple.component.css']
})
export class SelectTempleComponent implements OnInit {

  show: boolean;
  val: string;
  temp_acc_country: string[];
  countrys: Observable<any[]>;
  private countryCollection: AngularFirestoreCollection<Country>;
  temples: Observable<any[]>;
  private templesCollection: AngularFirestoreCollection<Temple>;

  constructor(public db: AngularFirestore) {
    this.countryCollection = db.collection<Country>('country_temp');
    this.templesCollection = db.collection<Temple>('temple_temp');
    this.countrys = db.collection('country_temp').valueChanges();
    this.temples = db.collection('temple_temp').valueChanges();


  }

  ngOnInit() {
    this.show = false;
    this.val = '';
    this.temp_acc_country = [];
  }
  checkvalue() {
    this.val = (document.getElementById('country') as HTMLInputElement).value;
    console.log('val:-' + this.val);
    this.temp_acc_country = [];
    // const item: Country = { name: this.val };
    let id;



    const res = (this.countryCollection.ref.where('name', '==', this.val).get().then(
      function a(querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id);
          id = doc.id;
          //  console.log(id)
        });
      }
    ));


    setTimeout(() => {
      (document.getElementById('temple') as HTMLInputElement).style.display = 'block';
      console.log('data---' + id);



      const query = this.templesCollection.ref.where('country_id', '==', id);


      // tslint:disable-next-line:no-shadowed-variable
      return Promise.all([query.get()]).then(res => {
        res.forEach(r => {
          r.forEach(d => {
            console.log('Get:', d.data().name);
            this.temp_acc_country.push(d.data().name);
            console.log(this.temp_acc_country);
          });
          // console.log(this.all_temp.pop());
        });
      });



    }, 2000);

  }
  showbutton() {
    this.show = true;
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { assert } from '@firebase/util/dist/esm/src/assert';


export interface Country { name: string; }
export interface Temple { id: string; name: string; }


@Component({
  selector: 'app-temple',
  templateUrl: './temple.component.html',
  styleUrls: ['./temple.component.css']
})
export class TempleComponent implements OnInit {

  items: Observable<any[]>;
  private itemsCollection: AngularFirestoreCollection<Country>;
  temples: Observable<any[]>;
  temples1: Observable<any[]>;
  private templesCollection: AngularFirestoreCollection<Temple>;
  private templesCollection1: AngularFirestoreCollection<Temple>;
  val: string;
  isvalid: boolean;
  isvalid1: boolean;
  edit_temp: string;
  temp_id: string;
  // country_id:string;
  all_temp: string[];

  constructor(public db: AngularFirestore) {
    this.itemsCollection = db.collection<Country>('country_temp');
    this.templesCollection = db.collection<Temple>('temple_temp');
    this.templesCollection1 = db.collection<Temple>('temple_temp');
    this.items = db.collection('country_temp').valueChanges();
    this.temples = db.collection('temple_temp').valueChanges();
    this.all_temp = new Array();

  }
  ngOnInit() {
    this.isvalid = false;
    this.isvalid1 = true;
    // this.country_id='';

  }

  addTemple() {
    console.log('call... ===>' + (document.getElementById('country') as HTMLInputElement).value);
    this.val = (document.getElementById('country') as HTMLInputElement).value;
    const item: Country = { name: this.val };
    // this.itemsCollection.add(item);

    let id;
    const res = (this.itemsCollection.ref.where('name', '==', this.val).get().then(
      function a(querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id);
          id = doc.id;
        });
      }
    ));

    setTimeout(() => {
      console.log('adding...:');
      const temple: Temple = { 'id': id, 'name': (document.getElementById('new_temp') as HTMLInputElement).value };
      console.log(this.templesCollection.add(temple));
      this.showTemple();
    }, 2000);


  }


  deletetemple() {
    console.log('call....  ===>' + event.srcElement.id);

    this.val = event.srcElement.id;
    //   const item: Country = { name: this.val };
    let id;
    const res = (this.templesCollection.ref.where('name', '==', this.val).get().then(
      function a(querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id);
          id = doc.id;

        });
      }
    ));


    setTimeout(() => {
      this.templesCollection.doc(id).delete();
      this.showTemple();
    }, 2000);


  }

  showTemple() {
    (document.getElementById('temple') as HTMLInputElement).style.display = 'block';
    const country = (document.getElementById('country') as HTMLInputElement).value;
    console.log(country);
    let id;
    const res = (this.itemsCollection.ref.where('name', '==', country).get().then(
      function a(querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // console.log(doc.id)
          id = doc.id;
          //  console.log(id)
        });
      }
    ));
    const arr = [];
    setTimeout(() => {
      console.log('data---' + id);
      this.temp_id = id;
      console.log('this i ' + this.temp_id + ' id ' + id);

      this.all_temp = [];

      const query = this.templesCollection.ref.where('id', '==', id);


      // tslint:disable-next-line:no-shadowed-variable
      return Promise.all([query.get()]).then(res => {
        res.forEach(r => {
          r.forEach(d => {
            console.log('Get:', d.data().name);
            this.all_temp.push(d.data().name);
          });
          // console.log(this.all_temp.pop());
        });
      });


    }, 2000);

  }

  update() {
    console.log('temp name  ===>' + this.edit_temp);

    this.val = this.edit_temp;

    let id;
    const res = (this.templesCollection.ref.where('name', '==', this.edit_temp).get().then(
      function a(querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id);
          id = doc.id;




        });
      }
    ));

    console.log('temp name  ===>' + this.edit_temp);
    console.log('c id  ===>' + this.temp_id);
    console.log((document.getElementById('temp1') as HTMLInputElement).value);


    setTimeout(() => {
      console.log('id====' + id);
      // console.log(item);
      const temple: Temple = { 'id': this.temp_id, 'name': (document.getElementById('temp1') as HTMLInputElement).value };
      // console.log((document.getElementById('temp1') as HTMLInputElement).value);
      console.log(this.templesCollection.doc(id).update(temple));
      this.isvalid = false;
    }, 2000);

    this.showTemple();

  }
  show() {
    this.edit_temp = event.srcElement.id;
    this.isvalid = true;
  }
  getloc() {
    alert('hello');
  }
}

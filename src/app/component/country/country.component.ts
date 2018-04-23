import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
//import { async } from '@angular/core/testing';


export interface Country { name: string; }


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  items: Observable<any[]>;
  private itemsCollection: AngularFirestoreCollection<Country>;
  val: string;
  //db1: AngularFirestore;
  isvalid=false;
  edit_country:string;

  res : any;

  constructor(public db: AngularFirestore) {
    this.itemsCollection = db.collection<Country>('country_temp');
    this.items = db.collection('country_temp').valueChanges();

  }
  ngOnInit() {

   this.res =  this.itemsCollection.ref.where('name','==','us');
  }

  addcountry() {
    console.log("call....")
    console.log((document.getElementById("country") as HTMLInputElement).value);
    //this.appList.push((document.getElementById("cat_name")as HTMLInputElement).value);
    this.val = (document.getElementById("country") as HTMLInputElement).value;
    const item: Country = { name: this.val };
    this.itemsCollection.add(item);
  }

  deletecountry() {
    console.log("call....de  ===>" + event.srcElement.id)
    var id;
    this.val = event.srcElement.id;
    const item: Country = { name: this.val };
    var id;
    var res = (this.itemsCollection.ref.where('name', '==', this.val).get().then(
      function a (querySnapshot)  {
        querySnapshot.forEach(function (doc) {      
          console.log(doc.id)   
          id = doc.id;
          
         


        })
      }
    ));
   
  
setTimeout(() => {
  this.itemsCollection.doc(id).delete();
}, 2000);
  

  }

  show(){
    this.edit_country = event.srcElement.id;
    this.isvalid=true;
  }
  update(){
    console.log("call....de  ===>" + event.srcElement.id)
    var id;
    this.val = event.srcElement.id;
    
    var id;
    var res = (this.itemsCollection.ref.where('name', '==', this.val).get().then(
      function a (querySnapshot)  {
        querySnapshot.forEach(function (doc) {      
          console.log(doc.id)   
          id = doc.id;
          
         


        })
      }
    ));
   
  
setTimeout(() => {
 // console.log(item);
 const item: Country = { name: (document.getElementById("country1") as HTMLInputElement).value };
  console.log((document.getElementById("country1") as HTMLInputElement).value);
  console.log(this.itemsCollection.doc(id).update(item));
  this.isvalid=false;
}, 2000);
  


  }


  }

  
   
   
   
 



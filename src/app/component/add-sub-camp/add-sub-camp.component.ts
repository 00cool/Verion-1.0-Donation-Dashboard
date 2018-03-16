import { Component, OnInit } from '@angular/core';
import * as Collections from 'typescript-collections';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
 

 
var order = new Array();



@Component({
  selector: 'app-add-sub-camp',
  templateUrl: './add-sub-camp.component.html',
  styleUrls: ['./add-sub-camp.component.css']
})
export class AddSubCampComponent implements OnInit {

  items: Observable<any[]>;
 
    constructor(db : AngularFirestore){
    
      this.items = db.collection('campaign').valueChanges();

  }

  ngOnInit() {

    
 
  }

  addval(){

    console.log("call....")
    console.log((document.getElementById("cat_name")as HTMLInputElement).value);
    //this.appList.push((document.getElementById("cat_name")as HTMLInputElement).value);
  }

}

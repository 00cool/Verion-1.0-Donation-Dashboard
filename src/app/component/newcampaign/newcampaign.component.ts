import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { RadioControlValueAccessor } from '@angular/forms';


export interface Campaign { name: string; isChild: boolean}
var check : boolean;
@Component({
  selector: 'app-newcampaign',
  templateUrl: './newcampaign.component.html',
  styleUrls: ['./newcampaign.component.css']
})
export class NewcampaignComponent implements OnInit {
  update_id: string;
  state = '';
  isshow = false;
  description: string;
  model : boolean;
  
  items: Observable<any[]>;
  private itemsCollection: AngularFirestoreCollection<Campaign>;

  constructor(db: AngularFirestore) {

    this.itemsCollection = db.collection<Campaign>('campaign_sample');
    this.items = db.collection('campaign_sample').valueChanges();

   
   }

  ngOnInit() {
  }

  openModule() {

    document.getElementById('myModal').style.display = 'block';
  }
  spanClick() {
    document.getElementById('myModal').style.display = 'none';

  }


  addval() {
    console.log('calling add funct');
    const val = (document.getElementById('cat_name') as HTMLInputElement).value;
  //  const ischild= (document.getElementById('ischild') as HTMLInputElement).value

    console.log(this.model);
    var ans = this.model;
    if(this.model)
    {
    check = true;
    }
    else
    {
    check = false;
    }

    
    
    const items: Campaign = {name: val ,isChild: check};
    console.log('item' + items.name);
    console.log("ischild" + items.isChild)
    console.log(items)
    var add = this.itemsCollection.add(items).then((res) => {
      console.log(res);
  location.reload(true);

    });



  }

  delete() {
    console.log('call....delete  ===>' + event.srcElement.id);
    let val;
    val = event.srcElement.id;

    // const item: Taplearn = { desc: val; };
    let id;
    const res = (this.itemsCollection.ref.where('name', '==', val).get().then(
      function a(querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id);
          id = doc.id;




        });
      }
    )).then(() => {
console.log("iddddddd" + id);
      this.itemsCollection.doc(id).delete().then((res) =>
    {
    //  console.log(res);
      //location.reload(true);
    });
    });

  


  }

    show() {
      console.log('call....show  ===>' + event.srcElement.id);
      let id;
      let val;
      val = event.srcElement.id;

      let data;

      const res = (this.itemsCollection.ref.where('name', '==', val).get().then(
        function a(querySnapshot) {
          querySnapshot.forEach(function (doc) {
            console.log('this' + doc.id);
            id = doc.id;
            console.log(doc.data().name);
            data = { name: doc.data().name , isChild: doc.data().isChild};
            console.log('idddddd===>>>' + id);

          });
        }
      )).then(() => { 
        (document.getElementById('cat_name') as HTMLInputElement).value = data.name;
        
        (document.getElementById('add') as HTMLInputElement).innerHTML = 'update';
        (document.getElementById('h5') as HTMLInputElement).innerHTML = 'Update Campaign';
        this.update_id = id;
        console.log(this.update_id);
        if(data.isChild === (document.getElementById('true')as HTMLInputElement).value)
        {
          var radio = (document.getElementById('true')as HTMLInputElement).checked = true;
        }
        else{
          var radio = (document.getElementById('false')as HTMLInputElement).checked = true;
        }
        this.openModule();
      });
    }

    update() {
      console.log('Calling  update');
      const val = (document.getElementById('cat_name') as HTMLInputElement).value;
      console.log(this.model);
        const item: Campaign = { name: val ,isChild:this.model};
        console.log(this.update_id);
        console.log(this.itemsCollection.doc(this.update_id).update(item).then(() => {
          location.reload(true);
        }));
    }

    checkButton() {
      console.log('call button');

      const val = (document.getElementById('add') as HTMLInputElement).innerHTML;
      console.log(val);
      console.log(val.localeCompare('ADD'));
      // tslint:disable-next-line:curly
      if (0 === val.localeCompare('ADD'))
       this.addval();
      // tslint:disable-next-line:curly
      else
       this.update();
    }
    
   

}

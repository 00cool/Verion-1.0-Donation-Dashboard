import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';

export interface Campaign { name: string; }
export interface SubCampaign { name : string , isChild : boolean; parent_id : string;}
// var model : boolean;
var check : boolean;
@Component({
  selector: 'app-newsubcamp',
  templateUrl: './newsubcamp.component.html',
  styleUrls: ['./newsubcamp.component.css']
})
export class NewsubcampComponent implements OnInit {

  
   model : boolean;
  eventAdded: boolean = false;
  eventUpdated: boolean = false;

  campaign: Observable<any[]>;
  public campaignCollection: AngularFirestoreCollection<Campaign>;

  sub_campaign: Observable<any[]>;
  public sub_campaignCollection: AngularFirestoreCollection<SubCampaign>;

  camp_id: string;
  camp_all: object[];
  update_id: string;
  update_data: object;
  campaignid : string;
  ans : boolean;
 


  constructor(public db: AngularFirestore, public router: Router) {

    this.campaignCollection = db.collection<Campaign>('campaign_sample');
    this.campaign = db.collection('campaign_sample').valueChanges();



    this.sub_campaignCollection = db.collection<SubCampaign>('sub_camp_sample');
    this.sub_campaign = db.collection('sub_camp_sample').valueChanges();


  }


  ngOnInit() {
    this.eventUpdated =false;
    this.eventAdded = false;
  }

  addsubcamp()
  {
    const camp = (document.getElementById('camp') as HTMLInputElement).value;
    console.log(camp);
    var name_val = (document.getElementById('name') as HTMLInputElement).value;
   
   console.log(this.model);
   //this.model;
    if(this.model)
    {
      check = true;
    }
    else
    {
      check = false;
    }
  
 
     
     
      const item : SubCampaign = {name:name_val , isChild : check, parent_id : this.camp_id};

      console.log(this.sub_campaignCollection.add(item).then(() => {
        //    load code
        this.eventAdded = true;
      }))  
    

  }

  onContinue() {
    location.reload(true);
  }

  showSubCamp() {
    (document.getElementById('sub_camp') as HTMLInputElement).style.display = 'block';
    const camp = (document.getElementById('camp') as HTMLInputElement).value;
    console.log(camp);
    let id;
    const res = (this.campaignCollection.ref.where('name', '==', camp).get().then(
      function a(querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // console.log(doc.id)
          id = doc.id;
          //  console.log(id)
        });
      }
    )).then(() => {
      const arr = [];
      console.log('data---' + id);
      this.camp_id = id;
      console.log('this i ' + this.camp_id + ' id ' + id);

      this.camp_all = [];

      const query = this.sub_campaignCollection.ref.where('parent_id', '==', id);


      // tslint:disable-next-line:no-shadowed-variable
      return Promise.all([query.get()]).then(res => {
        res.forEach(r => {
          r.forEach(d => {
            console.log('Get:', d.data().name);

            this.camp_all.push(d.data());
          });
          // console.log(this.all_temp.pop());
        });
      });


    });

}

update()
{
  console.log('call....  update');
 
  let id;
  const name = (document.getElementById('name') as HTMLInputElement).value;
console.log(name);

// if(this.model)
// {
//   check= true;
// }
// else{
//   check = false;
// }
if(this.model)
{
  check =true;
}
else{
  check = false;
}

const item : SubCampaign = {name: name , isChild :check,parent_id : this.camp_id}
this.sub_campaignCollection.doc(this.update_id).update(item).then(() => {
  this.eventUpdated = true;
  this.eventAdded = true;
});

}

show()
{
  console.log('call....show  ===>' + event.srcElement.id);
  let data;
  let val;
  let id;
  val = event.srcElement.id;

  const res = (this.sub_campaignCollection.ref.where('name', '==', val).get().then(
    function a(querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log('this' + doc.id);
        data = doc.data();
        id = doc.id;
       // console.log('aa' + doc.data());


      });
    }
  )).then(() => {
    (document.getElementById('add_btn') as HTMLInputElement).innerHTML = 'update';
    (document.getElementById('h5') as HTMLInputElement).innerHTML = 'Update Sub Campaign';
    this.update_id = id;
    console.log(this.update_id);
    console.log(data.name);
    console.log(data.isChild);

   

    if(data.isChild === (document.getElementById('true')as HTMLInputElement).value){
      var radio = (document.getElementById('true')as HTMLInputElement).checked = true;
    }
    else{
      var radio = (document.getElementById('false')as HTMLInputElement).checked = true;
    }

    (document.getElementById('name') as HTMLInputElement).value = data.name;
    // var radio = (document.getElementById('ischild')as HTMLInputElement).checked = data.isChild;
   
    this.openModule();
  
    
  })
}

delete() {
  console.log('call....de  ===>' + event.srcElement.id);

  let val;
  val = event.srcElement.id;
  // const item: Taplearn = { desc: val };
  let id: any;
  const res = (this.sub_campaignCollection.ref.where('name', '==', val).get().then(
    function a(querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log(doc.id);
        id = doc.id;
      });
    }
  )).then(()=> {
    this.sub_campaignCollection.doc(id).delete().then(function re() {
      location.reload(true);
    });
  });
    
}

openModule() {
  document.getElementById('myModal').style.display = 'block';
}
spanClick() {
  document.getElementById('myModal').style.display = 'none';

}
checkButton() {
  console.log('call button');

  const val = (document.getElementById('add_btn') as HTMLInputElement).innerHTML;
  console.log(val);
  // console.log(val.localeCompare("ADD"));
  console.log('ADD'.localeCompare('ADD'));
  if (0 === val.localeCompare('ADD')) {
 
    var name_val = (document.getElementById('name') as HTMLInputElement).value;

    if(name_val.length == 0)
    {
      alert("Enter the SubCampaign Name");
      return;
    }

    this.addsubcamp();
  } else {
    this.update();
  }
  // this.update();
}



}
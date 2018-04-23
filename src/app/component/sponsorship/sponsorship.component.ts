import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { RadioControlValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { window } from 'rxjs/operator/window';

export interface sponsorship {name:string ,isChild:boolean, parent_id: string};
export interface Campaign { name: string; }
export interface SubCampaign { name : string , isChild : boolean; parent_id : string;}
export interface Sponsorship {name:string;isChild:boolean;parent_id :string}
var check : boolean;
@Component({
  selector: 'app-sponsorship',
  templateUrl: './sponsorship.component.html',
  styleUrls: ['./sponsorship.component.css']
})
export class SponsorshipComponent implements OnInit {
  camp_id: string;
  camp_all: any[];
  update_id: string;
  update_data: object;
  parentid : string;
  model : boolean;
  subcamp : any[];
  subspons : any[];
  Displaydata : any[];

  campaign: Observable<any[]>;
  public campaignCollection: AngularFirestoreCollection<Campaign>;

  sub_campaign: Observable<any[]>;
  public sub_campaignCollection: AngularFirestoreCollection<SubCampaign>;

  sponsorship : Observable<any[]>;
  public sponsCollection : AngularFirestoreCollection<Sponsorship>

  constructor(public db: AngularFirestore, public router: Router) {

    this.campaignCollection = db.collection<Campaign>('campaign_sample');
    this.campaign = db.collection('campaign_sample').valueChanges();



    this.sub_campaignCollection = db.collection<SubCampaign>('sub_camp_sample');
    this.sub_campaign = db.collection('sub_camp_sample').valueChanges();

    this.sponsCollection = db.collection<Sponsorship>('sponsorship');
    this.sponsorship = db.collection('sponsorship').valueChanges();

    console.log(this.sponsorship);

  }


  ngOnInit() {
  }
  openModule() {

    document.getElementById('myModal').style.display = 'block';

    var campname =  (document.getElementById('camp') as HTMLInputElement).value;
 (document.getElementById('camp_id') as HTMLInputElement).value = campname;
 var subcamaignname = (document.getElementById('sub_camp_id') as HTMLInputElement).value;

 var sub_select = (document.getElementById('sub_camp'));
 var options = (document.createElement('option'));
 options.text = subcamaignname;
 options.selected = true;
 options.hidden = true;
 sub_select.appendChild(options);
 console.log('options ' + options);
  }
  spanClick() {
    document.getElementById('myModal').style.display = 'none';

  }
  showSubCamp() {
    // (document.getElementById('sub_camp') as HTMLInputElement).style.display = 'block';
     
    
    const camp = (document.getElementById('camp') as HTMLInputElement).value;
     
     console.log(camp);
     let id;
     const res = (this.campaignCollection.ref.where('name', '==', camp).get().then(
       function a(querySnapshot) {
         querySnapshot.forEach(function (doc) {
           // console.log(doc.id)
           id = doc.id;
             console.log(id)
         });
       }
     )).then(() => {
       console.log(id);
       const ans = (this.sub_campaignCollection.ref.where('parent_id', '==',id ))
       this.subspons = [];
       return Promise.all([ans.get()]).then(res => {
         res.forEach(r => {
           r.forEach(d => {
             console.log('Get:', d.data().name);
             
             this.subspons.push(d.data().name);
           });
           // console.log(this.all_temp.pop());
         });
       }).then(()=>{
  
         var camp1 = (document.getElementById('sub_camp_id'));
         var options = (document.createElement('option'));
         options.text = "Select your option";
         options.hidden = true;
         options.selected = true;
         camp1.appendChild(options);
 
         console.log('sponship ==============');
         var spons_select = (document.getElementById('sub_camp_id'));
         var options = (document.createElement('option'));
         options.text = "Select your option";
         options.selected = true;
         options.hidden = true;
         spons_select.appendChild(options);
        //  console.log('options ' + options);
 
       })
       
 
     });
 
 }
 showdata()
{
  console.log("in show data")
  let id
  var subcampids = (document.getElementById('sub_camp_id') as HTMLInputElement).value;
   console.log("data" + subcampids);
   //console.log("subsponsorid" + this.subsponsid);
   const res = (this.sub_campaignCollection.ref.where('name', '==', subcampids).get().then(
    function a(querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // console.log(doc.id)
        id = doc.id;
          console.log(id)
      });
    }
  )).then(() => {
   // (document.getElementById('sponsorshipid') as HTMLInputElement).value
    this.Displaydata = [];
console.log(subcampids);
    console.log(id);
   const res = (this.sponsCollection.ref.where('parent_id', '==', id)).get().then(
    (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.id)
        id = doc.id;
        console.log(doc.data().name);
          console.log(id);
          this.Displaydata.push(doc.data());
      });
    }
  ).then(() => 
{
  (document.getElementById('tabledata') as HTMLInputElement).style.display = 'block'
})
  })
}
  // showsubcamp() {
  //   // (document.getElementById('sub_camp') as HTMLInputElement).style.display = 'block';
  //    const camp = (document.getElementById('camp') as HTMLInputElement).value;
  //    console.log(camp);
  //    let id;
  //    const res = (this.campaignCollection.ref.where('name', '==', camp).get().then(
  //      function a(querySnapshot) {
  //        querySnapshot.forEach(function (doc) {
  //          // console.log(doc.id)
  //          id = doc.id;
  //          //  console.log(id)
  //        });
  //      }
  //    ));
  //    const arr = [];
  //    setTimeout(() => {
  //      console.log('data---' + id);
  //      this.camp_id = id;
  //      console.log('this i ' + this.camp_id + ' id ' + id);
 
  //      this.camp_all = [];
 
  //      const query = this.sub_campaignCollection.ref.where('parent_id', '==', id);
 
 
  //      // tslint:disable-next-line:no-shadowed-variable
  //      return Promise.all([query.get()]).then(res => {
  //        res.forEach(r => {
  //          r.forEach(d => {
  //            console.log('Get:', d.data().name);
 
  //            this.camp_all.push(d.data().name);
  //          });
  //          // console.log(this.all_temp.pop());
  //        });
  //      }).then(()=>{
 
 
  //        (document.getElementById('select_sub') as HTMLInputElement).style.display = 'block';
 
  //      })
 
      
 
  //    }, 2000);
 
  //  }

  showsubcamp() {
   // (document.getElementById('sub_camp') as HTMLInputElement).style.display = 'block';
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
      console.log('data---' + id);
      this.camp_id = id;
      console.log('this i ' + this.camp_id + ' id ' + id);

      this.subcamp = [];

      const query = this.sub_campaignCollection.ref.where('parent_id', '==', id);


      // tslint:disable-next-line:no-shadowed-variable
      return Promise.all([query.get()]).then(res => {
        res.forEach(r => {
          r.forEach(d => {
            console.log('Get:', d.data().name);

            this.subcamp.push(d.data().name);
          });
          // console.log(this.all_temp.pop());
        });
      }).then(()=>{


//        (document.getElementById('select_sub') as HTMLInputElement).style.display = 'block';

      })

    })
    
  }

  add()
  {
    var name_spon =(document.getElementById('sponsorship') as HTMLInputElement).value

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
    var name =(document.getElementById('sub_camp') as HTMLInputElement).value
    const query = this.sub_campaignCollection.ref.where('name', '==',name);


    
      return Promise.all([query.get()]).then(res => {
        res.forEach(r => {
          r.forEach(d => {
            console.log('Get:', d.id);
this.parentid = d.id;
        
          });
     
        });
      }).then (() => {
        const items : Sponsorship = {name : name_spon, isChild : check ,parent_id : this.parentid};
        this.sponsCollection.add(items).then((res) => {
          console.log(res);
          location.reload(true);
        })
      });
  
  }
  checkButton() {
    console.log('call button');
  
    const val = (document.getElementById('add_btn') as HTMLInputElement).innerHTML;
    console.log(val);
    // console.log(val.localeCompare("ADD"));
    console.log('ADD'.localeCompare('ADD'));
    if (0 === val.localeCompare('ADD')) {
   
      var name_val = (document.getElementById('sponsorship') as HTMLInputElement).value;
  
      if(name_val.length == 0)
      {
        alert("Enter the SubCampaign Name");
        return;
      }
  
      this.add();
    } else {
      this.update();
    }

    // this.update();
  }
  
  delete() {
    console.log('call....de  ===>' + event.srcElement.id);
  
    let val;
    val = event.srcElement.id;
    // const item: Taplearn = { desc: val };
    let id: any;
    const res = (this.sponsCollection.ref.where('name', '==', val).get().then(
      function a(querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id);
          id = doc.id;
        });
      }
    )).then(()=> {
      this.sponsCollection.doc(id).delete().then(() => {
        this.showdata();
      //  location.reload(true);
      });
    });
      
  }
  update()
{
  console.log('call....  update');
 
  let id;
  const name = (document.getElementById('sponsorship') as HTMLInputElement).value;
  const sub_name = (document.getElementById('sub_camp') as HTMLInputElement).value;
  console.log(name);

console.log(this.model);

const res = (this.sub_campaignCollection.ref.where('name', '==', sub_name).get().then(
  function a(querySnapshot) {
    querySnapshot.forEach(function (doc) {
      console.log('id ' + doc.id);
      id = doc.id;
    });
  }
)).then(()=> {
  if(this.model)
  {
    check =true;
  }
  else{
    check = false;
  }
  const item : Sponsorship = {name: name , isChild : check,parent_id : id}
  console.log(item);
  console.log(this.update_id);
  this.sponsCollection.doc(this.update_id).update(item).then(() => {

    location.reload(true);
  });
  
  });




// this.sub_campaignCollection.doc(this.update_id).update(item).then(() => {

//   //window.location.reload();
// });

}

  
  show()
{
   (document.getElementById('select_sub') as HTMLInputElement).style.display = 'block';
  console.log('call....show  ===>' + event.srcElement.id);
  let data;
  let val;
  let id;
  val = event.srcElement.id;

  const res = (this.sponsCollection.ref.where('name', '==', val).get().then(
    (querySnapshot) => {
      querySnapshot.forEach(function (doc) {
        console.log('this' + doc.id);
        data = doc.data();
        id = doc.id;
      
       // console.log('aa' + doc.data());


      });
    }
  )).then(() => {
    (document.getElementById('add_btn') as HTMLInputElement).innerHTML = 'update';
    (document.getElementById('h5') as HTMLInputElement).innerHTML = 'Update Sponsorship';
 
    this.update_id = id;
    console.log(this.update_id);
    console.log(data.name);
    console.log(data.isChild);
    console.log(id);

   var sub_camp_name;
   var camp_id;
   var camp_name;

    const res = (this.sub_campaignCollection.ref.doc(data.parent_id).get().then(
     (querySnapshot) =>  {
      
        this.parentid = querySnapshot.id;
           sub_camp_name = querySnapshot.data().name;
           camp_id = querySnapshot.data().parent_id;
  
      }

    )).then(()=>{

      (this.campaignCollection.ref.doc(camp_id).get().then(
        function a(querySnapshot) {
        
             camp_name = querySnapshot.data().name;
            //  camp_id = querySnapshot.data().parent_id;
    
        }
      )).then(()=>{
 
        console.log('sub ' +  sub_camp_name);
        console.log(sub_camp_name);
        (document.getElementById('sponsorship') as HTMLInputElement).value = data.name;
        (document.getElementById('camp') as HTMLInputElement).value = camp_name;

         document.getElementById("selected").innerHTML  = sub_camp_name ;
         
         (document.getElementById('sub_camp') as HTMLInputElement).value = sub_camp_name;
          this.camp_all = [];
         this.camp_all.push(sub_camp_name);
          console.log(camp_id);
         var res = this.sub_campaignCollection.ref.where('parent_id' , '==' ,camp_id ).get().then(
    (querySnapshot) => {
            querySnapshot.forEach( (document) =>{
              console.log('this ' + document.id);
            //   data = doc.data();
            //   id = doc.id
            if(document.data().name !== sub_camp_name)
            this.camp_all.push(document.data().name);
            //  // console.log('aa' + doc.data());
      
      
            });
          })
         
        
         
        // this.showsubcamp();
      });
     

    });

 

   

    if(data.isChild === (document.getElementById('true')as HTMLInputElement).value){
      var radio = (document.getElementById('true')as HTMLInputElement).checked = true;
    }
    else{
      var radio = (document.getElementById('false')as HTMLInputElement).checked = true;
    }

    
    // var radio = (document.getElementById('ischild')as HTMLInputElement).checked = data.isChild;
   
    this.openModule();
  

    
  })
}


}

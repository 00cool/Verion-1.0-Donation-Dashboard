import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { query } from '@angular/animations/src/animation_metadata';
import { window } from 'rxjs/operators/window';


export interface sponsorship {name:string ,isChild:boolean, parent_id: string};
export interface Campaign { name: string; }
export interface SubCampaign { name : string , isChild : boolean; parent_id : string;}
export interface Sponsorship {name:string;isChild:boolean;parent_id :string}
export interface subsponsorship {name:string;amount:string;parent_id:string}
var check : boolean;
var subsponsid:string;
@Component({
  selector: 'app-subsponsorship',
  templateUrl: './subsponsorship.component.html',
  styleUrls: ['./subsponsorship.component.css']
})
export class SubsponsorshipComponent implements OnInit {

  camp_all : any[];
  spons_all : any[];
  camp_id : string;
  update_id: string;
  update_data: object;
model : boolean;
parentid : string;
sponsid:string;


  campaign: Observable<any[]>;
  public campaignCollection: AngularFirestoreCollection<Campaign>;

  sub_campaign: Observable<any[]>;
  public sub_campaignCollection: AngularFirestoreCollection<SubCampaign>;

  sponsorship : Observable<any[]>;
  public sponsCollection : AngularFirestoreCollection<Sponsorship>

  Subsponsorship : Observable<any[]>;
  public subsponsCollection : AngularFirestoreCollection<subsponsorship>

  constructor(public db: AngularFirestore, public router: Router) {


    this.campaignCollection = db.collection<Campaign>('campaign_sample_1');
    this.campaign = db.collection('campaign_sample_1').valueChanges();



    this.sub_campaignCollection = db.collection<SubCampaign>('sub_camp_sample_1');
    this.sub_campaign = db.collection('sub_camp_sample_1').valueChanges();

    this.sponsCollection = db.collection<Sponsorship>('sponsorhip_temp');
    this.sponsorship = db.collection('sponsorhip_temp').valueChanges();

    this.subsponsCollection = db.collection<subsponsorship>('subsponsorship_temp');
    this.Subsponsorship = db.collection('subsponsorship_temp').valueChanges();

    console.log(this.sponsorship);

   }

  ngOnInit() {
  }

  openModule() {

    document.getElementById('myModal').style.display = 'block';
  }
  spanClick() {
    document.getElementById('myModal').style.display = 'none';

  }

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
     ));
     const arr = [];
     setTimeout(() => {
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
 
             this.camp_all.push(d.data().name);
           });
           // console.log(this.all_temp.pop());
         });
       }).then(()=>{
 
 
         (document.getElementById('select_sub') as HTMLInputElement).style.display = 'block';
 
       })
 
      
 
     }, 2000);
 
   }

   showsponsorship() {
    // (document.getElementById('sub_camp') as HTMLInputElement).style.display = 'block';


    console.log('show spons');

     const subcamp = (document.getElementById('sub_camp') as HTMLInputElement).value;
     console.log(subcamp);
     let id;
     const res = (this.sub_campaignCollection.ref.where('name', '==', subcamp).get().then(
       function a(querySnapshot) {
         querySnapshot.forEach(function (doc) {
           // console.log(doc.id)
           id = doc.id;
           //  console.log(id)
         });
       }
     ));
    // const arr = [];
     setTimeout(() => {
       console.log('data---' + id);
       this.camp_id = id;
       console.log('this i ' + this.camp_id + ' id ' + id);
 
       this.spons_all = [];
 
       const query = this.sponsCollection.ref.where('parent_id', '==', id);
 
 
       // tslint:disable-next-line:no-shadowed-variable
       return Promise.all([query.get()]).then(res => {
         res.forEach(r => {
           r.forEach(d => {
             console.log('Get:', d.data().name);
 
             this.spons_all.push(d.data().name);
           });
           // console.log(this.all_temp.pop());
         });
       }).then(()=>{
 
 
         (document.getElementById('select_sub') as HTMLInputElement).style.display = 'block';
 
       })
 
      
 
     }, 2000);
 
    
 
 
   }

   add()
   {
    var name_spon =(document.getElementById('sub_sponsorship') as HTMLInputElement).value

  

      var name =(document.getElementById('sub_camp') as HTMLInputElement).value
      const query = this.sub_campaignCollection.ref.where('name', '==',name);
  
  
      
        return Promise.all([query.get()]).then(res => {
          res.forEach(r => {
            r.forEach(d => {
              console.log('Get:', d.id);
  this.parentid = d.id;
          
            }); 
       
          });
        }).then(() => 
      {
        var spon_name =(document.getElementById('spon_select') as HTMLInputElement).value
        var name =(document.getElementById('sub_sponsorship') as HTMLInputElement).value;
        var amount =(document.getElementById('amount') as HTMLInputElement).value;
        console.log(name + ' name')
        const query = this.sponsCollection.ref.where('name', '==',spon_name);
    
    
        
          return Promise.all([query.get()]).then(res => {
            res.forEach(r => {
              r.forEach(d => {
                console.log('Get:', d.id);
    this.sponsid = d.id;
            
              });
         
            });
          }).then(() =>
        {
          const items : subsponsorship = {name : name_spon, amount:amount ,parent_id : this.sponsid};
          this.subsponsCollection.add(items).then((res) => {
            console.log(res);
            location.reload(true);
           
          })
        })
      })
    }


   
  

   update()
   {
    console.log('call....  update');
 
    let sponsorshipid;
    let id;
    const name = (document.getElementById('sub_sponsorship') as HTMLInputElement).value;
    const amount = (document.getElementById('amount') as HTMLInputElement).value;
    const sub_name = (document.getElementById('sub_camp') as HTMLInputElement).value;
    const subspons_name = (document.getElementById('spon_select') as HTMLInputElement).value;

    const res = (this.sponsCollection.ref.where('name', '==', subspons_name).get().then(
      function a(querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log('id ' + doc.id);
          sponsorshipid = doc.id;
        });
      }
    )).then(() => 
  {
    const res = (this.sub_campaignCollection.ref.where('name', '==', sub_name).get().then(
      function a(querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log('id ' + doc.id);
          id = doc.id;
        });
      }
    ))
  }).then(() =>
{
  const item : subsponsorship = {name: name , amount : amount,parent_id :sponsorshipid};
  console.log(item);
  this.subsponsCollection.doc(subsponsid).update(item).then(() => {
location.reload(true);
  });
});


   }
   delete() {
    console.log('call....de  ===>' + event.srcElement.id);
  
    let val;
    val = event.srcElement.id;
    // const item: Taplearn = { desc: val };
    let id: any;
    const res = (this.subsponsCollection.ref.where('name', '==', val).get().then(
      function a(querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id);
          id = doc.id;
        });
      }
    )).then(()=> {
      this.subsponsCollection.doc(id).delete().then(function re() {
       // location.reload(true);
      });
    });
      
  }

   show()
   {
      (document.getElementById('select_sub') as HTMLInputElement).style.display = 'block';
      
     console.log('call....show  ===>' + event.srcElement.id);
     let data;
     let val;
     let id; 
     let spons_id;
     let subsponsname, amount,campname , subcampname , sponsname ,subcampid;

     val = event.srcElement.id;
     const res = (this.subsponsCollection.ref.where('name', '==', val).get().then(
      (querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          console.log('this' + doc.id);
          data = doc.data();
          id = doc.id;
          subsponsid =doc.id;
          console.log("Subsponsid" + subsponsid);
          spons_id = doc.data().parent_id
         // console.log('aa' + doc.data());
         subsponsname = doc.data().name;
         amount = doc.data().amount;
         console.log("subsponship" +subcampname +"amount===" + amount);
  
  
        });
      }
    )).then(() =>
  {
     const res = (this.sponsCollection.ref.doc(spons_id).get().then(
       (querySnapshot) => {
        
           console.log('this' + querySnapshot.id);
           data = querySnapshot.data();
           id = querySnapshot.id;
           sponsname = querySnapshot.data().name;
            subcampid = querySnapshot.data().parent_id;
          // console.log('aa' + doc.data());
      }
     )).then(() => {
       (document.getElementById('add_btn') as HTMLInputElement).innerHTML = 'update';
       (document.getElementById('h5') as HTMLInputElement).innerHTML = 'Update Sub Sponsorship';
    
       this.update_id = id;
       console.log(this.update_id);
       console.log(data.name);
       console.log(data.isChild);
       console.log(id);
   
      var sub_camp_name;
      var camp_id;
      var camp_name;
   
       const res = (this.sub_campaignCollection.ref.doc(subcampid ).get().then(
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
            (document.getElementById('sub_sponsorship') as HTMLInputElement).value = subsponsname;
            (document.getElementById('amount') as HTMLInputElement).value = amount;
           (document.getElementById('camp') as HTMLInputElement).value = camp_name;
   
            document.getElementById("selected").innerHTML  = sub_camp_name ;
            
            (document.getElementById('sub_camp') as HTMLInputElement).value = sub_camp_name;
            (document.getElementById('spon_select') as HTMLInputElement).value = sponsname;
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
            
             this.spons_all = [];
             this.spons_all.push(sponsname);
              // console.log(camp_id);
             var res = this.sponsCollection.ref.where('parent_id' , '==' ,subcampid ).get().then(
        (querySnapshot) => {
                querySnapshot.forEach( (document) =>{
                  console.log('this ' + document.id);
                //   data = doc.data();
                //   id = doc.id
                if(document.data().name !== sponsname)
                this.spons_all.push(document.data().name);
                //  // console.log('aa' + doc.data());
          
          
                });
              })
             
           
            
           // this.showsubcamp();
         });
       });        
   
       });
   
    
   
      
   
   
       
       // var radio = (document.getElementById('ischild')as HTMLInputElement).checked = data.isChild;
      
       this.openModule();
     
   
       
     })
   }
   checkButton() {
    console.log('call button');
  
    const val = (document.getElementById('add_btn') as HTMLInputElement).innerHTML;
    console.log(val);
    // console.log(val.localeCompare("ADD"));
    console.log('ADD'.localeCompare('ADD'));
    if (0 === val.localeCompare('ADD')) {
   
      var name_val = (document.getElementById('sub_sponsorship') as HTMLInputElement).value;
  
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



}

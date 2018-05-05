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
  subspons : any[];
  subsponsorship : any[];
  Displaydata : any[];
  subsponsid: string;
model : boolean;
parentid : string;
sponsid:string;
  eventAdded: boolean = false;
  eventUpdated: boolean = false;
  hideTable: boolean = true;

  campaign: Observable<any[]>;
  public campaignCollection: AngularFirestoreCollection<Campaign>;

  sub_campaign: Observable<any[]>;
  public sub_campaignCollection: AngularFirestoreCollection<SubCampaign>;

  sponsorship : Observable<any[]>;
  public sponsCollection : AngularFirestoreCollection<Sponsorship>

  Subsponsorship : Observable<any[]>;
  public subsponsCollection : AngularFirestoreCollection<subsponsorship>

  constructor(public db: AngularFirestore, public router: Router) {


    this.campaignCollection = db.collection<Campaign>('campaign_sample');
    this.campaign = db.collection('campaign_sample').valueChanges();



    this.sub_campaignCollection = db.collection<SubCampaign>('sub_camp_sample');
    this.sub_campaign = db.collection('sub_camp_sample').valueChanges();

    this.sponsCollection = db.collection<Sponsorship>('sponsorship');
    this.sponsorship = db.collection('sponsorship').valueChanges();

    this.subsponsCollection = db.collection<subsponsorship>('sub_sponsorship');
    this.Subsponsorship = db.collection('sub_sponsorship').valueChanges();

    console.log(this.sponsorship);

   }

  ngOnInit() {
    this.eventUpdated = false;
    this.eventAdded = false;
  }

  showSubCamp() {
   // (document.getElementById('sub_camp') as HTMLInputElement).style.display = 'block';
    this.hideTable = true;
   
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
        var spons_select = (document.getElementById('sponsorshipid'));
        var options = (document.createElement('option'));
        options.text = "Select your option";
        options.selected = true;
        options.hidden = true;
        spons_select.appendChild(options);
        console.log('options ' + options);

      })
      

    });

}

showdata()
{
  this.hideTable = false;
  console.log("in show data")
  let id
  var subcampids = (document.getElementById('sponsorshipid') as HTMLInputElement).value;
   console.log("data" + subcampids);
   //console.log("subsponsorid" + this.subsponsid);
   const res = (this.sponsCollection.ref.where('name', '==', subcampids).where('parent_id','==',this.subsponsid).get().then(
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
   const res = (this.subsponsCollection.ref.where('parent_id', '==', id)).get().then(
    (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.id)
        id = doc.id;
        console.log(doc.data().name);
          console.log(id);
         const items : any = {id : doc.id,name: doc.data().name,parent_id : doc.data().parent_id,amount : doc.data().amount}

          this.Displaydata.push(items);
      });
    }
  ).then(() => 
{
  (document.getElementById('tabledata') as HTMLInputElement).style.display = 'block'
})
  })

//    const ans1 = (this.sponsCollection.ref.where('parent_id', '==', this.subsponsid).get().then(
//     function a(querySnapshot) {
//       querySnapshot.forEach(function (doc) {
//         // console.log(doc.id)
//         id = doc.id;
//           console.log(id)
//       });
//     }
//   )).then(() =>
// {
//   this.Displaydata = [];

//     console.log(id);
//    const res = (this.subsponsCollection.ref.where('parent_id', '==', id).get().then(
//     (querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         // console.log(doc.id)
//         id = doc.id;
//         console.log(doc.data().name);
//           console.log(id);
//           this.Displaydata.push(doc.data());
//       });
//     }
//   )).then(() => 
// {
//   (document.getElementById('tabledata') as HTMLInputElement).style.display = 'block'
// })
// })
   
  

}

show_spons()
{
  this.hideTable =true;
  let id
  var subcampids = (document.getElementById('sub_camp_id') as HTMLInputElement).value;
  console.log("data" + subcampids);
  const res = (this.sub_campaignCollection.ref.where('name', '==', subcampids).get().then(
    (querySnapshot) => {
      querySnapshot.forEach((doc) =>{
        // console.log(doc.id)
        id = doc.id;
          console.log(id)
          this.subsponsid =id;
          console.log(this.subsponsid);
      });
    }
  )).then(() => {
    this.subsponsorship = [];

    console.log(id);
   const res = (this.sponsCollection.ref.where('parent_id', '==', id).get().then(
    (querySnapshot) => {
      querySnapshot.forEach((doc1) => {
        // console.log(doc.id)
        id = doc1.id;
        console.log(doc1.data().name);
          console.log(id);
          this.subsponsorship.push(doc1.data().name);
      });
    }
  ));
  }).then(()=>{

    console.log('sponship ==============');
    var spons_select = (document.getElementById('sponsorshipid'));
    var options = (document.createElement('option'));
    options.text = "Select your option";
    options.selected = true;
    options.hidden = true;
    spons_select.appendChild(options);
    console.log('options ' + options);

  });

}

  openModule() {

    document.getElementById('myModal').style.display = 'block';
 var campname =  (document.getElementById('camp') as HTMLInputElement).value;
 (document.getElementById('camp_id') as HTMLInputElement).value = campname;
 var subcamaignname = (document.getElementById('sub_camp_id') as HTMLInputElement).value;
 var sponsorshipname = (document.getElementById('sponsorshipid') as HTMLInputElement).value;

 var sub_select = (document.getElementById('sub_camp'));
 var options = (document.createElement('option'));
 options.text = subcamaignname;
 options.selected = true;
 options.hidden = true;
 sub_select.appendChild(options);
 console.log('options ' + options);

 var spons_select = (document.getElementById('spon_select'));
 var options = (document.createElement('option'));
 options.text = sponsorshipname;
 options.selected = true;
 options.hidden = true;
 spons_select.appendChild(options);
 console.log('options ' + options);
 
 

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
 
        // console.log('sponship ==============');
        // var spons_select = (document.getElementById('spon_select'));
        // var options = (document.createElement('option'));
        // options.text = "Select your option";
        // options.disabled = true;
        // options.selected = true;
        // spons_select.appendChild(options);
        // console.log('options ' + options);
 
        //  (document.getElementById('select_sub') as HTMLInputElement).style.display = 'block';
 
       })
 
      
 
     }, 2000);
 
    
 
 
   }

   add()
   {
    var name_spon =(document.getElementById('sub_sponsorship') as HTMLInputElement).value

  name_spon.trim();

      var name =(document.getElementById('sub_camp') as HTMLInputElement).value
      name.trim();
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
        amount.replace(/,\s?/g, "");
        console.log(name + ' name')
        const query = this.sponsCollection.ref.where('name', '==',spon_name);

       const query1 = query.where('parent_id','==',this.parentid)
    
    
        
          return Promise.all([query1.get()]).then(res => {
            res.forEach(r => {
              r.forEach(d => {
                console.log('Get:', d.id);
    this.sponsid = d.id;
            console.log("Data Name" + d.data().name + " id=====>" +d.id );

              });
         
            });
          }).then(() =>
        {
          const items : subsponsorship = {name : name_spon, amount:amount ,parent_id : this.sponsid};
          console.log(items);
          this.subsponsCollection.add(items).then((res) => {
            // console.log(res);
            this.eventAdded = true;
           
          })
        })
      })
    }


  onContinue() {
    location.reload(true);
  }   
  

   update()
   {
    console.log('call....  update' + this.subsponsid);
    console.log(subsponsid);
    
    let sponsorshipid;
    let id;
    const name = (document.getElementById('sub_sponsorship') as HTMLInputElement).value;
    var amount = (document.getElementById('amount') as HTMLInputElement).value;
    const sub_name = (document.getElementById('sub_camp') as HTMLInputElement).value;
    const subspons_name = (document.getElementById('spon_select') as HTMLInputElement).value;
   console.log(name.trim());
    console.log(amount.trim());
    console.log(sub_name.trim());
    console.log(subspons_name.trim());
    amount.replace(/,\s?/g, "");


    const res = (this.sponsCollection.ref.where('name', '==', subspons_name).where('parent_id','==',this.subsponsid).get().then(
      (querySnapshot) => {
        console.log("in querysnapshot");
        querySnapshot.forEach((doc1) => {

          console.log('id ' + doc1.id);
          sponsorshipid = doc1.id;
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
// location.reload(true);
  this.eventUpdated = true;
 this.eventAdded = true;
  });
});


   }
   delete() {
    console.log('call....de  ===>' + event.srcElement.id);
  
    let val;
    val = event.srcElement.id;
    // const item: Taplearn = { desc: val };
    let id;
    var data;
console.log(val);
    this.subsponsCollection.doc(val).delete().then((res) => {
    this.showdata();
    })
    // const res = (this.subsponsCollection.ref.where('name', '==', val).get().then(
    //   function a(querySnapshot) {
    //     querySnapshot.forEach(function (doc) {
    //       console.log(doc.id);
    //       id = doc.id;

    //       data = doc.data();

    //     });
    //   }
    // )).then(()=> {
    //   this.subsponsCollection.doc(id).delete().then((res) => {
    //    // location.reload(true);
    //   });

      
      
    // //  console.log(del);
    // });

   
      
  }

   show()
   {
      (document.getElementById('select_sub') as HTMLInputElement).style.display = 'block';
      var update_sponsorship = (document.getElementById('sponsorshipid') as HTMLInputElement).value;
     console.log('call....show  ===>' + event.srcElement.id);
     let data;
     let val;
     let id; 
     let spons_id;
     let subsponsname, amount,campname , subcampname , sponsname ,subcampid;
     val = event.srcElement.id;
     console.log("update spions id "+ val);


     const res = (this.subsponsCollection.ref.doc(val).get().then(
      (doc) => {
      
          console.log('this' + doc);
          if(doc.exists)
          {
            console.log(doc.data()+"=========="+doc.id);
           
          }
        
          else
          console.log("documnet not dounf")
          data = doc.data();
          id = doc.id;
          subsponsid =doc.id;
          console.log("Subsponsid" + subsponsid);
          spons_id = doc.data().parent_id
         // console.log('aa' + doc.data());
         subsponsname = doc.data().name;
         amount = doc.data().amount;
         console.log("subsponship" +subsponsname +"    " +amount + "===+++amount");
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
   
       const res = (this.sub_campaignCollection.ref.doc(subcampid).get().then(
        (querySnapshot) =>  {
         
           this.parentid = querySnapshot.id;
              sub_camp_name = querySnapshot.data().name;
              camp_id = querySnapshot.data().parent_id;
              
     
         }
   
       )).then(()=>{
   
         (this.campaignCollection.ref.doc(camp_id).get().then(
           function a(querySnapshot) {
           
                camp_name = querySnapshot.data().name;
                console.log("Campaign Data=====" + querySnapshot.data().name)
               //  camp_id = querySnapshot.data().parent_id;
       
           }
         )).then(()=>{
    
           console.log('sub ' +  sub_camp_name);
           console.log(sub_camp_name);
           console.log(camp_name);
            (document.getElementById('sub_sponsorship') as HTMLInputElement).value = subsponsname;
            (document.getElementById('amount') as HTMLInputElement).value = amount;
           
            (document.getElementById('camp_id')  as HTMLInputElement).value = camp_name;
   
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
   
    
   
      
      });
   
       
    //   var radio = (document.getElementById('ischild')as HTMLInputElement).checked = data.isChild;
      
       this.openModule();
     
   
       
    
    
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

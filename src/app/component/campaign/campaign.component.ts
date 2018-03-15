import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';



export interface Campaign { name: string; }
export interface SubCampaign { name: string; time: string; amount: string; campaign_name: string; }

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})

export class CampaignComponent implements OnInit {

  campaign: Observable<any[]>;
  public campaignCollection: AngularFirestoreCollection<Campaign>;

  sub_campaign: Observable<any[]>;
  public sub_campaignCollection: AngularFirestoreCollection<SubCampaign>;

  camp_id: string;
  camp_all: object[];
  update_id: string;
  update_data: object;

  constructor(public db: AngularFirestore, public router: Router) {

    this.campaignCollection = db.collection<Campaign>('campaign');
    this.campaign = db.collection('campaign').valueChanges();

    this.sub_campaignCollection = db.collection<SubCampaign>('subCampaign_temp');
    this.sub_campaign = db.collection('subCampaign_temp').valueChanges();


  }

  ngOnInit() {
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
    ));
    const arr = [];
    setTimeout(() => {
      console.log('data---' + id);
      this.camp_id = id;
      console.log('this i ' + this.camp_id + ' id ' + id);

      this.camp_all = [];

      const query = this.sub_campaignCollection.ref.where('campaign_name', '==', id);


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

    }, 2000);

  }

  add() {
    console.log('call.... add');
    // console.log((document.getElementById("") as HTMLInputElement).value);
    // this.appList.push((document.getElementById("cat_name")as HTMLInputElement).value);
    const name_val = (document.getElementById('name') as HTMLInputElement).value;
    const time_val = (document.getElementById('time') as HTMLInputElement).value;
    const amount_val = (document.getElementById('amount') as HTMLInputElement).value;
    //  var name = (document.getElementById("desc") as HTMLInputElement).value;
    console.log(name_val);
    console.log(time_val);
    console.log(amount_val);
    const item: SubCampaign = { name: name_val, time: time_val, amount: amount_val, campaign_name: this.camp_id };
    console.log('item' + item);
    this.sub_campaignCollection.add(item);
    setTimeout(() => {

      location.reload(true);
    }, 2000);
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
    ));


    setTimeout(() => {
      this.sub_campaignCollection.doc(id).delete().then(function re() {
        location.reload(true);
      });


      // this.router.navigate(['/campaign']);

    }, 2000);


  }

  checkButton() {
    console.log('call button');

    const val = (document.getElementById('add_btn') as HTMLInputElement).innerHTML;
    console.log(val);
    // console.log(val.localeCompare("ADD"));
    console.log('ADD'.localeCompare('ADD'));
    if (0 === val.localeCompare('ADD')) {
      this.add();
    } else {
      this.update();
    }
    // this.update();
  }

  update() {
    console.log('call....  update');
    // tslint:disable-next-line:prefer-const
    let id;

    setTimeout(() => {
      // console.log(item);
      const name = (document.getElementById('name') as HTMLInputElement).value;
      const time = (document.getElementById('time') as HTMLInputElement).value;
      const amount = (document.getElementById('amount') as HTMLInputElement).value;
      const item: SubCampaign = { name: name, time: time, amount: amount, campaign_name: this.camp_id };
      console.log(this.update_id);
      // console.log((document.getElementById("desc") as HTMLInputElement).value);
      console.log(this.sub_campaignCollection.doc(this.update_id).update(item).then(() => {

        window.location.reload();
      }));

      // window.location.reload();
      // this.isvalid=false;
      // this.router.navigateByUrl('/home');
      //   location.reload(true);
    }, 2000);
    // this.router.navigateByUrl('/home');
  }

  show() {
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
          console.log('aa' + data);


        });
      }
    ));

    //  (document.getElementById("name") as HTMLInputElement).value = (document.getElementById("name_table") as HTMLInputElement).value;
    //  (document.getElementById("time") as HTMLInputElement).value = (document.getElementById("time_table") as HTMLInputElement).value;
    //  (document.getElementById("amount") as HTMLInputElement).value = (document.getElementById("amount_table") as HTMLInputElement).value;
    (document.getElementById('add_btn') as HTMLInputElement).innerHTML = 'update';
    (document.getElementById('h5') as HTMLInputElement).innerHTML = 'Update Sub Campaign';
    // this.isshow = true;
    setTimeout(() => {
      // console.log(item);
      this.update_id = id;
      console.log(this.update_id);
      console.log(data.name);

      (document.getElementById('name') as HTMLInputElement).value = data.name;
      (document.getElementById('time') as HTMLInputElement).value = data.time;
      (document.getElementById('amount') as HTMLInputElement).value = data.amount;

      this.openModule();

    }, 2000);

  }

  openModule() {
    document.getElementById('myModal').style.display = 'block';
  }
  spanClick() {
    document.getElementById('myModal').style.display = 'none';

  }

}

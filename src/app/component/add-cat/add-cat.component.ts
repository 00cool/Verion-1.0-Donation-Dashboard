import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { concat } from 'rxjs/operators/concat';




export interface Campaign { name: string; imageurl: string}

@Component({
  selector: 'app-add-cat',
  templateUrl: './add-cat.component.html',
  styleUrls: ['./add-cat.component.css']
})
export class AddCatComponent implements OnInit {
  update_id: string;
  state = '';
  isshow = false;
  description: string;

  items: Observable<any[]>;
  private itemsCollection: AngularFirestoreCollection<Campaign>;

  constructor(db: AngularFirestore) {

    this.itemsCollection = db.collection<Campaign>('campaign');
    this.items = db.collection('campaign').valueChanges();
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
    const image= (document.getElementById('imageurl') as HTMLInputElement).value
    const items: Campaign = {name: val ,imageurl : null};
    console.log('item' + items.name);
    console.log(this.itemsCollection.add(items));

    setTimeout(() => {

      location.reload(true);
    }, 2000);

  }

  deletecamp() {
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
    ));

    console.log('doc id  ---' + id);

    setTimeout(() => {
      this.itemsCollection.doc(id).delete();
     // this.router.navigate(['/tapandlearn']);
    // location.reload(true);
    }, 2000);
  }

    show() {
      console.log('call....show  ===>' + event.srcElement.id);
      let id;
      let val;
      val = event.srcElement.id;

      let data: Campaign;

      const res = (this.itemsCollection.ref.where('name', '==', val).get().then(
        function a(querySnapshot) {
          querySnapshot.forEach(function (doc) {
            console.log('this' + doc.id);
            id = doc.id;
            console.log(doc.data().name);
            data = { name: doc.data().name , imageurl: doc.data().imageurl};
            console.log('aa' + id);

          });
        }
      ));

      // this.isshow =true;
      setTimeout(() => {
        (document.getElementById('cat_name') as HTMLInputElement).value = data.name;
        // (document.getElementById('image') as HTMLInputElement).value = data.image;
        // (document.getElementById('subtitle') as HTMLInputElement).value = data.subtitle;
        // (document.getElementById('nfc') as HTMLInputElement).value = data.nfc;
        (document.getElementById('add') as HTMLInputElement).innerHTML = 'update';
        (document.getElementById('h5') as HTMLInputElement).innerHTML = 'Update Campaign';
        //  console.log(this.data.image);
        // console.log(item);
        this.update_id = id;
        console.log(this.update_id);
        this.openModule();
      }, 2000);

    }

    update() {
      console.log('hello update');
      const val = (document.getElementById('cat_name') as HTMLInputElement).value;
      const val1 = (document.getElementById('imageurl') as HTMLInputElement).value

      //  const string1 = val.split('.');
        // console.log(item);
        // tslint:disable-next-line:max-line-length
        const item: Campaign = { name: val ,imageurl: val1};
        console.log(this.update_id);
        // console.log((document.getElementById("desc") as HTMLInputElement).value);
        console.log(this.itemsCollection.doc(this.update_id).update(item));
      setTimeout(() => {
// this.isvalid=false;
        location.reload(true);
        // this.router.navigate(['/dashboard/tapandlearn']);
      }, 3000);

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






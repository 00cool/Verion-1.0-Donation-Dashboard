import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Tap_Learn } from '../home/home.component';
import { window } from 'rxjs/operators/window';

export interface Taplearn { desc: any[]; name: string; subtitle: string; tag_name: string; }

@Component({
  selector: 'app-tap-learn',
  templateUrl: './tap-learn.component.html',
  styleUrls: ['./tap-learn.component.css']
})
export class TapLearnComponent implements OnInit {

  items: Observable<any[]>;
  private itemsCollection: AngularFirestoreCollection<Taplearn>;

  name: any;
  update_id: string;
  state = '';
  isshow = false;
  description: string;



  constructor(public af: AngularFireAuth, private router: Router, db: AngularFirestore) {

    this.itemsCollection = db.collection<Taplearn>('tapAndLearn');
    this.items = db.collection('tapAndLearn').valueChanges();

    this.af.authState.subscribe(auth => {
      if (auth) {
        this.name = auth;
      }
    });

  }
  logout() {
    this.af.auth.signOut();
    console.log('logged out');
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {

  }
  filesupload() {
    console.log('1');
    const file1 = (document.getElementById('file') as HTMLInputElement).files[0];
    console.log('2');
    this.uploadImageToFirebase(file1);
  }



  uploadImageToFirebase(file: any) {

    console.log(file.name);
    const storage = firebase.storage().ref().child('tapAndLearn');
    const filename = file.name;
    const fileStorage = storage.child(filename);
    console.log('data==================' + fileStorage.fullPath);
    const pathu = fileStorage.fullPath;
    console.error('Psthhhh=====' + pathu);

    const metadata = {
      contentType: 'image/jpeg',
    };

    const uploadTask = fileStorage.put(file, metadata);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {

      const progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (uploadTask.snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function (error) {
      // Handle unsuccessful uploads
    }, function () {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      const downloadURL = uploadTask.snapshot.downloadURL;
      console.log('downloadddddddddddddddddddd' + downloadURL);
      (document.getElementById('img_god') as HTMLInputElement).value = uploadTask.snapshot.downloadURL;

    });

  }
  addval() {
    console.log('call.... add');
    console.log((document.getElementById('desc') as HTMLInputElement).value);
    console.log((document.getElementById('name') as HTMLInputElement).value);
    console.log((document.getElementById('subtitle') as HTMLInputElement).value);
    console.log((document.getElementById('tag_name') as HTMLInputElement).value);


    const val = (document.getElementById('desc') as HTMLInputElement).value;
    const val1 = (document.getElementById('name') as HTMLInputElement).value;
    const val2 = (document.getElementById('subtitle') as HTMLInputElement).value;
    const val3 = (document.getElementById('tag_name') as HTMLInputElement).value;
    const string1 = val.split('.');

    const item: Taplearn = { desc: string1, name: val1, subtitle: val2, tag_name: val3 };
    console.log('item' + item.desc);
    console.log('item' + item.name);
    console.log('item' + item.subtitle);
    console.log('item' + item.tag_name);

    console.log(this.itemsCollection.add(item));
    setTimeout(() => {

      location.reload(true);
    }, 2000);

    // location.reload(true);
    // this.router.navigate(['/tapandlearn']);

  }

  deleteTapLearn() {
    console.log('call....de  ===>' + event.srcElement.id);
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


    setTimeout(() => {
      console.log('--id---' + id);
      this.itemsCollection.doc(id).delete();
      // this.router.navigate(['/tapandlearn']);
    }, 2000);


  }

  show() {
    console.log('call....show  ===>' + event.srcElement.id);
    let id;
    let val;
    val = event.srcElement.id;

    let data: Taplearn;

    const res = (this.itemsCollection.ref.where('name', '==', val).get().then(
      function a(querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log('this' + doc.id);
          id = doc.id;
          console.log(doc.data().image);

          data = { desc: doc.data().desc, name: doc.data().name, subtitle: doc.data().subtitle, tag_name: doc.data().tag_name };

          console.log('aa' + id);


        });
      }
    ));




    // this.isshow =true;
    setTimeout(() => {

      (document.getElementById('desc') as HTMLInputElement).value = data.desc.toString();
      (document.getElementById('name') as HTMLInputElement).value = data.name;
      (document.getElementById('subtitle') as HTMLInputElement).value = data.subtitle;
      (document.getElementById('tag_name') as HTMLInputElement).value = data.tag_name;
      (document.getElementById('login') as HTMLInputElement).innerHTML = 'update';
      (document.getElementById('h5') as HTMLInputElement).innerHTML = 'Update Tap and learn Content';
      //  console.log(this.data.image);
      // console.log(item);
      this.update_id = id;
      console.log(this.update_id);
      this.openModule();
    }, 2000);


  }

  update() {
    console.log('hello update');
    const val = (document.getElementById('desc') as HTMLInputElement).value;

    const string1 = val.split('.');
    // console.log(item);
    // tslint:disable-next-line:max-line-length
    const item: Taplearn = { desc: string1, name: (document.getElementById('name') as HTMLInputElement).value, subtitle: (document.getElementById('subtitle') as HTMLInputElement).value, tag_name: (document.getElementById('tag_name') as HTMLInputElement).value };
    console.log(this.update_id);
    // console.log((document.getElementById('desc') as HTMLInputElement).value);
    console.log(this.itemsCollection.doc(this.update_id).update(item));
    setTimeout(() => {

      // this.isvalid=false;
      location.reload(true);
      // this.router.navigate(['/dashboard/tapandlearn']);
    }, 3000);

  }

  checkButton() {
    console.log('call button');

    const val = (document.getElementById('login') as HTMLInputElement).innerHTML;
    console.log(val);
    console.log(val.localeCompare('ADD'));
    // tslint:disable-next-line:curly
    if (-1 === val.localeCompare('ADD'))
      this.addval();
    // tslint:disable-next-line:curly
    else
      this.update();
  }

  openModule() {
    document.getElementById('myModal').style.display = 'block';
  }
  spanClick() {
    document.getElementById('myModal').style.display = 'none';

  }

}

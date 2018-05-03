import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { promise } from 'protractor';


export interface SongBook { name: string; meaning: string []; prayer:string[]; songUrl: string; }

@Component({
  selector: 'app-audioupload',
  templateUrl: './audioupload.component.html',
  styleUrls: ['./audioupload.component.css']
})
export class AudiouploadComponent implements OnInit {

  Prayer : any []= [];
  Meaning : any []= [];
  downloadURL : string;
  file1 : any;

  SongBook : Observable<any[]>;
  public songBookCollection: AngularFirestoreCollection<SongBook>; 
  constructor(public db: AngularFirestore, public router: Router) {


    this.songBookCollection = db.collection<SongBook>('song_book_temp');
    this.SongBook = db.collection('song_book_temp').valueChanges();

   }
  ngOnInit() {
  }

  filesupload() {
    console.log('1');
    this.file1 = (document.getElementById('file') as HTMLInputElement).files[0];
    console.log('2');
    // this.uploadImageToFirebase(file1);
  }



  uploadImageToFirebase(file: any) {

    console.log(file.name);

   

    const storage = firebase.storage().ref().child('Bhajan');
    const filename = file.name;
    const fileStorage = storage.child(filename);
    console.log('data==================' + fileStorage.fullPath);
    const pathu = fileStorage.fullPath;
    console.error('Psthhhh=====' + pathu);

    const metadata = {
      contentType: 'audio/*',
      //  xgoogresumable: 'start',
      //   ContentLength: 0
    };

    const uploadTask = fileStorage.put(file, metadata);

   return new Promise((resolve, reject) => { uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {

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
      reject(error);
    },  () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
       this.downloadURL = uploadTask.snapshot.downloadURL;
      console.log('downloadddddddddddddddddddd' + this.downloadURL);
      (document.getElementById('img_god') as HTMLInputElement).value = uploadTask.snapshot.downloadURL;
      resolve(this.downloadURL);

    })});

  }

  showPrayer(){
   (document.getElementById('prayerlist') as HTMLInputElement).style.display = 'block';
   (document.getElementById('meanlist') as HTMLInputElement).style.display = 'none';
  }
  showMeaning(){
    (document.getElementById('meanlist') as HTMLInputElement).style.display = 'block';
    (document.getElementById('prayerlist') as HTMLInputElement).style.display = 'none';
   }
   addMean(){
     if((document.getElementById('mean') as HTMLInputElement).value === "")
     {
       alert("meaning value required !!!");
       return;
     }

     this.Meaning.push((document.getElementById('mean')as HTMLInputElement).value)
   }
   addPrayer(){
    if((document.getElementById('prayer') as HTMLInputElement).value === "")
    {
      alert("prayer value value required !!!");
      return;
    }

    this.Prayer.push((document.getElementById('prayer')as HTMLInputElement).value)
  }

  checkButton() {
    console.log('call button');

    const val = (document.getElementById('addDB') as HTMLInputElement).innerHTML;
    console.log(val);
    console.log(val.localeCompare('ADD'));
    // tslint:disable-next-line:curly
    if (0 === val.localeCompare('ADD'))
     this.addAudio();
    // tslint:disable-next-line:curly
    else{}

    //  this.update();
  }

  addAudio(){
    console.log('addAudio');

    var name = (document.getElementById('prayer')as HTMLInputElement).value
     this.uploadImageToFirebase(this.file1).then((res)=>{
      
      const data : SongBook = {name : name ,  meaning : this.Meaning , prayer : this.Prayer , songUrl : this.downloadURL }
      console.log(data);
        console.log(this.songBookCollection.add(data));
     });

   
    
   

  }
 
}

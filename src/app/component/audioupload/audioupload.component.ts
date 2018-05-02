import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-audioupload',
  templateUrl: './audioupload.component.html',
  styleUrls: ['./audioupload.component.css']
})
export class AudiouploadComponent implements OnInit {

  Prayer : any []= ['hrsd','abcd','xyz']
  Meaning : any []= ['mean1','mean2','mean3']

  constructor() { }

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

  showPrayer(){
   (document.getElementById('prayerlist') as HTMLInputElement).style.display = 'block';
   (document.getElementById('meanlist') as HTMLInputElement).style.display = 'none';
  }
  showMeaning(){
    (document.getElementById('meanlist') as HTMLInputElement).style.display = 'block';
    (document.getElementById('prayerlist') as HTMLInputElement).style.display = 'none';
   }
   addMean(){
     this.Meaning.push((document.getElementById('mean')as HTMLInputElement).value)
   }
   addPrayer(){
    this.Prayer.push((document.getElementById('prayer')as HTMLInputElement).value)
  }
 
}

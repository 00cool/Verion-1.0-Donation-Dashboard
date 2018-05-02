import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';



export interface SongBook { name: string; meaning: string []; prayer:string[]; songUrl: string; }

@Component({
  selector: 'app-audio-manage',
  templateUrl: './audio-manage.component.html',
  styleUrls: ['./audio-manage.component.css']
})
export class AudioManageComponent implements OnInit {

  SongBook : Observable<any[]>;
  public songBookCollection: AngularFirestoreCollection<SongBook>; 
  constructor(public db: AngularFirestore, public router: Router) {


    this.songBookCollection = db.collection<SongBook>('song_book_temp');
    this.SongBook = db.collection('song_book_temp').valueChanges();

   }

  ngOnInit() {
  }

}

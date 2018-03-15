import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

export interface Event { name: string; }
// tslint:disable-next-line:class-name
export interface Tap_Learn { desc: string; name: string; }
export interface Campaign { imageurl: string; name: string; }


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events: Observable<any[]>;
  public eventsCollection: AngularFirestoreCollection<Event>;
  tap_learn: Observable<any[]>;
  public tap_learnCollection: AngularFirestoreCollection<Tap_Learn>;
  campaign: Observable<any[]>;
  public campaignCollection: AngularFirestoreCollection<Tap_Learn>;

  constructor(public db: AngularFirestore, public af: AngularFireAuth, public router: Router) {
    this.eventsCollection = db.collection<Event>('events&festival');
    this.events = db.collection('events&festival').valueChanges();
    this.tap_learnCollection = db.collection<Tap_Learn>('tapAndLearn');
    this.tap_learn = db.collection('tapAndLearn').valueChanges();
    this.campaignCollection = db.collection<Tap_Learn>('campaign');
    this.campaign = db.collection('campaign').valueChanges();

  }


  ngOnInit() {
    const it = this.events.first();
    console.log(it);

    this.router.navigate(['/dashboard', { outlets: { 'sidebar': ['donationpercamp'] } }]);


  }

  logout() {
    this.af.auth.signOut();
    console.log('logged out');
    this.router.navigateByUrl('/');
  }



}

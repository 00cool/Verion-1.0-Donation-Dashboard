import { Component, OnInit, ElementRef } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthGuard } from './../../auth.service';
import { auth } from 'firebase/app';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit {

  isLoggedIn$ = false;


  constructor(public af: AngularFireAuth, public router: Router, public ag: AuthGuard) {

    af.authState.subscribe(auth1 => {
      if (auth1) {
        this.isLoggedIn$ = true;
      } else {
        this.isLoggedIn$ = false;
      }
    });

  }

  ngOnInit() {

  }


  logout() {
    this.af.auth.signOut();
    console.log('logged out');
    this.router.navigateByUrl('/');




  }

}

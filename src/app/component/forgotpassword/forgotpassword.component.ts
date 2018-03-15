import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
// import { async } from '@angular/core/testing';
import * as firebase from 'firebase';
// import {firebaseConfig} from './../../environments/firebase.config';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(public af: AngularFireAuth, public router: Router) { }

  ngOnInit() {
  }



  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      // tslint:disable-next-line:prefer-const
      let auth = firebase.auth();
      // tslint:disable-next-line:prefer-const
      let emailAddress = (document.getElementById('email') as HTMLInputElement).value;
      console.log(emailAddress);
      auth.sendPasswordResetEmail(emailAddress).then(() => {

        // Email sent.
        console.log('Email sent');
        this.router.navigate(['/login/:desg']);
      }).catch(function (error) {
        console.log('Error Occured');
        this.router.navigateByUrl('/register');
        // An error happened.
      });
    }
  }
}

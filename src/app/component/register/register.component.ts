import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import {firebaseConfig} from './../../environments/firebase.config';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  state = '';
  error: any;
  constructor(public af: AngularFireAuth, private router: Router) {

  }


  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      console.log(formData.value.email);
      const username = formData.value.username;
      console.log(formData.value.username);
      this.af.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password).then(
        (user) => {
          console.log(user.uid);
          firebase.firestore().collection('user_temp').doc(user.uid).set({
            email: user.email,
            photoURL: null,
            fcmToken: null,
            name: username,
            id: user.uid
            //  name:formData.value.username
          });
          // tslint:disable-next-line:prefer-const
          var user: any = firebase.auth().currentUser;

          user.sendEmailVerification().then(function (req, res) {
            console.log('Email sent');
            // res.redirect(['/login']);
            // this.router.navigate(['/tap-learn'])
            // Email sent.
          }).catch(function (error) {
            console.log('Error Occured');
            // this.router.navigate(['/register'])
            // An error happened.
          });
          this.router.navigate(['/login/president']);
        }).catch(
          (err) => {
            console.log(err);
            this.error = err;
          });
    }
  }

  ngOnInit() {
  }

}

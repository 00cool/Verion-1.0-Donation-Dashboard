import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthGuard } from './../../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  desg: string;

  constructor(public af: AngularFireAuth, private _Activatedroute: ActivatedRoute, private router: Router, public ag: AuthGuard) { }

  ngOnInit() {
    this.desg = this._Activatedroute.snapshot.params['desg'];
    console.log(this._Activatedroute.snapshot.params['desg']);
  }

  onSubmit(formData) {
    console.log('hello');
    if (formData.valid) {
      console.log(formData.value);
      this.af.auth.signInWithEmailAndPassword(formData.value.email, formData.value.pass).then(
        (success) => {
          console.log(success);


          this.router.navigateByUrl('/home');
        }).catch(
          (error) => {
            alert(ErroAuthEn.convertMessage(error['code']));
            console.log(error);

            // this.error = err;
          });
    }
  }

}
export namespace ErroAuthEn {
  export function convertMessage(code: string): string {
    console.log('called');
    switch (code) {
      case 'auth/user-disabled': {
        return 'Sorry your user is disabled.';
      }
      case 'auth/user-not-found': {
        return 'There is no user record corresponding to this identifier. The user may have been deleted.';
      }

      case 'auth/wrong-password': {
        return 'The password is invalid or the user does not have a password.';
      }
      case 'auth/invalid-email': {
        return 'The email address is badly formatted';
      }

      default: {
        return 'Login error try again later.';
      }
    }
  }

}


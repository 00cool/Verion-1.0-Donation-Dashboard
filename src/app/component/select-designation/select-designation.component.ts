import { Component, OnInit, HostBinding} from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-select-designation',
  templateUrl: './select-designation.component.html',
  styleUrls: ['./select-designation.component.css']
})
export class SelectDesignationComponent implements OnInit {

  desg:string;
  constructor(public af: AngularFireAuth,private _Activatedroute:ActivatedRoute,private router: Router) {
    this.af.authState.subscribe(auth => { 
      if(auth) {
        this.router.navigateByUrl('/home');
      }
    });
   }

  ngOnInit() {
    console.log(this._Activatedroute.snapshot.params['temple']);
    this.desg = this._Activatedroute.snapshot.params['temple'];

  }

}

import { Component, OnInit, ElementRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(window:click)': 'onClick($event)',
  }
})
export class DashboardComponent implements OnInit {

  constructor(private eref: ElementRef) { }

  ngOnInit() {

  }
  myFunction() {
    document.getElementById('myDropdown1').classList.toggle('show');
    document.getElementById('myDropdown2').classList.remove('show');
  }

  myFunction2() {

    document.getElementById('myDropdown2').classList.toggle('show');
    document.getElementById('myDropdown1').classList.remove('show');
  }


  onClick(event) {

    if (!event.target.matches('.dropbtn1')) {

      const dropdowns = document.getElementsByClassName('dropdown-content1');
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }

  }




}

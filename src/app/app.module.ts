import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { AddCatComponent } from './component/add-cat/add-cat.component';
import { AddSubCampComponent } from './component/add-sub-camp/add-sub-camp.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {firebaseConfig} from '../environments/firebase.config';
import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';

import { CountryComponent } from './component/country/country.component';
import { TempleComponent } from './component/temple/temple.component';
import { SelectTempleComponent } from './component/select-temple/select-temple.component';
import { SelectDesignationComponent } from './component/select-designation/select-designation.component';
import { LoginComponent } from './component/login/login.component';
import {APP_BASE_HREF} from '@angular/common';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { RegisterComponent } from './component/register/register.component';
import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import {AuthGuard} from './auth.service';
import { FormsModule } from '@angular/forms';

import { TapLearnComponent } from './component/tap-learn/tap-learn.component';

import { HeatmapComponent } from './component/heatmap/heatmap.component';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/angular2-leaflet-draw';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster/dist/leaflet-markercluster/leaflet-markercluster.module';
import { CampaignComponent } from './component/campaign/campaign.component';
import { DonationpercampComponent } from './component/donationpercamp/donationpercamp.component';
import { TimeSeriesComponent } from './component/time-series/time-series.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewcampaignComponent } from './component/newcampaign/newcampaign.component';
import { NewsubcampComponent } from './component/newsubcamp/newsubcamp.component';
import { SponsorshipComponent } from './component/sponsorship/sponsorship.component';
import { SubsponsorshipComponent } from './component/subsponsorship/subsponsorship.component';
import { BeaconComponent } from './component/beacon/beacon.component';




declare var require: any;


export function highchartsFactory() {
      const hc = require('highcharts/highstock');
      const dd = require('highcharts/modules/exporting');;
      dd(hc);
      return hc;
}
const appRoutes: Routes =  [
  {path: '', component: SelectDesignationComponent},
  {path: 'login/:desg', component: LoginComponent},
  {path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
  {path: 'forgotpassword', component: ForgotpasswordComponent},
  {path: 'register', component: RegisterComponent},
  
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
   children: [
    {path: 'selecttemple', component: SelectTempleComponent , outlet: 'sidebar'},
    {path: 'tapandlearn', component: TapLearnComponent, canActivate: [AuthGuard] , outlet: 'sidebar'},
    {path: 'heatmap', component: HeatmapComponent, canActivate: [AuthGuard], outlet: 'sidebar'},
    {path: 'campaign', component: CampaignComponent , canActivate: [AuthGuard], outlet: 'sidebar'},
    {path: 'timeseries', component: TimeSeriesComponent , canActivate: [AuthGuard], outlet: 'sidebar'},
    {path: 'donationpercamp', component: DonationpercampComponent , canActivate: [AuthGuard], outlet: 'sidebar'},
    {path: 'camp', component: AddCatComponent ,canActivate :[AuthGuard] , outlet:'sidebar'},
    {path:'newcamp', component:NewcampaignComponent,canActivate:[AuthGuard], outlet:'sidebar'},
    {path:'newsubcamp', component : NewsubcampComponent,canActivate: [AuthGuard] ,outlet : 'sidebar'},
    {path:'sponsorship',component : SponsorshipComponent,canActivate:[AuthGuard],outlet: 'sidebar'},
    {path : 'subsponsorship' , component : SubsponsorshipComponent,canActivate:[AuthGuard] , outlet: 'sidebar'},
    {path : 'beacon' , component : BeaconComponent,canActivate:[AuthGuard] , outlet: 'sidebar'}

   ]

},


]


@NgModule({
  declarations: [
    AppComponent,
    AddCatComponent,
    AddSubCampComponent,
    CountryComponent,
    TempleComponent,
    SelectTempleComponent,
    SelectDesignationComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    TapLearnComponent,

    HeatmapComponent,
    CampaignComponent,

    DonationpercampComponent,

    TimeSeriesComponent,

    DashboardComponent,

    NewcampaignComponent,

    NewsubcampComponent,

    SponsorshipComponent,

    SubsponsorshipComponent,

    BeaconComponent,




  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ChartModule,
    LeafletModule.forRoot(),
    LeafletDrawModule.forRoot(),
    LeafletMarkerClusterModule.forRoot(),
    MatSidenavModule,
    MatToolbarModule,
    BrowserAnimationsModule,

  ],
  providers: [
    {
       provide: HighchartsStatic,
      useFactory: highchartsFactory
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

  }


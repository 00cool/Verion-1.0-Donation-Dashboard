import { Routes } from "@angular/router/src/config";
import { ModuleWithProviders } from "@angular/compiler/src/core";
import { RouterModule } from "@angular/router/src/router_module";
import { SelectTempleComponent } from "./component/select-temple/select-temple.component";
import { SelectDesignationComponent } from "./component/select-designation/select-designation.component";
import { LoginComponent } from "./component/login/login.component";
import { HomeComponent } from "./component/home/home.component";
import { CountryComponent } from "./component/country/country.component";






export const router: Routes =[
    {path:'', component: SelectTempleComponent},
    {path:'country', component: CountryComponent},
    {path:'select_designation/:countrytemple', component: SelectDesignationComponent},
    {path:'login/:desg', component: LoginComponent},
    {path:'home', component: HomeComponent},
    
]

export const routes : ModuleWithProviders= RouterModule.forRoot(router);
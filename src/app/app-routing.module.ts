import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ChartComponent } from './cmps/chart/chart.component';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { ContactEditPageComponent } from './pages/contact-edit-page/contact-edit-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { ContactResolverService } from './services/contact-resolver.service';





const routes: Routes = [
  { path: 'contact/:id',resolve:{contact:ContactResolverService},  component: ContactDetailsPageComponent },
  { path: 'contacts',  component: ContactPageComponent },
  { path: 'edit/:id' , component:ContactEditPageComponent , resolve:{contact:ContactResolverService} },
  { path: 'edit' , component:ContactEditPageComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { VerifyFormComponent } from './verify-form/verify-form.component';
// import { PreRegistrationFormComponent } from './pre-registration-form/pre-registration-form.component';
// import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { HorariosComponent } from './horarios/horarios.component';

// const routes: Routes = [
//   {path: 'verify', component: VerifyFormComponent},
//   {path: 'pre-registration', component: PreRegistrationFormComponent},
//   {path: 'registration', component: RegistrationFormComponent},
//   {path: '', redirectTo: 'verify', pathMatch: 'full'}
// ];

const routes: Routes = [
  // {path: 'verify', component: VerifyFormComponent},
  // {path: 'pre-registration', component: PreRegistrationFormComponent},
  // {path: 'registration', component: RegistrationFormComponent},
  {path: 'horarios', component: HorariosComponent},
  {path: '', redirectTo: 'horarios', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

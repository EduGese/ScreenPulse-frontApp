import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './page/auth-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthPageComponent,
    data: { formType: 'login' }
  },
  {
    path: 'register',
    component: AuthPageComponent,
    data: { formType: 'register' }
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
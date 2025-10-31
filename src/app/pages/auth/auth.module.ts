import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthPageComponent } from './page/auth-page.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';





@NgModule({
  declarations: [
    AuthPageComponent,
    AuthFormComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
        
  ]
})
export class AuthModule { }

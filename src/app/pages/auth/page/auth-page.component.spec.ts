import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPageComponent } from './auth-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthFormComponent } from '../components/auth-form/auth-form.component';

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
       imports:[HttpClientModule,  
        ToastrModule.forRoot(), 
        SharedModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule 
        ],
      declarations: [AuthPageComponent, AuthFormComponent],
       providers:[
        { provide: ActivatedRoute, useValue: {data: of({ formType: 'login' }) } } 
      ]
    });
    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   it('should set formType to "login" from route data', () => {
    expect(component.formType).toBe('login');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRegistrationFormComponent } from './pre-registration-form.component';

describe('PreRegistrationFormComponent', () => {
  let component: PreRegistrationFormComponent;
  let fixture: ComponentFixture<PreRegistrationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreRegistrationFormComponent]
    });
    fixture = TestBed.createComponent(PreRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

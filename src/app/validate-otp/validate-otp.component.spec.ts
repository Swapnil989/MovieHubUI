import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateOTPComponent } from './validate-otp.component';

describe('ValidateOTPComponent', () => {
  let component: ValidateOTPComponent;
  let fixture: ComponentFixture<ValidateOTPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidateOTPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

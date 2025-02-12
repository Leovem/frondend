import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdoctorComponent } from './viewdoctor.component';

describe('ViewdoctorComponent', () => {
  let component: ViewdoctorComponent;
  let fixture: ComponentFixture<ViewdoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewdoctorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewdoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

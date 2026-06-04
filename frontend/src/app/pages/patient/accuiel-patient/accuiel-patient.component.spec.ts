import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccuielPatientComponent } from './accuiel-patient.component';

describe('AccuielPatientComponent', () => {
  let component: AccuielPatientComponent;
  let fixture: ComponentFixture<AccuielPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccuielPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccuielPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

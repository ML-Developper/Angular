import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavPatientComponent } from './nav-patient.component';

describe('NavPatientComponent', () => {
  let component: NavPatientComponent;
  let fixture: ComponentFixture<NavPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

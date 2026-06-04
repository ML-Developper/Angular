import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilMedecinComponent } from './accueil-medecin.component';

describe('AccueilMedecinComponent', () => {
  let component: AccueilMedecinComponent;
  let fixture: ComponentFixture<AccueilMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilMedecinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccueilMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

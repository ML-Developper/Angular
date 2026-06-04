import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireMedecinComponent } from './formulaire-medecin.component';

describe('FormulaireMedecinComponent', () => {
  let component: FormulaireMedecinComponent;
  let fixture: ComponentFixture<FormulaireMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireMedecinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormulaireMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

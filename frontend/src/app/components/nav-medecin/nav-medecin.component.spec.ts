import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMedecinComponent } from './nav-medecin.component';

describe('NavMedecinComponent', () => {
  let component: NavMedecinComponent;
  let fixture: ComponentFixture<NavMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavMedecinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

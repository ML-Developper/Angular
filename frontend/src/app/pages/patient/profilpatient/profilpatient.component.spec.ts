import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilpatientComponent } from './profilpatient.component';

describe('ProfilpatientComponent', () => {
  let component: ProfilpatientComponent;
  let fixture: ComponentFixture<ProfilpatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilpatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

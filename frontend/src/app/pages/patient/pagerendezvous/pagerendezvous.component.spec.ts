import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagerendezvousComponent } from './pagerendezvous.component';

describe('PagerendezvousComponent', () => {
  let component: PagerendezvousComponent;
  let fixture: ComponentFixture<PagerendezvousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagerendezvousComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagerendezvousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

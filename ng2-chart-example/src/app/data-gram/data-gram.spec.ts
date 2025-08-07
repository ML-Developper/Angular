import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGram } from './data-gram';

describe('DataGram', () => {
  let component: DataGram;
  let fixture: ComponentFixture<DataGram>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataGram]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataGram);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

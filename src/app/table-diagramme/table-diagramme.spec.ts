import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDiagramme } from './table-diagramme';

describe('TableDiagramme', () => {
  let component: TableDiagramme;
  let fixture: ComponentFixture<TableDiagramme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableDiagramme]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDiagramme);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

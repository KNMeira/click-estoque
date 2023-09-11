import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEstoqueComponent } from './lista-estoque.component';

describe('ListaEstoqueComponent', () => {
  let component: ListaEstoqueComponent;
  let fixture: ComponentFixture<ListaEstoqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaEstoqueComponent]
    });
    fixture = TestBed.createComponent(ListaEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

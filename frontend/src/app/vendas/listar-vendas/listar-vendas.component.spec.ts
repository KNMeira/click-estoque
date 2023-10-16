import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVendasComponent } from './listar-vendas.component';

describe('ListarVendasComponent', () => {
  let component: ListarVendasComponent;
  let fixture: ComponentFixture<ListarVendasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarVendasComponent]
    });
    fixture = TestBed.createComponent(ListarVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

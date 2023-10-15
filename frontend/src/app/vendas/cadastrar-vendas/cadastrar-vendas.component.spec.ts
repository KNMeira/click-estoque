import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarVendasComponent } from './cadastrar-vendas.component';

describe('CadastroVendasComponent', () => {
  let component: CadastrarVendasComponent;
  let fixture: ComponentFixture<CadastrarVendasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrarVendasComponent]
    });
    fixture = TestBed.createComponent(CadastrarVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

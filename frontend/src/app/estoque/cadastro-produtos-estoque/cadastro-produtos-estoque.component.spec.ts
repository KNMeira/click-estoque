import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroProdutosEstoqueComponent } from './cadastro-produtos-estoque.component';

describe('CadastroProdutosEstoqueComponent', () => {
  let component: CadastroProdutosEstoqueComponent;
  let fixture: ComponentFixture<CadastroProdutosEstoqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroProdutosEstoqueComponent]
    });
    fixture = TestBed.createComponent(CadastroProdutosEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

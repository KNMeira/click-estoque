import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarFornecedoresComponent } from './cadastrar-fornecedores.component';

describe('CadastrarFornecedoresComponent', () => {
  let component: CadastrarFornecedoresComponent;
  let fixture: ComponentFixture<CadastrarFornecedoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrarFornecedoresComponent]
    });
    fixture = TestBed.createComponent(CadastrarFornecedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarEntradasComponent } from './registrar-entradas.component';

describe('RegistarEntradasComponent', () => {
  let component: RegistrarEntradasComponent;
  let fixture: ComponentFixture<RegistrarEntradasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarEntradasComponent]
    });
    fixture = TestBed.createComponent(RegistrarEntradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

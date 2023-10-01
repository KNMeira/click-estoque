import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarSaidasComponent } from './registrar-saidas.component';

describe('RegistrarSaidasComponent', () => {
  let component: RegistrarSaidasComponent;
  let fixture: ComponentFixture<RegistrarSaidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarSaidasComponent]
    });
    fixture = TestBed.createComponent(RegistrarSaidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

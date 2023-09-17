import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FornecedoresService } from '../fornecedores.service';

@Component({
  selector: 'app-cadastrar-fornecedores',
  templateUrl: './cadastrar-fornecedores.component.html',
  styleUrls: ['./cadastrar-fornecedores.component.scss']
})
export class CadastrarFornecedoresComponent {

  public formFornecedores: FormGroup = new FormGroup({
    fornecedor: new FormControl('', Validators.required),
    cnpj: new FormControl('', Validators.required),
    endereco: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    celular: new FormControl('', [Validators.required, Validators.maxLength(16)]),
  })

  constructor(private fornecedoresService: FornecedoresService) { }

  public cadastrar() {
    this.fornecedoresService.saveFornecedor(this.formFornecedores.value).subscribe((data) => {
      alert(data.msg);
    }
    );
  }

  public cancelar() {
    this.formFornecedores.reset();
  }

  public phoneValidation() {
    console.log(this.formFornecedores.get('celular')?.value, this.formFornecedores.get('celular')?.value.length);
    if (this.formFornecedores.get('celular')?.value.length >= 1 && this.formFornecedores.get('celular')?.value.length < 14) return 'is-invalid'
    if (this.formFornecedores.get('celular')?.value.length >= 14 && this.formFornecedores.controls['celular'].touched) return 'is-valid'
    
    return
  }

}

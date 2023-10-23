import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EstoqueService } from '../estoque.service';

@Component({
  selector: 'app-registrar-saidas',
  templateUrl: './registrar-saidas.component.html',
  styleUrls: ['./registrar-saidas.component.scss']
})
export class RegistrarSaidasComponent {
  public pecas: any = [];
  public arrayFormSaidas: any = [];
  public isPecasLoaded: boolean = false;
  public isLoadingRegistro: boolean = false;

  public formRegistrarSaidas: FormGroup = new FormGroup({});

  constructor(private estoqueService: EstoqueService) { }

  ngOnInit(): void {
    
    this.estoqueService.getEstoque().subscribe((prods) => {
      prods.forEach((peca:any) => {
        this.formRegistrarSaidas.addControl(peca.id_peca, new FormControl(0))
      });
      
      this.pecas = prods
      this.isPecasLoaded = true;
    })
  }

  public registrarSaidas(){    
    if(this.isQntAttNegativa()) {
      alert('Não é possível registrar saída de quantidade maior do que a quantidade em estoque. Verifique as quantidades e tente novamente')
      return;
    }

    this.isLoadingRegistro = true;
    const data = this.formRegistrarSaidas.value;
    this.estoqueService.registrarSaidas(data).subscribe((res) => {
      this.isLoadingRegistro = false;
      alert(res.msg)
      
    })    
  }  

  public isQntAttNegativa(): boolean{
    let qntAttArray: any = [];
    Object.entries(this.formRegistrarSaidas.value).forEach((p:any) => {
      const peca = this.pecas.find((e:any) => { return e.id_peca == p[0]})
      const pecaQnt = peca.quantidade
      const qntAtt = pecaQnt - p[1]
      qntAttArray.push(qntAtt);
    });
    
    let isQntAttNegativaVar: boolean = false;
    qntAttArray.some((qnt:any) => {
      
      if( qnt < 0) {
        isQntAttNegativaVar = true;
        return true;
      } else {
        return false;
      }      
    })
    
    return isQntAttNegativaVar;
  }
}

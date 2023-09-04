import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  public formLogin: FormGroup = new FormGroup({
    usuario: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
  })

  public canAccess = false;
  
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.canAccess = sessionStorage.getItem('canAccess') === 'true';
  }
  public login() {
    this.loginService.login(this.formLogin.value).subscribe((login) => {
      sessionStorage.setItem('canAccess', login.canAccess.toString())
      this.canAccess = login.canAccess;

      if (this.canAccess) {
        this.router.navigate(['/home'])
      } else {
        alert('Usuário e/ou Senha incorretos')
      }
    });

  }

}

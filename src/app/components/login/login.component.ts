import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/model/credenciais';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email)
  senha = new FormControl(null, Validators.minLength(3))

  constructor(private toast: ToastrService,
    private service: AuthService,
    private router: Router) { }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid
  }

  logar() {

    this.service.authenticate(this.creds).subscribe({
      next: response => {
        this.service.successfulLogin(response.headers.get('Authorization').substring(7))
        this.router.navigate([''])
      },
      error: () =>
        this.toast.error('Usuário e/ou senha inválido')
    })

  }

}

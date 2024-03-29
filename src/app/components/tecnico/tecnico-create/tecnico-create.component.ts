import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/model/Tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';


@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent {

  constructor(private service: TecnicoService, private toast: ToastrService, private router: Router) {

  }

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    perfis: [],
    dataCriacao: '',
    email: '',
    senha: ''
  }

  email = new FormControl(null, [Validators.email, Validators.required])
  nome = new FormControl(null, [Validators.minLength(3), Validators.required])
  password = new FormControl(null, [Validators.minLength(6), Validators.required])
  cpf = new FormControl(null, [Validators.maxLength(14), Validators.pattern(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/), Validators.min(14), Validators.required])

  validaCampos(): boolean {
    return this.email.valid && this.cpf.valid && this.password.valid && this.cpf.valid
  }

  addPerfil(perfil: any): void {

    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1)
    } else {
      this.tecnico.perfis.push(perfil);
    }

  }

  create(): void {
    this.service.create(this.tecnico).subscribe({
      next: reposta => {
        this.toast.success('Técnico cadastrado com sucesso')
        this.router.navigate(['tecnicos'])
      }

      ,
      error: err => {
        if (err.error.erros) {
          err.error.erros.forEach(element => {
            this.toast.error(element.message)
          });
        } else {
          this.toast.error(err.error.message)
        }
      }
    })
  }
}

export class CheckboxConfigurableExample {
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
}
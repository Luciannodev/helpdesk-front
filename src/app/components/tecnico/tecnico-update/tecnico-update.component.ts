import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Tecnico } from 'src/app/model/Tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent {

  constructor(private service: TecnicoService, private toast: ToastrService, private router: Router, private route: ActivatedRoute) {

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


  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id')
    this.findByid()

  }

  findByid(): void {
    this.service.findById(this.tecnico.id).subscribe(
      response => {
        response.perfis = []
        this.tecnico = response
      }
    )
  }


  validaCampos(): boolean {
    return this.email.valid && this.cpf.valid && this.password.valid && this.cpf.valid && this.tecnico.perfis.length>0
  }

  addPerfil(perfil: any): void {
    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1)
    } else {
      this.tecnico.perfis.push(perfil);
    }

  }

  update(): void {
    this.service.update(this.tecnico).subscribe({
      next: () => {
        this.toast.success('Técnico cadastrado com sucesso', 'Update')
        this.router.navigate(['tecnicos'])
      }

      ,
      error: err => {
        console.log(err)
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




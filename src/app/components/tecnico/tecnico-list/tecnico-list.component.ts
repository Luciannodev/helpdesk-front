import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/model/Tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent {
  constructor(private service: TecnicoService, private toast: ToastrService, private router: Router) {

  }

  ELEMENT_DATA: Tecnico[] = [
  ]

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit(): void {
    this.findAll()

  }

  delete(id: number) {
    if (confirm("deseja deletar esse tecnico?")) {
      this.service.delete(id).subscribe({
        next: respota => {
          this.toast.success('Técnico deletado com sucesso', 'Update')
          this.ngOnInit()
        },
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

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA)
      this.dataSource.paginator = this.paginator;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}




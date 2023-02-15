import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Diccionario } from './diccionario';
import { DiccionarioService } from './diccionario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public diccionariox: Diccionario= new Diccionario();
  public titulo:string ="Crear Registro";

  public errores: string[]= [];

  constructor(private diccionarioservicio: DiccionarioService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarTecnico();
  }

  cargarTecnico(): void{
    this.activatedRoute.params.subscribe(params => {
      let id=params['id'];
      if (id){
        this.titulo="Editar Datos"
        this.diccionarioservicio.getDiccionario(id).subscribe(
          tecnico => {
            this.diccionariox= tecnico;
            console.log(this.diccionariox);
          }
        )
      }
    })

  }

  public create(): void{
        this.diccionarioservicio.create(this.diccionariox).subscribe(
          json => {
            this.router.navigate(['/diccionario']);
            Swal.fire('Nuevos Datos', `${json.mensaje}: ${json.tecnico.nombre}`,'success')
          },
          err =>{
            this.errores=err.error.errors as string[];
            console.error("Codigo del error desde el backend: "+ err.status);
            console.error(this.errores)
          }
        );
  }

  public update(): void{
    this.diccionarioservicio.update(this.diccionariox).subscribe(
         tecnico => {
            this.router.navigate(['/diccionario']);
            Swal.fire('Datos Actualizados', 'Datos '+this.diccionariox.control+' actualizado con Exito','success');
         },
         err =>{
           this.errores=err.error.errors as string[];
           console.error("Codigo del error desde el backend: "+ err.status);
           console.error(this.errores)
         }
    );
  }
}

import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { Diccionario } from "./diccionario";
import { DiccionarioService } from "./diccionario.service";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-diccionario',
  templateUrl: './diccionario.component.html',
  styleUrls: ['./diccionario.component.css']
})
export class DiccionarioComponent implements OnInit{
  diccionarios: Diccionario[]=[];
  paginador:any;
  busqueda:any="";
  modulo:any="";
  busqueda2:any="";
  modulo2:any="";
  modulos=["","Módulo de Servicios","Módulo de Análisis","Consulta","Módulo de Inventario","Módulo de Adquisiciones"];

  constructor( private diccionarioservice: DiccionarioService,
    private activatecroute: ActivatedRoute ){}

  ngOnInit(){

     this.activatecroute.paramMap.subscribe(params => {
      let page:any= params.get('page');
      let busquedax= params.get('busqueda');
      let modulox= params.get('modulo');
      if(!page){
        page=0;
      }
      if(!busquedax){
        busquedax="";
      }
      if(!modulox){
        modulox="";
      }
      console.log(page);
     this.diccionarioservice.getDiccionarios(page, busquedax ,modulox).subscribe(
      response => {
               this.busqueda=busquedax;
               this.modulo=modulox;
               this.busqueda2=busquedax;
               this.modulo2=modulox;

               this.diccionarios= response.content as Diccionario[]
               this.paginador=response;
               console.log(response);
      }
     );
    })
  }

  delete(tecnico: Diccionario):void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: `¿Seguro que desea eliminar al tecnico ${tecnico.control}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, ¡Eliminar!',
      cancelButtonText: '¡No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.diccionarioservice.delete(tecnico.idDic).subscribe(
          response=> {
            this.diccionarios= this.diccionarios.filter(tec => tec!==tecnico)
            swalWithBootstrapButtons.fire(
              '¡Tecnico borrado!',
              'El Tecnico ha sido borrado con exito.',
              'success'
            )
          }
        )
      }else {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'los datos estan seguros',
          'info'
        )
      }
    })

  }

  mostar_lista(){
    let bus=this.busqueda2;
    let pag=0;
    this.diccionarioservice.getDiccionarios(pag,bus,this.modulo2).subscribe(
      response => {
               this.diccionarios= response.content as Diccionario[]
               this.paginador=response;
               this.modulo=this.modulo2;
               this.busqueda=this.busqueda2
               console.log(response);
      }
     );
  }
}

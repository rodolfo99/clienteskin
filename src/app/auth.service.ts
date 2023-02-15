import { Injectable } from '@angular/core';

import { Usuario } from './diccionario/Usuario';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlEndPoint: string = 'http://148.213.21.76:8001/api/';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  login(usuario:string, password:string):void{

    let usr=new Usuario();
    usr.nombre=usuario;
    usr.password=password;
    this.login2(usr);

  }

  guardarUsuario(usuario:string):void{
    sessionStorage.setItem("usuario",usuario);
  }

  ObtenerUsuario():string | null{
        return sessionStorage.getItem("usuario");
  }

  Elusuariio(): string | null{
     return this.ObtenerUsuario();
  }

  estaAutentificado():boolean{
       if(this.ObtenerUsuario()!=null)
          return true;
       return false;
  }

  cerrarSesion():void{
       sessionStorage.clear();
  }

  login2(usr: Usuario): void {
    //console.log(diccionariox);
     this.http
      .post<Usuario>(
        this.urlEndPoint + 'login',
        usr,
        { headers: this.httpHeaders }
      )
      .pipe(
        catchError((e) => {
          Swal.fire("Login incorrecto", "usuario o password incorrecto", 'error');
          return throwError(() => new Error('test'));
        })
      ).subscribe( usr => {
          this.router.navigate(['/diccionario']);
          this.guardarUsuario(usr.nombre);
          Swal.fire("Login Correcto", "Bienvenido "+usr.nombre, 'success');
     });
  }
}

import { Injectable } from '@angular/core';
import { Diccionario } from './diccionario';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class DiccionarioService {
  private urlEndPoint: string = 'http://148.213.21.76:8001/api/';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getDiccionarios(page: number, bus: string, mod: string): Observable<any> {
    //return of(diccionarios);
    if (bus != '' && mod != '') {
      return this.http
        .get(
          this.urlEndPoint + 'diccionario/page/' + page + '/' + bus + '/' + mod
        )
        .pipe(
          map((response: any) => {
            let dics = response;
            return dics;
          })
        );
    } else if (bus != '' && mod == '') {
      return this.http
        .get(
          this.urlEndPoint +
            'diccionario/page/' +
            page +
            '/mostrarconsulta/' +
            bus
        )
        .pipe(
          map((response: any) => {
            let dics = response;
            return dics;
          })
        );
    } else if (bus == '' && mod != '') {
      return this.http
        .get(
          this.urlEndPoint +
            'diccionario/page/' +
            page +
            '/mostrarmodulo/' +
            mod
        )
        .pipe(
          map((response: any) => {
            let dics = response;
            return dics;
          })
        );
    }

    return this.http.get(this.urlEndPoint + 'diccionario/page/' + page).pipe(
      map((response: any) => {
        let dics = response;
        return dics;
      })
    );
  }

  getDiccionario(id: string): Observable<Diccionario> {
    console.log(this.urlEndPoint + 'diccionario/' + id);
    return this.http
      .get<Diccionario>(this.urlEndPoint + 'diccionario/' + id)
      .pipe(
        catchError((e) => {
          this.router.navigate(['/diccionarios']);
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => new Error('test'));
        })
      );
  }

  create(diccionariox: Diccionario): Observable<any> {
    return this.http
      .post<Diccionario>(this.urlEndPoint + 'creardiccionario', diccionariox, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            return throwError(() => new Error('test'));
          }
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => new Error('test'));
        })
      );
  }

  update(diccionariox: Diccionario): Observable<any> {
    console.log(diccionariox);
    return this.http
      .put<Diccionario>(
        this.urlEndPoint + 'actualizardiccionario/' + diccionariox.idDic,
        diccionariox,
        { headers: this.httpHeaders }
      )
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            return throwError(() => new Error('test'));
          }
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => new Error('test'));
        })
      );
  }

  delete(id: number): Observable<any> {
    console.log(id);
    return this.http
      .delete<Diccionario>(this.urlEndPoint + 'borrardiccionario/' + id)
      .pipe(
        catchError((e) => {
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => new Error('test'));
        })
      );
  }
}

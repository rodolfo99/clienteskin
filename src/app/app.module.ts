import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { DiccionarioComponent } from './diccionario/diccionario.component';
import { DiccionarioService } from './diccionario/diccionario.service';
import { AuthService } from './auth.service';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './diccionario/form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginatorComponent } from './paginator/paginator.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/diccionario', pathMatch: 'full'},
  {path: 'diccionario', component: DiccionarioComponent, canActivate:[AuthGuard]},
  {path: 'diccionario/page/:page', component: DiccionarioComponent, canActivate:[AuthGuard]},
  {path: 'diccionario/page/:page/:busqueda/:modulo', component: DiccionarioComponent, canActivate:[AuthGuard]},
  {path: 'diccionario/page2/mostrarmodulo/:page/:modulo', component: DiccionarioComponent, canActivate:[AuthGuard]},
  {path: 'diccionario/page2/mostrarbusqueda/:page/:busqueda', component: DiccionarioComponent, canActivate:[AuthGuard]},
  {path: 'diccionario/form', component: FormComponent, canActivate:[AuthGuard]},
  {path: 'diccionario/form/:id', component: FormComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DiccionarioComponent,
    FormComponent,
    PaginatorComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [
      DiccionarioService,
      AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

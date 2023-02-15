import { Component } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent{

   constructor(public auth:AuthService, private router:Router){}

   cerrarSesion():void{
       this.auth.cerrarSesion();
       this.router.navigate(["/login"]);
   }
}

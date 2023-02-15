import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {AuthService} from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario:string="";
  public password:string="";

  constructor(private router:Router, private auth:AuthService) { }

  ngOnInit(): void {
  }

  login()
  {
      this.auth.login(this.usuario,this.password);
  }

}

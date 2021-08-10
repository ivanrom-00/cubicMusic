import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar-aux',
  templateUrl: './navbar-aux.component.html',
  styleUrls: ['./navbar-aux.component.css']
})
export class NavbarAuxComponent implements OnInit {

  userId : string;
  sesion : boolean;

  constructor( private auth: AuthService,
                private router: Router ) { 
    this.sesion = this.auth.estaAutenticado();
  }

  ngOnInit(): void {
    this.sesion = this.auth.estaAutenticado();
    this.userId = this.auth.getUserId();
  }

  salir () {
    this.auth.logout();
    this.sesion = this.auth.estaAutenticado();
    this.router.navigateByUrl('/home');
  }



}

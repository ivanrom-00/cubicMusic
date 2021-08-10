import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

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
    this.router.navigateByUrl('/home');
    this.sesion = this.auth.estaAutenticado();
  }

}

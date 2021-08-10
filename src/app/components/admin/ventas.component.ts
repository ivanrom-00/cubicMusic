import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  ventas : any;

  constructor( private auth: AuthService) { }

  ngOnInit(): void {
    this.getVentas();
  }

  getVentas () {
    this.auth.obtenerVentas().then( resp => {
      this.ventas = resp;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductoModel } from 'src/app/models/producto.model';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  textoBoton = 'Abrir';
  opened = false;

  producto :ProductoModel;

  constructor() {
    this.producto = new ProductoModel();
   }

  ngOnInit(): void {
  this.opened = false;
  }



}

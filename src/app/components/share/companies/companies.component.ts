import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  iconos :any;

  constructor( private auth: AuthService ) { }

  ngOnInit(): void {
    this.getIconos();
  }

  getIconos () {
    this.auth.getIconos().subscribe( resp => {
        this.iconos = resp;
    });
  }

}

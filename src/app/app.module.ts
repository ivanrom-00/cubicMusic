import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms/'
import { HttpClientModule } from '@angular/common/http/'

import {MatSidenavModule} from '@angular/material/sidenav';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/share/navbar/navbar.component';
import { NavbarAuxComponent } from './components/share/navbar-aux/navbar-aux.component';
import { MainComponent } from './components/share/main/main.component';
import { CompaniesComponent } from './components/share/companies/companies.component';
import { FooterComponent } from './components/share/footer/footer.component';
import { ConocenosComponent } from './components/conocenos/conocenos.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { ProduccionesComponent } from './components/producciones/producciones.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ProductosComponent } from './components/productos/productos.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { AdminComponent } from './components/admin/admin.component';
import { NavbarAdminComponent } from './components/shared/navbar-admin/navbar-admin.component';
import { ProductoNuevoComponent } from './components/admin/producto/producto-nuevo.component';
import { ProductoComponent } from './components/admin/producto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SliderComponent } from './components/shared/slider/slider.component';

import { SwiperModule } from 'swiper/angular';
import { UsuarioComponent } from './components/admin/usuario.component';
import { UsuarioNewEdiComponent } from './components/admin/usuario-new-edi/usuario-new-edi.component';
import { VentasComponent } from './components/admin/ventas.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { ArtistaSpotifyComponent } from './components/artista-spotify/artista-spotify.component';
import { HomeSpotifyComponent } from './components/home-spotify/home-spotify.component';
import { SearchSpotifyComponent } from './components/search-spotify/search-spotify.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { NoimagePipe } from './pipes/noimage.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    NavbarComponent,
    NavbarAuxComponent,
    MainComponent,
    CompaniesComponent,
    FooterComponent,
    ConocenosComponent,
    ServiciosComponent,
    ProduccionesComponent,
    ContactoComponent,
    ProductosComponent,
    CarritoComponent,
    AdminComponent,
    NavbarAdminComponent,
    ProductoNuevoComponent,
    ProductoComponent,
    SliderComponent,
    UsuarioComponent,
    UsuarioNewEdiComponent,
    VentasComponent,
    ArtistaComponent,
    ArtistaSpotifyComponent,
    HomeSpotifyComponent,
    SearchSpotifyComponent,
    LoadingComponent,
    TarjetasComponent,
    DomseguroPipe,
    NoimagePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    SwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

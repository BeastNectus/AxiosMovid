
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { CommonModule } from '@angular/common';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { TvDetailComponent } from './pages/tv-detail/tv-detail.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MovieDetailComponent,
    TvDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

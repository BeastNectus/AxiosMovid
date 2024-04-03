import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { TvDetailComponent } from './pages/tv-detail/tv-detail.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { TvListComponent } from './pages/tv-list/tv-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: 'tv/:id', component: TvDetailComponent }, 
  { path: 'movie-list', component: MovieListComponent }, 
  { path: 'tv-list', component: TvListComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

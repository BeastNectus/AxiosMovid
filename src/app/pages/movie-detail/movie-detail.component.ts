import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetails } from '../../services/movie-details.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movieId!: number;
  movieDetails: any;

  constructor(private route: ActivatedRoute, private apiService: MovieDetails, private sanitizer: DomSanitizer) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = +params['id'];
      this.getMovieDetails(this.movieId);
    });
  }

  getMovieDetails(movieId: number): void {
    this.apiService.getMovieDetails(movieId).subscribe(
      (response) => {
        this.movieDetails = response;
        console.log('Movie details:', this.movieDetails);
      },
      (error: any) => {
        console.error('Error fetching movie details:', error);
      }
    );
  }

  getSafeUrl(id: number): SafeResourceUrl {
    const url = `https://vidsrc.to/embed/movie/${id}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

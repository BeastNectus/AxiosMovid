import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviePopular } from '../../services/movie-popular.service';
import { TvPopularService } from '../../services/tv-popular.service';
import { MultiSearchService } from '../../services/multi-search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  popularMovies: any;
  popularTvShows: any;
  currentMoviePage: number = 1;
  currentTvPage: number = 1;
  searchQuery: string = '';
  searchResults: any[] = [];
  showSearchResults: boolean = false;

  constructor(private movieService: MoviePopular, private tvService: TvPopularService, private router: Router, private multiSearchService: MultiSearchService) {}

  ngOnInit(): void {
    this.fetchPopularMovies(this.currentMoviePage);
    this.fetchPopularTvShows(this.currentTvPage);
  }

  fetchPopularMovies(page: number): void {
    this.movieService.getPopularMovies(page).subscribe(
      (response) => {
        this.popularMovies = response;
        // console.log('Popular Movies:', this.popularMovies);
      },
      (error) => {
        // console.error('Error fetching popular movies:', error);
      }
    );
  }

  fetchPopularTvShows(page: number): void {
    this.tvService.getPopularTvShows(page).subscribe(
      (response) => {
        this.popularTvShows = response;
        // console.log('Popular TV Shows:', this.popularTvShows);
      },
      (error) => {
        // console.error('Error fetching popular TV shows:', error);
      }
    );
  }

  searchMovies(): void {
    if (this.searchQuery.trim() === '') {
      return;
    }

    this.multiSearchService.searchMovies(this.searchQuery).subscribe(
      (response: any) => {
        this.searchResults = response.results;
        // console.log('Search Results:', this.searchResults);
        this.showSearchResults = true;
      },
      (error) => {
        // console.error('Error searching movies:', error);
      }
    );
  }

  nextPageMovies(): void {
    this.currentMoviePage++;
    this.fetchPopularMovies(this.currentMoviePage);
  }

  prevPageMovies(): void {
    if (this.currentMoviePage > 1) {
      this.currentMoviePage--;
      this.fetchPopularMovies(this.currentMoviePage);
    }
  }

  nextPageTvShows(): void {
    this.currentTvPage++;
    this.fetchPopularTvShows(this.currentTvPage);
  }

  prevPageTvShows(): void {
    if (this.currentTvPage > 1) {
      this.currentTvPage--;
      this.fetchPopularTvShows(this.currentTvPage);
    }
  }

  goToMovieDetail(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }

  goToTvShowDetail(tvId: number): void {
    this.router.navigate(['/tv', tvId]);
  }

  searchgoToDetail(result: any): void {
    if (result.media_type === 'movie') {
      this.router.navigate(['/movie', result.id]);
    } else if (result.media_type === 'tv') {
      this.router.navigate(['/tv', result.id]);
    }
  }
}

import { Component } from '@angular/core';
import { MoviePopular } from '../../services/movie-popular.service';
import { Router } from '@angular/router';
import { MultiSearchService } from '../../services/multi-search.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
    popularMovies: any;
    currentMoviePage: number = 1;
    searchQuery: string = '';
    searchResults: any[] = [];
    showSearchResults: boolean = false;

    constructor(private movieService: MoviePopular,  private router: Router, private multiSearchService: MultiSearchService) {}

    ngOnInit(): void {
        this.fetchPopularMovies(this.currentMoviePage);
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

    searchMovies(): void {
        if (this.searchQuery.trim() === '') {
          return;
        }
    
        this.multiSearchService.searchMovies(this.searchQuery).subscribe(
          (response: any) => {
            this.searchResults = response.results;
            // console.log('Search Results:', this.searchResults);
            this.showSearchResults = true;
            this.scrollToSearchResults();
          },
          (error) => {
            // console.error('Error searching movies:', error);
          }
        );
      }
    
      scrollToSearchResults() {
        const searchResultsSection = document.getElementById('search-results');
        if (searchResultsSection) {
          searchResultsSection.scrollIntoView({ behavior: 'smooth' });
        }
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

      goToMovieDetail(movieId: number): void {
        this.router.navigate(['/movie', movieId]);
      }

      searchgoToDetail(result: any): void {
        if (result.media_type === 'movie') {
          this.router.navigate(['/movie', result.id]);
        } else if (result.media_type === 'tv') {
          this.router.navigate(['/tv', result.id]);
        }
      }
}

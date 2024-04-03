import { Component } from '@angular/core';
import { TvPopularService } from '../../services/tv-popular.service';
import { Router } from '@angular/router';
import { MultiSearchService } from '../../services/multi-search.service';

@Component({
  selector: 'app-tv-list',
  templateUrl: './tv-list.component.html',
  styleUrls: ['./tv-list.component.css']
})
export class TvListComponent {
    popularTvShows: any;
    currentTvPage: number = 1;
    searchQuery: string = '';
    searchResults: any[] = [];
    showSearchResults: boolean = false;

    constructor(private tvService: TvPopularService,  private router: Router, private multiSearchService: MultiSearchService) {}

    ngOnInit(): void {
        this.fetchPopularTvShows(this.currentTvPage);
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvDetailsService } from '../../services/tv-details.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TvSeasonDetailsService } from '../../services/tv-season-details.service';
import { forkJoin } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-tv-detail',
    templateUrl: './tv-detail.component.html',
    styleUrls: ['./tv-detail.component.css'],
})
export class TvDetailComponent implements OnInit {
    tvId!: number;
    tvDetails: any;
    seasonDetails: any[] = [];
    selectedEpisode: any = null;

    selectedEpisodeUrl: SafeResourceUrl | null = null;

    constructor(
        private route: ActivatedRoute,
        private tvDetailsService: TvDetailsService,
        private tvSeasonDetailsService: TvSeasonDetailsService,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.tvId = +params['id'];
            // console.log('TV ID:', this.tvId);
            this.getTvDetails(this.tvId);
        });
    
        this.route.params.pipe(
            take(1),
            switchMap(params => {
                const tvId = +params['id'];
                return this.tvSeasonDetailsService.getSeasonDetails(tvId, 1);
            })
        ).subscribe(
            (season) => {
                if (season && season.episodes && season.episodes.length > 0) {
                    this.playEpisode(season.episodes[0], season);
                }
            },
            (error: any) => {
                console.error('Error fetching season details:', error);
            }
        );
    }

    onIframeLoad(): void {
        const iframe = document.querySelector('iframe');
        if (iframe) {
            const iframeWindow = iframe.contentWindow;
            if (iframeWindow) {
                const iframeDocument = iframeWindow.document;
                if (iframeDocument) {
                    const videoElements = iframeDocument.getElementsByTagName('video');
                    if (videoElements.length > 0) {
                        const video = videoElements[0];
                        video.muted = false;
                        video.volume = 1;
                    }
                }
            }
        }
    }
    

    getTvDetails(tvId: number): void {
        this.tvDetailsService.getTvDetails(tvId).subscribe(
            (response) => {
                this.tvDetails = response;
                console.log('TV details:', this.tvDetails);
                this.fetchSeasonDetails(tvId, this.tvDetails.number_of_seasons);
            },
            (error: any) => {
                console.error('Error fetching TV details:', error);
            }
        );
    }

    fetchSeasonDetails(tvId: number, numberOfSeasons: number): void {
        const observables = [];
        for (let i = 1; i <= numberOfSeasons; i++) {
            observables.push(this.tvSeasonDetailsService.getSeasonDetails(tvId, i));
        }
        forkJoin(observables).subscribe(
            (responses) => {
                this.seasonDetails = responses;
                console.log('Season details:', this.seasonDetails);
            },
            (error: any) => {
                console.error('Error fetching season details:', error);
            }
        );
    }

    toggleEpisodeList(season: any): void {
        this.seasonDetails.forEach((s) => {
            if (s !== season) {
                s.showEpisodes = false;
            }
        });
        season.showEpisodes = !season.showEpisodes;
    }

    playEpisode(episode: any, season: any): void {
        const episodeUrl = `https://vidsrc.to/embed/tv/${this.tvId}/${season.season_number}/${episode.episode_number}`;
        // console.log('Episode URL:', episodeUrl);
        this.selectedEpisode = episode;
        this.selectedEpisodeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(episodeUrl);
    }

    getSafeUrl(id: number): SafeResourceUrl {
        const url = `https://vidsrc.to/embed/tv/${id}`;
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultiSearchService {
  constructor(private http: HttpClient) { }

  searchMovies(query: string): Observable<any> {
    const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Njg3ZDU0M2Y5MTY5NGYxMDg0ZDhlOWQxNDc3MjliZiIsInN1YiI6IjY2MDJkYzJmMGMxMjU1MDE2NTBlMDRmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n7Dku2RUfF5Rie_IJ_XNFzQvACICiMsIanRlHm1hqek'
      })
    };
    return this.http.get(url, options);
  }
}

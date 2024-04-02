import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviePopular {

  constructor(private http: HttpClient) { }

  getPopularMovies(page: number): Observable<any> {
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Njg3ZDU0M2Y5MTY5NGYxMDg0ZDhlOWQxNDc3MjliZiIsInN1YiI6IjY2MDJkYzJmMGMxMjU1MDE2NTBlMDRmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n7Dku2RUfF5Rie_IJ_XNFzQvACICiMsIanRlHm1hqek'
      })
    };
    return this.http.get(url, options);
  }
}

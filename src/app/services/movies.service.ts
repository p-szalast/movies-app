import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get(
      'https://api.themoviedb.org/3/movie/popular?api_key=699ac01c8a536f4c0ef3371e58616284'
    );
  }
}

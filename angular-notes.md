Prettier setup:

> ctrl + shift + p
> save in root project folder

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
\\\\\\\\Start setup:\\\\\\\\
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

npm install -g @angular/cli

ng new my-app

### creating component:

ng g component shared/header
ng g component shared/footer

dryRun: ng g component home --dry-run **home - nazwa**

### creating html elements:

ul.navbar-links>li\*4>a **ul o klasie navbar, ktory zawiera 4 li, zawierające a**

## binding:

{{}}

### pipes:

<span
    >©{{ date | date : "yyyy" }} Przemysław Szalast | All rights reserved.
</span>

\\\\\\\\\\\\\\\\\\\\\\\\\\
\\\\\\\\ Routing \\\\\\\\
\\\\\\\\\\\\\\\\\\\\\\\\\\

> app-routing.module:

        const routes: Routes = [
        {
            path: '',
            component: HomeComponent,
        },
        {
            path: 'movies',
            component: MoviesComponent,
        },

**as last object - redirection page**

        {
            path: '**',
            redirectTo: '',
        },

];

> app:

adding: <router-outlet>

        <app-header></app-header>
        <router-outlet></router-outlet>
        <app-footer></app-footer>

> using links:

        <li><a routerLink="/">Home</a></li>
        <li><a routerLink="/movies">Movies</a></li>

\\\\\\\\\\\\\\\\\\\\\\\\\\
\\\\\\\\ Services \\\\\\\\
\\\\\\\\\\\\\\\\\\\\\\\\\\

ng g service services/movies

> services.<name>.ts

import { Injectable } from '@angular/core';
**import { HttpClient } from '@angular/common/http';**

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

> app.module.ts

import { HttpClientModule } from '@angular/common/http';
...
imports: [BrowserModule, AppRoutingModule, **HttpClientModule**],

### displaying json file:

> <nazwa>.components.ts

import { MoviesService } from '../../services/movies.service';

    export class HomeComponent {
        movies: any = [];

        constructor(private moviesService: MoviesService) {}

        ngOnInit(): void {
            this.moviesService.getMovies().subscribe((response: any) => {
            this.movies = response.results;
            });
        }
    }

<pre>{{ movies | json }}</pre>

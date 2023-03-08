<!-- prettier-ignore-start -->

Prettier setup:

> ctrl + shift + p
> save in root project folder

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
\\\\\\\\Start setup:\\\\\\\\
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

npm install -g @angular/cli

ng new my-app

ng serve

### creating component:

ng g component shared/header
ng g component shared/footer

dryRun: ng g component home --dry-run **home - nazwa**

### creating html elements:

ul.navbar-links>li\*4>a **ul o klasie navbar, ktory zawiera 4 li, zawierające a**

### app.module.ts

- **important! add import to app.module.ts after adding any components or modules (e.g. router, http service, animations)**

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

> <nazwa>.component.ts

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

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
\\\\\\\\ Passing data to component \\\\\\\\
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

> Home

HTML
<slider [items]="movies"></slider>

TS

        export class HomeComponent {
        movies: any = [];

        constructor(private moviesService: MoviesService) {}

        ngOnInit(): void {
            this.moviesService.getMovies().subscribe((response: any) => {
            this.movies = response.results;
            // console.log(this.movies);
            });
        }
        }

**writting ts code as attribute:**

- attribute in [] (e.g. [src]="")
- glowny nawias "", kolejne '' jako string

<img
[src]="'https://image.tmdb.org/t/p/original/' + item.backdrop_path"  
/>

> Slider

HTML

TS

        export class SliderComponent {
            @Input() items: any;
        }

### ngFor - looping over components

- pre tag is for preview

<pre>
  {{ items | json }}
</pre>

<div class="slider">
  <div class="slide" *ngFor="let item of items">

\\\\\\\\\\\\\\\\\\\\\\\\\\\\
\\\\\\\\ Animations \\\\\\\\
\\\\\\\\\\\\\\\\\\\\\\\\\\\\

npm install @angular/animations

> import to app.module.ts

> component.ts

- adding animation to component

import {
animate,
state,
style,
transition,
trigger,
} from '@angular/animations';

  @Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  **animations: [**
      trigger('slideFade', [
      state(
          'void',
          style({
          opacity: 0,
          })
      ),
      transition('void <=> *', [animate('1s')]),            \\ both 
      // transition('void => *', [animate('1s')]),          \\ one side
      // transition('* => void', [animate('500ms')]),       \\ one side
      ]),
  ],
  })

> component.html

  <div class="slide" *ngFor="let item of items" @slideFade>

### ngIf - conditionaly rendering

- ngFor and ngIf cannot be in the same element
- <ng-container> - element that is not rendered in the DOM

- to change slides: make interval
- to be back to 0 after reaaching the end: (i++ % items.length) \\ reszta z 20/20 = 0

> component.ts

export class SliderComponent {
  @Input() items: Movie[] = [];

 **currentSlideIndex: number = 0;**

  ngOnInit(): void {
    **setInterval(() => {**
      **this.currentSlideIndex = ++this.currentSlideIndex % this.items.length;**
    **}, 5000);**
  }
}

> component.html

<ng-container *ngFor="let item of items; let i = index">
    <div class="slide" *ngIf="i === currentSlideIndex" @slideFade>
    </div>
</ng-container>

<!-- prettier-ignore-end -->

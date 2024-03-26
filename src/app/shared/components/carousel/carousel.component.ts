import { Component, EventEmitter, Output } from '@angular/core';
import { Movie } from '../../models/movie.model';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  
  showNavigationArrows = false;
	showNavigationIndicators = false;
@Output() sendItemCarousel = new EventEmitter<any>();
collection: Movie[]= [
  {
    Title: "Killers of the Flower Moon",
    Year: "2023",
    imdbID: "tt5537002",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjE4ZTZlNDAtM2Q3YS00YjFhLThjN2UtODg2ZGNlN2E2MWU2XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg"
},
{
  Title: "Napoleon",
  Year: "2023",
  imdbID: "tt13287846",
  Type: "movie",
  Poster: "https://m.media-amazon.com/images/M/MV5BZWIzNDAxMTktMDMzZS00ZjJmLTlhNjYtOGUxYmZlYzVmOGE4XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg"
},
{
  Title: "Barbie",
  Year: "2023",
  imdbID: "tt1517268",
  Type: "movie",
  Poster: "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg"
},
{
  Title: "Interstellar",
  Year: "2014",
  imdbID: "tt0816692",
  Type: "movie",
  Poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
},
{
  Title: "True Detective",
  Year: "2014–",
  imdbID: "tt2356777",
  Type: "series",
  Poster: "https://m.media-amazon.com/images/M/MV5BNTEzMzBiNGYtYThiZS00MzBjLTk5ZWItM2FmMzU3Y2RjYTVlXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX300.jpg"
},
{
  Title: "House of the Dragon",
  Year: "2022–",
  imdbID: "tt11198330",
  Type: "series",
  Poster: "https://m.media-amazon.com/images/M/MV5BMjk2NjgzMTEtYWViZS00NTMyLWFjMzctODczYmQzNzk2NjIwXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg"
},
{
  Title: "Better Call Saul",
  Year: "2015–2022",
  imdbID: "tt3032476",
  Type: "series",
  Poster: "https://m.media-amazon.com/images/M/MV5BZDA4YmE0OTYtMmRmNS00Mzk2LTlhM2MtNjk4NzBjZGE1MmIyXkEyXkFqcGdeQXVyMTMzNDExODE5._V1_SX300.jpg"
},
{
  Title: "Breaking Bad",
  Year: "2008–2013",
  imdbID: "tt0903747",
  Type: "series",
  Poster: "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_SX300.jpg"
},
{
  Title: "The Wire",
  Year:  "2002–2008",
  imdbID: "tt0306414",
  Type: "series",
  Poster: "https://m.media-amazon.com/images/M/MV5BZmY5ZDMxODEtNWIwOS00NjdkLTkyMjktNWRjMDhmYjJjN2RmXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
},
{
  Title: "El viaje a ninguna parte",
  Year:  "1986",
  imdbID: "tt0090259",
  Type: "movie",
  Poster: "https://m.media-amazon.com/images/M/MV5BMTU5NGRiNDktYjU2Yy00NTczLTg4MjEtOTM1NmI2MDQ2NDdkXkEyXkFqcGdeQXVyMTA0MjU0Ng@@._V1_SX300.jpg"
},
{
  Title: "REC",
  Year:  "2007",
  imdbID: "tt1038988",
  Type: "movie",
  Poster: "https://m.media-amazon.com/images/M/MV5BZTI1ODM2ZWEtYmM5NS00ZDYzLWI1YzktYWYwZTdmOWMwZTBmXkEyXkFqcGdeQXVyMTU3NDU4MDg2._V1_SX300.jpg"
},
{
  Title: "Dune",
  Year:  "2021",
  imdbID: "tt1160419",
  Type: "movie",
  Poster: "https://m.media-amazon.com/images/M/MV5BMDQ0NjgyN2YtNWViNS00YjA3LTkxNDktYzFkZTExZGMxZDkxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg"
}
];

 
  getIndexes(): number[] {
    return Array.from(Array(Math.ceil(3)).keys()).map(index => index * 4);
  }

  openItem(item: any) {

    this.sendItemCarousel.emit(item);
  }
  
}


export class ListagemFilme {
  id: number;
  titulo: string;
  sinopse: string;
  urlPoster: string;
  urlSlide: string;
  readonly urlDetalhes: string;
  totalPaginas: number;

  constructor(
    id: number,
    titulo: string,
    sinopse: string,
    urlPoster: string,
    urlSlide: string,
    totalPaginas: number
  ) {
    this.id = id;
    this.titulo = titulo;
    this.sinopse = sinopse;
    this.urlPoster = "https://image.tmdb.org/t/p/original" + urlPoster;
    this.urlSlide = "https://image.tmdb.org/t/p/original" + urlSlide;
    this.urlDetalhes = `detalhes.html?id=${id}`;
    this.totalPaginas = totalPaginas;
  }
}
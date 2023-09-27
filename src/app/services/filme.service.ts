import { Injectable } from "@angular/core";
import { DetalhesFilme } from "../models/detalhes-filme";
import { ListagemFilme } from "../models/listagem-filme";
import { Observable, map } from "rxjs";
import { HttpClient } from '@angular/common/http'
import { environment } from "../environments/environment";

@Injectable({providedIn: 'root'})
export class FilmeService {
  constructor(private http: HttpClient){}

  selecionarFilmePorPopularidade(): Observable<ListagemFilme[]> {
    const url = `https://api.themoviedb.org/3/movie/popular`;

    return this.http.get<ListagemFilme[]>(url, this.obterHeaders())
    .pipe(map((dados: any): any[] => dados.results),
      map((objetos: any[]): ListagemFilme[] => this.MapearFilmes(objetos))
      );
  }

  selecionarFilmeLancamento(): Observable<ListagemFilme[]>{
    const url = `https://api.themoviedb.org/3/movie/now_playing`;

    return this.http.get<ListagemFilme[]>(url, this.obterHeaders())
    .pipe(map((dados: any): any[] => dados.results),
      map((objetos: any[]): ListagemFilme[] => this.MapearFilmes(objetos))
      );;
  }

  selecionarFilmeEmBreve(): Observable<ListagemFilme[]>{
    const url = `https://api.themoviedb.org/3/movie/upcoming`;

    return this.http.get<ListagemFilme[]>(url, this.obterHeaders())
    .pipe(map((dados: any): any[] => dados.results),
      map((objetos: any[]): ListagemFilme[] => this.MapearFilmes(objetos))
      );;
  }

  public selecionarDetalhesFilmePorId(id: number): Observable<DetalhesFilme> {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`;
  
    return this.http.get<DetalhesFilme>(url, this.obterHeaders())
      .pipe(
        map((dados: any) => this.mapearDetalhesFilme(dados))
      );
  }

  pesquisarVideo(id: any): Observable<any> {
    const url = 'https://api.themoviedb.org/3/movie/' + id + '/videos?language=en-US';

    return this.http.get<any>(url, this.obterHeaders()).pipe(
        map(obj => obj.results),
        map(obj => this.mapearTrailer(obj)),
    );
}

mapearTrailer(obj: any[]): string {
  return obj.find(v => v.type === "Trailer") as string;

}

  private processarResposta(res: Response): any {
    if (res.ok) return res.json();

    throw new Error("Ocorreu erro ao tentar obter os dados requisitados.");
  }

  private obterHeaders() {
    return {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          environment.API_URL
      },
    };
  }

  private mapearDetalhesFilme(obj: any): DetalhesFilme {
    return new DetalhesFilme(
      obj.id,
      obj.title,
      obj.overview,
      obj.release_date,
      obj.poster_path,
      obj.backdrop_path,
      obj.vote_average,
      obj.vote_count,
      obj.crew,
      obj.genres.map((genero: any) => genero.name),
    );
  }

  private MapearFilmes(objetos: any): ListagemFilme[] {
    return objetos.map((obj: any) => {
      return new ListagemFilme(
        obj.id,
        obj.title,
        obj.overview,
        obj.poster_path,
        obj.backdrop_path
      );
    });
  }

  public buscarFilmesPorPagina(tipo: string, pagina: string): Observable<ListagemFilme[]>{
    return this.http
      .get<any>(`$'https://api.themoviedb.org/3/movie/'}${tipo}?language=pt-BR&&page=${pagina}`, this.obterHeaders())
      .pipe(
        map((dadosI: any): any[] => dadosI.results),
        map((dadosII: any[]): ListagemFilme[] => this.MapearFilmes(dadosII))
      );
  }

  PegarDetalhesDoFilme(id: any): Observable<any> {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=credits`;
  
    return this.http.get<any>(url, this.obterHeaders()).pipe(
      map((res) => {
        const diretor = res.credits.crew.find((person: any) => person.job === 'Director');
        const diretorFoto = diretor ? `https://image.tmdb.org/t/p/w185${diretor.profile_path}` : null;
  
        const elenco = res.credits.cast.map((ator: any) => {
          return {
            nome: ator.name,
            foto: `https://image.tmdb.org/t/p/w185${ator.profile_path}`
          };
        });
  
        return {
          diretor: {
            nome: diretor ? diretor.name : 'Não encontrado',
            foto: diretorFoto
          },
          elenco: elenco
        };
      })
    );
  }  
}
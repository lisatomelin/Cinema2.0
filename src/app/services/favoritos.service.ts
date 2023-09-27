import { Injectable } from "@angular/core";
import { ListagemFilme } from "../models/listagem-filme";
import { Observable, map } from "rxjs";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class FavoritosService{
  constructor(private http: HttpClient){}

  private obterDados(){
    const dados = localStorage.getItem('api-filmes-favoritos');

    return dados? JSON.parse(dados): [];
  }

  public favoritar(id: string){
    const dados = this.obterDados() as any[];

    const objString = {id: id};

    if(dados == null){
      localStorage.setItem('api-filmes-favoritos', JSON.stringify(objString));
    }
    else{
      let i = dados.findIndex((x: any) => x.id == objString.id);

      if(i == -1){
        dados.push(objString);
      }
      else{
        dados.splice(i, 1);
      }

      localStorage.setItem('api-filmes-favoritos', JSON.stringify(dados));
    }
  }

  public selecionarFilmePorId(id: number): Observable<ListagemFilme> {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`;
  
    return this.http.get<ListagemFilme[]>(url, this.obterHeaders())
      .pipe(
        map((dados: any) => this.MapearFilmes(dados))
      );
  }

  private MapearFilmes(objeto: any): ListagemFilme {
    return new ListagemFilme(
      objeto.id,
      objeto.title,
      objeto.overview,
      objeto.poster_path,
      objeto.backdrop_path
    );
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

  public obterListaFav(): any[]{
    return this.obterDados();
  }

  public verificaFav(id: string): boolean{
    const dados = this.obterDados() as any[];

    return dados.find((x: any) => x.id == id) as boolean;
  }
}
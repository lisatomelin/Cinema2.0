import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class FavoritosService{
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

  public obterListaFav(): any[]{
    return this.obterDados();
  }

  public verificaFav(id: string): boolean{
    const dados = this.obterDados() as any[];

    return dados.find((x: any) => x.id == id) as boolean;
  }
}

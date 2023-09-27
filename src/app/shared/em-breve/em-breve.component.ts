import { Component, OnInit } from '@angular/core';
import { film } from 'ngx-bootstrap-icons';
import { ListagemFilme } from 'src/app/models/listagem-filme';
import { ResultadoBusca } from 'src/app/models/resultadoBusca';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-em-breve',
  templateUrl: './em-breve.component.html',
  styleUrls: ['./em-breve.component.css']
})
export class EmBreveComponent implements OnInit {
  filmesEmBreve: ListagemFilme[] = [];
  page: number = 1;
  resultado: ResultadoBusca = new ResultadoBusca(this.filmesEmBreve, 0, 0);
  estaCarregando: boolean = false;
  
  constructor(private filmeService: FilmeService){}

  ngOnInit(): void {
    this.filmeService.selecionarFilmeEmBreve().subscribe((filmes: ListagemFilme[]) => {
      this.filmesEmBreve = filmes;
    })

    this.filmeService.pegarResultadosDeBuscaEmBreve().subscribe((resultado: ResultadoBusca) => {
      this.resultado = resultado;
    })
  }

  public trocarDePagina(pgSelec: number){
    const pgStr: string = pgSelec.toString();

      this.filmeService.buscarFilmesPorPaginaEmBreve(pgStr).subscribe((filmes: ListagemFilme[]) => {
        this.filmesEmBreve = filmes;
        console.log(filmes);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { ListagemFilme } from 'src/app/models/listagem-filme';
import { ResultadoBusca } from 'src/app/models/resultadoBusca';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.css']
})
export class LancamentosComponent implements OnInit {
  filmesLancamentos: ListagemFilme[] = [];
  page: number = 1;
  resultado: ResultadoBusca = new ResultadoBusca(this.filmesLancamentos, 0, 0);

  constructor(private filmeService: FilmeService){}

  ngOnInit(): void {
    this.filmeService.selecionarFilmeLancamento().subscribe((filmes: ListagemFilme[]) => {
      this.filmesLancamentos = filmes;
    })

    this.filmeService.pegarResultadosDeBuscaLancamentos().subscribe((resultado: ResultadoBusca) => {
      this.resultado = resultado;
    })
  }

  public trocarDePagina(pgSelec: number){
    const pgStr: string = pgSelec.toString();

      this.filmeService.buscarFilmesPorPaginaLancamento(pgStr).subscribe((filmes: ListagemFilme[]) => {
        this.filmesLancamentos = filmes;
        console.log(filmes);
      });
  }
}
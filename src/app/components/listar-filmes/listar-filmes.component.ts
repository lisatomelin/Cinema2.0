import { Component, OnInit } from '@angular/core';
import { ListagemFilme } from 'src/app/models/listagem-filme';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-listar-filmes',
  templateUrl: './listar-filmes.component.html',
  styleUrls: ['./listar-filmes.component.css']
})
export class ListarFilmesComponent implements OnInit {
  filmesPorPopularidade: ListagemFilme[] = [];
  filmesLancamentos: ListagemFilme[] = [];
  filmesEmBreve: ListagemFilme[] = [];

  constructor(private filmeService: FilmeService, private favoritoService: FavoritosService){

  }
  ngOnInit(): void {
    this.filmeService.selecionarFilmePorPopularidade().subscribe((filmes: ListagemFilme[]) => {
      this.filmesPorPopularidade = filmes;
    })

    this.filmeService.selecionarFilmeLancamento().subscribe((filmes: ListagemFilme[]) => {
      this.filmesLancamentos = filmes;
    })

    this.filmeService.selecionarFilmeEmBreve().subscribe((filmes: ListagemFilme[]) => {
      this.filmesEmBreve = filmes;
    })
  }

}

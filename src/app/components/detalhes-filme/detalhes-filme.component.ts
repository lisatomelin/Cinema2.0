import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DetalhesFilme } from 'src/app/models/detalhes-filme';
import { Diretor } from 'src/app/models/diretor';
import { Elenco } from 'src/app/models/elenco';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-detalhes-filme',
  templateUrl: './detalhes-filme.component.html',
  styleUrls: ['./detalhes-filme.component.css']
})
export class DetalhesFilmeComponent implements OnInit {
  filme: DetalhesFilme = new DetalhesFilme(0,'','','','','',0,'',[""],[""]);
  elenco: Elenco[] = [];
  diretor: Diretor = new Diretor(0,"","");
  ehFavorito: boolean = false;

  constructor(private filmeService: FilmeService,  private route: ActivatedRoute, private sanitizer: DomSanitizer, private favoritoService: FavoritosService ){

  }
  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.verificarSeEhFavorito(id.toString());

    this.filmeService.selecionarDetalhesFilmePorId(id).subscribe((filme) => {
      this.filme = filme;
    });

    this.filmeService.pesquisarVideo(id).subscribe((video) => {
      this.filme.urlSlide = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/' + video.key) as string;
        console.log(this.filme.urlSlide)
    })

    this.filmeService.PegarDetalhesDoFilme(id).subscribe((obj) => {
      this.elenco = obj.elenco;
   })

   this.filmeService.PegarDetalhesDoFilme(id).subscribe((obj) => {
    this.diretor = obj.diretor;
  })
  }

  adicionarFavoritos(){
    
    const id = this.route.snapshot.paramMap.get('id')!;

    this.favoritoService.favoritar(id);

    this.verificarSeEhFavorito(id);
  }

  public verificarSeEhFavorito(id: string){
    this.ehFavorito = this.favoritoService.verificaFav(id);
  }
}

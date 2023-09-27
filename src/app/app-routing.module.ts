import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarFilmesComponent } from './components/listar-filmes/listar-filmes.component';
import { DetalhesFilmeComponent } from './components/detalhes-filme/detalhes-filme.component';
import { FilmesEmAltaComponent } from './shared/filmes-em-alta/filmes-em-alta.component';
import { EmBreveComponent } from './shared/em-breve/em-breve.component';
import { LancamentosComponent } from './shared/lancamentos/lancamentos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar-filmes',
    pathMatch: 'full',
  },
  {
    path: 'listar-filmes',
    component: ListarFilmesComponent,
  },
  {
    path: 'detalhes-filmes/:id',
    component: DetalhesFilmeComponent,
  },
  {
    path: 'listar-filmes-em-alta',
    component: FilmesEmAltaComponent,
  },
  {
    path: 'listar-filmes-em-breve',
    component: EmBreveComponent,
  },
  {
    path: 'listar-filmes-lancamentos',
    component: LancamentosComponent,
  },
  {
    path: 'listar-filmes/:categoria',
    component: ListarFilmesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

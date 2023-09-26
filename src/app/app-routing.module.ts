import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarFilmesComponent } from './components/listar-filmes/listar-filmes.component';
import { DetalhesFilmeComponent } from './components/detalhes-filme/detalhes-filme.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

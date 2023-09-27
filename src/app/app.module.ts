import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListarFilmesComponent } from './components/listar-filmes/listar-filmes.component';
import { HttpClientModule } from '@angular/common/http';
import { DetalhesFilmeComponent } from './components/detalhes-filme/detalhes-filme.component';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { allIcons } from 'ngx-bootstrap-icons';
import { FilmesEmAltaComponent } from './shared/filmes-em-alta/filmes-em-alta.component';
import { EmBreveComponent } from './shared/em-breve/em-breve.component';
import { LancamentosComponent } from './shared/lancamentos/lancamentos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListarFilmesComponent,
    DetalhesFilmeComponent,
    FilmesEmAltaComponent,
    EmBreveComponent,
    LancamentosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgxBootstrapIconsModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

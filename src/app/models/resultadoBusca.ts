import { DetalhesFilme } from "./detalhes-filme";
import { ListagemFilme } from "./listagem-filme";

export class ResultadoBusca{
  registros: ListagemFilme[];
  quantidadeResultados: number;
  quantidadePaginas: number;

  constructor(registros: ListagemFilme[],quantidadeResultados: number,quantidadePaginas: number){
    this.registros = registros;
    this.quantidadeResultados = quantidadeResultados;
    this.quantidadePaginas = quantidadePaginas;
  }
}
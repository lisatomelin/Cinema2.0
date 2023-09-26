export class Elenco{
  id: number;
  nome: string;
  foto: string;

  constructor(nome: string, foto: string, id: number){
    this.id = id;
    this.nome = nome;
    this.foto = foto;
  }
}
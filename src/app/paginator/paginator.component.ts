import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  constructor() { }
  /** Paginação */
  maxPagina: number; // Max number of elements per page
  paginaAtual: number = 1; // Numero da pagina atual
  pagInicial: boolean; // True quando é a primeira página
  pagFinal: boolean; // True quando é a última página
  numeroPaginas: number; // Número de páginas total(Depende do maximo de paginas e do numero de contents retornados)
  // Data inside an array 
  database: any = {
    1: [
      { name: 'Felipe', age: '21' },
      { name: 'João', age: '32' }
    ],
    2: [
      { name: 'Sérgio', age: '65' },
      { name: 'Raquel', age: '21' }
    ],
    3: [
      { name: 'Gustavo', age: '17' },
      { name: 'Andressa', age: '55' }
    ]
  }
  data: any = this.database[1];

  elementoInicial: number; // number corresponding to the position of the first element that should appear in the listing 
  ngOnInit() {
    this.paginador();
    console.log(this.database[1])
  }

  pesquisar() {
    /* Request function (get) passing the index of page you're requesting for instance : get('something', pageindex);
      In this example ill be only getting the position of the array instead of making an api for obvious reasons
    */
   this.data = this.database[this.paginaAtual];
  }
  //Paginador
  paginador() {
    //Paginador:
    this.maxPagina = 2;
    this.numeroPaginas = Math.ceil(this.database.length / this.maxPagina);

    //N° paginas = teto do tamanho de content/numero maximo de elementos por pagina
    if (this.paginaAtual != this.numeroPaginas) {
      this.pagFinal = false;
    } else {
      this.pagFinal = true;
      this.elementoInicial = this.numeroPaginas - 5;
    }
    if (
      this.paginaAtual == this.elementoInicial + 5 &&
      this.paginaAtual != this.numeroPaginas
    ) {
      this.elementoInicial = this.elementoInicial + 4;
    }

    if (this.paginaAtual != 1) {
      this.pagInicial = false;
    } else {
      this.elementoInicial = 0;
      this.pagInicial = true;
    }
  }

  nextPage() {
    if (this.numeroPaginas == this.paginaAtual + 1) {
      this.pagFinal = true;
      this.paginaAtual++;
      this.pesquisar();
    } else {
      this.pagFinal = false;
      this.pagInicial = false;
      this.paginaAtual++;
      this.pesquisar();
    }
  }

  prevPage() {
    if (this.paginaAtual - 1 == this.elementoInicial) {
      this.elementoInicial = this.elementoInicial - 4;
    }
    if (this.paginaAtual - 1 == 1) {
      //Proxima pagina é a página inicial
      this.pagInicial = true;
      this.paginaAtual--;
      this.pesquisar();
    } else {
      this.pagInicial = false;
      this.pagFinal = false;
      this.paginaAtual--;
      this.pesquisar();
    }
  }

  pulaPagina(page: number) {
    if (this.numeroPaginas == page + 1) {
      this.pagFinal = true;
    }

    this.paginaAtual = page;
    this.pesquisar();
  }
  counter(i: number) {
    if (i >= this.numeroPaginas) {
      return new Array(this.numeroPaginas);
    }

    return new Array(i);
  }
}

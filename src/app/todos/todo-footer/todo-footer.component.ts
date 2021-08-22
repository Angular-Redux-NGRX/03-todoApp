import { ClassField } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filtrosValidos, setFiltro } from '../../filtro/filtro.actions';
import { borrarCompletados } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  pendientes:number = 0;
  filtroActual: filtrosValidos = 'todos';
  filtros: filtrosValidos[] = ['todos','completados','pendientes'];
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
/*     this.store.select('filtro').subscribe( filtro => {
      this.filtroActual = filtro;
    } ); */
    this.store.subscribe( state =>{
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter( todo => !todo.completado).length;
    });
  }
  seleccionarFiltro(filtro:filtrosValidos){
    this.store.dispatch(setFiltro({ filtro: filtro}));
  }

  borrarCompletados(){
    this.store.dispatch( borrarCompletados());
  }
}

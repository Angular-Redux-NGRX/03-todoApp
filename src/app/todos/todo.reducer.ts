import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { crearTodo, toggle, editar, borrar, toggleAll } from './todo.actions';


export const estadoInicial:Todo[] = [
  new Todo('recolectar las piedras del infinito'),
  new Todo('vencer a thanos')
];

const _todoReducer = createReducer(estadoInicial,
  on(crearTodo, (state, { texto }) => [...state,new Todo( texto )]),
  on(toggle, (state, { id }) => {
    return state.map( todo =>{
      if(todo.id === id){
        return {
          ...todo,
          completado: !todo.completado,
        }
      }else{
        return todo;
      }
    } );
  }),
  on(editar, (state, { id,texto }) => {
    return state.map( todo =>{
      if(todo.id === id){
        return {
          ...todo,
          texto
        }
      }else{
        return todo;
      }
    } );
  }),
  on(borrar, (state, { id }) => state.filter( todo => todo.id !== id )),

  on(toggleAll, (state, { completado }) => {
    return state.map( todo =>{
      return {
        ...todo,
        completado
      }
    } );
  }),
);

export function todoReducer(state:any, action:any) {
  return _todoReducer(state, action);
}

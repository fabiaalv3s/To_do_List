import { useState } from 'react';
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";
import Search from './components/Search';
import "./App.css";
import Filter from './components/Filter';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Criar funcionalidade x no sistema",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Ir a academia",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Estudar react",
      category: "Estudos",
      isCompleted: false,
    },
  ]);

  const [search, setSearch] = useState("");

  const addTodo = (text, category) => {
    //vamos adicionar um array de objetos em um novo todo
    const newTodos = [
      ...todos, 
      {
        //gerando um numero aleatorio
        id:Math.floor(Math.random() * 10000),
        text,
        category,
        isCompleted:false,
      },
    ];
    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const newTodos = [...todos]
    //vamos aplicar um filtro
    const filteredTodos = newTodos.filter((todo) =>
     todo.id !== id ? todo : null
    );
    setTodos(filteredTodos); 
    //temos que atribuir essa função ao botão
  }

  const completeTodo = (id) => {
    const newTodos = [...todos]
    newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo)
    setTodos(newTodos)
  }

  return (
    <div className= "app">
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch}/>
      <Filter />
      <div className="todo-list">
        {todos
          .filter((todo) =>
           todo.text.toLowerCase().includes(search.toLowerCase())
          )
        .map((todo) => (        
          // eslint-disable-next-line react/jsx-key
          //no react sempre que repete um componente precisa de prop chamada key, usamos o id pois ele nunca repete
          <Todo 
            key={todo.id} 
            todo={todo} 
            removeTodo={removeTodo} 
            completeTodo={completeTodo}
          />
        ))}
      </div>
      <TodoForm addTodo={addTodo}/>
    </div>     
  );
}

export default App;

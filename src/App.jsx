import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    todos: [],
    inputValue: ''
  };

  componentDidMount() {
    const savedTodos = localStorage.getItem('my_todos');
    if (savedTodos) {
      this.setState({ todos: JSON.parse(savedTodos) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('my_todos', JSON.stringify(this.state.todos));
    }
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleAddTodo = (e) => {
    e.preventDefault();
    if (this.state.inputValue.trim() === '') return; // не додаємо пусті рядки

    const newTodo = {
      id: Date.now(), 
      text: this.state.inputValue
    };

    this.setState((prevState) => ({
      todos: [...prevState.todos, newTodo],
      inputValue: '' 
    }));
  };


  handleDeleteTodo = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== id)
    }));
  };


  handleClearStorage = () => {
    localStorage.removeItem('my_todos'); 
    this.setState({ todos: [] }); 
  };

  render() {
    return (
      <div style={{ maxWidth: '400px', margin: '40px auto', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <h2>Класовий Todo List</h2>

        {/* Форма додавання завдання */}
        <form onSubmit={this.handleAddTodo} style={{ display: 'flex', marginBottom: '20px' }}>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            placeholder="Введіть нове завдання..."
            style={{ flex: 1, padding: '8px', fontSize: '16px' }}
          />
          <button type="submit" style={{ padding: '8px 16px', marginLeft: '8px', cursor: 'pointer' }}>
            Додати
          </button>
        </form>

        {/* Кнопка очищення localStorage та списку */}
        {this.state.todos.length > 0 && (
          <button
            onClick={this.handleClearStorage}
            style={{ marginBottom: '20px', padding: '8px 12px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
          >
            Clear Todo List
          </button>
        )}

        {/* Список завдань */}
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {this.state.todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: '1px solid #eee'
              }}
            >
              <span>{todo.text}</span>
              <button
                onClick={() => this.handleDeleteTodo(todo.id)}
                style={{ background: 'transparent', border: 'none', color: 'red', cursor: 'pointer', fontSize: '16px' }}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
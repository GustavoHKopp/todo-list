import { useState, createContext, useEffect } from 'react'
import Todo from './components/Todo'
import TodoForm from './components/TodoForm'
import Search from './components/Search'
import Filter from './components/Filter'
import Switch from "react-switch";

import './App.css'

export const ThemeContext = createContext(null)

function App() {
  const [theme, setTheme] = useState("dark")
  const [todos, setTodos] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [sort, setSort] = useState('Asc')
  const [modalIsVisible, setmodalIsVisible] = useState(false)

  useEffect(() => {
    const cachedTodos = localStorage.getItem('todos')
    const cachedTheme = localStorage.getItem('theme')
    if (cachedTodos) {
      setTodos(JSON.parse(cachedTodos));
    }

    if (cachedTheme) {
      setTheme(cachedTheme)
    }

    console.clear()
    console.log('Site desenvolvido por Gustavo Henrique Kopp')
  }, []);

  const addTodo = (text, category) => {
    const newTodo = {
      id: Math.floor(Math.random() * 10000),
      text,
      category,
      isCompleted: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);

    localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
  };

  const removeTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id)
    setTodos(filteredTodos)

    localStorage.setItem('todos', JSON.stringify(filteredTodos))
  }

  const completeTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos)

    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  const openModal = () => {
    setmodalIsVisible(true)
  }

  const handleCloseModal = () => {
    setmodalIsVisible(false)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    localStorage.setItem('theme', newTheme);
  }

  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className={theme} id='bgImage'>
          <div className='app' id={theme}>
            <div className='title'>
              <div className='pageTitle'>
                <h1>Lista de Tarefas</h1>
              </div>
              <div className='switch'>
                <Switch
                  checked={theme == 'light'}
                  onChange={toggleTheme}
                  handleDiameter={28}
                  offColor="#444444"
                  onColor="#fff"
                  offHandleColor="#fff"
                  onHandleColor="#444444"
                  height={40}
                  width={70}
                  uncheckedIcon={<div></div>}
                  checkedIcon={<div></div>}
                  className="react-switch"
                  id="icon-switch"
                />
              </div>
            </div>
            <Search search={search} setSearch={setSearch} />
            <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
            <div className="todo-list">
              {todos
                .filter((todo) =>
                  filter === 'All' ? true
                    : filter === 'Completed' ? todo.isCompleted
                      : !todo.isCompleted)
                .filter((todo) =>
                  todo.text.toLowerCase().includes(search.toLowerCase())
                )
                .sort((a, b) => sort === 'Asc' ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text))
                .map((todo) => (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    removeTodo={removeTodo}
                    completeTodo={completeTodo}
                  />
                ))}
              <div className='btnAdd'>
                <button className='add' onClick={openModal}>+</button>
              </div>
            </div>
            <TodoForm
              addTodo={addTodo}
              handleCloseModal={handleCloseModal}
              modalIsVisible={modalIsVisible}
              theme={theme} />
          </div>
        </div>
      </ThemeContext.Provider>
    </>
  )
}

export default App
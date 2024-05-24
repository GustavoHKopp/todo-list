import completed from '../img/completed.svg'

const Todo = ({ todo, removeTodo, completeTodo }) => {
    return (
        <div className='todo' style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}>
            <div className='container'>
                <div className='children'>
                    {todo.isCompleted ? <img src={completed} id='imgCompleted' /> : ''}
                </div>
                <div className='content'>
                    <p id="titleTodo">{todo.text}</p>
                    <p className='category' id="categoryodo">({todo.category})</p>
                </div>
            </div>
            <div>
                <button className='complete' onClick={() => completeTodo(todo.id)}>Completar</button>
                <button className='remove' onClick={() => removeTodo(todo.id)}>x</button>
            </div>
        </div>
    )
}

export default Todo
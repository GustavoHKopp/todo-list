import { useState } from 'react'
import Modal from 'react-modal'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRIght: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        backgroundColor: '#232323',
        color: '#fff',
    }
}

const customStylesLight = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        backgroundColor: '#efefef',
        color: '#333',
    }
}

const TodoForm = ({ addTodo, handleCloseModal, modalIsVisible, theme}) => {
    const [value, setValue] = useState('')
    const [category, setCategory] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!value || !category) {
            return
        }
        addTodo(value, category)
        setValue('')
        setCategory('')
        handleCloseModal()
    }

    return <Modal
        isOpen={modalIsVisible}
        onRequestClose={handleCloseModal}
        style={theme == 'dark' ? customStyles : customStylesLight}
        id={theme}>
        <div className='todo-form'>
            <h2>Criar Tarefa:</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Digite o Título'
                    value={value}
                    onChange={(e) => { setValue(e.target.value) }} />
                <select value={category} onChange={(e) => { setCategory(e.target.value) }}>
                    <option value="">Selecione uma Categoria</option>
                    <option value="Trabalho">Trabalho</option>
                    <option value="Pessoal">Pessoal</option>
                    <option value="Estudos">Estudos</option>
                </select>
                <button type='submit' id='btnAddTodo'>Enviar</button>
            </form>
        </div>
    </Modal>
}

export default TodoForm
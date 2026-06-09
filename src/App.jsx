import { useState, useEffect } from 'react'
import './index.css'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)

    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)

    saveToLS()
  }

  const handleAdd = () => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        todo,
        iscompleted: false
      }
    ])

    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name

    let index = todos.findIndex(item => {
      return item.id === id
    })

    let newTodos = [...todos]

    newTodos[index].iscompleted =
      !newTodos[index].iscompleted

    setTodos(newTodos)

    saveToLS()
  }

  return (
    <>
      <Navbar />

      <div className="mx-3 md:container md:mx-auto my-5 rounded-3xl p-6 bg-violet-100 min-h-[80vh] md:w-[40%] shadow-xl">

        <h1 className='font-bold text-center text-3xl text-violet-900'>
          iTask
        </h1>

        <p className='text-center text-gray-600 mt-2'>
          Manage your Todos at one place
        </p>

        <div className="addTodo my-6 flex flex-col gap-4">

          <h2 className='text-lg font-bold'>
            Add a Todo
          </h2>

          <div className="flex flex-col sm:flex-row gap-2">

            <input
              onChange={handleChange}
              value={todo}
              type='text'
              placeholder='Enter your task...'
              className='bg-white w-full rounded-full px-5 py-2 border border-violet-200 outline-none focus:ring-2 focus:ring-violet-400'
            />

            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-500 px-5 py-2 font-bold text-sm text-white rounded-full cursor-pointer transition-all'
            >
              Save
            </button>

          </div>

        </div>

        <div className="flex items-center gap-2 my-4">
          <input
            type='checkbox'
            onChange={toggleFinished}
            checked={showFinished}
          />
          <span>Show Finished</span>
        </div>

        <div className='h-px bg-black opacity-15 mx-auto my-4'></div>

        <h2 className='text-lg font-bold mb-4'>
          Your Todos
        </h2>

        <div className="todos">

          {todos.length === 0 &&
            <div className='text-center text-gray-500 py-8'>
              No Todos to display 🚀
            </div>
          }

          {todos.map(item => {

            return (
              showFinished || !item.iscompleted
            ) &&

              <div
                key={item.id}
                className="todo flex justify-between items-center my-3 bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all gap-3"
              >

                <div className='flex gap-4 items-center flex-1 min-w-0'>

                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.iscompleted}
                  />

                  <div
                    className={`flex-1 min-w-0 break-all ${item.iscompleted
                        ? "line-through text-gray-500"
                        : ""
                      }`}
                  >
                    {item.todo}
                  </div>

                </div>

                <div className="buttons flex shrink-0">

                  <button
                    onClick={(e) => {
                      handleEdit(e, item.id)
                    }}
                    className='bg-violet-800 hover:bg-violet-950 p-2 text-white rounded-lg mx-1 transition-all'
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id)
                    }}
                    className='bg-red-500 hover:bg-red-700 p-2 text-white rounded-lg mx-1 transition-all'
                  >
                    <MdDelete />
                  </button>

                </div>

              </div>

          })}

        </div>

      </div>
    </>
  )
}

export default App
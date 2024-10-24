import React from "react"
import { FaPlus } from "react-icons/fa"

export default function Form({ todos, setTodos }) {
    const handleSubmit = (event) => {
        event.preventDefault()
        const value = event.target.todo.value.trim()

        if (value === "") {
            return
        }

        const newTodo = {
            title: value,
            id: self.crypto.randomUUID(),
            isCompleted: false,
        }

        // Update todo state
        setTodos((prevTodos) => [...prevTodos, newTodo])

        // Store updated todo list in local storage
        const updatedTodoList = JSON.stringify([...todos, newTodo])
        localStorage.setItem("todos", updatedTodoList)
        event.target.reset()
    }

    return (
        <>
            <form
                className="my-7 flex w-full max-w-md items-center gap-2"
                onSubmit={handleSubmit}
            >
                <label className="w-full" htmlFor="todo">
                    <input
                        className="w-full rounded-md border-2 border-transparent px-4 py-2 focus:border-2 focus:border-lime-500 focus:outline-none"
                        type="text"
                        placeholder="Write your next task"
                        name="todo"
                        id="todo"
                    />
                </label>
                <button className="flex items-center justify-center rounded-md bg-lime-500 p-3 hover:bg-lime-600">
                    <FaPlus className="text-xl text-zinc-800" />
                </button>
            </form>
        </>
    )
}

"use client"
import { StrictMode, useState, useEffect } from "react"
import { createRoot } from "react-dom/client"
import Header from "./components/Header.jsx"
import HeroDisplay from "./components/HeroDisplay.jsx"
import Form from "./components/Form.jsx"
import TODOList from "./components/TODOList.jsx"
import "./index.css"

function Home() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const storedTodos = localStorage.getItem("todos")
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos))
        }
    }, [])

    const todosCompleted = todos.filter((todo) => {
        return todo.isCompleted === true
    }).length

    const totalTodos = todos.length

    return (
        <StrictMode>
            <div className="flex min-h-screen flex-col items-center bg-zinc-800 px-4">
                <Header />
                <HeroDisplay
                    todosCompleted={todosCompleted}
                    totalTodos={totalTodos}
                />
                <Form todos={todos} setTodos={setTodos} />
                <TODOList todos={todos} setTodos={setTodos} />
            </div>
        </StrictMode>
    )
}

createRoot(document.getElementById("root")).render(<Home />)

import React from "react"
import { FaTrashCan } from "react-icons/fa6"
import { HiOutlinePencilAlt } from "react-icons/hi"

export default function FormList({ todos, setTodos }) {
    return (
        <ol className="flex w-full max-w-md flex-col items-center justify-center">
            {todos && todos.length > 0 ? (
                todos?.map((item, index) => (
                    <Item
                        key={index}
                        item={item}
                        todos={todos}
                        setTodos={setTodos}
                    />
                ))
            ) : (
                <p className="italic text-white">
                    All caught up! &nbsp;What's next?
                </p>
            )}
        </ol>
    )
}

function Item({ item, todos, setTodos }) {
    const [editing, setEditing] = React.useState(false)
    const inputRef = React.useRef(null)

    const completeTodo = () => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === item.id
                    ? { ...todo, isCompleted: !todo.isCompleted }
                    : todo,
            ),
        )
        // Update localStorage after marking todo as completed
        const updatedTodos = JSON.stringify(todos)
        localStorage.setItem("todos", updatedTodos)
    }

    const handleEdit = () => {
        setEditing(true)
    }

    React.useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus()
            // Position the cursor at the end of the text
            inputRef.current.setSelectionRange(
                inputRef.current.value.length,
                inputRef.current.value.length,
            )
        }
    }, [editing])

    const handleInputSubmit = (event) => {
        event.preventDefault()

        const updatedTodos = JSON.stringify(todos)
        localStorage.setItem("todos", updatedTodos)

        setEditing(false)
    }

    const handleInputBlur = () => {
        const updatedTodos = JSON.stringify(todos)
        localStorage.setItem("todos", updatedTodos)

        setEditing(false)
    }

    const handleInputChange = (e) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === item.id ? { ...todo, title: e.target.value } : todo,
            ),
        )
    }

    const handleDelete = (e) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id))

        const updatedTodos = JSON.stringify(
            todos.filter((todo) => todo.id !== item.id),
        )
        localStorage.setItem("todos", updatedTodos)
    }

    return (
        <li
            className="mb-4 flex w-full items-center justify-between rounded-md border px-4 py-4 text-white"
            id={item?.id}
        >
            {editing ? (
                <form onSubmit={handleInputSubmit}>
                    <label htmlFor="edit-todo">
                        <input
                            className="rounded-md border-2 border-transparent px-2 text-black focus:border-2 focus:border-lime-500 focus:outline-none"
                            ref={inputRef}
                            type="text"
                            name="edit-todo"
                            id="edit-todo"
                            defaultValue={item?.title}
                            onBlur={handleInputBlur}
                            onChange={handleInputChange}
                        />
                    </label>
                </form>
            ) : (
                <>
                    <button
                        className="flex items-center gap-4"
                        onClick={completeTodo}
                    >
                        <svg
                            className={`h-5 w-5 rounded-full border-2 ${item.isCompleted ? "border-lime-500" : "hover:cursor-pointer hover:border-lime-500"}`}
                            viewBox="0 0 24 24" // Ensure the viewBox is set properly
                        >
                            <circle
                                cx="12" // Center the circle horizontally
                                cy="12" // Center the circle vertically
                                r="10" // Adjust radius to fit well within the viewBox
                                fill={item.isCompleted ? "#94CA42" : "#27272a"}
                            />
                        </svg>
                        <p
                            className={`font-medium ${item.isCompleted ? "line-through" : ""}`}
                        >
                            {item?.title}
                        </p>
                    </button>
                    <div className="flex items-center gap-6">
                        <button onClick={handleEdit}>
                            <HiOutlinePencilAlt className="text-2xl text-white hover:cursor-pointer hover:text-lime-500" />
                        </button>
                        <button onClick={handleDelete}>
                            <FaTrashCan className="text-xl text-white hover:cursor-pointer hover:text-lime-500" />
                        </button>
                    </div>
                </>
            )}
        </li>
    )
}

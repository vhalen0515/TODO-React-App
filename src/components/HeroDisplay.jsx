import React from "react"

export default function HeroDisplay({ todosCompleted, totalTodos }) {
    return (
        <div className="flex w-full max-w-md items-center justify-center gap-8 rounded-md border px-8 py-6">
            <div className="flex flex-col">
                <h2 className="text-2xl text-white">Task Progress</h2>
                <p className="text-xl text-white">Keep it up!</p>
            </div>
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-lime-500">
                <p className="text-4xl text-zinc-800">
                    {todosCompleted}/{totalTodos}
                </p>
            </div>
        </div>
    )
}

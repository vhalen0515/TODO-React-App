import React from "react"
import { MdOutlineLibraryAddCheck } from "react-icons/md"

export default function Header() {
    return (
        <div className="w-full">
            <div className="flex items-center gap-2 bg-zinc-800 pb-12 pl-10 pt-8">
                <MdOutlineLibraryAddCheck className="text-4xl text-white" />
                <h1 className="text-2xl text-white">TODO</h1>
            </div>
        </div>
    )
}

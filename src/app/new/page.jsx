'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function NewPage({ params }) {

  const router = useRouter()

  const [title, setTitle] = useState()
  const [description, setDescription] = useState()

  const fetchingParams = async () => {
    if (params.id) {
      const res = await fetch(`/api/tasks/${params.id}`)
      const data = await res.json()
      setTitle(data.task.title || "")
      setDescription(data.task.description || "")
    }
  }

  useEffect(() => {
    fetchingParams()
  }, [])

  const handleDelete = async () => {
    const res = await fetch(`/api/tasks/${params.id}`, {
      method: 'DELETE',
    })
    const responseData = await res.json()

    router.refresh()
    router.push('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (params.id) {
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await res.json()
    } else {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await res.json()
    }

    router.refresh()
    router.push('/')
  }


  return (
    <div className="h-screen flex justify-center items-center flex-col gap-3">
      <h1 className="text-center text-3xl font-bold mt-5">Task</h1>

      <form className="bg-slate-900 p-10 rounded w-1/2 border border-gray-400"
        encType="multipart/form-data"
        onSubmit={handleSubmit}>

        <label htmlFor="title" className="font-bold text-sm">Title</label>
        <input type="text" name="title" id="title"
          className="border border-gray-400 p-2 mb-4 w-full text-black rounded"
          placeholder="add task title..."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />

        <label htmlFor="description" className="font-bold text-sm">Description</label>
        <textarea name="description" id="description" rows="5"
          className="border border-gray-400 p-2 mb-4 w-full text-black rounded"
          placeholder="add task description..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        >
        </textarea>

        <div className="flex justify-between">
          <button type="submit" className="border border-gray-400
          rounded py-2 px-4 bg-blue-700 hover:bg-blue-900 font-bold"
          >Add</button>

          {
            params.id && (
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded border border-gray-400"
                type="button"
                onClick={handleDelete}
              >Remove</button>
            )
          }
        </div>
      </form>
      <Link href='/' className="border border-gray-400 rounded py-2 px-4 bg-blue-800 hover:bg-blue-900 font-bold">back home</Link>
    </div>
  )
}

export default NewPage;

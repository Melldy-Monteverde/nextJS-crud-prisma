'use client'
import { useEffect, useState } from "react";

function NewPage() {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })

  const [data, setData] = useState(null)

  const { title, description } = formData

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/tasks/', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const responseData = await res.json()
      console.log(responseData);
      setData(responseData)

    } catch (error) {
      console.log('__ERROR ADDING TASK__', error);
    }
  }

  useEffect(() => {
    if (data) {
      setFormData({
        title: '',
        description: '',
      })
    }
  }, [data])

  return (
    <div className="h-screen flex justify-center items-center">
      <form className="bg-slate-900 p-10 rounded w-1/2 border border-gray-400"
        enctype="multipart/form-data"
        onSubmit=
        {handleSubmit}>
        <label htmlFor="title" className="font-bold text-sm">Add new task</label>
        <input type="text" name="title" id="title"
          className="border border-gray-400 p-2 mb-4 w-full text-black rounded"
          placeholder="add task title..." onChange={handleChange} value={title}
        />

        <label htmlFor="description" className="font-bold text-sm">Add task description</label>
        <textarea name="description" id="description" rows="5"
          className="border border-gray-400 p-2 mb-4 w-full text-black rounded" placeholder="add task description..." onChange={handleChange} value={description}
        ></textarea>

        <button type="submit" className="border border-gray-400
          rounded py-2 px-4 bg-blue-400 hover:bg-blue-700 font-bold"
        >Add</button>
      </form>
    </div>
  )
}

export default NewPage;
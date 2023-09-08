'use client'
import { useRouter } from "next/navigation"

export const TaskCard = ({ task }) => {
  const router = useRouter()
  const handleClick = () => router.push(`/tasks/edit/${task.id}`)
  return (
    <div className='border border-slate-500 rounded p-3 bg-slate-800 hover:bg-slate-700 hover:cursor-pointer'
      onClick={handleClick}
    >
      <h3 className='font-bold text-2xl mb-2'>{task.title}</h3>
      <p>{task.description}</p>
      <p className="mt-3">Created: {new Date(task.created_at).toLocaleDateString()}</p>
    </div>
  )
}

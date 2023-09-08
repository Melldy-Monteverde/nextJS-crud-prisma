import { TaskCard } from '@/components/Task';
import { prisma } from '@/libs/prisma'
import Link from "next/link"

const loadTasks = async () => {
  try {
    // esto se puede hacer cuando se divida el front del back
    // const response = await fetch('http://localhost:3000/api/tasks')
    // const responseData = await response.json()
    // console.log(responseData);

    return await prisma.task.findMany()

  } catch (error) {
    console.log('__ERROR GETTING TASKS__', error);
  }
}

// export const revalidate = 60
export const dynamic = 'force-dinamic'

const HomePage = async () => {

  const tasks = await loadTasks()
  console.log(tasks);

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className='text-3xl text-center font-bold my-5'>Tasks</h1>
      <section className='container mx-auto'>
        <div className='p-10 grid grid-cols-3 gap-3'>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage

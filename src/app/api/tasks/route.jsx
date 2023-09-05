import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export const GET = async () => {
  try {
    const tasks = await prisma.task.findMany()
    if (tasks.length === 0) {
      return NextResponse.json({
        ok: true,
        status: 404,
        message: 'there is no task available',
      });
    }
    return NextResponse.json({
      ok: true,
      status: 200,
      message: 'getting tasks',
      tasks
    });

  } catch (error) {
    console.log('__ERROR__', error);
    return NextResponse.error(error);
  }
}

export const POST = async (req) => {
  try {
    const { title, description } = await req.json()
    const newTask = await prisma.task.create({
      data: {
        title,
        description
      }
    })
    return NextResponse.json({
      ok: true,
      status: 201,
      message: 'task created successfully',
      task: newTask
    });

  } catch (error) {
    console.log('__ERROR__', error);
    return NextResponse.error(error);
  }
}
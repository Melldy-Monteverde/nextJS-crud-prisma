import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export const GET = async (req, { params }) => {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: Number(params.id)
      }
    })
    return NextResponse.json({
      ok: true,
      status: 200,
      message: `getting task with id: ${params.id}`,
      task
    })
  } catch (error) {
    console.log('__ERROR__', error);
    return NextResponse.error(error);
  }
}

export const PATCH = async (req, { params }) => {
  try {
    const data = await req.json()
    const taskUpdated = await prisma.task.update({
      where: {
        id: Number(params.id)
      },
      data: data
    })
    return NextResponse.json({
      ok: true,
      status: 200,
      message: `task updated with id ${params.id}`,
      taskUpdated
    });
  } catch (error) {
    console.log('__ERROR__', error);
    return NextResponse.error(error);
  }
}

export const DELETE = async (req, { params }) => {
  const taskDeleted = await prisma.task.delete({
    where: {
      id: Number(params.id)
    }
  })
  return NextResponse.json(taskDeleted);
}

import { connectToDatabase } from '@/lib/db'
import Task from '@/models/Task'
import { NextRequest, NextResponse } from 'next/server'

// GET - get tasks list
export async function GET() {
  try {
    await connectToDatabase()
    const tasks = await Task.find({})
    return NextResponse.json(tasks)
  } catch {
    return NextResponse.json({ error: "Internal server error"}, {status: 500})
  }
}

// POST - add new task
export async function POST(req: NextRequest) {
  await connectToDatabase()
  const { title, description } = await req.json()

  const newTask = await Task.create({ title, description })
  return NextResponse.json(newTask, { status: 201 })
}

// PATCH - update task (title, description, status)
export async function PATCH(req: NextRequest) {
  await connectToDatabase()
  const { id, title, description, complete } = await req.json()

  const updatedTask = await Task.findByIdAndUpdate(id, {
    ...(title && { title }),
    ...(description && { description }),
    ...(complete !== undefined && { complete })
  }, { new: true })

  if (!updatedTask) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 })
  }

  return NextResponse.json(updatedTask, {status: 201})
}

// DELETE - delete task
export async function DELETE(req: NextRequest) {
  await connectToDatabase()
  const { id } = await req.json()
  await Task.findByIdAndDelete(id)
  return NextResponse.json({ message: 'Task deleted successfully.' }, { status: 200 })
}
import { connectToDatabase } from '@/lib/db'
import User from '@/models/User'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    await connectToDatabase()
    const { username, email, password } = await req.json()

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
    }

    const newUser = new User({ username, email, password })
    await newUser.save()

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
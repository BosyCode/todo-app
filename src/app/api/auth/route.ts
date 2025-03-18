import { connectToDatabase } from '@/lib/db'
import User from '@/models/User'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
  try {
    await connectToDatabase()
    const { email, password } = await req.json()

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '7d' })

    return Response.json({ token }, {status: 200})
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, {status: 500})
  }
}
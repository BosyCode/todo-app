import { connectToDatabase } from '@/lib/db'
import { NextResponse } from 'next/server'
import User from '@/models/User'
import { verifyToken } from '@/middleware/authMiddleware'

export async function GET(req: Request) {
  try {

    await connectToDatabase()

    const authHeader = req.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 403 })
    }

    const user = await User.findById(decoded.id).select("-password -refreshToken")
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
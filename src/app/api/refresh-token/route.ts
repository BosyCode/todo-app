import { connectToDatabase } from '@/lib/db'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import User from '@/models/User'

export async function POST(req: Request) {
  await connectToDatabase();

  const refreshToken = req.headers.get('set-cookie');

  if(!refreshToken) {
    return NextResponse.json({message: 'NO refresh token'}, {status: 404});
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET!) as any;
    console.log(
      decoded
    )
    const user = await User.findOne({ refreshToken });

    if(!user) {
      return NextResponse.json({message: "Invalid refresh token"}, {status: 403})
    }

    const accessToken = jwt.sign(
      {username: user.username},
      process.env.JWT_SECRET!,
      {expiresIn: '15m'}
    );

    return NextResponse.json({accessToken});
  } catch (error) {
    return NextResponse.json({message: "Invalid token"}, {status: 403});

  }
}
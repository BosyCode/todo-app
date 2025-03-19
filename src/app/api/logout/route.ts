import { connectToDatabase } from '@/lib/db'
import { NextResponse } from 'next/server'
import User from '@/models/User'

export async function POST(req:Request) {
  await connectToDatabase();

  const refreshToken = req.headers.get('set-cookie');
  // console.log(cookies)
  // const refreshToken = cookies?.split('=')[1];

  if(!refreshToken) return NextResponse.json({message: 'No token provided'}, {status: 401});

  const user = await User.findOne({refreshToken});
  console.log(user)
  if(user) {
    user.refreshToken = null;
    await user.save();
  }

  const response = NextResponse.json({message: "Logged out"});
  response.headers.set('Set-Cookie', `refreshToken=; HttpOnly; Path=/ Max-Age=0`);

  return response;
}
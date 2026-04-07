import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const filePath = path.join(process.cwd(), 'data', 'users.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'User database not found' }, { status: 500 });
    }

    const data = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(data);

    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      // Remove password from response
      const { password: _, ...userProfile } = user;
      return NextResponse.json({ success: true, user: userProfile });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

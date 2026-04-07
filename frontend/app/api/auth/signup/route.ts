import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    const filePath = path.join(process.cwd(), 'data', 'users.json');
    let users = [];

    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      users = JSON.parse(data);
    }

    if (users.some((u: any) => u.email === email)) {
      return NextResponse.json({ success: false, error: 'Email already exists' }, { status: 400 });
    }

    const newUser = {
      id: `USR-${Math.floor(Math.random() * 100000)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
      name,
      email,
      password,
      machinesManaged: 0,
      ticketsRaised: 0,
      accountType: 'Standard'
    };

    users.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    const { password: _, ...userProfile } = newUser;
    return NextResponse.json({ success: true, user: userProfile });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import {NextRequest, NextResponse} from 'next/server';
import {promises as fs} from 'fs';

const usersFilePath = 'users.json';

async function readUsers() {
  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // If the file doesn't exist, return an empty array
      return [];
    }
    console.error('Error reading users.json:', error);
    return []; // Also return an empty array in case of other errors
  }
}

async function writeUsers(users: any[]) {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
}

export async function POST(req: NextRequest) {
  try {
    const { username, password, name, phone, role } = await req.json();

    let users = await readUsers();

    if (users.find(u => u.username === username)) {
      return NextResponse.json({ message: 'Username already registered.' }, { status: 400 });
    }

    const newUser = {
      username,
      password,
      name,
      phone,
      role,
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    };

    users.push(newUser);
    await writeUsers(users);

    return NextResponse.json({ message: 'User registered successfully.' }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Signup failed.' }, { status: 500 });
  }
}

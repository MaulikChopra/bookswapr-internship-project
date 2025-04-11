import {NextRequest, NextResponse} from 'next/server';
import {promises as fs} from 'fs';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const usersFilePath = 'users.json';
const secretKey = 'your-secret-key'; // Replace with a strong secret key

async function readUsers() {
  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users.json:', error);
    return [];
  }
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const users = await readUsers();

    const user = users.find(u => u.username === username);

    if (!user) {
      return NextResponse.json({ message: 'Invalid username or password.' }, { status: 400 });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ message: 'Invalid username or password.' }, { status: 400 });
    }

    // Create and assign a token
    const token = jwt.sign({ userId: user.id }, secretKey);

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Login failed.' }, { status: 500 });
  }
}

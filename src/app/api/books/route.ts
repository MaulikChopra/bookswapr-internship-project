import {NextRequest, NextResponse} from 'next/server';
import {promises as fs} from 'fs';

const booksFilePath = 'books.json';

async function readBooks() {
  try {
    const data = await fs.readFile(booksFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // If the file doesn't exist, return an empty array
      return [];
    }
    console.error('Error reading books.json:', error);
    return []; // Also return an empty array in case of other errors
  }
}

async function writeBooks(books: any[]) {
  await fs.writeFile(booksFilePath, JSON.stringify(books, null, 2), 'utf8');
}

export async function GET() {
  try {
    const books = await readBooks();
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error('Error reading books:', error);
    return NextResponse.json({ message: 'Failed to read books.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const book = await req.json();
    let books = await readBooks();

    const newBook = {
      ...book,
      id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
    };

    books.push(newBook);
    await writeBooks(books);

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error('Error adding book:', error);
    return NextResponse.json({ message: 'Failed to add book.' }, { status: 500 });
  }
}

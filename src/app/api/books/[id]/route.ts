import {NextRequest, NextResponse} from 'next/server';
import {promises as fs} from 'fs';

const booksFilePath = 'books.json';

async function readBooks() {
  try {
    const data = await fs.readFile(booksFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading books.json:', error);
    return [];
  }
}

async function writeBooks(books: any[]) {
  await fs.writeFile(booksFilePath, JSON.stringify(books, null, 2), 'utf8');
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const bookUpdate = await req.json();

    let books = await readBooks();

    const bookIndex = books.findIndex(b => b.id === parseInt(id));

    if (bookIndex === -1) {
      return NextResponse.json({ message: 'Book not found.' }, { status: 404 });
    }

    books[bookIndex] = { ...books[bookIndex], ...bookUpdate };
    await writeBooks(books);

    return NextResponse.json({ message: 'Book updated successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error updating book:', error);
    return NextResponse.json({ message: 'Failed to update book.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    let books = await readBooks();

    const bookIndex = books.findIndex(b => b.id === parseInt(id));

    if (bookIndex === -1) {
      return NextResponse.json({ message: 'Book not found.' }, { status: 404 });
    }

    books = books.filter(b => b.id !== parseInt(id));
    await writeBooks(books);

    return NextResponse.json({ message: 'Book deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting book:', error);
    return NextResponse.json({ message: 'Failed to delete book.' }, { status: 500 });
  }
}

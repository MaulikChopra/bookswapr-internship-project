const express = require('express');
const cors = require('cors');
const fs = require('fs').promises; // Use promises for async file operations
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001;
const secretKey = '1234'; // Replace with a strong secret key


app.use(cors());
app.use(express.json());

const usersFilePath = 'users.json';
const booksFilePath = 'books.json';

// Helper functions for reading/writing data
async function readData(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

async function writeData(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Successfully wrote to ${filePath}`);
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
    throw error; // Re-throw to handle it in the route
  }
}

// User Auth Routes
app.post('/api/signup', async (req, res) => {
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2203788181.
  console.log("/api/signup called")
  try {
    const { username, password, name, phone, role } = req.body;

    const users = await readData(usersFilePath);

    if (users.find(u => u.username === username)) {
      return res.status(400).json({ message: 'Username already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      password: hashedPassword,
      name,
      phone,
      role,
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    };

    users.push(newUser);
    await writeData(usersFilePath, users);

    return res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Signup failed.', error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = await readData(usersFilePath);

    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Create and assign a token
    const token = jwt.sign({ userId: user.id, role: user.role }, secretKey);

    return res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Login failed.', error: error.message });
  }
});

// Book Routes
app.get('/api/books', async (req, res) => {
  try {
    const books = await readData(booksFilePath);
    return res.status(200).json(books);
  } catch (error) {
    console.error('Error reading books:', error);
    return res.status(500).json({ message: 'Failed to read books.', error: error.message });
  }
});

app.post('/api/books', async (req, res) => {
  try {
    const book = req.body;
    let books = await readData(booksFilePath);

    const newBook = {
      ...book,
      id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
    };

    books.push(newBook);
    await writeData(booksFilePath, books);

    return res.status(201).json(newBook);
  } catch (error) {
    console.error('Error adding book:', error);
    return res.status(500).json({ message: 'Failed to add book.', error: error.message });
  }
});

app.put('/api/books/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const bookUpdate = req.body;

    let books = await readData(booksFilePath);

    const bookIndex = books.findIndex(b => b.id === id);

    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    books[bookIndex] = { ...books[bookIndex], ...bookUpdate, id: id }; // Ensure ID is preserved
    await writeData(booksFilePath, books);

    return res.status(200).json({ message: 'Book updated successfully.' });
  } catch (error) {
    console.error('Error updating book:', error);
    return res.status(500).json({ message: 'Failed to update book.', error: error.message });
  }
});

app.delete('/api/books/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    let books = await readData(booksFilePath);

    const bookIndex = books.findIndex(b => b.id === id);

    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    books = books.filter(b => b.id !== id);
    await writeData(booksFilePath, books);

    return res.status(200).json({ message: 'Book deleted successfully.' });
  } catch (error) {
    console.error('Error deleting book:', error);
    return res.status(500).json({ message: 'Failed to delete book.', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});

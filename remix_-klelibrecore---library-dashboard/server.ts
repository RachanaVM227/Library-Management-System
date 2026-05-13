import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Basic logging middleware
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  const DATA_FILE = path.join(process.cwd(), "books.json");
  const BLOGS_FILE = path.join(process.cwd(), "blogs.json");

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Initialize books.json if it doesn't exist
  if (!fs.existsSync(DATA_FILE)) {
    const initialBooks = [
      {
        id: "1",
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        author: "Robert C. Martin",
        category: "Computer Science",
        description: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees.",
        isbn: "978-0132350884",
        status: "Available",
        coverImage: "https://picsum.photos/seed/cleancode/400/600"
      },
      {
        id: "2",
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        category: "Computer Science",
        description: "A comprehensive guide to the modern study of computer algorithms.",
        isbn: "978-0262033848",
        status: "Available",
        coverImage: "https://picsum.photos/seed/algorithms/400/600"
      },
      {
        id: "3",
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        category: "Technology",
        description: "One of the most significant books in software development.",
        isbn: "978-0135957059",
        status: "Reserved",
        coverImage: "https://picsum.photos/seed/pragmatic/400/600"
      },
      {
        id: "4",
        title: "Design Patterns: Elements of Reusable Object-Oriented Software",
        author: "Erich Gamma",
        category: "Computer Science",
        description: "The classic book on software design patterns.",
        isbn: "978-0201633610",
        status: "Available",
        coverImage: "https://picsum.photos/seed/designpatterns/400/600"
      }
    ];
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialBooks, null, 2));
  }

  const getBooks = () => {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  };

  const saveBooks = (books: any) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2));
  };

  const getBlogs = () => {
    if (!fs.existsSync(BLOGS_FILE)) return [];
    return JSON.parse(fs.readFileSync(BLOGS_FILE, "utf-8"));
  };

  const saveBlogs = (blogs: any) => {
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2));
  };

  // API Routes
  app.get("/api/books", (req, res) => {
    res.json(getBooks());
  });

  app.post("/api/books", (req, res) => {
    const books = getBooks();
    const newBook = { ...req.body, id: Date.now().toString() };
    books.push(newBook);
    saveBooks(books);
    res.status(201).json(newBook);
  });

  app.patch("/api/books/:id", (req, res) => {
    const books = getBooks();
    const index = books.findIndex((b: any) => b.id === req.params.id);
    if (index !== -1) {
      books[index] = { ...books[index], ...req.body };
      saveBooks(books);
      res.json(books[index]);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  });

  app.delete("/api/books/:id", (req, res) => {
    const books = getBooks();
    const filteredBooks = books.filter((b: any) => b.id !== req.params.id);
    saveBooks(filteredBooks);
    res.status(204).send();
  });

  // Blog API Routes
  app.get("/api/blogs", (req, res) => {
    res.json(getBlogs());
  });

  app.post("/api/blogs", (req, res) => {
    const blogs = getBlogs();
    const newBlog = { 
      ...req.body, 
      id: Date.now().toString(), 
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) 
    };
    blogs.unshift(newBlog);
    saveBlogs(blogs);
    res.status(201).json(newBlog);
  });

  app.delete("/api/blogs/:id", (req, res) => {
    const blogs = getBlogs();
    const filteredBlogs = blogs.filter((b: any) => b.id !== req.params.id);
    saveBlogs(filteredBlogs);
    res.status(204).send();
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

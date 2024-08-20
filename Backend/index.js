const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Setup multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Data dummy
let stories = [
  { id: 1, title: "The Financial Revolution", author: "John Doe", category: "Financial", tags: ["finance", "investment"], status: "Publish" },
  { id: 2, title: "Tech Innovations 2024", author: "Jane Smith", category: "Technology", tags: ["tech", "innovation"], status: "Draft" },
  { id: 3, title: "Health and Wellness Tips", author: "Alice Johnson", category: "Health", tags: ["health", "wellness"], status: "Publish" },
  { id: 4, title: "Health and me", author: "Alice al", category: "Health", tags: ["health"], status: "Draft" },
  { id: 5, title: "Health and me", author: "Alice al", category: "Health", tags: ["health"], status: "Draft" },
  { id: 6, title: "Health and me", author: "Alice al", category: "Health", tags: ["health"], status: "Draft" }
];

// Endpoint GET /stories dengan pagination
app.get('/stories', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedStories = stories.slice(startIndex, endIndex);

  res.json({
    page,
    limit,
    totalStories: stories.length,
    totalPages: Math.ceil(stories.length / limit),
    data: paginatedStories
  });
});

// Endpoint POST /stories
app.post('/stories', upload.single('coverImage'), (req, res) => {
  const { title, author, synopsis, category, tags, status } = req.body;
  const newStory = {
    id: stories.length + 1, // or use any logic for generating unique ids
    title,
    author,
    synopsis,
    category,
    tags: tags.split(','), // convert comma-separated tags to an array
    status
  };

  stories = [newStory, ...stories]; // Add new story to the beginning of the array

  res.status(201).json(newStory);
});

// Jalankan server
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});



  // { id: 1, title: "The Financial Revolution", author: "John Doe", category: "Financial", tags: ["finance", "investment"], status: "Publish" },
  // { id: 2, title: "Tech Innovations 2024", author: "Jane Smith", category: "Technology", tags: ["tech", "innovation"], status: "Draft" },
  // { id: 3, title: "Health and Wellness Tips", author: "Alice Johnson", category: "Health", tags: ["health", "wellness"], status: "Publish" },
  // { id: 4, title: "Health and me", author: "Alice al", category: "Health", tags: ["health"], status: "Draft" },
  // { id: 5, title: "Health and me", author: "Alice al", category: "Health", tags: ["health"], status: "Draft" },
  // { id: 6, title: "Health and me", author: "Alice al", category: "Health", tags: ["health"], status: "Draft" }
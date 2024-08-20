import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function AddStory() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [category, setCategory] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('Draft');
  const navigate = useNavigate();

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('synopsis', synopsis);
    formData.append('category', category);
    formData.append('coverImage', coverImage);
    formData.append('tags', tags);
    formData.append('status', status);

    try {
      await axios.post('http://localhost:3001/stories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/stories');
    } catch (error) {
      console.error('Error saving story:', error);
    }
  };

  return (
    <Container>
      <h1>Add Story</h1>
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Synopsis</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter synopsis"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Financial</option>
            <option>Technology</option>
            <option>Health</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Cover Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setCoverImage(e.target.files[0])}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tags</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Publish</option>
            <option>Draft</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={handleSave}>Save</Button>
      </Form>
    </Container>
  );
}

export default AddStory;

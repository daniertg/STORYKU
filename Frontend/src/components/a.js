import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Badge, InputGroup, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa'; // Pastikan Anda memiliki react-icons

function AddStory() {
  const [title, setTitle] = useState('');
  const [writerName, setWriterName] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [category, setCategory] = useState(''); // Default kategori dikosongkan
  const [coverImage, setCoverImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [status, setStatus] = useState('Publish');
  const navigate = useNavigate();

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && currentTag.trim() !== '') {
      e.preventDefault();
      // Menambahkan tag tanpa tanda kurung atau tanda kutip
      setTags((prevTags) => [...prevTags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('writerName', writerName);
    formData.append('synopsis', synopsis);
    formData.append('category', category);
    formData.append('coverImage', coverImage);
    formData.append('tags', tags.join(',')); // Mengonversi array menjadi string yang dipisahkan koma
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
      <h2 className="mb-4" style={{ marginTop: '2rem' }}>Add Stories</h2>
      <Button 
        variant="light" 
        onClick={() => navigate('/stories')} 
        className="mb-3"
        style={{ 
          fontSize: '0.875rem', 
          padding: '0.5rem 1rem', 
          borderRadius: '50px', 
          backgroundColor: '#f0f0f0', // Warna abu-abu
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem' 
        }}
      >
        <FaArrowLeft style={{ fontSize: '1rem', marginRight: '0.5rem' }} />
        Back
      </Button>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Writer Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter writer name"
                value={writerName}
                onChange={(e) => setWriterName(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
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
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select category</option>
                <option>Financial</option>
                <option>Technology</option>
                <option>Health</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
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
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Cover Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setCoverImage(e.target.files[0])}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Tags/Keywords Story</Form.Label>
              <div className="d-flex flex-wrap" style={{ gap: '0.5rem' }}>
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    pill
                    bg="warning"
                    text="dark"
                    style={{ backgroundColor: 'orange' }}
                    onClick={() => handleRemoveTag(tag)}
                  >
                    {tag} <span style={{ cursor: 'pointer', marginLeft: '0.5rem' }}>x</span>
                  </Badge>
                ))}
              </div>
              <InputGroup className="mt-2">
                <Form.Control
                  type="text"
                  placeholder="Enter tag"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleAddTag}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Button 
          variant="primary" 
          onClick={handleSave} 
          style={{ backgroundColor: 'orange', borderColor: 'orange', marginRight: '10px' }}
        >
          Save
        </Button>
        <Button 
          variant="secondary" 
          onClick={() => {}} 
          style={{ backgroundColor: 'orange', borderColor: 'orange' }}
        >
          + Add Chapter
        </Button>
      </Form>
    </Container>
  );
}

export default AddStory;

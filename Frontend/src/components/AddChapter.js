import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Table } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa'; 
function AddChapter() {
  const navigate = useNavigate(); // Mengganti useHistory dengan useNavigate

  const handleSave = () => {
    // Simulasi penyimpanan data
    navigate('/stories'); // Mengganti history.push dengan navigate
  };

  return (
    <Container>
       <h2 className="mb-4" style={{ marginTop: '2rem' }}>Add Chapter</h2>
       <Button 
        variant="light" 
        onClick={() => navigate('/add-story')} 
        className="mb-3"
        style={{ 
          fontSize: '0.875rem', 
          padding: '0.5rem 1rem', 
          borderRadius: '50px', 
          backgroundColor: '#f0f0f0', 
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
        <Form.Group>
          <Form.Label>Chapter Title</Form.Label>
          <Form.Control type="text" placeholder="Enter chapter title" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Chapter Content</Form.Label>
          <Form.Control as="textarea" rows={5} placeholder="Enter chapter content" />
        </Form.Group>
        <Button variant="primary" onClick={handleSave}>Save Chapter</Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Chapter Title</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Daftar bab akan diisi di sini */}
        </tbody>
      </Table>
    </Container>
  );
}

export default AddChapter;

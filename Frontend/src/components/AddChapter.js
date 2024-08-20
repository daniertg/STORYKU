import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Table } from 'react-bootstrap';

function AddChapter() {
  const navigate = useNavigate(); // Mengganti useHistory dengan useNavigate

  const handleSave = () => {
    // Simulasi penyimpanan data
    navigate('/stories'); // Mengganti history.push dengan navigate
  };

  return (
    <Container>
      <h1>Add Chapter</h1>
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button, Modal, Badge, Container } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function StoryManagement() {
  const [stories, setStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStories();
  }, [currentPage]);

  const fetchStories = () => {
    axios.get('http://localhost:3001/stories', {
      params: {
        page: currentPage,
        limit: 5
      }
    })
    .then(response => {
      setStories(response.data.data);
      setTotalPages(response.data.totalPages);
    })
    .catch(error => console.error('Error fetching stories:', error));
  };

  const filteredStories = stories.filter(story => {
    return (
      (story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       story.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterCategory ? story.category === filterCategory : true) &&
      (filterStatus ? story.status === filterStatus : true)
    );
  });

  return (
    <Container className="mt-5">
      <h1>Story Management</h1>
      <div style={{ position: 'relative', width: '25%' }}>
        <FaSearch 
          style={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            transform: 'translateY(-50%)',
            color: '#6c757d'
          }} 
        />
        <Form.Control
          type="text"
          placeholder="Search by Writers / Title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-3"
          style={{ 
            paddingLeft: '30px', // Menambahkan ruang untuk ikon
            backgroundColor: '#e0e0e0', // Warna abu-abu
          }}
        />
      </div>
      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        Filter
      </Button>
      <Button variant="success" className="mb-3 ms-2" onClick={() => navigate('/add-story')}>
  + Add Story
</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Writers</th>
            <th>Category</th>
            <th>Keywords</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredStories.map((story, index) => (
            <tr key={story.id}>
              <td>{(currentPage - 1) * 5 + index + 1}</td>
              <td>{story.title}</td>
              <td>{story.author}</td>
              <td>{story.category}</td>
              <td>
                {story.tags.map((tag, i) => (
                  <Badge key={i} bg="secondary" className="me-1">
                    {tag}
                  </Badge>
                ))}
              </td>
              <td>
                <Badge bg={story.status === 'Publish' ? 'success' : 'warning'}>
                  {story.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between">
        <Button 
          variant="secondary" 
          onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button 
          variant="secondary" 
          onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

      {/* Modal for Filters */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Filter</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form.Group>
      <Form.Label>Category</Form.Label>
      <Form.Control
        as="select"
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="">All</option>
        <option value="Financial">Financial</option>
        <option value="Technology">Technology</option>
        <option value="Health">Health</option>
      </Form.Control>
    </Form.Group>
    <Form.Group>
      <Form.Label>Status</Form.Label>
      <Form.Control
        as="select"
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="">All</option>
        <option value="Publish">Publish</option>
        <option value="Draft">Draft</option>
      </Form.Control>
    </Form.Group>
  </Modal.Body>
  <Modal.Footer className="d-flex justify-content-between">
    <Button variant="outline-secondary" onClick={() => {
      // Reset filters
      setFilterCategory('');
      setFilterStatus('');
    }}>
      Reset 
    </Button>
    <div>
      <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
        Close
      </Button>
      <Button variant="primary" style={{ marginLeft: '10px' }} onClick={() => {
        // Apply filters logic
        setShowModal(false);
      }}>
         Filters
      </Button>
    </div>
  </Modal.Footer>
</Modal>


    </Container>
  );
}

export default StoryManagement;

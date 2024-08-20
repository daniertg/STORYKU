import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaBook } from 'react-icons/fa';

function Navigation() {
  return (
    <div style={{ width: '15%', height: '100vh', backgroundColor: 'white', position: 'fixed', top: 0, left: 0, paddingTop: '20px', borderRight: '5px solid #b6b7b8' }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#5fa3b3', textAlign: 'center', marginBottom: '30px', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' }}>
        STORYKU
      </div>
      <Nav defaultActiveKey="/" className="flex-column">
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/"
            className="text-dark d-flex align-items-center"
            style={({ isActive }) => ({
              backgroundColor: isActive ? '#2487ab' : 'transparent',
              color: isActive ? 'white' : 'black',
              fontWeight: isActive ? 'bold' : 'normal',
              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
              fontSize: '1.1rem',
              padding: '10px 15px',
            })}
          >
            <FaTachometerAlt style={{ marginRight: '10px' }} />
            Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/stories"
            className="text-dark d-flex align-items-center"
            style={({ isActive }) => ({
              backgroundColor: isActive ? '#2487ab' : 'transparent',
              color: isActive ? 'white' : 'black',
              fontWeight: isActive ? 'bold' : 'normal',
              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
              fontSize: '1.1rem',
              padding: '10px 15px',
            })}
          >
            <FaBook style={{ marginRight: '10px' }} />
            Story Management
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Navigation;

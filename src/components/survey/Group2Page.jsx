import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {Col, Container, Row} from "react-bootstrap";

function Group2Page() {
    const [group2Data, setGroup2Data] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log("location", location);
        axios.get('http://localhost:8088/group2/random', {
            params: { previousSelections: location.state.previousSelections }
        })
        .then((response) => {
            setGroup2Data(response.data.selected);
        });
    }, [location.state.previousSelections]);

    const handleSelection = (selection) => {
        navigate('/group3', { state: { previousSelections: `${location.state.previousSelections},${selection.name}` } });
    };

    return (
      <Container className="mt-5">
          <Row className="text-center mb-4">
              <Col>
                  <h2 className="fw-bold text-dark">두번째 선택지</h2>
              </Col>
          </Row>
          <Row>
              {group2Data.map((item, index) => (
                <Col key={item.id} xs={12} md={6} className="mb-4">
                    <div
                      onClick={() => handleSelection(item)}
                      className="choice-card shadow-lg rounded-4 p-5 h-100 d-flex align-items-center justify-content-center"
                      style={{
                          cursor: 'pointer',
                          fontSize: '4rem',
                          minHeight: '300px',
                          background: `linear-gradient(135deg, ${index === 0 ? '#6a11cb' : '#2575fc'} 0%,
                           ${index === 0 ? '#2575fc' : '#6a11cb'} 100%)`,
                          color: 'white',
                          transition: 'transform 0.3s ease',
                          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <div>
                            <div className="mb-3">
                                <i className={`fas fa-${index === 0 ? 'heart' : 'star'} fa-3x`}></i>
                            </div>
                            {item.name}
                        </div>
                    </div>
                </Col>
              ))}
          </Row>
      </Container>
    );
}

export default Group2Page;

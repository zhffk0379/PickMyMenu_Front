import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Col, Container, Row} from "react-bootstrap"
import axios from 'axios';

function Group1Page() {
    const [group1Data, setGroup1Data] = useState([]);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {

        axios.get(`${apiUrl}/group1/random`)
        .then((response) => {
            setGroup1Data(response.data.selected);
        });
    }, []);

    const handleSelection = (selection) => {
        navigate('/group2', { state: { previousSelections: selection.name } });
    };

    return (
      <Container className="mt-5">
          <Row className="text-center mb-4">
              <Col>
                  <h2 className="fw-bold text-dark">첫번째 선택지</h2>
              </Col>
          </Row>
          <Row>
              {group1Data.map((item, index) => (
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

export default Group1Page;

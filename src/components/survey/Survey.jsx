import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Col, Container, Row} from "react-bootstrap";

const Survey = ({question, onSelect}) => {

  if (!question) {
    return (
      <Col key="0" xs={12} md={12} className="mb-4">
        <div
          className="choice-card shadow-lg rounded-4 p-5 h-100 d-flex align-items-center justify-content-center"
          style={{
            cursor: 'pointer',
            fontSize: '4rem',
            minHeight: '300px',
            background: `linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)`,
            color: 'white',
            transition: 'transform 0.3s ease',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
        </div>
      </Col>
    )
  }

  return (
    <Col key="0" xs={12} md={12} className="mb-4">
      <div
        onClick={() => onSelect(question)}
        className="choice-card shadow-lg rounded-4 p-5 h-100 d-flex align-items-center justify-content-center"
        style={{
          cursor: 'pointer',
          fontSize: '4rem',
          minHeight: '300px',
          background: `linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)`,
          color: 'white',
          transition: 'transform 0.3s ease',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {question ? question : "로딩중"}
      </div>
    </Col>
  )
}

export default Survey;
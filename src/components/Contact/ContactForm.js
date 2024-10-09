import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const formData = new FormData(e.target);
    const url = 'https://api.longltt-portfolio.com/submit';

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        credentials: 'include', // This is equivalent to withCredentials: true in axios
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      setSuccessMessage('Form submitted successfully!');
      e.target.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Failed to submit the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Contact Us</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name *</Form.Label>
          <Form.Control type="text" name="guestName" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email *</Form.Label>
          <Form.Control type="email" name="email" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="tel" name="phone" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Message Title *</Form.Label>
          <Form.Control type="text" name="messageTitle" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Message *</Form.Label>
          <Form.Control as="textarea" rows={3} name="message" required />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </Form>
    </Container>
  );
};

export default ContactForm;
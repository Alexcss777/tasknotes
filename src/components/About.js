
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';



export const About = () =>{
  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false);
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) =>{
    console.log(name,date,description)
    setName('')
    setDate('')
    setDescription('')

  }

  useEffect(() => {
    // Obtener el nombre del usuario desde el localStorage
    const storedUserName = localStorage.getItem('user_name');

    // Actualizar el estado con el nombre del usuario
    setUserName(storedUserName);
  }, []); // El segundo parámetro [] asegura que el efecto solo se ejecute una vez al montar el componente


    return (
    <div>


        <h2>Bienvenido, {userName}!</h2>
      <h1>About</h1>
      <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
     <Form.Group controlId='formName'>
    <Form.Label>Nombre</Form.Label>
    <Form.Control
      type='text'
      placeholder='Ingrese el nombre'
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  </Form.Group>

  <Form.Group controlId='formDate'>
    <Form.Label>Fecha</Form.Label>
    <Form.Control
      type='date'
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />
  </Form.Group>

  <Form.Group controlId='formDescription'>
    <Form.Label>Descripción</Form.Label>
    <Form.Control
      as='textarea'
      placeholder='Ingrese la descripción'
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
  </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    </div>
  );
}
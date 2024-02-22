
import React, { useEffect, useState,useRef} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
const API= process.env.REACT_APP_API;

export const Tasks = () =>{
    const [idUser, setIdUser] = useState('');
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [tasks, setTask] = useState([])
    const [description, setDescription] = useState('')
    const [id, setId] = useState('')
    const [editing, setEditing] = useState(false)
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   //Crear actividades
    const handleSubmit = async (e) =>{
      e.preventDefault();
      console.log("enviando")
      if(!editing){
      const res = await fetch(`${API}/task`,{
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body:JSON.stringify({
          name,
          idUser,
          date,
          description
        })
      })
      const data = await res.json();
    }else{
      const res = await fetch(`${API}/tasks/${id}`,{
        method:'PUT',
        headers:{
          'Content-type': 'application/json'

        },
        body:JSON.stringify({
          name,
          date,
          description
        })
      })
      const data = await res.json();
      setEditing(false)
      setId('')
      console.log(data, editing)
      
    }
      await getTask(idUser);

    setName('')
    setDate('')
    setDescription('')
    setShow(false);
     
    }
  
  //Obtener las actividades
    const getTask = async (idUser) =>{
      console.log('Fetching task for ID:', idUser)
      const res = await fetch(`${API}/tasks/${idUser}`)
      const data = await res.json()
      setTask(data)
      console.log(data)
     
     
  
    }

//Funcion para borrar actividades
    const deleteTask = async (id) => {
      console.log('id',id)
      const userResponse = window.confirm('Quieres borrar este elemento?')
      if(userResponse){
        const res = await fetch(`${API}/tasks/${id}`,{
          method:'DELETE'
        });
        const data = await res.json();
        console.log(data)
        await getTask(idUser);
       }
      }

  //editar actividad crear un metodo especiak para editar
      const editTask = async (id) => {
        console.log('id',id)
        const res = await fetch(`${API}/task/${id}`)
        const data = await res.json()
        setEditing(true)
        setId(data._id)
        setName(data.name)
        setDate(data.date)
        setDescription(data.description)
        handleShow();
      
       

        console.log(data)
      }

  
    useEffect(() => {
   
      const storedUserID = localStorage.getItem('userid');
      setIdUser(storedUserID);
  
      // Llama a getTask solo si storedUserID tiene un valor
      if (storedUserID) {
        getTask(storedUserID);
      }
        
  
    }, []); // El segundo parámetro [] asegura que el efecto solo se ejecute una vez al montar el componente
  
  
      return (
      <div>
          <h2>Bienvenido, {idUser}!</h2>
        <h1>About</h1>
        <div className='col-md-4'>
        <>
      <Button variant="primary" onClick={handleShow}>
       Agregar tarea
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
          
          <div className='col-md-6'>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>user</th>
                  <th>date</th>
                  <th>description</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task._id}>
                    <td>${task.name}</td>
                    <td>${task.idUser}</td>
                    <td>${task.date}</td>
                    <td>${task.description}</td>
                    <td>
                    <button className='btn btn-secondary btn-sm btn-block'
                  onClick={(e) => editTask(task._id)}>
                     Editar
                    </button>
                    <button className='btn btn-danger btn-sm btn-block'
                   onClick={(e) => deleteTask(task._id)}>
                     Eliminar
                    </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
      </div>
      
    );
  }
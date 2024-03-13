
import React, { useEffect, useState,useRef} from 'react';
import { Button, Form, Modal,Card } from 'react-bootstrap';
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
    const [taskColors, setTaskColors] = useState({});
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const storedUser = localStorage.getItem('name');

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
   
    //calcular las fechas
    const calculateDateDifference = (taskDate) => {
      const currentDate = new Date();
      console.log(currentDate)
      const taskDateObj = new Date(taskDate);
      
    
      // Usar Math.abs para obtener el valor absoluto de la diferencia en días
     const diff =  taskDateObj- currentDate;
     const differenceInDays = Math.round(diff / (1000 * 60 * 60 * 24));
     console.log(differenceInDays)
      return differenceInDays;
    };
  
  //Obtener las actividades
    const getTask = async (idUser) =>{
      console.log('Fetching task for ID:', idUser)
      const res = await fetch(`${API}/tasks/${idUser}`)
      const data = await res.json()
      console.log(data)
      //console.log('hola',data[0].date);
      
        // Calcular el color para cada tarea y actualizar el estado
  const updatedTaskColors = {};
  data.forEach((task) => {
    const differenceInDays = calculateDateDifference(task.date);

    // Ajustar logica
    if (differenceInDays >3 ) {
      updatedTaskColors[task._id] = 'success';

    } else if (differenceInDays <=1) {
      updatedTaskColors[task._id] = 'danger';
    } else {
      updatedTaskColors[task._id] = 'mb-3 bg-warning';
    }
  });
  
  setTaskColors(updatedTaskColors);
  setTask(data)
     
  
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
      
       

       
      }
      

  
    useEffect(() => {
   
      const storedUserID = localStorage.getItem('userid');
      console.log('hola',storedUserID)
      setIdUser(storedUserID);
     
      if (storedUserID) {
        getTask(storedUserID);
      }
    
        
  
    }, []); // El segundo parámetro [] asegura que el efecto solo se ejecute una vez al montar el componente
  
  
      return (
      <div>
          <h2>Bienvenido, {storedUser}!</h2>
        <h1>About</h1>
        <div className='col-md-4'>
        <>
      <Button variant="info" style={{marginBottom:'10px'}} onClick={handleShow}>
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
          
  <div className='d-flex flex-wrap '>
  {tasks.map(task => (
    <Card key={task._id} style={{ width: '24rem', color:'white', marginRight: '10px' }} className={`mb-3 bg-${taskColors[task._id]}`}>
      <Card.Header style={{ fontSize: '1.5rem' }}>{task.name}</Card.Header>
      <Card.Body>
        <Card.Text style={{ fontSize: '1.2rem' }}>{task.description}</Card.Text>
        <p style={{ fontSize: '1.1rem' }}>Fecha Limite</p>
        <Card.Text  style={{ fontSize: '1.1rem' }}>{task.date}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button  style={{marginRight:'5px'}} variant='secondary' className='btn-sm mt-2' onClick={() => editTask(task._id)}>
          Editar
        </Button>
        <Button variant='danger' className='btn-sm mt-2' onClick={() => deleteTask(task._id)}>
          Eliminar
        </Button>
      </Card.Footer>
    </Card>
  ))}
</div>

      </div>
      
    );
  }
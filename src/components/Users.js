import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const API= process.env.REACT_APP_API;
export const Users = () =>{

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])
  const [editing, setEditing] = useState(false)
  const [id, setId] = useState('')

  

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!editing){

      console.log("enviando")
    const res = await fetch(`${API}/users`,{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        name,
        email,
        password
      })
    })
    const data = await res.json();
    console.log(data);
    }else{
      const res = await fetch(`${API}/user/${id}`,{
        method:'PUT',
        headers:{
          'Content-type': 'application/json'

        },
        body:JSON.stringify({
          name,
          email,
          password
        })
      })
      const data = await res.json();
      setEditing(false)
      setId('')
      console.log(data, editing)

    }
   
    setName('')
    setEmail('')
    setPassword('')
    await getUsers();
  }

  const getUsers = async () =>{
    const res = await fetch(`${API}/users`)
    const data = await res.json()
    setUsers(data)
  

  }

  const editUser = async (id) => {
    const res = await fetch(`${API}/user/${id}`)
    const data = await res.json();
    
    setEditing(true)
    setId(data._id)
    setName(data.name)
    setEmail(data.email)
    setPassword(data.password)
    
    console.log(data,editing)
  }

  const deleteUser = async (id) => {
  const userResponse = window.confirm('Quieres borrar este elemento?')
  if(userResponse){
    const res = await fetch(`${API}/user/${id}`,{
      method:'DELETE'
    });
    const data = await res.json();
    console.log(data)
    await getUsers();
  }


  }
  
  useEffect(()=>{
    getUsers();
  }, [])

    return (
        <div className='row'>
          <div className='col-md-4'>
            <form onSubmit={handleSubmit} className='card card-body'>
              <div className='form-group'>
                <input type="text" onChange={e =>setName(e.target.value)}
                value={name}
                className='form-control'
                placeholder='Nombre'
                autoFocus
                />
              </div>
              <div className='form-group'>
                <input type="email" onChange={e =>setEmail(e.target.value)}
                value={email}
                className='form-control'
                placeholder='email'
                autoFocus
                />
              </div>
              <div className='form-group'>
                <input type="password" onChange={e =>setPassword(e.target.value)}
                value={password}
                className='form-control'
                placeholder='password'
                autoFocus
                />
              </div>
                <button className='btn btn-primary btn-clock'>{editing ? 'Update': 'Create'}</button>
            </form>

          </div>
          <div className='col-md-6'>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Operaciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.password}</td>
                    <td>
                    <button className='btn btn-secondary btn-sm btn-block'
                    onClick={(e) => editUser(user._id)}>
                     Editar
                    </button>
                    <button className='btn btn-danger btn-sm btn-block'
                    onClick={(e) => deleteUser(user._id)}>
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
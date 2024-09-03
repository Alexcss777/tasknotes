import React, {useState} from 'react'
import { validateForm } from '../utils/Validations';

const API= 'https://tasknotes-api.onrender.com';

export const Registro = () =>{

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({});
    const [messageRegister, setMessageregister] = useState([])
    const [color, setColor] = useState('')
 
  
    const handleSubmit = async (e) =>{
      e.preventDefault();

     // Validación de campos
    const formErrors = validateForm(name, email, password);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

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
      setMessageregister(data)
      if(res.status === 401){
        setColor("alert alert-danger")


    }else{
      setColor("alert alert-success")

    }
      console.log(data);
    }
  

  
      return (
          <div className='row justify-content-center'>
             <div className={color} role="alert">
             {messageRegister.mensaje}
            </div>
            <div className='col-md-4'>
            <h2 className="text-center">Registrate</h2>
              <form onSubmit={handleSubmit} className='card card-body'>
                <div className='form-group mb-3'>
                  <input type="text" onChange={e =>setName(e.target.value)}
                  value={name}
                  className='form-control'
                  placeholder='Nombre'
                  autoFocus
                  />
                  {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
                <div className='form-group mb-3'>
                  <input type="email" onChange={e =>setEmail(e.target.value)}
                  value={email}
                  className='form-control'
                  placeholder='email'
                  autoFocus
                  />
                   {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className='form-group mb-3'>
                  <input type="password" onChange={e =>setPassword(e.target.value)}
                  value={password}
                  className='form-control'
                  placeholder='password'
                  autoFocus
                  />
                   {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
                  <button className='btn btn-primary btn-clock'>Crear cuenta</button>
              </form>
            </div>
          </div>
        );
  }
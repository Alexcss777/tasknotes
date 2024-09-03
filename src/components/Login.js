import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { validateLogin } from '../utils/Validations';


const API= 'https://tasknotes-api.onrender.com';
export const Login = () =>{
  const navigate = useNavigate();


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({});
    const [notfound, setNotfound] = useState(true)
   

   


    const handleSubmit = async (e) =>{
      

     e.preventDefault();
     const formErrors = validateLogin(email, password);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

     console.log('boton de acceder')
        const res = await fetch(`${API}/login`,{
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body:JSON.stringify({
            email,
            password
          })
        })
        
        const data = await res.json();
        if(data.user_id){
          console.log(data);
          localStorage.setItem('userid', data.user_id);
          localStorage.setItem('token', data.token);
          localStorage.setItem('name', data.name);
          navigate('/task');

        }else if (res.status === 401) {
          setNotfound(false)

        }
    
      
        
    }

    return (
        <div className='row justify-content-center'>
          {!notfound &&( <div class="alert alert-danger" role="alert">
          la contraseña o el email estan incorrectos
        </div>
          )}
          <div className='col-md-4'>
          <h2 className="text-center">Inicia sesion</h2>
            <form onSubmit={handleSubmit} className='card card-body'>
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
                <button className='btn btn-primary btn-clock'>Acceder</button>
            </form>
            

          </div>
        </div>
      );




}
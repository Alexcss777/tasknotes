import React, {useState} from 'react'

const API= process.env.REACT_APP_API;
export const Login = () =>{


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log("enviando")
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
        if(data.status){
          console.log(data.status);

        }
      
        
    }

    return (
        <div className='row'>
          <div className='col-md-4'>
            <form onSubmit={handleSubmit} className='card card-body'>
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
                <button className='btn btn-primary btn-clock'>Create</button>
            </form>

          </div>
        </div>
      );




}
import React from 'react'
// import "./style/loginsignup.css"
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';



function LoginAdmin() {
  return (
    <div className=' template d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: '#1D204F' }}>
        <div className='signin p-5 rounded bg-white'>
        <form>
            <h3 className='text-center'>Sign In Admin</h3>
            <div className='mb-2'>
                {/* <label htmlFor='email'>Email</label> */}
                <input type="email" placeholder='Masukan Email' className='form-control'/>
            </div>
            <div className='mb-2'>
                {/* <label htmlFor='password'>Password</label> */}
                <input type="password" placeholder='Masukan Password' className='form-control'/>
            </div>
            {/* <div className='text- mt-2 mb-2 '>
                Forget <a href="" className='text-decoration-none'>Password?</a> 
            </div> */}
            <div className='d-grid'>
                <Link to="/" className='d-grid text-decoration-none'><button className='btn btn-primary'style={{ backgroundColor: '#1D204F' }}>Login</button></Link>
            </div>
            <div className='text- mt-2'>
                Belum punya akun? <Link to="/signupadmin" className='ms-2 text-decoration-none'>Sign up</Link>
            </div>
            
        </form>
        </div>
    </div>
  )
}

export default LoginAdmin
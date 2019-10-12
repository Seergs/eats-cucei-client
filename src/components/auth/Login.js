import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChangeEmail = e => {
    setEmail(e.target.value);
  }
  const handleChangePassword = e => {
    setPassword(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    const credentials = {
      email,
      password
    }
    axios.post('/login', credentials)
      .then(res => {
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
        setLoading(false);
        props.history.push('/');
      })
      .catch(err => {
        console.log(err.response.data)
        setErrors(err.response.data);
        setLoading(false);
      })
  }
  return (
    <div className="container">
      <form className="login" onSubmit={e => handleSubmit(e)}>
        <h4>Inicia sesión.</h4>
        <br />
        <div className="form-group">
          <label htmlFor="email">Correo</label>
          <input type="email" className="form-control" id="email" placeholder="Email" onChange={(e) => handleChangeEmail(e)} value={email} />
          <small id="emailHelp" className="form-text text-muted login-error">{errors.email}</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input className="form-control" type="password" id="password" placeholder="Contraseña" onChange={e => handleChangePassword(e)} value={password} />
          <small id="passwordHelp" className="form-text text-muted login-error">{errors.password}</small>
        </div>
        {errors.general && (
          <small id="credentialsHelp" className="form-text text-muted text-center login-error">{errors.general}</small>
        )}
        <div className="button-div">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            Ingresar
          </button>
        </div>
        {loading && (
          <div className="text-center">
            <div className="spinner-border spinner-border-sm text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        <p className="text-center">Aún no tienes una cuenta?, registrate <Link to='/signup'>aquí</Link></p>
      </form>
    </div >
  );
}


export default Login;
import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';
import { notifyWarning } from '../../util/Alerts';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { ui: { loading } } = props;

  useEffect(() => {
    if (props.ui.errors) {
      setErrors(props.ui.errors)
    }
  }, [props.ui.errors])

  useEffect(() => {
    if (props.ui.errors) {
      if (props.ui.errors.error) {
        notifyWarning('Tu cuenta está desactivada, comunícate con un administrador')
      }
    }
  }, [props.ui.errors])

  const handleChangeEmail = e => { setEmail(e.target.value) }
  const handleChangePassword = e => { setPassword(e.target.value) }
  const handleSubmit = e => {
    e.preventDefault();
    const credentials = {
      email,
      password
    }
    props.loginUser(credentials, props.history);
  }

  if (props.user.authenticated && props.user.authenticated === true) return <Redirect to='/' />
  else {
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
}

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui
})

const mapActionsToProps = {
  loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(Login);
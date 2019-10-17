import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";

const Navbar = (props) => {
  const authenticated = props.user.authenticated
  if (authenticated) {
    const accountType = props.user.credentials.accountType;
    if (accountType === 'sellers') {
      return (
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link className="navbar-brand" to="/">CUCEI Food</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to='/' className="nav-link">Mis productos</Link>
              </li>
              <li className="nav-item">
                <Link to='/' className="nav-link">Buscar</Link>
              </li>
              <li className="nav-item">
                <Link to='/' className="nav-link">Publicar producto</Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to='/' className="nav-link">Estadísticas</Link>
              </li>
              <li className="nav-item">
                <Link to='/' className="nav-link">Perfil</Link>
              </li>
              <li className="nav-item">
                <Link to='/' className="nav-link">Salir</Link>
              </li>
            </ul>
          </div>
        </nav>
      )
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/">CUCEI Food</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to='/' className="nav-link">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link to='/' className="nav-link">Buscar</Link>
            </li>
            <li className="nav-item">
              <Link to='/' className="nav-link">Categorías</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to='/' className="nav-link">Perfil</Link>
            </li>
            <li className="nav-item">
              <Link to='/' className="nav-link">Salir</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  } else {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/">CUCEI Food</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to='/login' className="nav-link">Inciar sesión</Link>
            </li>
            <li className="nav-item">
              <Link to='/signup' className="nav-link">Registrarse</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Navbar);
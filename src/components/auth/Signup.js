import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupUser } from '../../redux/actions/userActions';

const Signup = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState('buyer');
  const [age, setAge] = useState('');
  const [career, setCareer] = useState('');
  const [curp, setCurp] = useState('');
  const [rfc, setRfc] = useState('');
  const [address, setAddress] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [errors, setErrors] = useState({});
  const { ui: { loading } } = props;

  const handleChangeEmail = e => { setEmail(e.target.value) };
  const handleChangePassword = e => { setPassword(e.target.value) };
  const handleChangeConfirmPassword = e => { setConfirmPassword(e.target.value) };
  const handleChangePhoneNumber = e => { setPhoneNumber(e.target.value) };
  const handleChangeName = e => { setName(e.target.value) };
  const handleChangeAge = e => { setAge(e.target.value) };
  const handleChangeCareer = e => { setCareer(e.target.value) };
  const handleChangeCurp = e => { setCurp(e.target.value) };
  const handleChangeRfc = e => { setRfc(e.target.value) };
  const handleChangeOrganizationName = e => { setOrganizationName(e.target.value) };
  const handleChangeAddress = e => { setAddress(e.target.value) };

  useEffect(() => {
    if (props.ui.errors) {
      setErrors(props.ui.errors)
    }
  }, [props.ui.errors])

  const handleSubmit = e => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      phoneNumber,
      password,
      confirmPassword
    }
    if (accountType === 'seller') {
      newUser.age = age;
      newUser.career = career;
      newUser.curp = curp;
      newUser.rfc = rfc;
      newUser.address = address;
      newUser.organizationName = organizationName;
    }
    props.signupUser(newUser, props.history);
  }

  if (props.user.authenticated && props.user.authenticated === true) return <Redirect to='/' />
  return (
    <div className="container">
      <form className="login" onSubmit={e => handleSubmit(e)}>
        <h4>Registro.</h4>
        <br />
        <div className="form-group">
          <label htmlFor="email">Correo</label>
          <input type="email" className="form-control" id="email" placeholder="Email" onChange={(e) => handleChangeEmail(e)} value={email} />
          <small id="emailHelp" className="form-text text-muted login-error">{errors.email}</small>
        </div>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" className="form-control" id="name" placeholder="Nombre" onChange={(e) => handleChangeName(e)} value={name} />
          <small id="nameHelp" className="form-text text-muted login-error">{errors.name}</small>
        </div>
        <div className="form-group">
          <label htmlFor="phone-number">Celular</label>
          <input type="tel" className="form-control" id="phone-number" placeholder="Celular" onChange={(e) => handleChangePhoneNumber(e)} value={phoneNumber} />
          <small id="phoneHelp" className="form-text text-muted login-error">{errors.phoneNumber}</small>
        </div>
        <div className="form-group">
          <label htmlFor="accountType">Tipo de cuenta</label>
          <select className="form-control" id="accountType" value={accountType} onChange={(e) => setAccountType(e.target.value)}>
            <option value="buyer">Comprador</option>
            <option value="seller">Vendedor</option>
          </select>
        </div>
        {
          accountType === 'seller' ? (
            <div>
              <div className="form-group">
                <label htmlFor="age">Edad</label>
                <input className="form-control" type="tel" id="age" placeholder="Edad" onChange={e => handleChangeAge(e)} value={age} />
                <small id="ageHelp" className="form-text text-muted login-error">{errors.age}</small>
              </div>
              <div className="form-group">
                <label htmlFor="career">Carrera</label>
                <input className="form-control" type="text" id="career" placeholder="Carrera" onChange={e => handleChangeCareer(e)} value={career} />
                <small id="careerHelp" className="form-text text-muted login-error">{errors.career}</small>
              </div>
              <div className="form-group">
                <label htmlFor="curp">CURP</label>
                <input className="form-control" type="text" id="curp" placeholder="CURP" onChange={e => handleChangeCurp(e)} value={curp} />
                <small id="curpHelp" className="form-text text-muted login-error">{errors.curp}</small>
              </div>
              <div className="form-group">
                <label htmlFor="rfc">RFC</label>
                <input className="form-control" type="text" id="rfc" placeholder="RFC" onChange={e => handleChangeRfc(e)} value={rfc} />
                <small id="rfcHelp" className="form-text text-muted login-error">{errors.rfc}</small>
              </div>
              <div className="form-group">
                <label htmlFor="address">Dirección</label>
                <input className="form-control" type="text" id="address" placeholder="Dirección" onChange={e => handleChangeAddress(e)} value={address} />
                <small id="addressHelp" className="form-text text-muted login-error">{errors.address}</small>
              </div>
              <div className="form-group">
                <label htmlFor="organizationName">Nombre de tu empresa :D</label>
                <input className="form-control" type="text" id="organizationName" placeholder="Nombre de la organización" onChange={e => handleChangeOrganizationName(e)} value={organizationName} />
                <small id="orgNameHelp" className="form-text text-muted login-error">{errors.organizationName}</small>
              </div>
            </div>
          ) : null
        }

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input className="form-control" type="password" id="password" placeholder="Contraseña" onChange={e => handleChangePassword(e)} value={password} />
          <small id="passwordHelp" className="form-text text-muted login-error">{errors.password}</small>
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirmar contraseña</label>
          <input className="form-control" type="password" id="confirm-password" placeholder="Contraseña" onChange={e => handleChangeConfirmPassword(e)} value={confirmPassword} />
          <small id="confrimPasswordHelp" className="form-text text-muted login-error">{errors.confirmPassword}</small>
        </div>
        {errors.general && (
          <small id="credentialsHelp" className="form-text text-muted text-center login-error">{errors.general}</small>
        )}
        <div className="button-div">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            Registrarse
          </button>
        </div>
        {loading && (
          <div className="text-center">
            <div className="spinner-border spinner-border-sm text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        <p className="text-center">Ya tiene una cuenta?, inicia sesión <Link to='/login'>aquí</Link></p>
      </form>
    </div >
  );
}

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui
})

export default connect(mapStateToProps, { signupUser })(Signup);
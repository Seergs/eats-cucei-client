import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = (props) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`/profile/${props.match.params.userId}`)
      .then(res => {
        setUser(res.data);
      })
      .catch(err => console.log(err));
  }, [props.match.params.userId])

  if (Object.entries(user).length > 0)
    return (
      <div className="container">
        <br />
        <div className="row">
          <div className="profile-header-container">
            <div className="profile-header-img">
              <img className="img-circle" src={user.imageUrl} alt="avatar" />
              <div className="rank-label-container">
                <span className="label label-default rank-label">{user.score}<span role="img" aria-label="emoji">⭐</span></span>
              </div>
            </div>
          </div>
        </div>
        <br />
        <h2 className="text-center">{user.name}</h2>
        <p className="text-center">Correo: {user.email} </p>
        <p className="text-center">Teléfono:
          <a href={`tel:${user.phoneNumber}`}>{user.phoneNumber}</a>
        </p>

        {user.isCurrentUser ? (
          <div className="text-center">
            <Link to={{
              pathname: '/profile/edit',
              state: {
                user
              }
            }}><button className="btn btn-primary">Editar mi cuenta</button></Link>
          </div>
        ) : null}

      </div>
    );
  else return <p>Cargando...</p>
}

export default Profile;
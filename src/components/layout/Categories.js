import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const colors = [1, 2, 3, 4, 5, 6];

const Categories = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios.get('/tags').then(res => {
      setTags(res.data);
    })
      .catch(err => console.log(err));
  }, [])

  let tagsMarkup = tags ? (
    tags.map(tag => (
      <Link to={`/tags/${tag}`} className={'tags-' + getRandomColor()} key={tag}>
        {tag}
      </Link>
    ))
  ) : (
      <p>Cargando...</p>
    )

  return (
    <div className="container tags">
      <h3>Categorías</h3><br />
      {tagsMarkup}
    </div>
  );
}


const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
}

export default Categories;
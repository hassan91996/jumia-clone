import React from 'react';

const Img= (props) => {
  const {src ,alt,...actions}=props
  return <img {...actions} src={`${src}`} alt={alt} />
};

export default Img;

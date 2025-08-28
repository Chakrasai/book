import React from "react";
import './Card.css';

const Card = ({ children, className = "", ...props }) => (
  <div className={`card-component ${className}`} {...props}>
    {children}
  </div>
);

export default Card;

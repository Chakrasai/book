/**
 * Card Component
 * --------------
 * A reusable card UI component for displaying content in a visually distinct container.
 * - Used for book results and other sections.
 * - Accepts children and optional className for custom styling.
 *
 * Props:
 *   - children: React nodes to display inside the card.
 *   - className: Additional CSS classes for custom styling.
 *   - ...props: Any other props are spread onto the card div.
 */
import React from "react";
import './Card.css';

const Card = ({ children, className = "", ...props }) => (
  <div className={`card-component ${className}`} {...props}>
    {children}
  </div>
);

export default Card;

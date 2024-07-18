import React from 'react';
import './Dot.css';

interface Props {
  color: string;
  blur: any;
  hover: any;
  press: any;
}

const Dot: React.FC<Props> = ({ color, blur, hover, press }) => {
  return (
    <div
      style={{ backgroundColor: color }}
      onMouseEnter={hover}
      onClick={press}
      onMouseLeave={blur}
      className="level-dot__wrapper"
    />
  );
};

export default Dot;

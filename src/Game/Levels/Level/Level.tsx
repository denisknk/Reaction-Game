import React from 'react';
import '../Levels.css';

interface Props {
  num: any;
  getBackgroundColor: any;
}

const levelIcon: React.FC<Props> = ({ num, getBackgroundColor }) => (
  <div
    onMouseOver={() => {
      getBackgroundColor(num);
    }}
    className="level-dot__wrapper"
  />
);

export default levelIcon;

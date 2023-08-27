import React from 'react';
import './Loader.css';

export const Loader = ({ className, }) => {
  return (
    <div className={'loader__wrap ' + className}>
      <div className='loader__roller'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

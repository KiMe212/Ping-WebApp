import React from 'react';
import './LoadingOverlay.css';
import { Loader } from '../Loader/Loader';

export const LoadingOverlay = () => {
  return (
    <div className="loading__overlay">
      <Loader />
    </div>
  );
};

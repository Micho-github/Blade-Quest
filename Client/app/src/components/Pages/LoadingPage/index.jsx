import React from 'react';
import styles from './LoadingSpinner.module.css';
import { ClipLoader } from 'react-spinners';


const LoadingSpinner = () => {
  return (
    <div className={styles.overlay}>
      <ClipLoader color='white'/>
    </div>
  );
};

export default LoadingSpinner;
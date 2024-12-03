// src/app/Components/LoadingSpinner.js
import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from './animation.json';

const LoadingSpinner = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Lottie animationData={loadingAnimation} loop={true} />
    </div>
);

export default LoadingSpinner;

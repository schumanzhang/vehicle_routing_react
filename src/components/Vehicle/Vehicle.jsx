import React from 'react';

import './Vehicle.scss';

const VehicleComponent = ({ route, number }) => {
  return (
    <div className="card">
      <p>Vehicle {number.toString()}</p>
      <p>{route.route.join(' -> ').toString()}</p>
    </div>
  );
};

export default VehicleComponent;
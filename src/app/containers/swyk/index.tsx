import * as React from 'react';

/**
 * SWYK specific component
 */
const SWYKComponent: React.FunctionComponent = ({ children }) => (
  <div>
    <h3>SWYK specific items</h3>
    {children}
  </div>
);

export default SWYKComponent;

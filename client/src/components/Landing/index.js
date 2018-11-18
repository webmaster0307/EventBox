import React from 'react';
import { Events } from '../Event';

const Landing = () => (
  <div>
    <h2>Landing Page</h2>

    <hr />
    <hr />
    <Events limit={2} />
  </div>
);

export default Landing
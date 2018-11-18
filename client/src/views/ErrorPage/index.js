import React from 'react';
import Page404 from './404';

const ErrorMessage = ({ error }) => (
  <div>
    <small>{error.message}</small>
  </div>
);

export default ErrorMessage;
export {
  Page404
}
import React from 'react';
import ReactDOM from 'react-dom';
import NavLink from './NavLink';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NavLink />, div);
  ReactDOM.unmountComponentAtNode(div);
});

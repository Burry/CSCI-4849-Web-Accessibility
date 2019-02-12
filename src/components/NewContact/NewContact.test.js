import React from 'react';
import ReactDOM from 'react-dom';
import NewContact from './NewContact';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewContact />, div);
  ReactDOM.unmountComponentAtNode(div);
});

import React from 'react';
import { render } from '@testing-library/react';
import { Home, Login, Image} from './Test.component';

/** 
 * TEST FOR LOGIN COMPONENT
*/
test('Test render login page button', () => {
  const { getByText } = render(<Login />);
  const linkElement = getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});

test('Test render login username textfield', () => {
  const { getByText } = render(<Login />);
  const linkElement = getByText(/Username/i);
  expect(linkElement).toBeInTheDocument();
});

test('Test render login username textfield', () => {
  const { getByText } = render(<Login />);
  const linkElement = getByText(/Password/i);
  expect(linkElement).toBeInTheDocument();
});

/** 
 * TEST FOR Homepage COMPONENT
*/
test('Homepage unit test', () => {
  const { getByText } = render(<Home />);
  const linkElement = getByText(/Reload/i);
  expect(linkElement).toBeInTheDocument();
});

/** 
 * TEST FOR Image COMPONENT
*/
test('Image unit test user', () => {
  const { getByText } = render(<Image />);
  const linkElement = getByText(/Bob/i);
  expect(linkElement).toBeInTheDocument();
});

test('Image unit test description', () => {
  const { getByText } = render(<Image />);
  const linkElement = getByText(/Hello World/i);
  expect(linkElement).toBeInTheDocument();
});

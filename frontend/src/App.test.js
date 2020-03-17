import React from 'react';
import { render } from '@testing-library/react';
import { Home, Login, Image, Upload, Search, User} from './Test.component';

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

test('Image unit test like button', () => {
  const { getByLabelText } = render(<Image />);
  const linkElement = getByLabelText(/like/i);
  expect(linkElement).toBeInTheDocument();
});

test('Image unit test show more button', () => {
  const { getByLabelText } = render(<Image />);
  const linkElement = getByLabelText(/show more/i);
  expect(linkElement).toBeInTheDocument();
});

test('Image unit test comment button', () => {
  const { getByLabelText } = render(<Image />);
  const linkElement = getByLabelText(/comment/i);
  expect(linkElement).toBeInTheDocument();
});

test('Image unit test display image', () => {
  const { getByTitle } = render(<Image />);
  const linkElement = getByTitle(/image/i);
  expect(linkElement).toBeInTheDocument();
});

/** 
 * TEST FOR Upload COMPONENT
*/
test('Upload unit test upload image', () => {
  const { getByText } = render(<Upload />);
  const linkElement = getByText(/Upload Image/i);
  expect(linkElement).toBeInTheDocument();
});

test('Upload unit test description section', () => {
  const { getByText } = render(<Upload />);
  const linkElement = getByText(/Add Description/i);
  expect(linkElement).toBeInTheDocument();
});

test('Upload unit test confirmation section', () => {
  const { getByText } = render(<Upload />);
  const linkElement = getByText(/Confirmation/i);
  expect(linkElement).toBeInTheDocument();
});


/** 
 * TEST FOR Search COMPONENT
*/
test('Search unit test search bar', () => {
  const { getByLabelText } = render(<Search />);
  const linkElement = getByLabelText(/Search/i);
  expect(linkElement).toBeInTheDocument();
});

/** 
 * TEST FOR User COMPONENT
*/
test('User unit test post numbers', () => {
  const { getByText } = render(<User />);
  const linkElement = getByText(/Post/i);
  expect(linkElement).toBeInTheDocument();
});

test('User unit test followers numbers', () => {
  const { getByText } = render(<User />);
  const linkElement = getByText(/Followers/i);
  expect(linkElement).toBeInTheDocument();
});

test('User unit test following numbers', () => {
  const { getByText } = render(<User />);
  const linkElement = getByText(/Following/i);
  expect(linkElement).toBeInTheDocument();
});

test('User unit test follow button displaying', () => {
  const { getAllByText } = render(<User />);
  const linkElement = getAllByText(/Follow/i)[0];
  expect(linkElement).toBeInTheDocument();
});


import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders blog title & author, view button', () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'www.testurl.com',
    likes: 0,
    user: {
      name: 'T.E. Ster',
      username: 'tester'
    }
  };

  const { container } = render(<Blog blog={blog} />);

  const element = container.querySelector('.blog');
  expect(element).toHaveTextContent('Test Title Test Author');
  expect(element).toHaveTextContent('view');
});
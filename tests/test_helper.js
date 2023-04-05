const Blog = require('../models/blogs');

const initialBlogs = [
  {
    'title': 'Blog Title #1',
    'author': 'Blog Author #1',
    'url': 'http://www.blog1.com',
    'likes': 1,
  },
  {
    'title': 'Blog Title #2',
    'author': 'Blog Author #2',
    'url': 'http://www.blog2.com',
    'likes': 2,
  },
  {
    'title': 'Blog Title #3',
    'author': 'Blog Author #3',
    'url': 'http://www.blog3.com',
    'likes': 3,
  },
  {
    'title': 'Blog Title #4',
    'author': 'Blog Author #4',
    'url': 'http://www.blog4.com',
    'likes': 4,
  }
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb };
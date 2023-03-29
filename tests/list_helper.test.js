const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = [];

    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [
      {
        title: "Title",
        author: "Author",
        url: "URL",
        likes: 5
      }
    ];

    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(blogs[0].likes);
  });

  test('of a bigger list is calculated right', () => {
    const blogs = [
      { title: "A", author: "A", url: "www", likes: 1 },
      { title: "B", author: "B", url: "www", likes: 1 },
      { title: "C", author: "C", url: "www", likes: 1 }
    ];

    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(3);
  });
});

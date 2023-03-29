const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  let winner = null;
  let highestLikes = 0;

  blogs.map(blog => {
    if(blog.likes > highestLikes) {
      highestLikes = blog.likes;
      winner = blog;
    }
    return blog;
  });

  return winner;
};

module.exports = { dummy, totalLikes, favoriteBlog };
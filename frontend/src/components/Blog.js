import { useState } from "react";

const Blog = ({ blog, handleUpdate }) => {
  const [visible, setVisible] = useState(false);
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeButton = (event) => {
    event.preventDefault();
    handleUpdate(blog);
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      <div style={{ display : visible ? '' : 'none' }}>
        {blog.url}<br />
        {blog.likes} <button onClick={handleLikeButton}>like</button><br />
        {blog.user.name}<br />
      </div>
    </div>
  );
};

export default Blog;
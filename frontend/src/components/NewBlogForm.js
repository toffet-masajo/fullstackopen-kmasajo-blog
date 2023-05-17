import PropTypes from 'prop-types';
import { useState } from 'react';

const NewBlogForm = ({ handleCreate }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreate({
      title: title,
      author: author,
      url: url
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div>title: <input type='text' placeholder='blog title' onChange={event => setTitle(event.target.value)} /></div>
          <div>author: <input type='text' placeholder='blog author' value={author} onChange={event => setAuthor(event.target.value)} /></div>
          <div>url: <input type='text' placeholder='blog url' value={url} onChange={event => setUrl(event.target.value)} /></div>
          <div><button type='submit'>create</button></div>
        </div>
      </form>
    </div>
  );
};

NewBlogForm.propTypes = {
  handleCreate: PropTypes.func.isRequired
};

export default NewBlogForm;
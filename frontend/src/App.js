import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({});

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => a.likes - b.likes) )
    );
  }, []);

  useEffect(() => {
    const userJSONobj = window.localStorage.getItem('loggedUser');
    if(userJSONobj) {
      const loggedUser = JSON.parse(userJSONobj);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const messageForm = () => {
    if( message === null ) return null;
    if( message.type === 'ok' )
      return (
        <div><h2 style={{ color: 'green' }}>{ message.message }</h2></div>
      );
    return (
      <div><h2 style={{ color: 'red' }}>{ message.message }</h2></div>
    );
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loggedUser = await loginService.login(
        { username, password }
      );

      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
      setUsername('');
      setPassword('');
    } catch (error) {
      setMessage({ message: 'wrong username or password', type: 'ng' });
      setTimeout( () => setMessage(null), 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    window.localStorage.removeItem('loggedUser');
  }

  const loginForm = () => {
    return( 
      <div>
        <h2>Log in to application</h2>
        { message && messageForm() }
        <form onSubmit={handleLogin}>
          <div>
            username <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };

  const handleCreateBlog = async (newBlog) => {
    try {
      const data = await blogService.createBlog(newBlog);
      data.user = { username: user.username, name: user.name };
      
      setBlogs(
        blogs
          .concat(data)
          .sort((a, b) => a.likes - b.likes)
      );
      setMessage({ 
        message: `a new blog ${newBlog.title} by ${newBlog.author} added`, 
        type: 'ok' 
      });
    } catch (error) {
      setMessage({ message: 'error adding blog', type: 'ng'});
    } finally {
      setTimeout( () => setMessage(null), 5000 );
    }
  };

  const handleAddLike = async (updatedBlog) => {
    try {
      const data = await blogService.updateBlog(updatedBlog);
      setBlogs(
        blogs
          .map((blog) => {
            if(blog.id === data.id) {
              blog.likes = data.likes
            }
            return blog;
          })
          .sort((a, b) => a.likes - b.likes)
      );
    } catch (error) {
      setMessage({ message: 'error updating blog', type: 'ng' });
      setTimeout(() => setMessage(null), 5000);
    } 
  }

  const blogForm = () => {
    return(
      <div>
        <h2>Blogs</h2>
        { message && messageForm() }
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <Togglable buttonLabel='new blog'>
          <NewBlogForm handleCreate={handleCreateBlog} />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleUpdate={handleAddLike}/>
        )}
      </div>
    );
  }

  return (
    <div>
      { user === null ? loginForm() : blogForm() }
    </div>
  );
};

export default App;
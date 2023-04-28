import { useState, useEffect } from 'react';
import Blog from './components/Blog';
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
      setBlogs( blogs )
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

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    };

    event.target.title.value = '';
    event.target.author.value = '';
    event.target.url.value = '';

    try {
      const data = await blogService.createBlog(newBlog);
      setBlogs(blogs.concat(data));
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

  const newForm = () => {
    return(
      <div>
        <h2>create new</h2>
        <form onSubmit={handleCreateBlog}>
          <div>
            <div>title: <input type='text' name='title' /></div>
            <div>author: <input type='text' name='author' /></div>
            <div>url: <input type='text' name='url' /></div>
            <div><button type='submit'>create</button></div>
           </div>
        </form>
      </div>
    )
  };

  const blogForm = () => {
    return(
      <div>
        <h2>Blogs</h2>
        { message && messageForm() }
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        {newForm()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
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
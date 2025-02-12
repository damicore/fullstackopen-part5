import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'
import BlogAdd from './components/BlogAdd'

const App = () => {
  const Notification = {
    NoNotif: 'NoNotif',
    BlogAdded: 'BlogAdded',
    LoginErr: 'LoginErr'
  }

  const blogFormRef = useRef()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [notifType, setNotiftype] = useState(Notification.NoNotif)
  const [notifMessage, setNotifMessage] = useState('')
  const [newBlogAdded, setNewBlogAdded] = useState(false)

  useEffect(() => {
    const loggedUserJSON = JSON.parse(window.localStorage.getItem("loggedAppUser"))
    if (loggedUserJSON) {
      setUser(loggedUserJSON)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
    if (newBlogAdded) {
      blogFormRef.current.toggleVisibility()
    }
  }, [newBlogAdded])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedUser = await loginService.login(username, password)
      if (loggedUser) {
        setUser(loggedUser)
        setUsername('')
        setPassword('')
        window.localStorage.setItem("loggedAppUser", JSON.stringify(loggedUser))
      }
    } catch (e) {
      setNotifMessage('Login failed.')
      setNotiftype(Notification.LoginErr)
      setTimeout(() => {
        setNotiftype(Notification.NoNotif)
      }, 5000)
      console.error(e);
      console.log('[error]login failed')
    }
  }

  const onPasswordChange = (value) => {
    setPassword(value)
  }

  const onUsernameChange = (value) => {
    setUsername(value)
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedAppUser")
    setUser('')
  }

  const NotificationComp = () => {
    let color
    let show

    switch (notifType) {
      case Notification.NoNotif:
        show = false
        break;
      case Notification.BlogAdded:
        show = true
        color = "green"
        break;
      case Notification.LoginErr:
        show = true
        color = "red"
        break;
      default:
        show = false
        break;
    }

    return show ? (
      <div style={{
        color: color,
        background: "grey",
        border: `2px solid ${color}`,
        padding: "10px",
        marginBottom: "10px",
        textAlign: "center"
      }}>
        {notifMessage}
      </div>
    ) : null
  }

  return (
    <div>
      <NotificationComp />
      {
        user ?
          <div>
            <h4>hello, {user.username}
              <button onClick={handleLogout}>log out</button></h4>
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
              <BlogAdd
                setNewBlogAdded={setNewBlogAdded}
                token={user.token}
                setNotiftype={setNotiftype}
                setNotifMessage={setNotifMessage}
              />
            </Togglable>
            <h2>Blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />)}
          </div>
          :
          <Togglable buttonLabel='login'>
            <LoginForm
              handleLogin={handleLogin}
              username={username}
              password={password}
              onUsernameChange={onUsernameChange}
              onPasswordChange={onPasswordChange}
            />
          </Togglable>
      }
    </div>
  )
}

export default App
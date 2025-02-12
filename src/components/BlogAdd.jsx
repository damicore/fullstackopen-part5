import { useState } from "react"
import blogService from "../services/blogs"

const BlogAdd = ({ 
  setNewBlogAdded, 
  token, 
  setNotiftype, 
  setNotifMessage 
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await blogService.create({ title, author, url }, token)
      setNotiftype('BlogAdded')
      setNewBlogAdded(true)
      setNotifMessage(`New blog ${title} added.`)
      setTimeout(() => {
        setNewBlogAdded(false)
        setNotiftype('NoNotif')
      }, 5000)
      setTitle('')
      setAuthor('')
      setURL('')
    } catch (err) {
      setNotifMessage('Failed to create blog')
      setNotiftype('LoginErr')
    }
  }

  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={handleSubmit}>
        <p>Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </p>
        <p>Author:
          <input
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </p>
        <p>URL:
          <input
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setURL(target.value)}
          />
        </p>
        <br/>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default BlogAdd
import { useState } from "react"

const Blog = ({ blog, likeOnClick, onDelete }, ref) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleOnclick = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        <button onClick={toggleOnclick}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={{ display: visible ? '' : "none" }}>
        {blog.url}
        <br />
        likes: {blog.likes}
        <button onClick={likeOnClick}>like</button>
        <br />
        {blog.user.username}
        <br /> 
        <button onClick={ onDelete }>remove</button>
      </div>
    </div >
  )
}

export default Blog
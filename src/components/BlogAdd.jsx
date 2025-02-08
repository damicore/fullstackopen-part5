const BlogAdd = ({
  handleTitleChange,
  handleAuthorChange,
  handleURLChange,
  title,
  author,
  url,
  handleSubmit}) => {
  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={handleSubmit}>
        <p>Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => handleTitleChange(target.value)}
          />
        </p>
        <p>Author:
          <input
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => handleAuthorChange(target.value)}
          />
        </p>
        <p>URL:
          <input
            type="text"
            name="author"
            value={url}
            onChange={({ target }) => handleURLChange(target.value)}
          />
        </p>
        <br/>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default BlogAdd
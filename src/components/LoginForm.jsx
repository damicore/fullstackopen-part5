const LoginForm = ({
  handleLogin,
  username,
  password,
  onUsernameChange,
  onPasswordChange }) => {
  return (
    <div>
      <h2>login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input 
            type="text" 
            name="username" 
            value={username} 
            onChange={({ target }) => onUsernameChange(target.value)}
          />
        </div>
        <div>
          password
          <input 
            type="password" 
            name="password" 
            value={password} 
            onChange={({ target }) => onPasswordChange(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
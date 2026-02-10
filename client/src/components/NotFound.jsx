import { useNavigate } from 'react-router-dom'

function NotFound() {

  document.title = ('404 Found')
  const navigate = useNavigate();

  return (
    <div style={{ flexDirection: 'column' }} className='d-flex vh-100 justify-content-center align-items-center'>
      <h1>404</h1>
      <p>Page Not Found</p>
      <small onClick={() => navigate('/')} className='btn btn-secondary px-3 py-1'>Back to home</small>
    </div>
  )
}

export default NotFound
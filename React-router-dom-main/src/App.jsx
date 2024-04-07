import './assets/css/App.css'
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Routes from './routes'
import { PostProvider } from './Context/PostContext';


function App() {

  return (
    <>
      <PostProvider>

        <Routes />
        
      </PostProvider>
    </>
  )
}

export default App

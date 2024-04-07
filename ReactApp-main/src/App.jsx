import './index.css'
import './App.css'
import Routes from './routes'
import { AuthProvider } from './context/AuthContext'
import { GoogleOAuthProvider } from '@react-oauth/google';




function App() {

  return (

    <>
      <GoogleOAuthProvider clientId="1073057583200-vk6vovgh6fng9evm8845b7ukt25bvl4n.apps.googleusercontent.com">


    <AuthProvider>

      <Routes/>

    </AuthProvider>

    </GoogleOAuthProvider>


    </>

  )
}

export default App

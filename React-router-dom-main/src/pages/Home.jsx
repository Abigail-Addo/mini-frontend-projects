import '../assets/css/home.css'
import Navbar from '../components/navbar'
import { Outlet } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    return (
        <>
            {/* <ToastContainer /> */}
            <Navbar />

            <Outlet />

        </>
    )
}

export default Home

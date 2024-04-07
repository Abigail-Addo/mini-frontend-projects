import './App.css';
import image from './assets/user.png'
import component from 'styled-components'
import { useState } from 'react';

const App = () => {
  const [background, setBackground] = useState('darkMode')

  const changeBackground = () => {
    setBackground('lightMode')
  }

  const Heading = component.h1`
  color: #0000ff;
  font-size: 2rem;
  text-align: center;
  `

  return (
    <>
      <div className={`container ${background} `}>
        <button onClick={() => changeBackground() }>Change background</button>
        <div>
          <img src={image} alt="user" />
        </div>
        <Heading>
          Abigail Addo
        </Heading>
        <h3>
          Software Developer Trainee
        </h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ullam doloribus vero reiciendis molestias, iusto pariatur dolorum cum ea delectus iste, nesciunt nobis dolore voluptas hic nam nulla ipsa, quisquam similique laudantium! </p>
        <div className="icons">
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-twitter-x"></i>
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-linkedin"></i>
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-github"></i>
          </a>
        </div>
      </div>
    </>
  )
}

export default App

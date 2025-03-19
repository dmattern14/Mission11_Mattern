import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import BookList from './BookList'

import './App.css'

function Header() {
  return (
      <header 
          className="bg-primary text-white text-center py-4 shadow"
          style={{ width: "90vw", position: "relative" }}
      >
          <h1 className="display-4 fw-bold">
              📚 Book List
          </h1>
          <p className="lead">Explore our collection of amazing books</p>
      </header>
  );
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <BookList />
    </>
  )
}

export default App

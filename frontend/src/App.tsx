import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import BookList from './BookList'

import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BookList />
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import CategoryFilter from './CategoryFilter'
import BookList from './BookList'
import CookieConsent from "react-cookie-consent"

function Header() {
  return (
    <header 
      className="bg-primary text-white text-center py-4 shadow"
      style={{ width: "80vw", position: "relative" }}
    >
      <h1 className="display-4 fw-bold">
          📚 Book List
      </h1>
      <p className="lead">Explore our collection of amazing books</p>
    </header>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <div className="container mt-4">
        {/* First Row for the Header */}
        <div className="row">
          <Header />
        </div>

        {/* Second Row with CategoryFilter and BookList */}
        <div className="row">
          <div className="col-md-3">
            {/* Category Filter on the left */}
            <br />
            <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
          </div>

          <div className="col-md-9">
            {/* Book List on the right */}
            <BookList selectedCategories={selectedCategories}/>
          </div>
        </div>
      </div>

      {/* Cookie Consent */}
      <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
    </>
  )
}

export default App

import { useState } from "react";
import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import Header from "../components/Header";
import CartSummary from "../components/CartSummary";
import { useEffect } from "react";



function ProjectsPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Inject CSS for flip-x class
const styleTag = document.createElement("style");
styleTag.innerHTML = `
  #walker.flip-x {
    transform: scaleX(-1);
  }
`;
document.head.appendChild(styleTag);


    useEffect(() => {
      // Inject CSS
      const styleTag = document.createElement("style");
      styleTag.innerHTML = `
        #walker.flip-x {
          transform: scaleX(-1);
        }
      `;
      document.head.appendChild(styleTag);
    
      const walker = document.createElement("img");
      walker.src = "/src/assets/walkerr 2.gif";
      walker.alt = "BYU Student Walking";
      walker.id = "walker";
      walker.style.position = "fixed";
      walker.style.width = "120px";
      walker.style.zIndex = "9999";
      walker.style.pointerEvents = "none";
      walker.style.transition = "top 0.04s linear, left 0.04s linear";
      walker.style.transformOrigin = "center center";
      walker.style.top = "0px";
      walker.style.left = "0px";
    
      document.body.appendChild(walker);
    
      let prevX = 0;
      let facingRight = true;
    
      const moveWalker = (e: MouseEvent) => {
        walker.style.left = `${e.clientX - 120}px`;
        walker.style.top = `${e.clientY - 120}px`;
    
        if (e.clientX > prevX && !facingRight) {
          walker.classList.remove("flip-x");
          facingRight = true;
        } else if (e.clientX < prevX && facingRight) {
          walker.classList.add("flip-x");
          facingRight = false;
        }
    
        prevX = e.clientX;
      };
    
      document.addEventListener("mousemove", moveWalker);
    
      return () => {
        document.removeEventListener("mousemove", moveWalker);
        walker.remove();
        styleTag.remove();
      };
    }, []);
    
    
    
    
    
    

    return(
        <>
        <div>
            <CartSummary />
        </div>
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
      </>
    );
}

export default ProjectsPage;


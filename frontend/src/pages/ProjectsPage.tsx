import { useState } from "react";
import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import Header from "../components/Header";
import CartSummary from "../components/CartSummary";


function ProjectsPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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


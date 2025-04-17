

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

export default Header;
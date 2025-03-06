import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#ff69b4" }}>
      <div className="container">
        <a className="navbar-brand text-white fw-bold">
        <img 
            src="src\assets\Untitled design (13).png"  // Change to your actual logo path
            alt="Logo" 
            width="40" 
            height="40" 
            className="d-inline-block align-top me-2"
          />
          Ally's To-do App
        </a>
      </div>
    </nav>
  );
}

export default Navbar;

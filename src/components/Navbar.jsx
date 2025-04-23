import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function OurNavbar() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{
        backgroundColor: "#ABE2FB",
        borderBottom: "2px solid #1d2a45",
        padding: "0.75rem 1rem",
        fontFamily: "Nunito, sans-serif",
        fontWeight: 600,
      }}
    >
      <Container>
        <Navbar.Brand
          href="/"
          style={{
            color: "#1d2a45",
            fontSize: "1.5rem",
            fontWeight: 800,
            letterSpacing: "-1px",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              background:
                "linear-gradient(to bottom, #dbe3ee 0%,#1d2a45 55%, #1d2a45 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text", // for Firefox
              color: "transparent", // ensures fallback
            }}
          >
            Exposure Explorer
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" style={{ gap: "1.25rem" }}>
            <div className="nav-link-wrapper">
              <Nav.Link href="/learn" className="nav-link-underline">
                Learn Settings
              </Nav.Link>
            </div>
            <div className="nav-link-wrapper">
              <Nav.Link href="/simulator" className="nav-link-underline">
                Interactive Simulator
              </Nav.Link>
            </div>
            <div className="nav-link-wrapper">
              <Nav.Link href="/practice" className="nav-link-underline">
                Quiz Mode
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <style>{`
        .nav-link-wrapper {
          display: inline-block;
        }

        .nav-link-underline {
          position: relative;
          display: inline-block !important;
          padding: 0.5rem 0;
          color: #1d2a45 !important;
          font-size: 1.1rem;
          text-decoration: none;
          font-weight: 700;
          border-radius: 90px;
        }

        .nav-link-underline::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0px;
          width: 0%;
          height: 2px;
          background-color: #1d2a45;
          transition: width 0.4s ease-in-out;
          border-radius: 90px;
        }

        .nav-link-underline:hover::after {
          width: 100%;
          border-radius: 90px;
        }
      `}</style>
    </Navbar>
  );
}

export default OurNavbar;

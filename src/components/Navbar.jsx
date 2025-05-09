import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import logo from "/exposure_explorer.png";

function OurNavbar() {
  const location = useLocation();

  const navItems = [
    { label: "Learn Settings", href: "/learn" },
    { label: "Interactive Simulator", href: "/simulator" },
    { label: "Quiz Mode", href: "/quiz" },
  ];

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{
        backgroundColor: "#ABE2FB",
        borderBottom: "2px solid #13275e",
        padding: "0.75rem 1rem",
        fontFamily: "Nunito, sans-serif",
        fontWeight: 600,
      }}
    >
      <Container>
        <Navbar.Brand
          href="/"
          style={{
            color: "#13275e",
            fontSize: "1.5rem",
            fontWeight: 800,
            letterSpacing: "-1px",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <img
            src={logo}
            alt="Exposure Explorer Logo"
            style={{
              width: "36px",
              height: "36px",
              objectFit: "contain",
              borderRadius: "6px",
              marginRight: "0.3rem",
            }}
          />
          <span>Exposure Explorer</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" style={{ gap: "1.25rem" }}>
            {navItems.map((item, idx) => {
              const isActive = location.pathname.startsWith(item.href);
              return (
                <div
                  key={idx}
                  className={`nav-link-wrapper ${isActive ? "active" : ""}`}
                >
                  <Nav.Link as={Link} to={item.href} className="nav-link-clean">
                    <span className="nav-link-text">
                      {item.label}
                      <span className="nav-corner nav-tl" />
                      <span className="nav-corner nav-tr" />
                      <span className="nav-corner nav-bl" />
                      <span className="nav-corner nav-br" />
                    </span>
                  </Nav.Link>
                </div>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>

      <style>{`
        .nav-link-wrapper {
          display: inline-block;
          margin: 0 0.6rem;
        }

        .nav-link-clean {
          font-size: 1.1rem;
          font-weight: 700;
          color: #13275e !important;
          text-decoration: none;
          padding: 0.5rem 1rem;
          display: inline-block;
        }

        .nav-link-text {
          position: relative;
          display: inline-block;
          padding: 0.25rem 0.4rem;
          transition: background-color 0.3s ease;
          border-radius: 6px;
        }

        .nav-link-wrapper.active .nav-link-text {
          background-color: rgba(255, 255, 255, 0.3);
        }

        /* Corners */
        .nav-corner {
          position: absolute;
          width: 8px;
          height: 8px;
          border: 2px solid #13275e;
          opacity: 0;
          transition: opacity 0.2s ease, border-color 0.5s ease;
          pointer-events: none;
          z-index: 1;
        }

        /* Hover: corners white */
        .nav-link-wrapper:hover .nav-corner {
          opacity: 1;
          border-color: white;
        }

        /* Active: corners white */
        .nav-link-wrapper.active .nav-corner {
          opacity: 1;
          border-color: white;
        }

        /* Corner positions */
        .nav-tl {
          top: 0;
          left: 0;
          border-right: none;
          border-bottom: none;
        }

        .nav-tr {
          top: 0;
          right: 0;
          border-left: none;
          border-bottom: none;
        }

        .nav-bl {
          bottom: 0;
          left: 0;
          border-right: none;
          border-top: none;
        }

        .nav-br {
          bottom: 0;
          right: 0;
          border-left: none;
          border-top: none;
        }

        .nav-link-wrapper:hover .nav-link-clean {
          color: rgba(29, 42, 69, 0.6) !important;
        }

        .nav-link-wrapper.active .nav-link-clean {
          color: rgba(29, 42, 69, 0.6) !important;
        }
      `}</style>
    </Navbar>
  );
}

export default OurNavbar;

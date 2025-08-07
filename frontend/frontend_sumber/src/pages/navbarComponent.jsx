import React, { use, useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const HeaderComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current page based on pathname
  const getCurrentPage = () => {
    if (location.pathname === '/') return 'dashboard';
    if (location.pathname === '/history') return 'history';
    if (location.pathname === '/umkm') return 'umkm';
    if (location.pathname === '/product') return 'product';
    return 'other';
  };

  const currentPage = getCurrentPage();

  // Function to handle navigation
  const handleNavigation = (sectionId) => {
    const section = sectionId.replace('#', '');
    
    // If we're on dashboard page, scroll to section
    if (currentPage === 'dashboard') {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // If we're on different page, navigate to dashboard with hash
      navigate(`/#${section}`);
    }
  };

  // Handle hash scrolling when component mounts or pathname changes
  useEffect(() => {
    if (currentPage === 'dashboard' && window.location.hash) {
      const elementId = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [currentPage]);

  const navLinks = [
    { href: '#galeri', label: 'Galeri' },
    { href: '#modul', label: 'Modul' },
    { href: '#potensi', label: 'Potensi' },
    { href: '#umkm', label: 'UMKM' }
  ];

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);

  return (
    <>
      {/* Bootstrap CSS */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm border-bottom sticky-top">
        <div className="container-fluid px-3 px-sm-4">
          {/* Logo & Title Section */}
          <a 
            className="navbar-brand d-flex align-items-center" 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage !== 'dashboard') {
                window.location.href = '/';
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="me-3">
              <div 
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)'
                }}
              >
                <span className="text-white fw-bold fs-5">S</span>
              </div>
            </div>
            <div>
              <h1 className="fs-4 fw-bold text-dark mb-0 lh-sm" onClick={() => navigator("/")}>
                Padukuhan Sumber
              </h1>
              <p className="small text-muted mb-0 d-none d-sm-block">
                Sistem Informasi Padukuhan Digital
              </p>
            </div>
          </a>

          

          {/* Right Side - Desktop Nav & Mobile Controls */}
          <div className="d-flex align-items-center gap-2">
            {/* Desktop Navigation */}
            <ul className="navbar-nav d-none d-lg-flex flex-row gap-3 me-3">
              {navLinks.map((link) => (
                <li key={link.href} className="nav-item">
                  <a 
                    className="nav-link fw-medium text-dark px-3 position-relative"
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(link.href);
                    }}
                    style={{
                      transition: 'color 0.2s ease',
                      textDecoration: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#0d6efd';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#212529';
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>



            {/* Mobile Menu Toggle */}
            <button 
              className="btn btn-outline-secondary d-lg-none border-0 p-2"
              onClick={handleShowOffcanvas}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Offcanvas Menu */}
      {showOffcanvas && (
        <>
          {/* Backdrop */}
          <div 
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
            style={{ zIndex: 1040 }}
            onClick={handleCloseOffcanvas}
          ></div>
          
          {/* Offcanvas */}
          <div 
            className="position-fixed top-0 end-0 h-100 bg-white shadow-lg"
            style={{ 
              width: '75%', 
              maxWidth: '350px',
              zIndex: 1045,
              transform: showOffcanvas ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.3s ease-in-out'
            }}
          >
            {/* Offcanvas Header */}
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
              <h5 className="fw-bold mb-0">Menu</h5>
              <button 
                className="btn btn-outline-secondary border-0 p-2"
                onClick={handleCloseOffcanvas}
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Offcanvas Body */}
            <div className="p-3">
              

              {/* Mobile Navigation Links */}
              <ul className="list-unstyled">
                {navLinks.map((link) => (
                  <li key={link.href} className="mb-1">
                    <a 
                      href={link.href}
                      className="d-block fw-medium text-dark py-3 px-3 rounded text-decoration-none"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(link.href);
                        handleCloseOffcanvas();
                      }}
                      style={{
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#e3f2fd';
                        e.target.style.color = '#0d6efd';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#212529';
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .navbar-brand:hover {
          color: inherit !important;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 50%;
          width: 0;
          height: 2px;
          background-color: #0d6efd;
          transition: all 0.2s ease;
          transform: translateX(-50%);
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        @media (max-width: 991.98px) {
          .nav-link::after {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default HeaderComponent;
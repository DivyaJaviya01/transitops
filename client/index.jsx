import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          Transit<span>Ops</span>
        </div>

        <ul className="nav-links">
          <li>Home</li>
          <li>Services</li>
          <li>Features</li>
          <li>About</li>
          <li>Contact</li>
        </ul>

        <div className="nav-buttons">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </nav>


      {/* Hero Section */}
      <section className="hero">

        <div className="hero-content">
          <h1>
            Smart Transportation
            <br />
            Management System
          </h1>

          <p>
            Manage drivers, vehicles, routes and operations
            efficiently with our intelligent transport solution.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              Get Started
            </button>

            <button className="secondary-btn">
              Learn More
            </button>
          </div>
        </div>


        <div className="hero-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3448/3448339.png"
            alt="transport"
          />
        </div>

      </section>


      {/* Features */}
      <section className="features">

        <h2>Our Features</h2>

        <div className="feature-container">

          <div className="card">
            <h3>🚍 Vehicle Management</h3>
            <p>
              Track and manage all vehicles from one dashboard.
            </p>
          </div>


          <div className="card">
            <h3>👨‍✈️ Driver Management</h3>
            <p>
              Maintain driver information and performance records.
            </p>
          </div>


          <div className="card">
            <h3>📍 Route Tracking</h3>
            <p>
              Monitor routes and improve transportation efficiency.
            </p>
          </div>


          <div className="card">
            <h3>📊 Analytics</h3>
            <p>
              Get real-time reports and operational insights.
            </p>
          </div>

        </div>

      </section>


      {/* About */}
      <section className="about">

        <h2>Why Choose TransitOps?</h2>

        <p>
          TransitOps provides a complete digital platform for
          transportation companies to automate daily operations,
          reduce costs and improve service quality.
        </p>

      </section>


      {/* Footer */}
      <footer>
        <p>
          © 2026 TransitOps. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
}

export default Home;
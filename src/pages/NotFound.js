import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Oops!</h2>
      <p style={styles.text}>The page you're looking for doesn't exist.</p>
      <Link to="/truecallerjs" style={styles.link}>
        Go back to Truecaller.js
      </Link>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f8f8f8",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "3rem",
    marginBottom: "1rem",
    color: "#333",
  },
  text: {
    fontSize: "1.5rem",
    marginBottom: "2rem",
    color: "#666",
  },
  link: {
    fontSize: "1.2rem",
    textDecoration: "none",
    color: "#0070f3",
  },
};

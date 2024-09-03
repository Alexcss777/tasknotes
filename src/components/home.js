import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={styles.hero}>
      <div style={styles.heroContent}>
        <h1 style={styles.heroTitle}>Tu camino más rápido para tomar notas</h1>
        <p style={styles.heroSubtitle}>Crea, edita y organiza tus ideas de manera eficiente.</p>
        <div style={styles.buttonContainer}>
          <Link to="/registro" style={{ ...styles.button, ...styles.primaryButton }}>Registro</Link>
          <Link to="/login" style={{ ...styles.button, ...styles.secondaryButton }}>Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  hero: {
    backgroundColor: '#0a0a23', // Azul oscuro
    color: 'white',
    textAlign: 'center',
    padding: '100px 0',
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 0,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  heroContent: {
    maxWidth: '600px',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  heroSubtitle: {
    fontSize: '20px',
    marginBottom: '40px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  button: {
    padding: '15px 30px',
    fontSize: '18px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    textDecoration: 'none',
    display: 'inline-block',
  },
  primaryButton: {
    backgroundColor: '#ffffff',
    color: '#0a0a23',
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    border: '2px solid #ffffff',
  },
};

export default HomePage;

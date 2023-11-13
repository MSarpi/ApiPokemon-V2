import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="mt-auto bg-dark text-white">
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>!Gracias por visitarme!</p>
            <p>Encuéntranos en las redes sociales:</p>
            <div style={{marginBottom: '1rem'}} >
					<a style={{color:'white', fontSize:'2rem', padding:'.5rem'}} href="https://api.whatsapp.com/send?phone=56957326432&text=Hola!%20vengo%20de%20tu%20pagina%20web" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>
					<a style={{color:'white', fontSize:'2rem', padding:'.5rem'}} href="https://www.linkedin.com/in/miguel-sarpi/" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a>
					<a style={{color:'white', fontSize:'2rem', padding:'.5rem'}} href="https://github.com/MSarpi" target="_blank"><i class="fa-brands fa-github"></i></a>
					<a style={{color:'white', fontSize:'2rem', padding:'.5rem'}} href="https://www.instagram.com/jinsei_ilustrador/?hl=es-la" target="_blank"><i class="fa-brands fa-instagram"></i></a>
			</div>
            <p>© Todos los derechos reservados a Pokémon Company International</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
import { useEffect, useState } from "react";
import Buscador from './component/componentes/Buscador';
import CardPokemon from './component/componentes/CardPokemon';
import pikachu from './component/img/pikachu_running.gif'

import './App.css';
import '../src/component/css/buscador.css';
import '../src/component/css/cardpokemon.css';
import '../src/component/css/modal_resultado_buscador.css';
import Footer from "./component/componentes/Footer";



function App() {

  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setIsLoading(false);
  }, 3200);

  return () => clearTimeout(timer);
}, []);

  return (
    <>
      <div className={`loading-screen ${isLoading ? '' : 'hidden'}`}>
      <div className='row'>
              <div className='col-3'>
                {/* <div className="overlay_4"></div>
                <div className="overlay_7"></div>
                <div className="overlay_150"></div> */}
              </div> 
              <div className='col-6'>
                <div className="overlay">
                </div>
                <div className="contenedor-centro">
                  <img
                    src={pikachu}
                    alt="Pikachu"
                    className="pikachu"
                  />
                </div>
              </div>
              <div className='col-3'>
                {/* <div className="overlay_1"></div>
                <div className="overlay_25"></div>
                <div className="overlay_151"></div> */}
              </div> 
            </div> </div>
      <div className="App">
        <header className="header">
          <div className="logo_pokemon">
            <div className='row'>
              <div className='col-3'>
                {/* <div className="overlay_4"></div>
                <div className="overlay_7"></div>
                <div className="overlay_150"></div> */}
              </div> 
              <div className='col-6'>
                <div className="overlay">
                </div>
              </div>
              <div className='col-3'>
                {/* <div className="overlay_1"></div>
                <div className="overlay_25"></div>
                <div className="overlay_151"></div> */}
              </div> 
            </div>
          </div>
          <Buscador/>
          
        </header>
        <div className="container-fluid bg-secondary altura"></div>
        <CardPokemon/>
        <Footer/>
      </div>
    </>

  );
}

export default App;

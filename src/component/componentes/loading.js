import React from 'react'
import Pikachurunning from "../img/pikachu_running.gif"
import pokedex from '../img/pokedex.png';
import portada from '../img/logo_pokemon_1.png'

import "../css/loading.css"

const loading = () => {
  return ( 
    <div className='backgroun'>
      
    <div className="container">
      <div className="row">
      
        <div className="col-12 d-flex justify-content-center">
        <div className="logo_pokemon">
          <div className='row'>
            <div className='col-3'>
            </div> 
            <div className='col-6'>
              <div className="overlay">
              </div>
            </div>
            <div className='col-3'>

            </div> 
          </div>
        </div>
          
          <img src={Pikachurunning} alt="Tu imagen" className="img-fluid"/>
          <div className='cargando_pokedex'>
          <div class="spinner-border text-warning" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          </div>
          
        </div>
        
      </div>
    </div>
    </div>

  )
}

export default loading;

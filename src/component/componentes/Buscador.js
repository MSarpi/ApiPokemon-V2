import React, { useState, useEffect } from 'react';
import 'select2';
import $ from 'jquery';
import { UseFetch } from '../api_conexion/UseFetch';
import toast, { Toaster } from 'react-hot-toast';
import Modal from './ModalBuscador';
import ModalBuscador from './ModalBuscador';

const Buscador = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [pokemonData, setPokemonData] = useState(null);
  const [allPokemon, setAllPokemon] = useState([]);
  const [selectedPokemonData, setSelectedPokemonData] = useState(null);

  const [selectedPokemon, setSelectedPokemon] = useState(''); // Estado para almacenar el valor seleccionado

  useEffect(() => {
    // Inicializa el select2 en el componente componentDidMount
    $('#searchInput').select2();

    // Obtiene la lista de todos los Pokémon y la almacena en el estado
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1300&offset=0')
      .then((response) => response.json())
      .then((data) => {
        setAllPokemon(data.results);
      });

    // Limpieza al desmontar el componente
    return () => {
      // Desinicializa el select2 para evitar problemas de memoria
      if ($('#searchInput').data('select2')) {
        $('#searchInput').select2('destroy');
      }
    };
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const searchTerm = document.getElementById('searchInput').value;

    fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        toast.loading('Searching...');

        setTimeout(() => {
          toast.dismiss();
          setPokemonData(data);
          setShowModal(true);
          toast.success('Pokemon found.');
        }, 2000);
      })
      .catch((error) => {
        toast.loading('Buscando');

        setTimeout(() => {
          toast.dismiss();
          toast.error('You must select a Pokémon');
        }, 1500);
      });
      setSelectedPokemon(searchTerm);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const closeModal = () => {
    setShowModal(false);
    setPokemonData(null);
  };


  const handleModalSearch = () => {
    setSelectedPokemonData(pokemonData);
    setShowModal(true);
  };

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <div className="row buscador">
          <div className="col-sm-10">
            <select
              id="searchInput"
              className="form-control select2"
              aria-label=".form-select-lg example"
              onChange={(e) => setSelectedPokemon(e.target.value)} // Actualiza el estado al seleccionar un valor
            >
                           <option className="select2" value="">
                 Pokemon name or ID
              </option>
               {allPokemon.map((pokemon) => {
                const urlParts = pokemon.url.split('/');
                const pokemonNumber = urlParts[urlParts.length - 2];

                const inputString = pokemon.name;
                const firstLetter = inputString.charAt(0).toUpperCase();
                const restOfString = inputString.slice(1);
                const result = firstLetter + restOfString;

                const Quitarmenos = result;
                const stringWithSpace = Quitarmenos.replace(/-/g, ' ');
                return (
                  <option className="" key={pokemon.name} value={pokemon.name}>
                    Nº {pokemonNumber} - {stringWithSpace}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-sm-2">
            <button
              type="button"
              className="btn btn-lg btn_mood"
              onClick={() => {
                handleSearch();
                setShowModal(true);
              }}
            >
              Search
            </button>
          </div>
        </div>
      </form>

      <ModalBuscador
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Pokemon Modal"
        pokemon={pokemonData} // Pasa el valor seleccionado al componente ModalBuscador
        onClose={closeModal}
      />
    </div>
  );

};

export default Buscador;

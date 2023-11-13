import React, { useState, useEffect, useRef  } from 'react';
import ModalPokemon from './ModalPokemon';
import { UseFetch } from '../api_conexion/UseFetch';
import { Container, Row, Col, Card, Accordion, Form } from 'react-bootstrap';
import 'select2';
import Pagination from './Pagination';

import pk_1013 from '../img/1013.png';
import pk_10143 from '../img/10143.png';
import pk_10264 from '../img/10264.png';
import pk_10265 from '../img/10264 - 10265.png';
import pk_10266 from '../img/10266.png';
import pk_10267 from '../img/10267.png';
import pk_10268 from '../img/10268.png';
import pk_10269 from '../img/10269.png';
import pk_10270 from '../img/10270.png';
import pk_10271 from '../img/10271.png';
import pk_10272 from '../img/10272.png';
import pk_10273 from '../img/10273.png';
import pk_10274 from '../img/10274.png';
import pk_10275 from '../img/10275.png';
import pokedex from '../img/pokedex.png';
 
function CardPokemon() {

    const [loadingGeneration, setLoadingGeneration] = useState(false);
    const tuRef = useRef(); 
    const [pagina, setPagina] = useState(1);
    const elementosPorPagina = 20; 
    const [cargando, setCargando] = useState(false);
    const [selectedValue1, setSelectedValue1] = useState("");
    const [selectedValue2, setSelectedValue2] = useState("");
    const pokemonPerPage = 9; 
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);
    const [selectedValue, setSelectedValue] = useState('0');
    const [inputValue, setInputValue] = useState(151);
    const [GetValue, setGetValueValue] = useState('Generation I');

    const handleSelectChange = (event) => {

        const value = event.target.value;
        setInputValue(value);
        setGetValueValue(value);
      
        // Agrega el siguiente bloque para mostrar la carga
        setLoadingGeneration(true);
      
        {
            if (value === '151') {
                setSelectedValue(0);
                setGetValueValue('Generation I');
            }
        
            if (value === '100') {
                setSelectedValue(151);
                setGetValueValue('Generation II');
            }
        
            if (value === '135') {
                setSelectedValue(251);
                setGetValueValue('Generation III');
            }
        
            if (value === '107') {
                setSelectedValue(386);
                setGetValueValue('Generation IV');
            }
        
            if (value === '155') {
                setSelectedValue(494);
                setGetValueValue('Generation V');
            }
        
            if (value === '72') {
                setSelectedValue(649);
                setGetValueValue('Generation VI');
            }
        
            if (value === '88') {
                setSelectedValue(721);
                setGetValueValue('Generation VII');
            }
        
            if (value === '96') {
                setSelectedValue(809);
                setGetValueValue('Generation VIII');
            }
        
            if (value === '112') {
                setSelectedValue(905);
                setGetValueValue('Generation IX');
            }
        
            if (value === '283') {
                setSelectedValue(1017);
                setGetValueValue('eXTRAS');
            }
        }
    };

    const { pokemonList, loading } = UseFetch(`https://pokeapi.co/api/v2/pokemon?limit=${inputValue}&offset=${selectedValue}`);
    const { TypeList, loadingType } = UseFetch(`https://pokeapi.co/api/v2/type`);

    const obtenerMasPokemones = async () => {
        if (cargando) return; // Evitar solicitudes simultáneas
        setCargando(true);
        const respuesta = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${elementosPorPagina}&offset=${(pagina - 1) * elementosPorPagina}`
        );
        const datos = await respuesta.json();
        // Procesar los datos y agregarlos a la lista existente de Pokémon
        setPagina(pagina + 1);
        setCargando(false);
    };
    // Usa IntersectionObserver para detectar cuando el usuario se acerca al final de la página
    useEffect(() => {
        const opciones = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0, // Cuando el elemento está completamente en el área visible
        };

    const observador = new IntersectionObserver((entradas) => {
        if (entradas[0].isIntersecting) {
        obtenerMasPokemones();
        }
    }, opciones);

    // Asocia el observador a un elemento (por ejemplo, un div con todas las tarjetas de Pokémon)
    if (tuRef.current) {
        observador.observe(tuRef.current);
    }

    return () => {
        if (tuRef.current) {
        observador.unobserve(tuRef.current);
        }
    };
    }, [pagina]);

    useEffect(() => {
        filterPokemonList();
    }, [selectedValue1, selectedValue2, pokemonList]);

    const calculateVisiblePokemon = () => {
        const startIndex = (currentPage - 1) * pokemonPerPage;
        const endIndex = startIndex + pokemonPerPage;
        return filteredPokemonList.slice(startIndex, endIndex);
    };

    const filterPokemonList = () => {
        if (pokemonList) { // Verifica si pokemonList no es null o undefined
            const filteredList = pokemonList.filter((pokemon) => {
                const type1 = selectedValue1;
                const type2 = selectedValue2;
                if (type1 === '' && type2 === '') {
                    return true;
                }
                return (
                    (type1 === '' || pokemon.types.some((type) => type.type.name === type1)) &&
                    (type2 === '' || pokemon.types.some((type) => type.type.name === type2))
                );
            });
            setFilteredPokemonList(filteredList);
            setCurrentPage(1); // Restablece la página a la primera cuando se aplican filtros.
        }
    };

    const totalPages = Math.ceil(filteredPokemonList.length / pokemonPerPage);

    const visiblePokemon = calculateVisiblePokemon();
    
    return ( 
        <div>
            {loading &&  loadingType && GetValue && inputValue && visiblePokemon && totalPages && loadingGeneration ? (
            // Si loading es true, muestra un pre-cargador o una animación de carga
            <div className="loading-indicator">Loading...</div>
            ) : (
            // Si loading es false, muestra el contenido una vez que la solicitud esté completa
            <div>

            {/* Container portada mas nombre de generacion */}
            <Container>
                <div className="d-flex justify-content-center align-items-center ">
                    <img className='img_pokedex' src={pokedex}></img>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                <strong><p className='generacion_name' onChange={(e) => setGetValueValue(e.target.value)}>{GetValue}</p></strong>
                </div>
            </Container>

            {/* Container - Filtro por generacion y Tipo */}
            <Container className='mb-4'>
                <Row>
                    <Col xl={6} lg={4} md={4} sm={12}>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header><h5>Filter by generation</h5></Accordion.Header>
                                <Accordion.Body>
                                    <h5>Select a generation.</h5>
                                    <select className='form-control'  onChange={handleSelectChange}>
                                        <option value={selectedValue} selected disabled>Ej: Generacion III</option>
                                        <option value="151">Generación I</option>
                                        <option value="100">generacion II</option>
                                        <option value="135">generacion III</option>
                                        <option value="107">generacion IV</option>
                                        <option value="155">generacion V</option>
                                        <option value="72">generacion VI</option>
                                        <option value="88">generacion VII</option>
                                        <option value="96">generacion VIII</option>
                                        <option value="112">generacion IX</option>
                                        {/* <option value="283">Extras</option> */}
                                        {/* Otras opciones de generación si es necesario */}
                                    </select>
                                    <div className="d-grid gap-2 mt-3">
                                        <button className="btn btn-danger" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo" onClick={() => { setSelectedValue(0); setInputValue(151); }}>
                                            Clean
                                        </button>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                    <Col xl={6} lg={8} md={8} sm={12}>
                        <Accordion>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header><h5>Filter by type</h5></Accordion.Header>
                                <Accordion.Body>
                                <div className='row '>
                                        <div className='col-sm-6 ' style={{marginBottom: "20px"}}> 
                                            <h5>Seleccione un tipo</h5>  
                                            <select className="form-control" onChange={(e) => setSelectedValue1(e.target.value)}>
                                                <option value={"1"} selected disabled>Ej: Fire</option>
                                                {TypeList.map((type) => (
                                                <option value={type.name} key={type.name}>{type.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        
                                        <div className='col-sm-6 ' > 
                                            <h5>Seleccione un tipo (opcional)</h5>    
                                            <select className="form-control" onChange={(e) => setSelectedValue2(e.target.value)}>
                                                <option value={"1"}selected disabled>Ej: Fire</option>
                                                {TypeList.map((type) => (
                                                <option value={type.name} key={type.name}>{type.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2">
                                                <button className="btn btn-danger" id="headingOne" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" onClick={() => { setSelectedValue1(''); setSelectedValue2(''); }}>
                                                    Clean
                                                </button>
                                            </div> 
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row className='card-pokemon-border-mood' ref={tuRef}>
                { visiblePokemon.map((pokemon, index) => (

                    <Col xl={4} lg={6} md={6} sm={12} key={index}>
                        
                        {pokemon.sprites.other['official-artwork'].front_default ? (
                            //Pokemones que se encuentran en el sistema y se rellenan con sus datos respectivos
                            <Card className='card-pokemon-border'> 
                                <Card.Title  className='card-body card-body-titulo'>
                                    <Row>
                                        <Col style={{textAlign: "center"}} className='col-12'>
                                            <h5 className="id_number_pk">#{pokemon.id}</h5>
                                            <a className="pk_miniatura"> <img src={pokemon.sprites.front_default}/></a>
                                            <strong>
                                            <p  className="card-title card-name-pokemon">
                                                {pokemon.name
                                                    .split('-') // Dividir la cadena en un array en cada "-"
                                                    .map((word, index) => 
                                                        index === 0 // Verificar si es la primera palabra
                                                        ? word.charAt(0).toUpperCase() + word.slice(1) // Convertir la primera letra en mayúscula
                                                        : word // Mantener las otras palabras sin cambios
                                                    )
                                                    .join(' ')
                                                    .split(' ') // Dividir la cadena por espacios
                                                    .map((word, index, words) =>
                                                        index === 0 && words.length > 1 // Reemplazar el primer espacio si hay más de una palabra
                                                        ? word + ':'
                                                        : word.charAt(0).toUpperCase() + word.slice(1) // Convertir la primera letra en mayúscula
                                                    )
                                                    .join(' ')
                                                }
                                            </p>
                                        </strong> 
                                        </Col>
                                    </Row>
                                </Card.Title>
                                <Card.Body>
                                {
                                    // Casos con un solo tipo
                                    (pokemon.types[0] && !pokemon.types[1]) && (
                                        <div className={`background-${pokemon.types[0].type.name} card-pokemon background-common`}>
                                        <img className="card-img-top img_pokemon" src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
                                        </div>
                                    )
                                }

                                {
                                    // Casos con dos tipos
                                    (pokemon.types[0] && pokemon.types[1]) && (
                                        <div className={`background-${pokemon.types[0].type.name}-${pokemon.types[1].type.name} card-pokemon background-common`}>
                                        <img className="card-img-top img_pokemon" src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
                                        </div>
                                    )
                                }

                                {
                                // Caso por defecto (cuando no coincide con ninguno de los casos anteriores)
                                    (!pokemon.types[0]) && (
                                        <div>
                                        
                                        </div>
                                    )
                                }
                                <Row className='pokemon-type'>
                                    <Col className='col-3'></Col>
                                    <Col className='col-6'>
                                        <div className="btn-group d-flex justify-content-center" role="group" aria-label="Tipos de Pokémon">
                                            <p className={`btn background-${pokemon.types[0].type.name}`}>
                                                {pokemon.types[0].type.name}
                                            </p>
                                            {pokemon.types.length > 1 ? 
                                            <p className={`btn background-${pokemon.types[1].type.name}`}>
                                            {pokemon.types[1].type.name}
                                            </p>
                                            : ''}
                                        </div>
                                    </Col>
                                    <Col className='col-3'></Col>
                                    </Row>
                                    <div className='type-description'>
                                        <div>
                                            <div className="text-center">
                                                <ModalPokemon pokemon={pokemon} />
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        ) : (
                            //Pokemones que no se encuentran en el sistema y se agregaron manualmente
                            <Card className='card-pokemon-border'>
                                <Card.Title  className='card-body card-body-titulo'>
                                    <Row>
                                        <Col style={{textAlign: "center"}} className='col-12'>
                                            <h5 className="id_number_pk">#{pokemon.id}</h5>
                                            <a className="pk_miniatura"> <img src={pokemon.sprites.front_default}/></a>
                                            <strong>
                                            <p  className="card-title card-name-pokemon">
                                                {pokemon.name
                                                    .split('-') // Dividir la cadena en un array en cada "-"
                                                    .map((word, index) => 
                                                        index === 0 // Verificar si es la primera palabra
                                                        ? word.charAt(0).toUpperCase() + word.slice(1) // Convertir la primera letra en mayúscula
                                                        : word // Mantener las otras palabras sin cambios
                                                    )
                                                    .join(' ')
                                                    .split(' ') // Dividir la cadena por espacios
                                                    .map((word, index, words) =>
                                                        index === 0 && words.length > 1 // Reemplazar el primer espacio si hay más de una palabra
                                                        ? word + ':'
                                                        : word.charAt(0).toUpperCase() + word.slice(1) // Convertir la primera letra en mayúscula
                                                    )
                                                    .join(' ')
                                                }
                                            </p>
                                        </strong> 
                                        </Col>
                                    </Row>
                                </Card.Title>
                                <Card.Body>
                                { //Pokemones que no estaban en la api, se tuvieron que agregar manualmente
                                pokemon.name.endsWith('sinistcha') ? (
                                    <div className={`background-${pokemon.types[0].type.name}-${pokemon.types[1].type.name} card-pokemon background-common`}>
                                    <img className="card-img-top img_pokemon" src={pk_1013} alt={pokemon.name} />
                                    </div>
                                    ) : pokemon.name.endsWith('mimikyu-busted') ? (
                                        <div className={`background-${pokemon.types[0].type.name}-${pokemon.types[1].type.name} card-pokemon background-common`}>
                                        <img className="card-img-top img_pokemon" src={pk_10143} alt={pokemon.name} />
                                        </div>
                                    ) : pokemon.name.endsWith('mimikyu-totem-busted') ? (
                                        <div className={`background-${pokemon.types[0].type.name}-${pokemon.types[1].type.name} card-pokemon background-common`}>
                                        <img className="card-img-top img_pokemon" src={pk_10143} alt={pokemon.name} />
                                        </div>
                                    ):pokemon.name.endsWith('koraidon-limited-build') ? (
                                        <div className={`background-${pokemon.types[0].type.name}-${pokemon.types[1].type.name} card-pokemon background-common`}>
                                        <img className="card-img-top img_pokemon" src={pk_10264} alt={pokemon.name} />
                                        </div>
                                    ):pokemon.name.endsWith('koraidon-sprinting-build') ? (
                                        <div className={`background-${pokemon.types[0].type.name}-${pokemon.types[1].type.name} card-pokemon background-common`}>
                                        <img className="card-img-top img_pokemon" src={pk_10265} alt={pokemon.name} />
                                        </div>
                                    ):pokemon.name.endsWith('koraidon-gliding-build') ? (
                                        <div className={`background-${pokemon.types[0].type.name}-${pokemon.types[1].type.name} card-pokemon background-common`}>
                                        <img className="card-img-top img_pokemon" width={"100%"} src={pk_10267} alt={pokemon.name} />
                                        </div>
                                    ):pokemon.name.endsWith('miraidon-low-power-mode') ? (
                                        <div className={`background-${pokemon.types[0].type.name}-${pokemon.types[1].type.name} card-pokemon background-common`}>
                                        <img className="card-img-top img_pokemon" width={"100%"} src={pk_10268} alt={pokemon.name} />
                                        </div>
                                    ):pokemon.name.endsWith('miraidon-drive-mode') ? (
                                        <div className={`background-${pokemon.types[0].type.name}-${pokemon.types[1].type.name} card-pokemon background-common`}>
                                        <img className="card-img-top img_pokemon" width={"100%"} src={pk_10269} alt={pokemon.name} />
                                        </div>
                                    ):pokemon.name.endsWith('miraidon-glide-mode') ? (
                                        <div className={`background-${pokemon.types[0].type.name}-${pokemon.types[1].type.name} card-pokemon background-common`}>
                                        <img className="card-img-top img_pokemon" width={"100%"} src={pk_10271} alt={pokemon.name} />
                                        </div>
                                    ):pokemon.name.endsWith('miraidon-glide-mode') ? (
                                        <div className={`background-${pokemon.types[0].type.name}-${pokemon.types[1].type.name} card-pokemon background-common`}>
                                        <img className="card-img-top img_pokemon" width={"100%"} src={pk_10271} alt={pokemon.name} />
                                        </div>
                                    ):pokemon.name.endsWith('ursaluna-bloodmoon') ? (
                                        <div className={`background-${pokemon.types[0].type.name}-${pokemon.types[1].type.name} card-pokemon background-common`}>
                                        <img className="card-img-top img_pokemon" width={"100%"} src={pk_10272} alt={pokemon.name} />
                                        </div>
                                    ):pokemon.name.endsWith('ogerpon-wellspring-mask') ? (
                                        <div className={`background-${pokemon.types[0].type.name}-${pokemon.types[1].type.name} card-pokemon background-common`}>
                                        <img className="card-img-top img_pokemon" width={"100%"} src={pk_10273} alt={pokemon.name} />
                                        </div>
                                    ):pokemon.name.endsWith('ogerpon-hearthflame-mask') ? (
                                        <div className={`background-${pokemon.types[0].type.name}-${pokemon.types[1].type.name} card-pokemon background-common`}>
                                        <img className="card-img-top img_pokemon" width={"100%"} src={pk_10274} alt={pokemon.name} />
                                        </div>
                                    ):pokemon.name.endsWith('ogerpon-cornerstone-mask') ? (
                                        <div className={`background-${pokemon.types[0].type.name}-${pokemon.types[1].type.name} card-pokemon background-common`}>
                                        <img className="card-img-top img_pokemon" width={"100%"} src={pk_10275} alt={pokemon.name} />
                                        </div>
                                    ):pokemon.name.endsWith('koraidon-swimming-build') ? (
                                        <div className={`background-${pokemon.types[0].type.name}-${pokemon.types[1].type.name} card-pokemon background-common`}>
                                        <img className="card-img-top img_pokemon" width={"100%"} src={pk_10270} alt={pokemon.name} />
                                        </div>
                                    ):pokemon.name.endsWith('miraidon-aquatic-mode') ? (
                                        <div className={`background-${pokemon.types[0].type.name}-${pokemon.types[1].type.name} card-pokemon background-common`}>
                                        <img className="card-img-top img_pokemon" width={"100%"} src={pk_10266} alt={pokemon.name} />
                                        </div>
                                    ):(
                                        <div/>
                                    )
                                }
                                <Row className='pokemon-type'>
                                    <Col className='col-3'></Col>
                                    <Col className='col-6'>
                                    <div className="btn-group d-flex justify-content-center" role="group" aria-label="Tipos de Pokémon">
                                        <p className={`btn background-${pokemon.types[0].type.name}`}>
                                            {pokemon.types[0].type.name}
                                        </p>
                                            {pokemon.types.length > 1 ? 
                                        <p className={`btn background-${pokemon.types[1].type.name}`}>
                                        {pokemon.types[1].type.name}
                                        </p>
                                        : ''}
                                    </div>
                                    </Col>
                                    <Col className='col-3'></Col>
                                </Row>
                                <div className='type-description'>
                                    <div>
                                    <div className="text-center">
                                    <ModalPokemon pokemon={pokemon} />
                                    </div>
                                    </div>
                                </div>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                ))}
                </Row>
            </Container>

            <div className='row'>
                <div className='col-sm-4'></div>
                    <div className='col-sm-4'>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                        />          
                    </div>
                <div className='col-sm-4'></div>
            </div>
        </div>      
    )}
</div>);}

export default CardPokemon;

import React, { useState, useEffect } from 'react'; 

export function UseFetch(url) {
    const [pokemonList, setPokemonList] = useState([]);
    const [TypeList, setType] = useState([]);
    const [DescriptionList, setDescription] = useState([]);

    useEffect(() => {
        // Function to obtain a list of Pokémon
        const getPokemonList = async (url) => {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        };

        // Function to obtain the details of a Pokémon
        const getPokemonDetails = async (url) => {
            const response = await fetch(url);
            const data = await response.json();
        
          
            return data;
          };

        const fetchPokemonData = async () => {
            const initialPokemonList = await getPokemonList(url);
            const promises = initialPokemonList.results.map(pokemon => getPokemonDetails(pokemon.url));
            const pokemonDataList = await Promise.all(promises);
            setPokemonList(pokemonDataList);
        };

        
        // Function to obtain a list of Pokémon
        const getTypeList = async (url) => {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        };

        // Function to obtain the details of a Pokémon 
        const getTypeDetails = async (url) => {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        };

        const fetchTypeData = async () => {
            const initialTypeList = await getTypeList(url);
            const promisesType = initialTypeList.results.map(type => getTypeDetails(type.url));
            const pokemonTypeList = await Promise.all(promisesType);
            setType(pokemonTypeList);
        };

        // Function to obtain a list of Pokémon
        const getDescriptionList = async (url) => {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        };

        // Function to obtain the details of a Pokémon
        const getDescriptionDetails = async (url) => {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        };

        const fetchDescriptionData = async () => {
            const initialDescription = await getDescriptionList(url);
            const promisesDescription = initialDescription.results.map(type => getDescriptionDetails(type.url));
            const pokemonDescriptionList = await Promise.all(promisesDescription);
            setDescription(pokemonDescriptionList);
        };

        fetchPokemonData();
        fetchTypeData();
        fetchDescriptionData();
    }, [url]); // Add 'url' as a dependency to re-fetch when the URL changes

    return { pokemonList, TypeList, DescriptionList }; // Return the fetched data
}
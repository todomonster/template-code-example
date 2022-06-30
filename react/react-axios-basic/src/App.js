import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useCallback } from "react";

// api
import { apiPokemon } from "./apis/api.js";

function App() {
  const [pokemon, setPokemon] = useState({});

  // axios
  const getPokemon = useCallback(async (id) => {
    const data = await apiPokemon(id);
    setPokemon(data);
  }, []);

  // fetch
  const fetchPokemon = useCallback(async (id) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, {})
      .then((response) => response.json())
      .then((jsonData) => {
        setPokemon(jsonData);
      })
      .catch((err) => {
        console.log("錯誤:", err);
      });
  });

  // mounted
  useEffect(() => {
    // getPokemon(25);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => getPokemon(-25)}>封裝AXIOS</button>
        <br />
        <button onClick={() => fetchPokemon(-25)}>fetch</button>
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          <li>{pokemon?.name}</li>
        </ul>
        {pokemon?.sprites ? (
          <img src={pokemon?.sprites?.front_default} alt="pokemonImg" />
        ) : (
          <></>
        )}
      </header>
      <button>GET</button>
    </div>
  );
}

export default App;

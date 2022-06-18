import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useCallback } from "react";

// api
import { apiPokemon } from "./apis/api.js";

function App() {
  const [pokemon, setPokemon] = useState({});

  // ========================= 寫法一 分離 可是我覺得很醜
  // 參考: https://devtrium.com/posts/async-functions-useeffect
  const getPokemon = useCallback(async (id) => {
    console.log("start，嚴格模式下會render 2次");
    const data = await apiPokemon(id);
    console.log("components呼叫API成功:", data);
    setPokemon(data);
  }, []);

  useEffect(() => {
    getPokemon(25);
  }, []);

  // =========================寫法二 我覺得很醜
  // useEffect(() => {
  //   const getPokemon = async (id) => {
  //     console.log("start，嚴格模式下會render 2次");
  //     const get = await apiPokemon(id);
  //     console.log("components呼叫API成功:",get);
  //     setPokemon(get);
  //   };
  //   getPokemon(25);
  //   console.log("render");
  // }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          <li>{pokemon?.name}</li>
        </ul>
        <img src={pokemon?.sprites?.front_default} alt="pokemonImg" />
      </header>
    </div>
  );
}

export default App;

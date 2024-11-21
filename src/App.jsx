import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [temperatura, setTemperatura] = useState("");
  const [conversor, setConversor] = useState("");
  const [temperaturaConvertida, setTemperaturaConvertida] = useState("");

  // Função para buscar dados da API
  async function fetchData() {
    try {
      const response = await fetch("http://localhost:8080/");
      if (!response.ok) {
        throw new Error("Erro na requisição");
      }
      const data = await response.json();
      console.log("Dados recebidos:", data); // Exibe os dados recebidos
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  // para enviar dados, como em um formulário
  async function postData() {
    try {
      const response = await fetch(`http://localhost:8080/?temperatura=${temperatura}&conversor=${conversor}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Erro na requisição");
      }
  
      const data = await response.json();
      setTemperaturaConvertida(`${data.temperatura}°`);
      console.log("Resposta do servidor:", data);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  }
  

  return (
    <>
      <div className="main">
        <div className="container">
          <h1 className="h2-temp">Converter para:</h1>
          <select
            name="conversor"
            className="select-temp"
            value={conversor}
            onChange={(e) => setConversor(e.target.value)}
          >
            <option value="" className="option-temp">
              Selecione
            </option>
            <option value="C" className="option-temp">
              Celsius
            </option>
            <option value="F" className="option-temp">
              Fahrenheit
            </option>
          </select>
          <input
            type="number"
            className="input-temp"
            placeholder="Temperatura"
            value={temperatura}
            onChange={(e) => setTemperatura(e.target.value)}
          />
          <button onClick={postData} className="button-converter">
            Converter
          </button>
          <h2 className="h2-temp"> {temperaturaConvertida} </h2>
        </div>
      </div>
    </>
  );
}

export default App;

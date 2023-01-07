import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "./Modal";
function App() {
  const [name, setName] = useState("");
  const [quote, setQuote] = useState(null);
  const [loader, setLoader] = useState(null);

  const fetchApi = () => {
    setLoader(true);
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => setQuote(response.data.slip.advice))
      .catch((err) => console.log(err))
      .finally(() => {
        setLoader(false);
      });
  };

  function handleChange(event) {
    setName(event.target.value);
  }

  function resetQuote() {
    quote
      ? setTimeout(() => {
          setQuote(null);
          setName("");
        }, 2000)
      : null;
  }

  useEffect(() => {
    resetQuote();
  }, [quote]);

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center bg-slate-100 font-poppins ">
      <div className="w-[400px] flex flex-col gap-10">
        <div className="text-3xl items-center ">
          Olá digite seu nome para receber sua frase do dia...
        </div>
        <div className="flex w-full justify-between">
          <input
            value={name}
            onChange={handleChange}
            placeholder="Digite seu nome"
            className="h-10 w-56 outline-none border border-neutral-400 rounded-md pl-4 bg-slate-100"
          />
          <button
            className="bg-red-500 rounded-md w-40 text-white text-lg"
            onClick={() => fetchApi()}
            disabled={!name}
          >
            Clique aqui
          </button>
        </div>
      </div>
      {quote && (
        <Modal className="absolute w-[700px] h-[200px] bg-white border border-neutral-400 rounded-lg p-10">
          <div className="flex flex-col gap-3">
            <p className="text-2xl">Ola {name}, sua frase do dia é:</p>
            <p className="text-xl font-bold">{quote}</p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;

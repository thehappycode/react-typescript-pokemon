import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import PokemonCollection from './components/PokemonCollection';
import { API } from './constants';
import { IPokemons, IPokemon, IViewDetail } from './interfaces/IPokemon';

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [viewDetail, setViewDetail] = useState<IViewDetail>({ id: 0, isOpened: false })
  useEffect(() => {
    const getPokemon = async () => {
      const url = `${API.BASE_URL}?limit=${API.LIMIT}&offset=${API.OFFSET}`;
      const resPokemons = await axios.get(url);
      resPokemons.data.results.forEach(async (dt: IPokemons) => {
        setNextUrl(resPokemons.data.next);
        const resPokemon = await axios.get(`${API.BASE_URL}/${dt.name}`);
        setPokemons(pokemon => [...pokemon, resPokemon.data]);
      });
      setIsLoading(false);
    }
    getPokemon();
  }, []);
  const handleLoadMore = async () => {
    setIsLoading(true);
    const resPokemons = await axios.get(nextUrl);
    resPokemons.data.results.forEach(async (dt: IPokemons) => {
      setNextUrl(resPokemons.data.next);
      const resPokemon = await axios.get(`${API.BASE_URL}/${dt.name}`);
      setPokemons(pokemon => [...pokemon, resPokemon.data]);
    });
    setIsLoading(false);
  }
  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonCollection
          pokemons={pokemons}
          viewDetail={viewDetail}
          setViewDetail={setViewDetail}
        />
        <div className="btn">
          {!viewDetail.isOpened &&
            <button onClick={handleLoadMore}>
              {isLoading ? 'Loading...' : 'Load more'}
            </button>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
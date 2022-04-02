import React from 'react'
import { IPokemon, IPokemonDetail, IViewDetail } from '../interfaces/IPokemon'
import PokemonItem from './PokemonItem';
import "./Pokemon.css"

interface Props {
    pokemons: IPokemonDetail[];
    viewDetail: IViewDetail,
    setViewDetail: React.Dispatch<React.SetStateAction<IViewDetail>>
}

const PokemonCollection: React.FC<Props> = (props) => {
    const { pokemons, viewDetail, setViewDetail } = props;
    const onClickPokemon = (id: number) => {
        if (!viewDetail.isOpened)
            setViewDetail({ id: id, isOpened: true })
    }
    return (
        <>
            <section className={viewDetail.isOpened
                ? "collection-container-active"
                : "collection-container"}
            >
                {viewDetail.isOpened
                    ? <div className="overlay"></div>
                    : <div className=""></div>
                }
                {pokemons.map(pokemon => (
                    <div onClick={() => onClickPokemon(pokemon.id)}>
                        <PokemonItem
                            key={pokemon.id}
                            name={pokemon.name}
                            id={pokemon.id}
                            image={pokemon.sprites.front_default}
                            abilities={pokemon.abilities}
                            viewDetail={viewDetail}
                            setViewDetail={setViewDetail}
                        />
                    </div>
                ))}
            </section>
        </>
    )
}

export default PokemonCollection
import React, { useEffect, useState } from 'react'
import { IViewDetail } from '../interfaces/IPokemon';

interface Props {
    id: number;
    name: string;
    image: string;
    abilities?: {
        ability: string;
        name: string;
    }[],
    viewDetail: IViewDetail;
    setViewDetail: React.Dispatch<React.SetStateAction<IViewDetail>>;

}

const PokemonItem: React.FC<Props> = (props) => {
    const { id, name, image, abilities, viewDetail, setViewDetail } = props;
    const [isSelected, setIsSelected] = useState<boolean>(false);
    useEffect(() => {
        setIsSelected(id === viewDetail.id)
    }, [viewDetail]);
    const onClickCloseDetail = () => {
     setViewDetail({id:0, isOpened: false});   
    }
    return (
        <div className="">
            {isSelected
                && <section className='pokemon-list-detailed'>
                    <div className="detail-container">
                        <p className="detail-close" onClick={onClickCloseDetail}>
                            x
                        </p>
                    </div>
                    <div className="detail-info">
                        <img src={image} alt={`alt-${name}`} className="detail-img" />
                        <p className="detail-">{name}</p>
                    </div>
                    <div className="detail-">
                        <p className="detail-ability">Abilities: </p>
                        {abilities?.map((ab:any) =>(<div className="">{ab.ability.name}</div>))}
                    </div>
                </section>
            }
            <section className="pokemon-list-container">
                <p className="pokenon-name">{name}</p>
                <img src={image} alt={`alt-${name}`} />
            </section>
        </div>
    )
}

export default PokemonItem
import React from 'react';
import Card from 'components/Card/Card';
import './Cards.styles.css';

interface IProps {
  cats: ICat[];
  setCats?: React.Dispatch<React.SetStateAction<ICat[]>>;
}

const Cards = ({ cats, setCats }: IProps) => {
  const updateFavourite = (index: number, favoured: boolean) => {
    const updatedCats = [...cats];
    updatedCats[index].favoured = favoured;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setCats(updatedCats);
  };

  const renderCats = cats.map((cat: ICat, index) => (
    <Card
      key={cat.id}
      name={cat.name}
      phone={cat.phone}
      email={cat.email}
      image={cat.image}
      favoured={cat.favoured}
      updateFavourite={updateFavourite}
      index={index}
    />
  ));

  return <div className='pet-cards-container'>{renderCats}</div>;
};

export default Cards;

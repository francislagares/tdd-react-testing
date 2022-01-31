import { useState } from 'react';
import heartFilled from 'assets/svgs/heartFilled.svg';
import heartOutlined from 'assets/svgs/heartOutlined.svg';
import { usePetsContext } from 'context/PetsContext';
import './Card.styles.css';

const Card = ({ name, phone, email, image, favoured = false, index }: ICat) => {
  const { cats, setCats } = usePetsContext();
  const [isFavoured, setIsFavoured] = useState(favoured);

  const updateFavourite = (index: number, favoured: boolean) => {
    const updatedCats = [...cats];
    updatedCats[index].favoured = favoured;
    setCats(updatedCats);
  };

  const toggleFavoured = () => {
    updateFavourite(index, !isFavoured);
    setIsFavoured(!isFavoured);
  };

  return (
    <article className='card'>
      <div className='card-header'>
        <img className='card-img' src={image.url} alt={image.alt} />
        <button className='heart' onClick={toggleFavoured}>
          {isFavoured ? (
            <img src={heartFilled} alt='Filled Heart' />
          ) : (
            <img src={heartOutlined} alt='Outlined Heart' />
          )}
        </button>
      </div>
      <div className='card-content'>
        <h3>{name}</h3>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
    </article>
  );
};

export default Card;

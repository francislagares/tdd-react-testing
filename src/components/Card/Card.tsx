import React, { useState } from 'react';
import './Card.styles.css';
import heartFilled from 'assets/svgs/heartFilled.svg';
import heartOutlined from 'assets/svgs/heartOutlined.svg';

const Card = ({
  name,
  phone,
  email,
  image,
  favoured = false,
  updateFavourite,
  index,
}: ICat) => {
  const [isFavoured, setIsFavoured] = useState(favoured);

  const toggleFavoured = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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

import Card from 'components/Card/Card';
import { usePetsContext } from 'context/PetsContext';
import './Cards.styles.css';

const Cards = () => {
  const { cats } = usePetsContext();

  const renderCats = cats.map((cat: ICat, index) => (
    <Card
      key={cat.id}
      name={cat.name}
      phone={cat.phone}
      email={cat.email}
      image={cat.image}
      favoured={cat.favoured}
      index={index}
    />
  ));

  return <div className='pet-cards-container'>{renderCats}</div>;
};

export default Cards;

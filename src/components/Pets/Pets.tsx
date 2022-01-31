import { Filter, Cards } from 'components';
import './Pets.styles.css';
import { usePetsContext } from 'context/PetsContext';

const Pets = () => {
  const { filters, setFilters } = usePetsContext();
  return (
    <div className='container'>
      <div className='app-container'>
        <Filter filters={filters} setFilters={setFilters} />
        <Cards />
      </div>
    </div>
  );
};

export default Pets;

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface IPetsContext {
  cats: ICat[];
  setCats: React.Dispatch<React.SetStateAction<ICat[]>>;
  filters: {
    gender: string;
    favoured: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      gender: string;
      favoured: string;
    }>
  >;
}

export const PetsContext = createContext<IPetsContext>({} as IPetsContext);

export const PetsContextProvider: React.FC = ({ children }) => {
  const [cats, setCats] = useState<ICat[]>([]);
  const [filteredCats, setFilteredCats] = useState<ICat[]>([]);
  const [filters, setFilters] = useState({
    gender: 'any',
    favoured: 'any',
  });

  const fetchCats = async () => {
    const response = await axios.get('http://localhost:4000/cats');
    setCats(response.data);
    setFilteredCats(response.data);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  useEffect(() => {
    let catsFiltered = [...cats];
    if (filters.gender !== 'any') {
      catsFiltered = catsFiltered.filter(cat => cat.gender === filters.gender);
    }
    if (filters.favoured !== 'any') {
      catsFiltered = catsFiltered.filter(cat => {
        return (
          cat.favoured === (filters.favoured === 'favoured' ? true : false)
        );
      });
    }
    setFilteredCats(catsFiltered);
  }, [cats, filters]);
  return (
    <PetsContext.Provider
      value={{ cats: filteredCats, setCats, filters, setFilters }}
    >
      {children}
    </PetsContext.Provider>
  );
};

export const usePetsContext = () => {
  const context = useContext(PetsContext);
  if (context === undefined) {
    throw new Error('usePetsContext must be used within a PetsContextProvider');
  }
  return context;
};

import { Pets } from 'components';
import { PetsContextProvider } from 'context/PetsContext';

import './styles/index.css';

const App = () => {
  return (
    <PetsContextProvider>
      <Pets />
    </PetsContextProvider>
  );
};

export default App;

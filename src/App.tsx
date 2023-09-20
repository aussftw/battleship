import { Footer, Contacts } from './components';
import { useState, useMemo, useCallback } from 'react';
import { Game, Welcome } from './pages';

function App() {
  const [isWelcomeOpen, setIsWelCome] = useState<boolean>(true);

  const onPress = useCallback(() => {
    setIsWelCome(false);
  }, []);

  const renderComponent = useMemo(
    () => (isWelcomeOpen ? <Welcome onPress={onPress} /> : <Game />),
    [isWelcomeOpen],
  );

  return (
    <>
      {renderComponent}
      <Contacts />
      <Footer />
    </>
  );
}

export default App;

import { Footer, Contacts, Header } from './components';
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
      <Header />
      <div className="flex flex-col min-h-screen">
        <div className="flex-1">
          {renderComponent}
          {/* <Contacts /> */}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;

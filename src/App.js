import React from 'react';
//import './App.css';

import Tanga from './Components/Tanga/Tanga';
import StockApp from "./Components/StockApp";
import Music from './Components/Music/Music';

import { Box, ChakraBaseProvider, ChakraProvider } from '@chakra-ui/react';
import { ensureIsUser, initThinBackend, logout } from 'thin-backend';
import { ThinBackend } from 'thin-backend-react';

initThinBackend({
  // This url is different for each backend, this one points to 'mogaslobpmrp'
  host: 'https://mogaslobpmrp.thinbackend.app'
});

function UserStatus() {
  // Use the `useCurrentUser()` react hook to access the current logged in user
  // Returns `null` while the user is being fetched
  const user = useCurrentUser();

  return <div>
      {user?.email}

      <button onClick={logout}>Logout</button>
  </div>
}

function App() {
  var display = {a: <StockApp />, b: <Tanga />, c: <Music />}
  return (
    <ThinBackend requireLogin>
      <ChakraProvider>
      {/* <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /> */}
      {/* <Box className="App" width={"100%"}>
        {display.b}
      </Box> */}
      </ChakraProvider>
    </ThinBackend>
  );
}

export default App;
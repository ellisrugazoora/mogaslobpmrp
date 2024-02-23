import React, { useEffect, useState } from 'react';
//import './App.css';
import Tanga from './Components/Tanga/Tanga';
import { Box, Button, ChakraBaseProvider, ChakraProvider, Input } from '@chakra-ui/react';
import { createRecord, ensureIsUser, getCurrentUser, getCurrentUserId, initAuth, initThinBackend, logout, query } from 'thin-backend';
import { ThinBackend, useCurrentUser, useQuery } from 'thin-backend-react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

initThinBackend({
  // This url is different for each backend, this one points to 'mogaslobpmrp'
  host: 'https://lobpbackend.thinbackend.app'
});
//added logout
function UserStatus() {
  // Use the `useCurrentUser()` react hook to access the current logged in user
  // Returns `null` while the user is being fetched
  const user = useCurrentUser();
  const id = getCurrentUser();
  //id.then((value)=>{console.log(`UserStatus: ${value.email}`)})
  return <div>
      <Button colorScheme='twitter' onClick={logout}>Logout</Button>
      {user?.email}
  </div>
}


function App() {
  //var display = {a: <StockApp />, b: <Tanga />, c: <Music />}
  return (
    <ChakraProvider>
    <ThinBackend requireLogin>
        <div className='container'>
          <UserStatus />
        </div>
      <Box className="App" width={"100%"}>
        <Tanga />
      </Box>
    </ThinBackend>
    </ChakraProvider>
    
  );
}

export default App;
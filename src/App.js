import React, { useEffect, useState } from 'react';
//import './App.css';

import Tanga from './Components/Tanga/Tanga';
import StockApp from "./Components/StockApp";
import Music from './Components/Music/Music';

import { Box, Button, ChakraBaseProvider, ChakraProvider, Input } from '@chakra-ui/react';
import { createRecord, ensureIsUser, getCurrentUser, getCurrentUserId, initAuth, initThinBackend, logout, query } from 'thin-backend';
import { ThinBackend, useCurrentUser, useQuery } from 'thin-backend-react';

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
  id.then((value)=>{console.log(`UserStatus: ${value.email}`)})
  return <div>
      <Button colorScheme='twitter' onClick={logout}>Logout</Button>
      {user?.email}
  </div>
}

function TaskList(){
  getCurrentUser().then((user)=>{console.log(`email: ${user.email}`)})
  const tasks = useQuery(query('tasks').orderByDesc('createdAt'));
  if (tasks === null) {
    return <div>Loading ...</div>;
  }
  return <div>
    {tasks.map((task, index) => {
      return <div>{task.title}</div>
    })
    }
  </div>
}
function Tester(){
  const [data, setData] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [onloadrefresh, setOnloadrefresh] = useState(0);
  useEffect(()=>{
    const fetch = async () => {
      const data_array = await query('january_sales_projections').fetch();
      setData(data_array[0].quantity)
      console.log("fetch has been executed")
    }
    fetch()
  },[refresh, onloadrefresh])
  function triggerRefresh(){setRefresh(value => value + 1)}
  function triggerRefreshOnload(){setOnloadrefresh(value => value + 1)}
  return <div>
      The quantity of 4T: {data}
      value of onClick refresh: {refresh}
      value of onLoad refresh: {onloadrefresh}
      <Button onClick={triggerRefresh}>Trigger refresh</Button>
      <Button onLoad={triggerRefreshOnload} >on Load refresh</Button>
    </div>
}
//const insertTask = 
function AddTask(){
  const onClick = () => {
    createRecord('tasks',{
      title: window.prompt('Enter title: ') || '',
      userId: getCurrentUserId()
    })
  }
  return <Button colorScheme='twitter' onClick={onClick}>Add Task</Button>
}

function fetchAndPrint(){
  console.log("Fetch and print")
  const taskos = query('tasks').fetch();
  console.log(taskos.then((tasklist)=>{
    let result=[];
    tasklist.forEach((task, index)=>{
      result.push(task.title)
    })
    console.log(result);
  }));
}
function saveToDB(e){
  let value = e.target.value
  console.log(`save to DB: ${value}`)
  createRecord('tasks',{
    title: `Number ${value}`, 
    userId: getCurrentUserId()
  })
}
function Projections(){
  const products = useQuery(query('january_sales_projections')
    // ,
    // {enabled: true, // Initially set to true to start data fetching
    // staleTime: 5000, // Consider data stale after 5 seconds
    // cacheTime: 6000}
    )
  if(products === null){
      return <div>Loading ...</div>;
  }
  return <div>
      {products.map((product, index) => {
        return <div>Product: {product.productName} Qty: {product.quantity}</div>
      })}
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
        {/* {display.b} */}
        <Tanga />
      </Box>
      
    </ThinBackend>
    </ChakraProvider>
    
  );
}

export default App;
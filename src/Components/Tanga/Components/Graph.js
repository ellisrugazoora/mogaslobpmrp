
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { AgChartsReact } from 'ag-charts-react';
import Data from '../Data/Data';
import { Box, Center, Wrap } from "@chakra-ui/layout";
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/slider';

// Chart Component
const Graph = () => {
    var copyData = Data;
    const [mult, SetMult] = useState(0);
  // Chart Options: Control & configure the chart
  const [chartOptions, setChartOptions] = useState({
    // Data: Data to be displayed in the chart
    title: {
        text: "Mogas LOBP Production projection",
    },
    data: [ //each object is a group (stacked or not)
    {
        quarter: "Base Oil 1",
        //quarterz: "pseudo1", only 1 xkey per group
        iphone: 140 * ((100 + mult)/100),
        mac: 16,
        ipad: 14,
        wearables: 12,
        services: 50,
    }, //the sum of all should equal current inventory. If 
     {
        quarter: "Base Oil 2",
        //quarterz: "pseudo2",
        iphone: 124 * ((100 + mult)/100),
        mac: 20,
        ipad: 14,
        wearables: 12,
        services: 30,
    },
     {
        quarter: "Base Oil 3",
        //quarterz: "pseudo3",
        iphone: 112 * ((100 + mult)/100),
        mac: 20,
        ipad: 18,
        wearables: 14,
        services: 36,
    },
    {
        quarter: "Additive 1",
        //quarterz: "pseudo4",
        iphone: 118 * ((100 + mult)/100),
        mac: 24,
        ipad: 14,
        wearables: 14,
        services: 36,
    },
    {
        quarter: "Additive 2",
        //quarterz: "pseudo5",
        iphone: 124 * ((100 + mult)/100),
        mac: 18,
        ipad: 16,
        wearables: 18,
        services: 26,
    },
    {
        quarter: "Additive 3",
        //quarterz: "pseudo8",
        iphone: 108 * ((100 + mult)/100),
        mac: 22,
        ipad: 14,
        wearables: 20,
        services: 80,
    },
    ],
    // Series: Defines which chart type and data to use
    series: [ //This is pertinent to a single column
      {
          type: 'bar',
          xKey: 'quarter',
          yKey: 'iphone',
          yName: '4T',
          stacked: true,
      },
      {
          type: 'bar',
          xKey: 'quarter',
          yKey: 'mac',
          yName: '2T',
          stacked: true,
      },
      {
          type: 'bar',
          xKey: 'quarter',
          yKey: 'ipad',
          yName: 'Sentry',
          stacked: true,
      },
      {
          type: 'bar',
          xKey: 'quarter',
          yKey: 'wearables',
          yName: 'Duramax HD',
          stacked: true,
      },
      {
          type: 'bar',
          xKey: 'quarter',
          yKey: 'services',
          yName: 'Total',
          stacked: true,
      },
      
  ],
  });
  const [number, SetNumber] = useState(parseInt(localStorage.getItem('number')))
    useEffect(() => {//this is for storage
        localStorage.setItem('number', number.toString());
      }, [number]);
    function print_storage(){
        SetNumber(x => x + 1)
        console.log("the stored number: " + localStorage.getItem('number'))
    }
    function setToDefault(){
        SetNumber(0)
        console.log("the stored number: " + localStorage.getItem('number'))
    }
    function handleSetChartOptions(e){
        var newVal = parseInt(e.target.value, 10);
        console.log("handle set chart options: " + newVal)
        setChartOptions((previousOptions) => {
            return {
                ...previousOptions, 
                data: previousOptions.data.map((obj, idx) => {
                    //Put the production constraint logic here
                    if(idx === 0){ //this could be based on 

                        return {
                            
                            quarter: "Base Oil 1",
                            //quarterz: "pseudo1", only 1 xkey per group
                            iphone: 140,
                            mac: 16,
                            ipad: 14,
                            wearables: 12,
                            services: newVal
                        }
                    }
                    else {
                        return obj
                    }
                })
            }
        })
        
    }
    const init = {inv: 50, proda: 10, prodb: 40}
    
    
    const [inv, setInv] = useState(init.inv)
    const [proda, setProda] = useState(init.proda)
    const [prodb, setProdb] = useState(init.prodb)
    function inventoryChange(e){
        setInv(e.target.value) //replace this with set Chart options 
        //handleSetChartOptions(e);
        setProda(inv - prodb)
        console.log("Inventory:" + e.target.value)
        handleSetChartOptions(e)
    }
    function productaChange(e){
        setProda(e.target.value)
        setProdb(inv - proda)
        console.log("Product a:" + e.target.value)
    }
    function productbChange(e){
        setProdb(e.target.value)
        setProda(inv - prodb)
        console.log("Product b:" + e.target.value)
    }
  return (
    // AgCharsReact component with options passed as prop
    <div>
        
        <Center>
            <Box>
                Inputs: <br />
                Inventory: <br /> <input type='number' defaultValue={50} onChange={inventoryChange}/> <br />
                Product A volume: <br /> <input type='number' value={proda}  onChange={productaChange}/> <br />
                Product B volume: <br /> <input type='number' value={prodb} onChange={productbChange}/> <br />
                %change: <input type='number' defaultValue={0} onChange={(e)=>{console.log(e.target.value);SetMult(parseInt(e.target.value,10))}}/>
            </Box>
            <Box>
                Constraints:
            </Box>
            <Box bg='white' padding={10} borderRadius='15px' width='fit-content' height='fit-content'>
                <Center>
                    <AgChartsReact options={chartOptions}/>
                </Center>
            </Box>
        </Center>
        
        <button onClick={print_storage}>Increment number in array</button>
        <button onClick={setToDefault}>Set number to default</button>
        <br />
        The stateful number: {number}
        <br />
        {/*<button onClick={handleSetChartOptions}>Set chart options</button>*/}
        
        {/*
        <Slider
        aria-label='slider-ex-3'
        defaultValue={30}
        orientation='vertical'
        minH='32'
        >
        <SliderTrack>
            <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
        </Slider>
        */}
        
    </div>
        
  );
}

export default Graph;
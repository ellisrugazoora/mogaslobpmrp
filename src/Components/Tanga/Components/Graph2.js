
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { AgChartsReact } from 'ag-charts-react';
import Data from '../Data/Data';
import { Box, Center, Wrap } from "@chakra-ui/layout";
import DataObject from '../Data/DataObject';

function Graph2(){
    const [multa, SetMulta] = useState(0);
    const [multb, SetMultb] = useState(0);
    const [multc, SetMultc] = useState(0);
    const [multd, SetMultd] = useState(0);
    const [totalInv, SetTotalInv] = useState({baseoil1: 250, baseoil2: 230, baseoil3: 240, additive1: 250, additive2: 240, additive3: 280});
    function print_storage(){
        SetNumber(x => x + 1)
        console.log("the stored number: " + localStorage.getItem('number'))
    }
    function setToDefault(){
        SetNumber(0)
        console.log("the stored number: " + localStorage.getItem('number'))
    }
    const [number, SetNumber] = useState(parseInt(localStorage.getItem('number')))
    useEffect(() => {//this is for storage
        localStorage.setItem('number', number.toString());
      }, [number]);
    var chartOptions = {
        // Data: Data to be displayed in the chart
    title: {
        text: "Mogas LOBP Production projection Jan 2024",
    },
    data: [ //each object is a group (stacked or not)
    {
        quarter: "Base Oil 1",
        //quarterz: "pseudo1", only 1 xkey per group
        iphone: 140 * ((100 + multa)/100),
        mac: 16 * ((100 + multb)/100),
        ipad: 14 * ((100 + multc)/100),
        wearables: 12 * ((100 + multd)/100),
        spare: totalInv.baseoil1 - (140 * ((100 + multa)/100)) - (16 * ((100 + multb)/100)) - (14 * ((100 + multc)/100)) - (12 * ((100 + multd)/100)) //C - a - b - c - d
    }, //the sum of all should equal current inventory. If 
     {
        quarter: "Base Oil 2",
        //quarterz: "pseudo2",
        iphone: 124 * ((100 + multa)/100),
        mac: 20 * ((100 + multb)/100),
        ipad: 14 * ((100 + multc)/100),
        wearables: 12 * ((100 + multd)/100),
        spare: 30,
    },
     {
        quarter: "Base Oil 3",
        //quarterz: "pseudo3",
        iphone: 112 * ((100 + multa)/100),
        mac: 20 * ((100 + multb)/100),
        ipad: 18 * ((100 + multc)/100),
        wearables: 14 * ((100 + multd)/100),
        spare: 36,
    },
    {
        quarter: "Additive 1",
        //quarterz: "pseudo4",
        iphone: 118 * ((100 + multa)/100),
        mac: 24 * ((100 + multb)/100),
        ipad: 14 * ((100 + multc)/100),
        wearables: 14 * ((100 + multd)/100),
        spare: 36,
    },
    {
        quarter: "Additive 2",
        //quarterz: "pseudo5",
        iphone: 124 * ((100 + multa)/100),
        mac: 18 * ((100 + multb)/100),
        ipad: 16 * ((100 + multc)/100),
        wearables: 18 * ((100 + multd)/100),
        spare: 26,
    },
    {
        quarter: "Additive 3",
        //quarterz: "pseudo8",
        iphone: 108 * ((100 + multa)/100),
        mac: 22 * ((100 + multb)/100),
        ipad: 14 * ((100 + multc)/100),
        wearables: 20 * ((100 + multd)/100),
        spare: 80,
    },
    ],
        // Series: Defines which chart type and data to use
        series: [ //This is pertinent to a single column
          DataObject.series1,
          DataObject.series2,
          DataObject.series3,
          DataObject.series4,
          DataObject.series5
      ],
      }
      function setbaseoil1(e){
        console.log(e.target.value);
        SetTotalInv((previous) => {
            return {...previous, baseoil1: parseInt(e.target.value,10)}
        })
      }
    return (
        <div>
            <header>
            Interactive graph:
            </header>
            <Center>
                
                <Box bg='white' padding={10} borderRadius='15px' width='fit-content'>
                    <Center>
                        <AgChartsReact options={chartOptions}/>
                    </Center>
                </Box>
            </Center>
            <Center>

            </Center>
            <Center>
                <Box>
                        Inputs: <br />
                        prodA %change: <input onChange={(e) => {console.log(e.target.value);SetMulta(parseInt(e.target.value,10))}} defaultValue={0} type='number'/><br />
                        prodB %change: <input onChange={(e) => {console.log(e.target.value);SetMultb(parseInt(e.target.value,10))}} defaultValue={0} type='number'/><br />
                        prodC %change: <input onChange={(e) => {console.log(e.target.value);SetMultc(parseInt(e.target.value,10))}} defaultValue={0} type='number'/><br />
                        prodD %change: <input onChange={(e) => {console.log(e.target.value);SetMultd(parseInt(e.target.value,10))}} defaultValue={0} type='number'/>
                        
                </Box>
                <Box>
                    Inventory: <br />
                    Baseoil1: <input onChange={setbaseoil1} defaultValue={250} type='number'/> <br />
                    Baseoil2: <input type='number' /> <br />
                    Baseoil3: <input type='number' /> <br />
                    Additive1: <input type='number' /> <br />
                    Additive2: <input type='number' /> <br />
                    Additive3: <input type='number' /> <br />
                </Box>
                <Box>
                    Constraints: <br />
                </Box>
            </Center>
            {/*
            <button onClick={print_storage}>Increment number in array</button>
            <button onClick={setToDefault}>Set number to default</button>
            <br />
                The stateful number: {number}
            <br />
            */}
        </div>
    )
}

export default Graph2;
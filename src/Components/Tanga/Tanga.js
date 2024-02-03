import { useEffect, useState } from "react";
import Savedata from "./Components/Savedata";
import "./Tanga.css"
import { Box, Center, Wrap } from "@chakra-ui/layout";
import Graph3 from "./Components/Graph3";
import TabsComp from "./Components/TabsComp";
import TabInTab from "./Components/TabInTab";
import Table1and2 from "./Components/Table1and2";
import { Button } from "@chakra-ui/react";

var storeddata = localStorage.getItem('Julystored_data');
var parsedata = JSON.parse(storeddata);

function Tanga(){
    return (
        <Box className="Tanga" width={"100%"}>
            {/* <header className="Tanga-header">
                Tanga production planning app
            </header> */}
            <Box className="Tanga-body" width='100%'>
                <TabsComp /*home={{title: "Home", content: <Graph3 title="Jan"  display="inventory/product" startdate={{year:2024, month:0,date:1}} enddate={{year:2024, month:0,date:31}}/>}} */
                    one={{title: "Jan",content: <Graph3 title="Jan"  startdate={{year:2024, month:0,date:1}} enddate={{year:2024, month:0,date:31}}/>}} 
                    two={{title: "Feb",content: <Graph3 title="Feb"  startdate={{year:2024, month:1,date:1}} enddate={{year:2024, month:1,date:28}} /*stylo={{scheme:"twitter", variant: "striped"}}*//>}} 
                    three={{title: "Mar",content: <Graph3 title="Mar"  startdate={{year:2024, month:2,date:1}} enddate={{year:2024, month:2,date:31}} /*stylo={{scheme:"twitter", variant: "striped"}}*//>}}
                    four={{title: "Apr", content: <Graph3 title="Apr"  startdate={{year:2024, month:3,date:1}} enddate={{year:2024, month:3,date:30}} /*stylo={{scheme:"twitter", variant: "striped"}}*//>}}
                    five={{title: "May", content: <Graph3 title="May"  startdate={{year:2024, month:4,date:1}} enddate={{year:2024, month:4,date:31}} /*stylo={{scheme:"twitter", variant: "striped"}}*//>}}
                    six={{title: "Jun", content: <Graph3 title="Jun"  startdate={{year:2024, month:5,date:1}} enddate={{year:2024, month:5,date:30}} /*stylo={{scheme:"twitter", variant: "striped"}}*//>}}
                    seven={{title: "July", content: <TabInTab 
                        one={{title:"Production", 
                            content:<Graph3 title="July"  startdate={{year:2024, month:6,date:1}} enddate={{year:2024, month:6,date:31}}/>}} 
                        two={{title:"Finance schedule", 
                            content: 
                                <Center>
                                    <Table1and2 title="July" />
                                </Center> 
                            }} />}} />
            </Box>

        </Box>
    )
}

export default Tanga;
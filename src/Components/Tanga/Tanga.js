import { useEffect, useState } from "react";
import "./Tanga.css"
import { Box, Center, Wrap } from "@chakra-ui/layout";
import Graph3 from "./Components/Graph3";
import TabsComp from "./Components/TabsComp";
import TabInTab from "./Components/TabInTab";
import Table1and2 from "./Components/Table1and2";
import { Button } from "@chakra-ui/react";
import Formulas from "./Components/Formulas";


function Tanga(){
    return (
        <Box className="Tanga" width={"100%"}>

            <Box className="Tanga-body" width='100%'>
                <TabsComp 
                    one={{title: "Jan",content: <Graph3 title="january"  startdate={{year:2024, month:0,date:1}} enddate={{year:2024, month:0,date:31}}/>                  
                        }}                    
                    two={{title: "Feb",content: <Graph3 title="february"  startdate={{year:2024, month:1,date:1}} enddate={{year:2024, month:1,date:29}}/>                
                    }} 
                    three={{title: "Mar",content: <Graph3 title="march"  startdate={{year:2024, month:2,date:1}} enddate={{year:2024, month:2,date:31}}/>                
                    }} 
                    four={{title: "Apr", content: <Graph3 title="april"  startdate={{year:2024, month:3,date:1}} enddate={{year:2024, month:3,date:30}}/>
                    }}
                    five={{title: "May", content: <Graph3 title="may"  startdate={{year:2024, month:4,date:1}} enddate={{year:2024, month:4,date:31}}/>
                    }}                    
                    six={{title: "Jun", content: <Graph3 title="june"  startdate={{year:2024, month:5,date:1}} enddate={{year:2024, month:5,date:30}}/>
                        }}                    
                    seven={{title: "July", content: <Graph3 title="july"  startdate={{year:2024, month:6,date:1}} enddate={{year:2024, month:6,date:31}}/>}} 
                    eight={{title: "Formulas", content: <Formulas />}}
                            
                            />
            </Box>

        </Box>
    )
}

export default Tanga;
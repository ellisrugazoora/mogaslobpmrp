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
            {/* <header className="Tanga-header">
                Tanga production planning app
            </header> */}
            <Box className="Tanga-body" width='100%'>
                <TabsComp /*home={{title: "Home", content: <Graph3 title="Jan"  display="inventory/product" startdate={{year:2024, month:0,date:1}} enddate={{year:2024, month:0,date:31}}/>}} */
                    one={{title: "Jan",content: <TabInTab
                        one={{title:"Production", 
                            content:<Graph3 title="Jan"  startdate={{year:2024, month:0,date:1}} enddate={{year:2024, month:0,date:31}}/>}} 
                        two={{title:"Summary", 
                            content: 
                                <Center>
                                    <Table1and2 title="Jan" />
                                </Center>
                            }} />                    
                        }}                    
                    two={{title: "Feb",content: <TabInTab
                        one={{title:"Production", 
                            content:<Graph3 title="Feb"  startdate={{year:2024, month:1,date:1}} enddate={{year:2024, month:1,date:29}}/>}} 
                        two={{title:"Summary", 
                            content: 
                                <Center>
                                    <Table1and2 title="Feb" />
                                </Center>
                            }} />                    
                    }} 
                    
                    three={{title: "Mar",content: <TabInTab
                        one={{title:"Production", 
                            content:<Graph3 title="Mar"  startdate={{year:2024, month:2,date:1}} enddate={{year:2024, month:2,date:31}}/>}} 
                        two={{title:"Summary", 
                            content: 
                                <Center>
                                    <Table1and2 title="Mar" />
                                </Center>
                            }} />                    
                    }} 
                    
                    four={{title: "Apr", content: <TabInTab
                        one={{title:"Production", 
                            content:<Graph3 title="Apr"  startdate={{year:2024, month:3,date:1}} enddate={{year:2024, month:3,date:30}}/>}} 
                        two={{title:"Summary", 
                            content: 
                                <Center>
                                    <Table1and2 title="Apr" />
                                </Center>
                            }} />  
                    }}
                    
                    
                    five={{title: "May", content: <TabInTab
                    one={{title:"Production", 
                        content:<Graph3 title="May"  startdate={{year:2024, month:4,date:1}} enddate={{year:2024, month:4,date:31}}/>}} 
                    two={{title:"Summary", 
                        content: 
                            <Center>
                                <Table1and2 title="May" />
                            </Center>
                        }} />  
                    }}                    
                    
                    six={{title: "Jun", content: <TabInTab
                        one={{title:"Production", 
                            content:<Graph3 title="Jun"  startdate={{year:2024, month:5,date:1}} enddate={{year:2024, month:5,date:30}}/>}} 
                        two={{title:"Summary", 
                            content: 
                                <Center>
                                    <Table1and2 title="Jun" />
                                </Center>
                            }} />  
                        }}                    
                    seven={{title: "July", content: <TabInTab 
                        one={{title:"Production", 
                            content:<Graph3 title="July"  startdate={{year:2024, month:6,date:1}} enddate={{year:2024, month:6,date:31}}/>}} 
                        two={{title:"Summary", 
                            content: 
                                <Center>
                                    <Table1and2 title="July" />
                                </Center>
                            }} />}} 

                    eight={{title: "Formulas", content: <Formulas />}}
                            
                            />
            </Box>

        </Box>
    )
}

export default Tanga;
import { Button, Center } from "@chakra-ui/react";
import TaBle from "./TaBle";
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import TableAG from "./TableAG";

var columns = ["Consignment", "Date1", "Date2", "Date3"]



function Table1and2(props){
    const [rawdata, SetRawData] = useState(() => {
        let stored = localStorage.getItem(props.title + "_inv_table");
        return stored ? JSON.parse(stored) : {
            inv1: {col1: "500SN/600N", col2: 10, hs: 20, col4: 60, order: 30, col5: 40},
            inv2: {col1: "150SN", col2: 10, hs: 20,col4: 60,order: 30,col5: 40},
            inv3: {col1: "BS150", col2: 10, hs: 20,col4: 60,order: 30,col5: 40},
            inv4: {col1: "SN80/SN100", col2: 10, hs: 20,col4: 60,order: 30,col5: 40},
            inv5: {col1: "DPK", col2: 10, hs: 20,col4: 60,order: 30,col5: 40},
    
            inv6: {col1: "TBN+", col2: 10, hs: 20,col4: 40,order: 30,col5: 40},
            inv7: {col1: "PPD", col2: 10, hs: 20,col4: 40,order: 30,col5: 40},
            inv8: {col1: "CI-4", col2: 10, hs: 20,col4: 40, order: 30,col5: 40},
            inv9: {col1: "BS200", col2: 10, hs: 20,col4: 40,order: 30,col5: 40},
            inv10: {col1: "VII", col2: 10, hs: 20,col4: 40,order: 30,col5: 40},
            inv11: {col1: "MONO PA EO", col2: 10, hs: 20,col4: 40,order: 30,col5: 40},
            inv12: {col1: "4T PA PEO", col2: 10, hs: 20,col4: 40,order: 30,col5: 40},
            inv13:{col1: "ATF PA", col2: 10, hs: 20,col4: 40,order: 30, col5: 40},
            inv14:{col1: "2T PA", col2: 10, hs: 20,col4: 40,order: 30, col5: 40},
            inv15:{col1: "HYA", col2: 10, hs: 20,col4: 40,order: 30,col5: 40},
            inv16:{col1: "DYE", col2: 10, hs: 20,col4: 40,order: 30,col5: 40},
            inv17:{col1: "TURB", col2: 10, hs: 20,col4: 40,order: 30,col5: 40}
        }
    })
    const [rowData, setRowData] = useState([
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
      ]);
      
      // Column Definitions: Defines & controls grid columns.
      const [colDefs, setColDefs] = useState([
        { field: "make" },
        { field: "model" },
        { field: "price" },
        { field: "electric" }
      ]);
    var datafn = (month) => {
        console.log(month)
        //let id = month + "_inv_table";
        //let rawdata = localStorage.getItem(id); 
        //let jsondata = rawdata;
        //console.log(`Json data: ${jsondata.inv1.col2}; raw data: ${rawdata}`)
        return {
            row1: {consignment: "Consignment1", date1: rawdata.inv1.col2, date2:"order", date3: "pay"},
            row2: {consignment: "Consignment1", date1:" ", date2:"order", date3: "pay"},
            row3: {consignment: "Consignment1", date1:" ", date2:"order", date3: "pay"},
            row4: {consignment: "Consignment1", date1:" ", date2:"order", date3: "pay"}
        }
    }
    function handlerefresh(){
        if(localStorage.getItem(props.title + "_inv_table")){
            SetRawData(JSON.parse(localStorage.getItem(props.title + "_inv_table")));
        }
        else {
            console.log("There exists no local storage currrently")
        }
    }
    function handlePrintData(){
        let dataobject = rawdata;
        let dataarray = Object.entries(dataobject);
        console.log(dataarray)
        let testobject = {};
        let testarray = [];
        let testcolumnarray = [];
        dataarray.forEach((value, index) => {
            testobject[value[0]] = value[1];
            testarray[index] = value[1];
        })
        let cols = Object.entries(testarray[0]);
        cols.forEach((value, index)=>{
            testcolumnarray = value[0];
        }) 
        console.log(testobject);
        console.log(testarray);
        console.log(cols);
    }

    return (
        <div>
            <div> 
            {/* <TaBle title="Payment schedule" columns={columns} data={data} />  */}
            <Button onClick={handlerefresh}>Refresh</Button>
            <Button onClick={handlePrintData}>Print data</Button>
            {/* <AgGridReact rowData={rowData} columnDefs={colDefs} /> */}
            <Center><TaBle title={props.title + " financing plan"} columns={columns} data={datafn(props.title)} /></Center>
            Replace with AG charts! Below Anyone home?
            </div>
            <div className="ag-theme-quartz" style={{ height: 300, width:700 }}>
                {/* The AG Grid component */}
                <AgGridReact rowData={rowData} columnDefs={colDefs} />
            </div>
        </div>
    
    
    )
}

export default Table1and2;
import { Button } from "@chakra-ui/react";
import TaBle from "./TaBle";
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

var columns = ["Consignment", "Date1", "Date2", "Date3"]



function Table1and2(props){
    const [rawdata, SetRawData] = useState(localStorage.getItem(props.title + "_inv_table"))
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
        let jsondata = JSON.parse(rawdata);
        console.log(`Json data: ${jsondata.inv1.col2}; raw data: ${rawdata}`)
        return {
            row1: {consignment: "Consignment1", date1: jsondata.inv1.col2, date2:"order", date3: "pay"},
            row2: {consignment: "Consignment1", date1:" ", date2:"order", date3: "pay"},
            row3: {consignment: "Consignment1", date1:" ", date2:"order", date3: "pay"},
            row4: {consignment: "Consignment1", date1:" ", date2:"order", date3: "pay"}
        }
    }
    function handlerefresh(){
        SetRawData(localStorage.getItem(props.title + "_inv_table"))
    }

    return (
    <div> 
        {/* <TaBle title="Payment schedule" columns={columns} data={data} />  */}
        <Button onClick={handlerefresh}>Refresh</Button>
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
        <TaBle title={props.title + " financing plan"} columns={columns} data={datafn(props.title)} />
        Replace with AG charts! Below Anyone home?
        
    </div>)
}

export default Table1and2;
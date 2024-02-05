import { Button, Center } from "@chakra-ui/react";
import TaBle from "./TaBle";
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import TableAG from "./TableAG";

var columns = ["Consignment", "Date1", "Date2", "Date3"];



function Table1and2(props){
    const [data, SetData] = useState(() => {
        let stored = localStorage.getItem(props.title + "_inv_table");
        return stored ? JSON.parse(stored) : {
            inv1: {product: "500SN/600N", Qty: 10, Stockholding_period: 20, Leadtime: 60,supplier: "KDR", orderdate: 30},
            inv2: {product: "150SN", Qty: 10, Stockholding_period: 20,Leadtime: 60,supplier: "KDR",orderdate: 30},
            inv3: {product: "BS150", Qty: 10, Stockholding_period: 20,Leadtime: 60,supplier: "KDR",orderdate: 30},
            inv4: {product: "SN80/SN100", Qty: 10, Stockholding_period: 20,Leadtime: 60,supplier: "KDR",orderdate: 30},
            inv5: {product: "DPK", Qty: 10, Stockholding_period: 20,Leadtime: 60,supplier: "KDR",orderdate: 30},
    
            inv6: {product: "TBN+", Qty: 10, Stockholding_period: 20,Leadtime: 40,supplier: "IMCD",orderdate: 30},
            inv7: {product: "PPD", Qty: 10, Stockholding_period: 20,Leadtime: 40,supplier: "IMCD",orderdate: 30},
            inv8: {product: "CI-4", Qty: 10, Stockholding_period: 20,Leadtime: 40,supplier: "IMCD", orderdate: 30},
            inv9: {product: "BS200", Qty: 10, Stockholding_period: 20,Leadtime: 40,supplier: "IMCD",orderdate: 30},
            inv10:{product: "VII", Qty: 10, Stockholding_period: 20,Leadtime: 40,supplier: "BlackBull",orderdate: 30},
            inv11:{product: "MONO PA EO", Qty: 10, Stockholding_period: 20,Leadtime: 40,supplier: "IMCD",orderdate: 30},
            inv12:{product: "4T PA PEO", Qty: 10, Stockholding_period: 20,Leadtime: 40,supplier: "IMCD",orderdate: 30},
            inv13:{product: "ATF PA", Qty: 10, Stockholding_period: 20,Leadtime: 40,supplier: "IMCD",orderdate: 30},
            inv14:{product: "2T PA", Qty: 10, Stockholding_period: 20,Leadtime: 40,supplier: "IMCD",orderdate: 30},
            inv15:{product: "HYA", Qty: 10, Stockholding_period: 20,Leadtime: 40,supplier: "IMCD",orderdate: 30},
            inv16:{product: "DYE", Qty: 10, Stockholding_period: 20,Leadtime: 40,supplier: "IMCD",orderdate: 30},
            inv17:{product: "TURB", Qty: 10, Stockholding_period: 20,Leadtime: 40,supplier: "IMCD",orderdate: 30}
        }
    })
    const [rowData, setRowData] = useState(() => {
        let data_array = Object.entries(data);
        let rowdata_array = [];
        data_array.forEach((value, index) => {
            //testobject[value[0]] = value[1];
            rowdata_array[index] = value[1];
        })
        return rowdata_array;
        // [
        // { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        // { make: "Ford", model: "F-Series", price: 33850, electric: false },
        // { make: "Toyota", model: "Corolla", price: 29600, electric: false },
        // ]
    });
      
      // Column Definitions: Defines & controls grid columns.
      const [colDefs, setColDefs] = useState(()=>{
        let data_array = Object.entries(data);
        console.log(data_array)
        let rowdata_array = [];
        let columns_array = [];
        data_array.forEach((value, index) => {
            //testobject[value[0]] = value[1];
            rowdata_array[index] = value[1];
        })
        let cols = Object.entries(rowdata_array[0]);
        cols.forEach((value, index)=>{
            columns_array.push({field: value[0]});
        }) 

        return columns_array
        // [
        // { field: "make" },
        // { field: "model" },
        // { field: "price" },
        // { field: "electric" }
        // ]
    });
    var datafn = (month) => {
        console.log(month)
        //let id = month + "_inv_table";
        //let data = localStorage.getItem(id); 
        //let jsondata = data;
        //console.log(`Json data: ${jsondata.inv1.col2}; raw data: ${data}`)
        return {
            row1: {consignment: "Consignment1", date1: data.inv1.col2, date2:"order", date3: "pay"},
            row2: {consignment: "Consignment1", date1:" ", date2:"order", date3: "pay"},
            row3: {consignment: "Consignment1", date1:" ", date2:"order", date3: "pay"},
            row4: {consignment: "Consignment1", date1:" ", date2:"order", date3: "pay"}
        }
    }
    function handlerefresh(){
        if(localStorage.getItem(props.title + "_inv_table")){
            SetData(JSON.parse(localStorage.getItem(props.title + "_inv_table")));
        }
        else {
            console.log("There exists no local storage currrently")
        }
        let dataarray = Object.entries(data);
        console.log(dataarray)
        let testarray = [];
        let testcolumnarray = [];
        dataarray.forEach((value, index) => {
            //testobject[value[0]] = value[1];
            testarray[index] = value[1];
        })
        let cols = Object.entries(testarray[0]);
        cols.forEach((value, index)=>{
            testcolumnarray.push({field: value[0]});
        }) 
        //console.log(testobject);
        console.log(testarray); //This is the row data
        console.log(testcolumnarray); //this is the columns
        setRowData(testarray);
        setColDefs(testcolumnarray);
    }
    // function handlePrintData(){
    //     let dataarray = Object.entries(data);
    //     console.log(dataarray)
    //     let testarray = [];
    //     let testcolumnarray = [];
    //     dataarray.forEach((value, index) => {
    //         //testobject[value[0]] = value[1];
    //         testarray[index] = value[1];
    //     })
    //     let cols = Object.entries(testarray[0]);
    //     cols.forEach((value, index)=>{
    //         testcolumnarray.push({field: value[0]});
    //     }) 
    //     //console.log(testobject);
    //     console.log(testarray); //This is the row data
    //     console.log(testcolumnarray); //this is the columns
    //     setRowData(testarray);
    //     setColDefs(testcolumnarray);
    // }

    return (
        <div>
            <div> 
            {/* <TaBle title="Payment schedule" columns={columns} data={data} />  */}
            <Button onClick={handlerefresh}>Refresh</Button>
            {/* <Button onClick={handlePrintData}>Print data</Button> */}
            {/* <AgGridReact rowData={rowData} columnDefs={colDefs} /> */}
            {/* <Center><TaBle title={props.title + " financing plan"} columns={columns} data={datafn(props.title)} /></Center> */}
            {/* Replace with AG charts! Below Anyone home? */}
            </div>
            <div className="ag-theme-quartz" style={{ height: 700, width:950 }} >
                {/* The AG Grid component */}
                <AgGridReact rowData={rowData} columnDefs={colDefs} />
            </div>
        </div>
    
    
    )
}

export default Table1and2;
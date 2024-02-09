import { Button, Center, Spacer } from "@chakra-ui/react";
import TaBle from "./TaBle";
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import TableAG from "./TableAG";
import { createRecord } from "thin-backend";
import NumberInp from "./NumberInp";
import { useRef } from "react";

var columns = ["Consignment", "Date1", "Date2", "Date3"];

function Table1and2(props){
    const [data, SetData] = useState(() => {
        let stored = localStorage.getItem(props.title + "_inv_table");
        return stored ? JSON.parse(stored) : {
            inv1: {product: "500SN/600N", Qty: 10, Leadtime: 60,supplier: "KDR", orderdate: 30, paymentDueDate:"TBD", Amount: ""},
            inv2: {product: "150SN", Qty: 10,Leadtime: 60,supplier: "KDR",orderdate: 30, paymentDueDate:"TBD", Amount: ""},
            inv3: {product: "BS150", Qty: 10,Leadtime: 60,supplier: "KDR",orderdate: 30, paymentDueDate:"TBD", Amount: ""},
            inv4: {product: "SN80/SN100", Qty: 10,Leadtime: 60,supplier: "KDR",orderdate: 30, paymentDueDate:"TBD", Amount: ""},
            inv5: {product: "DPK", Qty: 10,Leadtime: 60,supplier: "KDR",orderdate: 30, paymentDueDate:"TBD", Amount: ""},
    
            inv6: {product: "TBN+", Qty: 10,Leadtime: 40,supplier: "IMCD",orderdate: 30, paymentDueDate:"TBD", Amount: ""},
            inv7: {product: "PPD", Qty: 10,Leadtime: 40,supplier: "IMCD",orderdate: 30, paymentDueDate:"TBD", Amount: ""},
            inv8: {product: "CI-4", Qty: 10,Leadtime: 40,supplier: "IMCD", orderdate: 30, paymentDueDate:"TBD", Amount: ""},
            inv9: {product: "BS200", Qty: 10,Leadtime: 40,supplier: "IMCD",orderdate: 30, paymentDueDate:"TBD", Amount: ""},
            inv10:{product: "VII", Qty: 10,Leadtime: 40,supplier: "BlackBull",orderdate: 30, paymentDueDate:"TBD", Amount: ""},
            inv11:{product: "MONO PA EO", Qty: 10,Leadtime: 40,supplier: "IMCD",orderdate: 30, paymentDueDate:"TBD", Amount: ""},
            inv12:{product: "4T PA PEO", Qty: 10,Leadtime: 40,supplier: "IMCD",orderdate: 30, paymentDueDate:"TBD", Amount: ""},
            inv13:{product: "ATF PA", Qty: 10,Leadtime: 40,supplier: "IMCD",orderdate: 30, paymentDueDate:"TBD", Amount: ""},
            inv14:{product: "2T PA", Qty: 10,Leadtime: 40,supplier: "IMCD",orderdate: 30, paymentDueDate:"TBD", Amount: ""},
            inv15:{product: "HYA", Qty: 10,Leadtime: 40,supplier: "IMCD",orderdate: 30, paymentDueDate:"TBD", Amount: ""},
            inv16:{product: "DYE", Qty: 10,Leadtime: 40,supplier: "IMCD",orderdate: 30, paymentDueDate:"TBD", Amount: ""},
            inv17:{product: "TURB", Qty: 10,Leadtime: 40,supplier: "IMCD",orderdate: 30, paymentDueDate:"TBD", Amount: ""}
        }
    })
   
    const [rowData, setRowData] = useState(() => {
        let data_array = Object.entries(data);
        let rowdata_array = [];
        data_array.forEach((value, index) => {
            rowdata_array[index] = value[1];
        })
        return rowdata_array;
    });
    const dateComparator = (stringDate1, stringDate2) => {
        const [day1, month1, year1] = stringDate1.split('/').map(Number);
        const [day2, month2, year2] = stringDate2.split('/').map(Number);
        const date1 = new Date(year1, month1 - 1, day1)
        const date2 = new Date(year2, month2 - 1, day2)
        var date1Number = String(date1.getFullYear()) + String(date1.getMonth()).padStart(2,'0') + String(date1.getDate()).padStart(2,'0');
        var date2Number = String(date2.getFullYear()) + String(date2.getMonth()).padStart(2,'0') + String(date2.getDate()).padStart(2,'0');
        let difference = parseInt(date1Number,10) - parseInt(date2Number,10);
        
        return difference;
      };
      
      // Column Definitions: Defines & controls grid columns.
      const [hideStatus, SetHideStatus] = useState()
      const [colDefs, setColDefs] = useState(()=>{
        let data_array = Object.entries(data);
        console.log(data_array)
        let rowdata_array = [];
        let columns_array = [];
        data_array.forEach((value, index) => {
            rowdata_array[index] = value[1];
        })
        let cols = Object.entries(rowdata_array[0]);
        cols.forEach((value, index)=>{
            if(index === 0){
                columns_array.push({field: value[0], flex:1});
            }
            else if(index === 4){
                columns_array.push({field: value[0], comparator: dateComparator, flex:1});
            }
            else {
                columns_array.push({field: value[0], hide:false, flex:1});
            }
        }) 

        return columns_array
    });
    
    function hideColumns(){
        console.log("hidecolumsn")
        SetHideStatus(true)
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
            testarray[index] = value[1];
        })
        let cols = Object.entries(testarray[0]);
        cols.forEach((value, index)=>{
            if(index === 0){
                testcolumnarray.push({field: value[0]/*, pinned:'left'*/, flex:1});
            }
            else if(index === 4){
                testcolumnarray.push({field: value[0], comparator: dateComparator, flex:1});
            }
            else {
                testcolumnarray.push({field: value[0], flex:1});
            }
            
        }) 
        //console.log(testobject);
        setRowData(testarray);
        setColDefs(testcolumnarray);
    }
    var divWidth = 950;
    const [occupiedLCspace, SetOccupiedLCSpace] = useState(()=>{
        return 0
    })
    function handleOccupiedSpace(value, id){
        SetOccupiedLCSpace(val => value)
    }
    var todaydate = new Date();
    const gridRef = useRef();
    function selectedRow(){
        const selectedRows = gridRef.current.api.getSelectedRows();
        console.log(selectedRows);
        let newSum = 0;
        selectedRows.forEach((value, index)=>{
            let dollar = parseFloat(value.amountDue.replace(/[^0-9.-]+/g, ''));
            newSum = newSum + dollar;
        })
        console.log(newSum)
        SetSumSelected(currentSum => newSum.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
    }
    const [sumSelected, SetSumSelected] = useState(()=>{
        return "$0.00"
    });
    function handleAggregation(){
        rowData.forEach((row, index)=>{
            console.log(`Order:${row.orderdate}; supplier: ${row.supplier}`);
        })
    }
    function filterForSelected(){
        let selectedRows = gridRef.current.api.getSelectedRows();
        console.log(selectedRows)

    }
    function compareDates(){
        let d1 = rowData[0].orderdate;
        let d2 = rowData[1].orderdate;
        console.log(d1, d2)
        const [day1, month1, year1] = d1.split('/').map(Number);
        const [day2, month2, year2] = d2.split('/').map(Number);

        const date1 = new Date(year1, month1 - 1, day1)
        const date2 = new Date(year2, month2 - 1, day2)
        var date1Number = String(date1.getFullYear()) + String(date1.getMonth()).padStart(2,'0') + String(date1.getDate()).padStart(2,'0');
        var date2Number = String(date2.getFullYear()) + String(date2.getMonth()).padStart(2,'0') + String(date2.getDate()).padStart(2,'0');
        let difference = parseInt(date1Number,10) - parseInt(date2Number,10);
        console.log(`Date1:${date1}; Date2:${date2}; Date1num: ${date1Number}; Date2num:${date2Number}`)
    }
    return (
        <div>
            <div> 
            {/* <TaBle title="Payment schedule" columns={columns} data={data} />  */}
            {/* <Button onClick={handleAggregation}>Aggregate orders</Button>  */}
            {/* <Center> */}
            <Button onClick={handlerefresh}>Refresh</Button> 
            {/* <Button onClick={compareDates}>Print date comparison</Button> */}
            {/* <Button>Changamoto</Button> */}
            {/* </Center> */}
            {/* Credit facility: 700,000USD <br />
            <Center>
                Occupied space:  <NumberInp init={occupiedLCspace} prod="occupiedLCspace" value={occupiedLCspace} onChange={handleOccupiedSpace} /> <br />
            </Center>
            Free space: {700000 - occupiedLCspace} as of: {todaydate.getDate()}/{todaydate.getMonth()}/{todaydate.getFullYear()} <br /> */}
            {/* Value of selected orders: {sumSelected} */}
            </div>
            <div className="ag-theme-quartz" style={{ height: 700, width: divWidth }} >
                {/* The AG Grid component */}
                <AgGridReact 
                    ref={gridRef}
                    rowMultiSelectWithClick={true} 
                    rowSelection='multiple' 
                    rowData={rowData} 
                    columnDefs={colDefs}  
                    onRowSelected={selectedRow}
                    onSelectionChanged={filterForSelected}
                    />
            </div>
        </div>
    )
}

export default Table1and2;
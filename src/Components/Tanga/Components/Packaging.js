import { Button, Center, Heading } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import { getCurrentUser, query, updateRecord } from "thin-backend";
import { useQuery } from "thin-backend-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from "react";

function Packaging(props){
    const month = props.month;
    const packagingMaterials = useQuery(query(month + '_packaging_requirements'))
   
    const [access, SetAcess] = useState({product: false, inventory: false, transit: false, consumption: false})
    useEffect(()=>{
        const fetchData = async () => {
            let id = await getCurrentUser();
            SetAcess({product: id.product, inventory: id.inventory, transit: id.transit, consumption: id.consumption})
        }
        fetchData()
    },[])
    
    if(packagingMaterials === null){
        return <div>Loading ...</div>
    }
    const rowData1 = packagingMaterials.map((value, index)=>{
        return {Material: value.material, ["In stock"]: value.instock, ["As of"]: value.asof,
            get "Holding period"(){
                return "..."
            },
            get "Re order date"(){
                return "..."
            }
        }
    })
    const idMap = {};
    packagingMaterials.forEach((value, index)=>{
        idMap[value.material]= value.id;
    })
    const colDefs1 = Object.entries(rowData1[0]).map((value, index)=>{
        if(value[0] === "As of"){
            return {field: value[0], flex: 1, editable:access.inventory, cellEditor: 'agDateStringCellEditor'}
        }
        else if (value[0] === "In stock"){
            return {field: value[0], flex: 1, editable:access.inventory}
        }
        else {
            return {field: value[0], flex: 1}
        }
    })
    function saveChangedValue(e){
        let propMap = {"As of": "asof", "In stock": "instock"}
        console.log(e, e.data)
        let material = e.data.Material
        let prop = e.column.colId
        let new_val = e.newValue;
        //console.log(`Material: ${material}; id: ${idMap[material]} prop: ${propMap[prop]}; new_val: ${new_val}`)
        updateRecord(month + '_packaging_requirements',idMap[material],{[propMap[prop]]: new_val})
    }
    
    return <div>
        {/* Packaging test */}
        {/* <Button onClick={()=>{console.log(packagingMaterials)}}>Print data</Button> */}
        <Center>
            <div className="ag-theme-quartz" style={{ height: 700, width:'80%', minWidth:340 }} >
                <Heading fontSize={30}>Packaging inventory</Heading>
                <AgGridReact 
                    rowData={rowData1} 
                    columnDefs={colDefs1}
                    onCellValueChanged={saveChangedValue}
                    />
            </div>
        </Center>
        
        Helo
        </div>
}

export default Packaging;
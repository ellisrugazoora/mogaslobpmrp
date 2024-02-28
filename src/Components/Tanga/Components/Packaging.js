import { Button, Center, Heading } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import { query } from "thin-backend";
import { useQuery } from "thin-backend-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";

function Packaging(){
    const packagingMaterials = useQuery(query('january_packaging_requirements'))
    const rowData1 = packagingMaterials.map((value, index)=>{
    return {Material: value.material, Quantity: value.quantity}
    })
    const colDefs1 = Object.entries(rowData1[0]).map((value, index)=>{
    return {field: value[0], flex: 1}
    })
    if(packagingMaterials === null){
        return <div>Loading ...</div>
    }
    return <div>
        Packaging test
        <Button onClick={()=>{console.log(rowData1); console.log(colDefs1)}}>Print data</Button>
        <Center>
            <div className="ag-theme-quartz" style={{ height: 300, width:'50%', minWidth:340 }} >
                <Heading fontSize={30}>Sales Projections</Heading>
                <AgGridReact 
                    rowData={rowData1} 
                    columnDefs={colDefs1}
                    />
            </div>
        </Center>
        
        Helo
        </div>
}

export default Packaging;
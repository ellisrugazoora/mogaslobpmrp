import { Button, Center, Heading, Spacer } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import { createRecord, getCurrentUser, getCurrentUserId, query, updateRecord } from "thin-backend";
import { useQuery } from "thin-backend-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from "react";

function Packaging(props){
    const month = props.month;
    const allPackagingMaterials = useQuery(query('januarypackagingmaterials'))
    const products = useQuery(query(month + '_sales_projections'))
    const [access, SetAcess] = useState({product: false, inventory: false, transit: false, consumption: false})
    useEffect(()=>{
        const fetchData = async () => {
            let id = await getCurrentUser();
            SetAcess({product: id.product, inventory: id.inventory, transit: id.transit, consumption: id.consumption})
        }
        fetchData()
    },[])
    
    if((products === null) || (allPackagingMaterials === null)){
        return <div>Loading ...</div>
    }
    const packages = ["bottle", "pail", "drum", "bottlecap", "pailcap", "drumseal", "box", "label"]
    const packageSizes = ["t0.5", "t1", "t4", "t5", "t20", "t210"];
    const rowData3 = [];
    var productQuantities = {};
    products.forEach((product, index) => {
        productQuantities[product.productName] = {};
        productQuantities[product.productName] = 
            {
            t05: product.t05, 
            t1: product.t1, 
            t4: product.t4, 
            t5: product.t5, 
            t20: product.t20, 
            t210: product.t210,
            get "t05bottle"(){return this.t05 / 0.5}
            }
    })
    var saved = allPackagingMaterials.map((material, index) => {
        var mapsize = {"t0.5": "t05", "t1":"t1", "t4":"t4", "t5":"t5", "t20":"t20", "t210":"t210"}
        var ratio = {"t0.5": 0.5, "t1":1, "t4":4, "t5":5, "t20":20, "t210":210}
        var density = 1; //must be a function of product
        if(material.ifexists){
            rowData3.push({Packtype: material.packtype, 
                Product: material.product, 
                Size: material.size, 
                get "Required"(){
                    return Math.ceil((productQuantities[material.product][mapsize[material.size]] * 1000 / density) / ratio[material.size])
                },
                "In stock": material.instock,
                get "Daily consumption rate"(){
                    return parseFloat((this["Required"] / 22).toFixed(2))
                },
                id: material.id,
                get "SHP"(){
                    return (this["Daily consumption rate"] > 0 ? parseFloat((this["In stock"] / this["Daily consumption rate"]).toFixed(2)) : 0)
                }
            })
        }
        return {Packtype: material.packtype, Product: material.product, Size: material.size, ifexists: material.ifexists, id: material.id}
    })
    const colDefs3 = Object.entries(rowData3[0]).map((value, index) => {
        if(value[0] === "Packtype" || value[0] === "Size"){
            return {field: value[0], flex: 1, filter: 'agSetColumnFilter'}
        }
        else if(value[0] === "Product"){
            return {field: value[0], flex: 1, filter: 'agSetColumnFilter' }
        }
        else if(value[0] === "Required"){
            return {field: value[0], flex: 1, filter: 'agSetColumnFilter'}
        }
        else if(value[0] === "In stock"){
            return {field: value[0], flex: 1, editable:true, filter: 'agSetColumnFilter'}
        }
        else if(value[0] === "id"){return {hide:true}}
        else {
            return {field: value[0], flex: 1}
        }
    })
    
    var packageMatrix = {};
    var packageList = [];
    packages.forEach((packtype, index) => {
        packageMatrix[packtype] = {};
        products.forEach((product, index) => {
            packageMatrix[packtype][product.productName] ={t05: product.t05, t1: product.t1, t4: product.t4, t5: product.t5, t20: product.t20, t210: product.t210}
            packageSizes.forEach((size, index) => {
                packageList.push({Packtype: packtype, Product: product.productName, Size: size, ifexists: true})   
            })
        })
    })

    const rowData2 = saved;
    const colDefs2 = Object.entries(rowData2[0]).map((value, index) => {
        if(value[0] === "Packtype" || value[0] === "Size"){
            return {field: value[0], flex: 1, filter: 'agTextColumnFilter'}
        }
        else if(value[0] === "ifexists"){
            return {field: value[0], flex: 1, editable: true, filter: 'agTextColumnFilter'}
        }
        else if(value[0] === "Product"){
            return {field: value[0], flex: 1, filter: 'agTextColumnFilter'}
        }
        else {
            return {field: value[0], flex: 1, hide:true}
        }
    })
    
    function cellValueChanged(e){
        console.log(e)
        console.log(`update packing list`)
        updateRecord('januarypackagingmaterials',e.data.id,{ifexists: e.value})
    }
    function updateStock(e){
        let map = {"In stock": "instock"}
        console.log(e)
        let column = e.column.colId;
        let id = e.data.id
        let new_val = e.value;
        updateRecord('januarypackagingmaterials',id,{[map[column]]: new_val})
    }
    return <div>
        <Center hidden>
            <div className="ag-theme-quartz" style={{ height: 1700, width:'80%', minWidth:340 }} >
                <Heading fontSize={30}>Test Packaging inventory evaluation of existence</Heading>
                <Button onClick={()=>{console.log(rowData2)}}>Print rowData2</Button>
                <Button onClick={()=>{console.log(rowData3)}}>Print rowData3</Button>
                <AgGridReact
                    rowData={rowData2} 
                    columnDefs={colDefs2}
                    onCellValueChanged={cellValueChanged}
                    />
            </div>
        </Center>
        <Center>
            <div className="ag-theme-quartz" style={{ height: 1000, width:'80%', minWidth:340 }} >
                <Heading fontSize={30}>Packaging inventory</Heading>
                {/* <Button onClick={() => {console.log(productQuantities)}}>Print productQuantities</Button> */}
                <AgGridReact
                    rowData={rowData3} 
                    columnDefs={colDefs3}
                    onCellValueChanged={updateStock}
                    />
            </div>
        </Center>
        </div>
}

export default Packaging;
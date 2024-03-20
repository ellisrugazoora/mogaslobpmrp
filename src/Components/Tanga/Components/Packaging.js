import { Button, Center, Heading, Kbd, Spacer } from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import { createRecord, getCurrentUser, getCurrentUserId, query, updateRecord } from "thin-backend";
import { useQuery } from "thin-backend-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from "react";
import NumberInp from "./NumberInp";

function Packaging(props){
    const month = props.month;
    const allPackagingMaterials = useQuery(query('januarypackagingmaterials'))
    const products = useQuery(query(month + '_sales_projections'))
    const [access, SetAcess] = useState({product: false, inventory: false, transit: false, consumption: false})
    const [buffer, SetBuffer] = useState(30);
    const [reorderqty, SetReorderqty] = useState(30)
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
    products.forEach((product, index) => { //have it parse through !the actual product list but the effective product list, from 
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
    
    var orderdate = (obj) => {
        let current = new Date()
        let mhs = parseFloat(obj.mhs);
        let hs = parseFloat(obj.hs);
        let lt = parseFloat(obj.lt);
        let transit = (parseFloat(obj.consrate) > 0 ? (parseFloat(obj.transit) / parseFloat(obj.consrate)) : 0);
        let days_until_order = hs - (mhs + lt) + transit; //OPTION A
        let newdate = new Date();
        let reqrd = obj.required;
        // if(reqrd === 0){
        //     days_until_order = 365;
        // }

        if(days_until_order > 0){
            newdate.setDate(current.getDate() + days_until_order) //if holding stock is greater than min holding stock plus lead time, then add the difference to the current date
        }           //if I have stock in transit, just add it to new date, regardless
        else {
            newdate.setDate(current.getDate())
        }
        //return `${String(newdate.getDate()).padStart(2,'0')}/${String(newdate.getMonth() + 1).padStart(2,'0')}/${newdate.getFullYear()}`;
        return newdate;
    }

    var saved = allPackagingMaterials.map((material, index) => {
        //t1grey and t1orange; t5grey and t5oragn
        var mapsize = {"t0.5": "t05", "t1":"t1", "t4":"t4", "t5":"t5", "t20":"t20", "t210":"t210"}
        var ratio = {"t0.5": 0.5, "t1":1, "t4":4, "t5":5, "t20":20, "t210":210}
        var ratio_to_pack = {"bottle":1, "pail":1, "drum":1, "box": 20}
        var density = 0.9; //must be a function of product
        if(material.ifexists){
            rowData3.push({Packtype: material.packtype, 
                Product: material.product, 
                Size: material.size, 
                get "Required"(){
                    let result;
                    if((material.packtype === "box") && (material.size === "t0.5")){
                        result = Math.ceil(((productQuantities[material.product][mapsize[material.size]] * 1000 / density) / ratio[material.size]) / 24)                 
                    }
                    else if((material.packtype === "box") && (material.size === "t1")){
                        result = Math.ceil(((productQuantities[material.product][mapsize[material.size]] * 1000 / density) / ratio[material.size]) / 20)                 
                    }
                    else if((material.packtype === "box") && (material.size === "t4")){
                        result = Math.ceil(((productQuantities[material.product][mapsize[material.size]] * 1000 / density) / ratio[material.size]) / 4)                 
                    }
                    else if((material.packtype === "box") && (material.size === "t5")){
                        result = Math.ceil(((productQuantities[material.product][mapsize[material.size]] * 1000 / density) / ratio[material.size]) / 4)                 
                    }
                    else {
                        result = Math.ceil((productQuantities[material.product][mapsize[material.size]] * 1000 / density) / ratio[material.size])
                    }
                    return result
                },
                "In stock": material.instock,
                "As of": material.asof,
                get "Re-order date"(){
                    return orderdate({mhs: buffer, hs: this['Stock holding period'], lt: this['Lead time'], transit: this['In Transit'], consrate: this['Daily consumption rate'], required: this['Required']})
                },
                get "Re-order amount"(){
                    return Math.ceil(this['Daily consumption rate'] * reorderqty);
                },
                get "Daily consumption rate"(){
                    return parseFloat((this["Required"] / 22).toFixed(2))
                },
                Exists: material.ifexists,
                id: material.id,
                get "Stock holding period"(){
                    return (this["Daily consumption rate"] > 0 ? parseFloat((this["In stock"] / this["Daily consumption rate"]).toFixed(2)) : 365)
                },
                "Lead time": material.leadtime,
                "In Transit": material.intransit,
                get "date"(){
                    return orderdate({mhs: buffer, hs: this['Stock holding period'], lt: this['Lead time'], transit: this['In Transit'], consrate: this['Daily consumption rate'], instock: this['In stock']})
                } 
            })
        }
        return {Packtype: material.packtype, Product: material.product, Size: material.size, ifexists: material.ifexists, id: material.id}
    })
    const reorderStyle = (params) => {
        const value = params.data["Stock holding period"];
        var lead_time = parseInt(params.data["Lead time"], 10);
        var bufferStock = parseInt(buffer, 10);
        var greenThreshold = lead_time + parseInt(buffer, 10) + 7;
        var yellowThreshold = lead_time + parseInt(buffer, 10);
        if(value > greenThreshold){
            return {backgroundColor: 'green'}
        }
        else if(value > yellowThreshold){
            return {backgroundColor: 'yellow'}
        }
        else {
            return {backgroundColor: 'red'}
        }
    }
    const updated = (params) => {
        let asof = new Date(params.value);
        //console.log(asof);
        let todaydate = new Date();
        //console.log(todaydate)
        if(asof === todaydate){
            return {backgroundColor: 'green'}
        }
    }
    var widith = 100;
    const colDefs3 = Object.entries(rowData3[0]).map((value, index) => {
        if(value[0] === "Packtype"){
            return {field: value[0], width: widith * 1.2, filter: 'agSetColumnFilter'}
        }
        else if(value[0] === "Size"){
            return {field: value[0], width: widith * 0.8, filter: 'agSetColumnFilter'}
        }
        else if(value[0] === "Product"){
            return {field: value[0], width: widith * 1.6, filter: 'agSetColumnFilter' }
        }
        else if(value[0] === "Required"){
            return {field: value[0], width: widith * 1.4, filter: 'agSetColumnFilter', sort: 'desc'}
        }
        else if(value[0] === "In stock"){
            return {field: value[0], width: widith * 1.1, editable: access.inventory, filter: 'agSetColumnFilter'}
        }
        else if(value[0] === "In Transit"){
            return {field: value[0], width: widith, editable: access.transit, filter: 'agSetColumnFilter'}
        }
        else if(value[0] === "As of"){
            return {field: value[0], width: widith * 1.2, cellStyle: updated, editable: access.inventory, cellEditor: 'agDateStringCellEditor', filter: 'agDateColumnFilter'}
        }
        else if(value[0] === "Re-order date"){
            return {field: value[0], width: widith * 1.5, cellStyle: reorderStyle, filter: 'agDateColumnFilter'}
        }
        else if(value[0] === "date"){
            return {hide:true}
        }
        else if(value[0] === "id"){
            return {field: value[0], hide:true, width: widith}}
        else if(value[0] === "Exists"){
            return {field: value[0],hide:true, width: widith, editable: true, filter: 'agSetColumnFilter'}
        }
        else {
            return {field: value[0], width: widith}
        }
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
        let map = {"In stock": "instock", "In Transit": "intransit", "As of":"asof", "Exists": "ifexists"}
        console.log(e)
        let column = e.column.colId;
        let id = e.data.id
        let new_val = e.value;
        console.log(`id:${id}, column:${map[column]}, new_val: ${new_val}`)
        updateRecord('januarypackagingmaterials',id,{[map[column]]: new_val})
    }
    return <div>
        {/* <Center hidden>
            <div className="ag-theme-quartz" style={{ height: 1700, width:'80%', minWidth:340 }} >
                <Heading fontSize={30}>Evaluation of existence</Heading>
                <Button onClick={()=>{console.log(rowData2)}}>Print rowData2</Button>
                <Button onClick={()=>{console.log(rowData3)}}>Print rowData3</Button>
                <AgGridReact
                    rowData={rowData2} 
                    columnDefs={colDefs2}
                    onCellValueChanged={cellValueChanged}
                    />
            </div>
        </Center> */}
        <Center>
            <div className="ag-theme-quartz" style={{ height: 700, width:'80%', minWidth:1010 }} >
                <Heading fontSize={30}>Packaging inventory</Heading>
                <Center>
                    Buffer stock (days): <NumberInp init={30} access={false} value={buffer} onChange={(e)=>{console.log(`Buffer: ${e}`);SetBuffer(e)}}/>
                    Re-order amount (days): <NumberInp init={reorderqty} access={false} value={reorderqty} onChange={(e)=>{console.log(`Re-order qty: ${e}`);SetReorderqty(e)}}/>
                </Center>
                <AgGridReact
                    rowData={rowData3} 
                    columnDefs={colDefs3}
                    onCellValueChanged={updateStock}
                    onCellClicked={(e)=>{console.log(e.data)}}
                    />
            </div>
        </Center>
        </div>
}

export default Packaging;
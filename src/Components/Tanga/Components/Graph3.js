import React, { useEffect, useState } from 'react';
import { Box, Center, Spacer, Flex, Heading } from "@chakra-ui/layout";
import { Button } from '@chakra-ui/button';
import { getCurrentUser, query, updateRecord } from 'thin-backend';
import { useQuery } from 'thin-backend-react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

function TableDB(props){
        var month = props.title;
        const formulas = useQuery(query('product_formulas'));
        const products = useQuery(query(month + '_sales_projections'))
        const raw_materials = useQuery(query(month + '_requirements'))
        const [access, SetAcess] = useState({product: false, inventory: false, transit: false, consumption: false})
        useEffect(()=>{
            const fetchData = async () => {
                let id = await getCurrentUser();
                SetAcess({product: id.product, inventory: id.inventory, transit: id.transit, consumption: id.consumption})
            }
            fetchData()
        },[])
        
        if((products === null) || (raw_materials === null) || (formulas === null)){
            return <div>Loading ...</div>;
        }
        var rowData = [];
        var colDefs = [];
        var rowDataInv = [];
        var colDefsInv = [];
        rowData = products.map((product, index)=>{
            return {Product: product.productName, Quantity: product.quantity}
        })
        colDefs = Object.entries(rowData[0]).map((col, index)=>{
            if(col[0] === "Product"){
                return {field: col[0], flex: 5 , filter: 'agTextColumnFilter'}
            }
            else {
                return {field: col[0], editable: access.product, flex: 4,
                    cellEditor: 'agNumberCellEditor',
                    cellEditorParams: {
                        precision: 2,
                        step: 0.25,
                        showStepperButtons: true,
                    }, sort: 'desc',
                    filter: 'agNumberColumnFilter'
                }
            }
        })

        const idmap_reverse = { ///THIS IS THE PRODUCT ID MAP
            "f2f9942a-c350-43c9-b6b9-a3a393dafc5a": "Sentry 4T",
             "8419f052-a10f-4992-908d-26669dbede3a":"Mogas 2T",
            "e45c36f6-ecb0-4958-b46e-af9dca1c8f17":"Duramax HD 40",
             "055ecd2f-63ac-4225-aacf-a6003f87627f": "Turbofleet 15W/40",
            "eb60fd05-0229-44d3-a2ec-7fa948931582": "Sentry HD40",
            "24b807f9-f0dd-4b14-8a73-c992789e84b3":"Dynatrans 85W/140",
             "cbe9f35f-7865-441f-8db0-861bf1a79668": "Hydrax Z 68",
            "67a92531-ab3d-4b9e-895c-6c6e42280437": "Duramax Extra 25W/50",
            "58a2638f-180e-457f-97eb-c19a36da3708": "Mogas SB22",
             "5fe72dfd-2e74-4bba-8a7c-23bf7f051bc1": "Dynatrans 80W/90",
            "3ec83a13-9d99-4d56-aaa4-f9448d3e5a31": "Hydrax Z46",
            "abab71c7-de9b-4268-996a-eddbffb55b6a":"Prestina T68",
            "a447f2c2-aad5-41e2-bb76-ff85bfe3ae28": "Mogas ATF",
             "646c9d75-6e33-4922-9438-d91bd4e13e53": "Hydrax Z32",
            "5186e371-60c8-4cd1-b7f9-3299ea3f492d": "Frontia X 20W50",
            "693e71f1-5bc0-4ab2-80cb-06fbdcc099e9": "Powertrans SP150",
            "faca54b3-0680-47ba-a868-c635526832ca": "Powertrans SP220",
            "28449845-2b5d-4eb9-99d4-5facd0fc0387": "Powertrans SP320"
        }
        var uuidto = { //THIS IS THE INV ID MAP
            "edf5b5d3-02a2-4bad-94b3-b4fc3e41d6e3": "sn500",
            "3472449b-3939-4999-85e3-e3b94e94b7a3": "pa4t",
            "07c9390b-ec59-40cd-bcd5-05c2cc5054b7" : "ppd",
            "d6ddad17-eb8b-49af-83dc-ba70dfb464b6" : "lz8510",
            "633433dd-fcf5-41eb-87c0-ce543cbca34f" : "dye",
            "66fc50a7-5d2c-43c2-96e6-81704f03bfc0": "hya",
            "5e8d3956-5a4e-40ae-9724-1afca9693784": "pa2t",
            "fcf82820-9bee-40a6-902a-57fc5444ea12" : "atf",
            "0ecb697c-a64a-405d-9f11-3c3a0d917e58": "mono",//done
            "0c6ea774-2083-4838-ab00-23614b8c7f70": "vii",
            "36b312c5-50ae-4251-b473-6a781bf2573e": "goa",
            "2d4cca7f-e84f-43d9-bcc2-f8e72284513a": "ci4",
            "1727f94f-7c43-4795-b6f2-5166d5532a78": "tbn",
            "59b3394f-4a18-477b-b916-b5c4581d772b": "dpk",
            "3bc41ae7-9601-493f-9f88-37f93557d521": "sn80sn100",
            "364ba3ab-edf6-4eb8-bcc1-3a6b504cfd18": "bs150",
            "b77e84c4-cd45-4342-a951-1dcbefc88bfd": "sn150"
        }
        var backtouuid = {
            "500SN/600N": "edf5b5d3-02a2-4bad-94b3-b4fc3e41d6e3",
            "4T_PA": "3472449b-3939-4999-85e3-e3b94e94b7a3",
            "PPD": "07c9390b-ec59-40cd-bcd5-05c2cc5054b7",
            "LZ8510": "d6ddad17-eb8b-49af-83dc-ba70dfb464b6",
            "DYE": "633433dd-fcf5-41eb-87c0-ce543cbca34f",
            "HYA": "66fc50a7-5d2c-43c2-96e6-81704f03bfc0",
            "2T_PA": "5e8d3956-5a4e-40ae-9724-1afca9693784",
            "ATF": "fcf82820-9bee-40a6-902a-57fc5444ea12",
            "MONO": "0ecb697c-a64a-405d-9f11-3c3a0d917e58",//done
            "VII": "0c6ea774-2083-4838-ab00-23614b8c7f70",
            "GOA": "36b312c5-50ae-4251-b473-6a781bf2573e",
            "CI_4": "2d4cca7f-e84f-43d9-bcc2-f8e72284513a",
            "TBN+": "1727f94f-7c43-4795-b6f2-5166d5532a78",
            "DPK": "59b3394f-4a18-477b-b916-b5c4581d772b",
            "SN80/SN100": "3bc41ae7-9601-493f-9f88-37f93557d521",
            "BS150": "364ba3ab-edf6-4eb8-bcc1-3a6b504cfd18",
            "150SN": "b77e84c4-cd45-4342-a951-1dcbefc88bfd"
        }

        var live_formulas = (array) => {
            let result = {};
            array.forEach((value, index)=>{
                result[idmap_reverse[value.id]] = {};
                Object.entries(value).forEach((val, ind)=>{
                    if((val[0] !== "userId") && (val[0] !== "id")){
                        result[idmap_reverse[value.id]][val[0]] = val[1]
                    }
                })
            })
            return result
        }
        var orderdate = (obj) => {
            let current = new Date()
            let mhs = parseFloat(obj.mhs);
            let hs = parseFloat(obj.hs);
            let lt = parseFloat(obj.lt);
            let days_until_order = hs - (mhs + lt); //OPTION A
            let newdate = new Date();
    
            if(days_until_order > 0){
                newdate.setDate(current.getDate() + days_until_order) //if holding stock is greater than min holding stock plus lead time, then add the difference to the current date
            }           //if I have stock in transit, just add it to new date, regardless
            else {
                newdate.setDate(current.getDate())
            }
            return `${String(newdate.getDate()).padStart(2,'0')}/${String(newdate.getMonth() + 1).padStart(2,'0')}/${newdate.getFullYear()}`; 
        }
        rowDataInv = raw_materials.map((raw_mat, index)=>{
            let frmla = live_formulas(formulas);
            let id = raw_mat.id;
            return {"Raw material": raw_mat.rawMaterial, get "Quantity Required (MT)"(){
                let sum = 0; rowData.forEach((product,i)=>{                    
                    sum = sum + (product.Quantity * frmla[product.Product][uuidto[id]]) //UUIDTO is the INV id map
                }); //this is to refresh
                return parseFloat(sum.toFixed(2)) //+ formula[this.Raw_material] + test
            }, "In stock (MT)": raw_mat.instock, 
            get "Avg daily consumption (MT)"(){return parseFloat((this['Quantity Required (MT)']/26).toFixed(2))}, 
            get "Stock holding period"(){
                if(this['Avg daily consumption (MT)'] === 0){
                    return 0
                }
                else {
                    return parseFloat(((this['In stock (MT)'] + this['In transit (MT)'])/this['Avg daily consumption (MT)']).toFixed(2))
                }
            }, get "Re-order date"(){
                return orderdate({mhs: 0, hs: this['Stock holding period'], lt: this['Lead time']})
            }, "Lead time": raw_mat.leadtime, "In transit (MT)": raw_mat.intransit}
        })
        const cellStyle = (params) => {
            const value = params.value;
            if(value < 90){
                return {backgroundColor: 'red'}
            }
            else if(value < 120){
                return {backgroundColor: 'yellow'}
            }
            else {
                return {backgroundColor: 'green'}
            }
            
          };
        colDefsInv = Object.entries(rowDataInv[0]).map((col, index)=>{  
            if((col[0] === "In stock (MT)")){
                return {field: col[0], width: 175, editable: access.inventory, cellEditor: 'numberEditor', filter: 'agNumberColumnFilter'}
            }
            else if(col[0] === "In transit (MT)") {
                return {field: col[0], width: 150, editable: access.inventory, cellEditor: 'numberEditor', filter: 'agNumberColumnFilter'}
            }
            else if(col[0] === "Quantity Required (MT)") {
                return {field: col[0], width: 195, sort: 'desc', filter: 'agNumberColumnFilter'}
            }
            else if(col[0] === "Raw material") {
                return {field: col[0], width: 135, filter: 'agTextColumnFilter', pinned: 'left'}
            }
            else if(col[0] === "Stock holding period") {
                return {field: col[0], width: 175, filter: 'agNumberColumnFilter', cellStyle: cellStyle}
            }
            else if(col[0] === "Re-order date"){
                return {field: col[0], width: 145, filter: 'agNumberColumnFilter'}
            }
            else if(col[0] === "Lead time"){
                return {field: col[0], width: 125, filter: 'agNumberColumnFilter'}
            }
            else if(col[0] === "In stock (MT)"){
                return {field: col[0], width: 145, filter: 'agNumberColumnFilter'}
            }
            else if(col[0] === "Avg daily consumption (MT)"){
                return {field: col[0], width: 205, filter: 'agNumberColumnFilter'}
            }
            else {
                return {field: col[0], width: 105, filter: 'agNumberColumnFilter'}
            }
        })

        var RowIds = {
            "Duramax Extra 25W/50": "fbe6e413-45fb-42d2-a969-e3c0380bb968",
            "Duramax HD 40": "ddcd45ce-a684-48c9-8243-a9b21d92e629",
            "Dynatrans 80W/90" : "5801db58-f543-41eb-b0b2-e71a9e48e0a6",
            "Dynatrans 85W/140" : "8504592b-bb01-4028-a541-e1e6c14e19cb",
            "Frontia X 20W50" : "60cf9bd5-b414-46f0-a178-962b392c3411",
            "Hydrax Z32": "441d2946-858c-4a8e-b5b1-c23f86a09a92",
            "Hydrax Z46": "37e99d6b-2460-4e16-a39c-4db52cf30d25",
            "Hydrax Z 68" : "35e683c7-86e6-4d67-9686-88539b12de2e",
            "Mogas 2T": "44d8a36a-6f73-46d5-a385-90b396cb7933",//done
            "Mogas ATF": "0d4d0e51-fb18-4a71-a4f6-32bb3d5b9126",
            "Mogas SB22": "bfc296de-35a8-4cee-a045-83215bfc0c2e",
            "Powertrans SP150": "13297cf2-8008-4111-98bd-6f3f51446e48",
            "Powertrans SP220": "d6edc032-8ac8-4ed2-8ed4-a9287da993f2",
            "Powertrans SP320": "4a53b8b5-8502-46e4-a789-39af076a0c7c",
            "Sentry 4T": "f119f29c-3b98-474c-a19b-ec66faeaf663",//done
            "Sentry HD40": "0077b6e0-cd44-442a-82ff-5653390b2b8e",
            "Turbofleet 15W/40": "a19a3195-bf97-4d41-bfb0-ef36f761fb3d"}
        function cellValueChange(value){
            var new_qty = value.data.Quantity;
            var prod = value.data.Product;
            console.log(value)
            console.log(`New Qty: ${new_qty}`)
            updateRecord(month + '_sales_projections',RowIds[prod],{quantity: new_qty}) //
        }
        function cellValueChangeInv(value){
            let convert = {"In stock": "instock", "In transit": "intransit"}
            var new_qty = value.value;
            var column = value.column.colId;
            var raw_mat = value.data["Raw material"];
            console.log(raw_mat, new_qty, column)
            updateRecord(month + '_requirements',backtouuid[raw_mat],{[convert[column]]: new_qty})
        }
        
        return <div>
            <Center width={'100%'}>
                <Flex width={'100%'} minWidth={'100%'}>
                    <div className="ag-theme-quartz" style={{ height: 700, width:'10%', minWidth:340 }} >
                        <Heading fontSize={30}>Sales Projections</Heading>
                        <AgGridReact 
                            rowData={rowData} 
                            columnDefs={colDefs}
                            rowMultiSelectWithClick={true} 
                            rowSelection='multiple'
                            onCellValueChanged={cellValueChange}
                            />
                    </div>
                    <Spacer minWidth={5} />
                    <div className="ag-theme-quartz" style={{ height: 700, width:'73%', minWidth:1100 }} >
                        <Heading fontSize={30}>Requirements</Heading>
                        <AgGridReact 
                            rowData={rowDataInv} 
                            columnDefs={colDefsInv}
                            rowMultiSelectWithClick={true} 
                            rowSelection='multiple'
                            onCellValueChanged={cellValueChangeInv}
                            />
                    </div>
                </Flex>
            </Center>
          </div>
}

function Graph3(props){  
    let monther = props.title;
    return (
        <Box width={'100%'}>
            <TableDB title={monther} />
        </Box>
    )
}

export default Graph3;
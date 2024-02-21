import React, { useEffect, useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { Box, Center, Spacer, Flex } from "@chakra-ui/layout";
import DataFunction from '../Data/DataFunction';
import { Button } from '@chakra-ui/button';
import NumberInp from './NumberInp';
import TaBle from './TaBle';
import TabInTab from './TabInTab';
import TableAG from './TableAG';
import { createRecord, ensureIsUser, getCurrentUser, getCurrentUserId, initAuth, initThinBackend, query, updateRecord } from 'thin-backend';
import { useQuery } from 'thin-backend-react';
import { AgGridReact } from 'ag-grid-react';


function TableDB(props){
        const formulas = useQuery(query('product_formulas'));
        const products = useQuery(query('january_sales_projections'))
        const raw_materials = useQuery(query('january_requirements'))
        if((products === null) || (raw_materials === null) || (formulas === null)){
            return <div>Loading ...</div>;
        }

        var rowData = [];
        var colDefs = [];
        var rowDataInv = [];
        var colDefsInv = [];
        var rowIds = {};
        var rowIdsInv = {};
        //if(products !== null){
        rowData = products.map((product, index)=>{
            return {Product: product.productName, Quantity: product.quantity}
        })
        colDefs = Object.entries(rowData[0]).map((col, index)=>{
            if(col[0] === "Product"){
                return {field: col[0], flex: 1}
            }
            else {
                return {field: col[0], editable: true, flex: 1,
                    cellEditor: 'agNumberCellEditor',
                    cellEditorParams: {
                        precision: 2,
                        step: 0.25,
                        showStepperButtons: true,
                    }, sort: 'desc'
                }
            }
        })
        products.forEach((product, index)=>{
            rowIds[product.productName] = product.id;
        })

        const idmap_reverse = {
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
        
        const keymerp = {"500SN/600N": "sn500", "150SN":"sn150", "BS150":"bs150", "SN80/SN100":"sn80sn100", "DPK":"dpk", "TBN+":"tbn", "PPD":"ppd", "CI_4":"ci4", "GOA":"goa", "VII":"vii", "MONO":"mono", "4T_PA":"pa4t", "ATF":"atf", "2T_PA":"pa2t", "HYA":"hya", "DYE":"dye", "LZ8510":"lz8510"};

        rowDataInv = raw_materials.map((raw_mat, index)=>{
            let frmla = live_formulas(formulas);
            return {Raw_material: raw_mat.rawMaterial, get Quantity(){
                let sum = 0; rowData.forEach((product,i)=>{
                    //sum = sum + (product.Quantity * formula[product.Product][this.Raw_material])
                    sum = sum + (product.Quantity * frmla[product.Product][keymerp[this.Raw_material]])
                    console.log(product.Product, frmla[product.Product])
                }); 
                return parseFloat(sum.toFixed(2)) //+ formula[this.Raw_material] + test
            }, In_stock: raw_mat.inStock, In_transit: raw_mat.inTransit, /*Avg_daily_consumption: raw_mat.avgDailyConsumption, 
            Stock_holding_period: raw_mat.stockHoldingPeriod,*/ Lead_time: raw_mat.leadTime}
        })
        colDefsInv = Object.entries(rowDataInv[0]).map((col, index)=>{  
                return {field: col[0], width: 200}
        })
        raw_materials.forEach((product, index)=>{
            rowIds[product.productName] = product.id;
        })
        //}
        function cellValueChange(value){
            var new_qty = value.data.Quantity;
            var prod = value.data.Product;
            console.log(value)
            console.log(`New Qty: ${new_qty}`)
            updateRecord('january_sales_projections',rowIds[prod],{quantity: new_qty})
        }
        return <div>
            <Center >
                <Flex width={1225} overflow={'auto'}>
                    <div className="ag-theme-quartz" style={{ height: 700, width:600 }} >
                        <AgGridReact 
                            rowData={rowData} 
                            columnDefs={colDefs}
                            rowSelection='multiple'
                            onCellValueChanged={cellValueChange}
                            />
                    </div>
                    <Spacer />
                    <div className="ag-theme-quartz" style={{ height: 700, width:600 }} >
                        <AgGridReact 
                            rowData={rowDataInv} 
                            columnDefs={colDefsInv}
                            rowSelection='multiple'
                            //onCellValueChanged={cellValueChangeInv}
                            />
                    </div>
                </Flex>
            </Center>
            
            
          </div>
}

function Graph3(props){  
    var initdate = new Date();    
    function comparedates(dateone, datetwo){
        var start = String(dateone.getFullYear()) + String(dateone.getMonth()).padStart(2,'0') + String(dateone.getDate()).padStart(2,'0');
        var end = String(datetwo.getFullYear()) + String(datetwo.getMonth()).padStart(2,'0') + String(datetwo.getDate()).padStart(2,'0');
        let concatdiff = parseInt(start - end,10)
        let result;
        if(concatdiff < 0){
            result = "earlier";
        }
        else if(concatdiff === 0){
            result = "equal";
        }
        else {
            result = "later";
        }
        //console.log(result);
        return result;
    }
    
    var current = (dates) => {
        let result;
        if((comparedates(dates.current, dates.start) === "later") && (comparedates(dates.current, dates.end) === "earlier")){
            //console.log("current")
            result = "current"
        }
        else if((comparedates(dates.current, dates.start) === "equal") || (comparedates(dates.current, dates.end) === "equal")){
            result = "current"
        }
        else {
            //console.log("not current")
            result = "notcurrent"
        }
        return result;
    }
    const startdater = new Date(props.startdate.year,props.startdate.month, props.startdate.date);
    const enddater = new Date(props.enddate.year, props.enddate.month, props.enddate.date);
    var currentmonth = {current: "Current", notcurrent: "Not current"}

    return (
        <div>
            {currentmonth[current({start: startdater, current:initdate, end:enddater})]} {` `} Month
            <TableDB />
        </div>
    )
}

export default Graph3;
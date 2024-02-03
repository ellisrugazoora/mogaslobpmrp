import React, { useEffect, useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { Box, Center, Spacer, Flex } from "@chakra-ui/layout";
import DataFunction from '../Data/DataFunction';
import { Button } from '@chakra-ui/button';
import NumberInp from './NumberInp';
import TaBle from './TaBle';
import { Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import TabInTab from './TabInTab';
import TableAG from './TableAG';


function Graph3(props){
    var dataid = props.title + "stored_data";
    var data = DataFunction;
    
    const [args, SetArgs] = useState(() =>
        {
        //let id = props.title + "data";
        let stored_data = localStorage.getItem(dataid);
        return stored_data ?  JSON.parse(stored_data) : {
        bo1: 520, bo2: 240, bo3:180, bo4: 130, bo5: 140, bo6: 110, ad1:100, ad2:130, ad3:120, ad4:115, ad5: 109, ad6: 108, ad7: 140, ad8: 120, ad9:140, ad10: 169, ad11: 130, ad12: 123, //Starting inventory is a prop
        formulas: {
            _2T: populateformula({bo1:0.9050, bo5:0.08, ad9:0.0150}),
            _4T: populateformula({bo1:0.877,bo3:0,ad2:0.002, ad5:0.063, ad7:0.0550}),
            atfIII: populateformula({bo2:0.6097,bo4:0.3,ad8:0.09,ad11:0.0003}),
            DuramaxHD: populateformula({bo1:0.733, bo3:0.23,ad1:0.003,ad6:0.034}), 
            FrontiaX: populateformula({bo1:0.6238, bo2:0.2442, ad2:0.002,ad5:0.0760,ad7:0.0540}),
            Geo80W90:populateformula({bo1:0.7600,bo3:0.2050,ad2:0.015,ad4:0.02}),
            Geo85W140:populateformula({bo1:0.030,bo3:0.927,ad2:0.003,ad4:0.0400}),
            Hydrax32:populateformula({bo2:0.9895,ad2:0.002,ad10:0.0085}),
            HydraxZ46:populateformula({bo1:0.2905,bo2:0.7,ad2:0.001,ad10:0.0085}),
            HydraxZ68:populateformula({bo1:0.6805,bo2:0.31,ad2:0.001,ad10:0.0085}),
            PowerTransSP150:populateformula({bo1:0.7650,bo3:0.22,ad4:0.0150}),
            PowerTransSP220:populateformula({bo1:0.4629,bo3:0.5201,ad2:0.002,ad4:0.0150}),
            PowerTransSP320:populateformula({bo1:0.17, bo3:0.8130,ad2:0.002,ad4:0.0150}),
            Sb22D210:populateformula({bo2:0.9,bo4:0.1}),
            SentryHDSae40:populateformula({bo1:0.7830,bo3:0.1800,ad1:0.003,ad6:0.0340}),
            TurbofleetSae15W:populateformula({bo1:0.3810,bo2:0.42,ad2:0.002,ad3:0.1170,ad5:0.08})
        },
        _2T:80, _4T:200,atfIII: 5,DuramaxHD:85, FrontiaX:10,Geo80W90:7,Geo85W140:28,Hydrax32:2,HydraxZ46:2,HydraxZ68:5,PowerTransSP150:1,PowerTransSP220:2,PowerTransSP320:2,Sb22D210:1,SentryHDSae40:25,TurbofleetSae15W:65,
        crbo1: 14.3, crbo2: 1.4, crbo3:2.07, crbo4: 0.06, crbo5: 0.24, crbo6: 0.01, crad1:0.01, crad2:0.03, crad3:0.3, crad4:0.05, crad5: 0.71, crad6: 0.14, crad7: 0.44, crad8: 0.02, crad9:0.05, crad10: 0.003, crad11: 1, crad12: 1
    }}
    );
    useEffect(() => {//this saves to storage everytime the dependence "args" changes
        localStorage.setItem(dataid, JSON.stringify(args));
      },[args, props.title]);

    function populateformula(obj){
        let result = {bo1:0,bo2:0,bo3:0,bo4:0,bo5:0,bo6:0,bo7:0,ad1:0,ad2:0,ad3:0,ad4:0,ad5:0,ad6:0,ad7:0,ad8:0,ad9:0,ad10:0,ad11:0,ad12:0,ad13:0};
        for (const key in obj) {
            result[key] = obj[key];
        }
        return result;
    }
    
    var chartOptions = {
        // Data: Data to be displayed in the chart
    title: {
        text: `Mogas LOBP Production projection ${props.title}`,
    },
    subtitle: {
        text: "In tons",
      },
    data: [ //each object is a group (stacked or not)
        data(args).bo1, data(args).bo2, data(args).bo3, data(args).bo4,data(args).bo5, data(args).ad1,data(args).ad2,data(args).ad3, 
        data(args).ad4, data(args).ad5, data(args).ad6, data(args).ad7, data(args).ad8, data(args).ad9,
        data(args).ad10, data(args).ad11, data(args).ad12 //I should make this a fnx({args})
    ],
        // Series: Defines which chart type and data to use
    series: [ //This is pertinent to a single column
        data(args).series1,data(args).series2, data(args).series3,data(args).series4,data(args).series5, data(args).series6, data(args).series7,
        data(args).series8, data(args).series9, data(args).series10, data(args).series11, data(args).series12, data(args).series13, data(args).series14,
        data(args).series15, data(args).series16, data(args).series17
    ]
    }
    
    function limiting_reagent(name){
        console.log("limitingreagent = f(spare_inventory, product, product_ratios)")
        console.log("red_indication: the inventory such that the entirety of its remainder can be used in the production of the product in question")
        let columns = ["bo1", "bo2", "bo3", "bo4", "bo5", "ad1", "ad2", "ad3", "ad4", "ad5", "ad6", "ad7", "ad8", "ad9", "ad10", "ad11", "ad12"];
        //let prod = name;
        let prod = name;
        let result;
        for(let col = 0; col < columns.length; col++){
            //determine remainder
            let spare_inv = data(args)[columns[col]].spare; 
            console.log(spare_inv);
            let total = (spare_inv / args.formulas[prod][columns[col]]);
            console.log(total)
            let condition = 0;
            for(let check = 0; check < columns.length; check++){
                if((total * args.formulas[prod][columns[check]]) <= data(args)[columns[check]].spare){
                    condition++;//add one to the total if there is enough
                }
            }
            if(condition === 17){
                result = total + args[prod];
                console.log(`The limited reagent: ${columns[col]} and the total mass: ${total + args[prod]}`)
                break; //save the col. Thats the limiting reagent. and total is the total
            }
        }
        return result
    }
    function prodtable(number,id){
        let new_val = parseInt(number, 10);
        //let new_val = parseFloat(number);
        //let new_val = number;
        SetArgs((current) => {
            return {...current, [id]: new_val}
        });
    }
    function tablebutton(e){
        let id = e.target.id;
        let name = e.target.name;
        console.log(`Id: ${id}; Name: ${name}`)
        if(id === 'max'){
            let new_mass = Math.trunc(limiting_reagent(name));
            
            console.log(`Set max: new mass: ${new_mass}`)
            SetArgs((current) => {
                return {...current, [name]: new_mass}
            });
        }
    }
    function inv_table(number, id){
        //let new_val = parseFloat(number);
        //let new_val = parseInt(number, 10);
        let new_val = number;
        SetArgs((current) => {
            return {...current, [id]: new_val}
        });
    }
    function product_total(args){
        let productlist = ["_2T", "_4T", "atfIII", "DuramaxHD", "FrontiaX", "Geo80W90", "Geo85W140", "Hydrax32","HydraxZ46","HydraxZ68","PowerTransSP150","PowerTransSP220","PowerTransSP320","Sb22D210","SentryHDSae40","TurbofleetSae15W"]
        var sum = 0;
        for (const product of productlist) {
            sum = sum + parseFloat(args[product]);
        }
        return (sum);
    }
    
    var orderdate = (obj) => {
        let current = new Date()
        let x = obj.mhs + obj.lt;
        let y = obj.hs - x;
        let newdate = new Date();
        if(y > 0){
            newdate.setDate(current.getDate() + y)
        }           
        return `${newdate.getDate()}/${String(newdate.getMonth() + 1).padStart(2,'0')}`;
    }

    var shp = (obj)=>{
        let result = (obj.inv / obj.consrate).toFixed(1);
        return result;
    }
    function toggleability(){
        return false
    }
    var buttonsize = "md";
    var initdate = new Date();
    var prod_table_columns = ["Products", "Quantity (Tons)", "Maximize"]
    var prod_table_data = {
        prod1: {col1: "2T", col2: <NumberInp value={args._2T} prod="_2T" onChange={prodtable} init={args._2T} />, col4: <Button size={buttonsize} id='max' name='_2T' onClick={tablebutton}>Set Max</Button>},
        prod2: {col1: "4T", col2: <NumberInp value={args._4T} prod="_4T" onChange={prodtable} init={args._4T} />, col4: <Button size={buttonsize} id='max' name='_4T' onClick={tablebutton}>Set Max</Button>},
        prod3: {col1: "ATF III", col2: <NumberInp value={args.atfIII} prod="atfIII" onChange={prodtable} init={args.atfIII} />, col4: <Button size={buttonsize} id='max' name='atfIII' onClick={tablebutton}>Set Max</Button>},
        prod4: {col1: "Duramax HD", col2: <NumberInp value={args.DuramaxHD} prod="DuramaxHD" onChange={prodtable} init={args.DuramaxHD} />, col4: <Button size={buttonsize} id='max' name='DuramaxHD' onClick={tablebutton}>Set Max</Button>},
        prod5: {col1: "Frontia X", col2: <NumberInp value={args.FrontiaX} prod="FrontiaX" onChange={prodtable} init={args.FrontiaX} />, col4: <Button size={buttonsize} id='max' name='FrontiaX' onClick={tablebutton}>Set Max</Button>},
        prod6: {col1: "GEO 80W90", col2: <NumberInp value={args.Geo80W90} prod="Geo80W90" onChange={prodtable} init={args.Geo80W90} />, col4: <Button size={buttonsize} id='max' name='Geo80W90' onClick={tablebutton}>Set Max</Button>},
        prod7: {col1: "GEO 85W140", col2: <NumberInp value={args.Geo85W140} prod="Geo85W140" onChange={prodtable} init={args.Geo85W140} />, col4: <Button size={buttonsize} id='max' name='Geo85W140' onClick={tablebutton}>Set Max</Button>},
        prod8: {col1: "Hydrax 32", col2: <NumberInp value={args.Hydrax32} prod="Hydrax32" onChange={prodtable} init={args.Hydrax32} />, col4: <Button size={buttonsize} id='max' name='Hydrax32' onClick={tablebutton}>Set Max</Button>},
        prod9: {col1: "Hydrax Z 46", col2: <NumberInp value={args.HydraxZ46} prod="HydraxZ46" onChange={prodtable} init={args.HydraxZ46} />, col4: <Button size={buttonsize} id='max' name='HydraxZ46' onClick={tablebutton}>Set Max</Button>},
        prod10: {col1: "Hydrax Z 68", col2: <NumberInp value={args.HydraxZ68} prod="HydraxZ68" onChange={prodtable} init={args.HydraxZ68} />, col4: <Button size={buttonsize} id='max' name='HydraxZ68' onClick={tablebutton}>Set Max</Button>},
        prod11: {col1: "Power Trans SP 150", col2: <NumberInp value={args.PowerTransSP150} prod="PowerTransSP150" onChange={prodtable} init={args.PowerTransSP150} />, col4: <Button size={buttonsize} id='max' name='PowerTransSP150' onClick={tablebutton}>Set Max</Button>},
        prod12: {col1: "Power Trans SP 220", col2: <NumberInp value={args.PowerTransSP220} prod="PowerTransSP220" onChange={prodtable} init={args.PowerTransSP220} />, col4: <Button size={buttonsize} id='max' name='PowerTransSP220' onClick={tablebutton}>Set Max</Button>},
        prod13: {col1: "Power Trans SP 320", col2: <NumberInp value={args.PowerTransSP320} prod="PowerTransSP320" onChange={prodtable} init={args.PowerTransSP320} />, col4: <Button size={buttonsize} id='max' name='PowerTransSP320' onClick={tablebutton}>Set Max</Button>},
        prod14: {col1: "SB 22 D210", col2: <NumberInp value={args.Sb22D210} prod="Sb22D210" onChange={prodtable} init={args.Sb22D210} />, col4: <Button size={buttonsize} id='max' name='Sb22D210' onClick={tablebutton}>Set Max</Button>},
        prod15: {col1: "Sentry HD Sae 40", col2: <NumberInp value={args.SentryHDSae40} prod="SentryHDSae40" onChange={prodtable} init={args.SentryHDSae40} />, col4: <Button size={buttonsize} id='max' name='SentryHDSae40' onClick={tablebutton}>Set Max</Button>},
        prod16: {col1: "Turbofleet Sae 15W", col2: <NumberInp value={args.TurbofleetSae15W} prod="TurbofleetSae15W" onChange={prodtable} init={args.TurbofleetSae15W} />, col4: <Button size={buttonsize} id='max' name='TurbofleetSae15W' onClick={tablebutton}>Set Max</Button>},
        total: {col1: "Total", col2: product_total(args), col3: <Button size={'md'} isDisabled={toggleability}>Empty</Button> }
    }
    
    var inv_table_columns = ["Inventory", "Required", "In stock (Tons)", "Avg. daily consumption rate (Tons)","Stock holding period","Lead time (days)", "Next order date", "Deficit/excess"];
    var inv_table_data = {
        inv1: {col1: "500SN/600N", col2: data(args).bo1.sum.toFixed(2), col3: <NumberInp prod="bo1" init={args.bo1} onChange={inv_table} value={args.bo1} />, consrate:<NumberInp prod="crbo1" init={args.crbo1} onChange={inv_table} value={args.crbo1}/>, hs: shp({inv:args.bo1,consrate:args.crbo1}), col4: 60, order: orderdate({ hs: shp({inv:args.bo1,consrate:args.crbo1}),mhs:60, lt:60}), col5: (args.bo1 - data(args).bo1.sum).toFixed(2)},
        inv2: {col1: "150SN", col2: data(args).bo2.sum.toFixed(2), col3: <NumberInp prod="bo2" init={args.bo2} onChange={inv_table} value={args.bo2} />, consrate:<NumberInp prod="crbo2" init={args.crbo2} onChange={inv_table} value={args.crbo2}/>, hs: shp({inv:args.bo2,consrate:args.crbo2}),col4: 60,order: orderdate({hs: shp({inv:args.bo2,consrate:args.crbo2}), mhs:60, lt:60}),col5: (args.bo2 - data(args).bo2.sum).toFixed(2)},
        inv3: {col1: "BS150", col2: data(args).bo3.sum.toFixed(2), col3: <NumberInp prod="bo3" init={args.bo3} onChange={inv_table} value={args.bo3} />, consrate:<NumberInp prod="crbo3" init={args.crbo3} onChange={inv_table} value={args.crbo3}/>,hs: shp({inv:args.bo3,consrate:args.crbo3}),col4: 60,order: orderdate({hs: shp({inv:args.bo3,consrate:args.crbo3}), mhs:60, lt:60}),col5: (args.bo3 - data(args).bo3.sum).toFixed(2)},
        inv4: {col1: "SN80/SN100", col2: data(args).bo4.sum.toFixed(2), col3: <NumberInp prod="bo4" init={args.bo4} onChange={inv_table} value={args.bo4} />, consrate:<NumberInp prod="crbo4" init={1} onChange={inv_table} value={args.crbo4}/>, hs: shp({inv:args.bo4,consrate:args.crbo4}),col4: 60,order: orderdate({hs: shp({inv:args.bo4,consrate:args.crbo4}), mhs:60, lt:60}),col5: (args.bo4 - data(args).bo4.sum).toFixed(2)},
        inv5: {col1: "DPK", col2: data(args).bo5.sum.toFixed(2), col3: <NumberInp prod="bo5" init={args.bo5} onChange={inv_table} value={args.bo5} />, consrate:<NumberInp prod="crbo5" init={args.crbo5} onChange={inv_table} value={args.crbo5}/>, hs: shp({inv:args.bo5,consrate:args.crbo5}),col4: 60,order: orderdate({hs: shp({inv:args.bo5,consrate:args.crbo5}), mhs:60, lt:60}),col5: (args.bo5 - data(args).bo5.sum).toFixed(2)},

        inv6: {col1: "TBN+", col2: data(args).ad1.sum.toFixed(2), col3: <NumberInp prod="ad1" init={args.ad1} onChange={inv_table} value={args.ad1} />, consrate:<NumberInp prod="crad1" init={args.crad1} onChange={inv_table} value={args.crad1}/>, hs: shp({inv:args.ad1,consrate:args.crad1}),col4: 40,order: orderdate({hs: shp({inv:args.ad1,consrate:args.crad1}), mhs:60, lt:40}),col5: (args.ad1 - data(args).ad1.sum).toFixed(2)},
        inv7: {col1: "PPD", col2: data(args).ad2.sum.toFixed(2), col3: <NumberInp prod="ad2" init={args.ad2} onChange={inv_table} value={args.ad2} />, consrate:<NumberInp prod="crad2" init={args.crad2} onChange={inv_table} value={args.crad2}/>, hs: shp({inv:args.ad2,consrate:args.crad2}),col4: 40,order: orderdate({hs: shp({inv:args.ad2,consrate:args.crad2}), mhs:60, lt:40}),col5: (args.ad2 - data(args).ad2.sum).toFixed(2)},
        inv8: {col1: "CI-4", col2: data(args).ad3.sum.toFixed(2), col3: <NumberInp prod="ad3" init={args.ad3} onChange={inv_table} value={args.ad3} />, consrate:<NumberInp prod="crad3" init={args.crad3} onChange={inv_table} value={args.crad3}/>, hs: shp({inv:args.ad3,consrate:args.crad3}),col4: 40, order: orderdate({hs: shp({inv:args.ad3,consrate:args.crad3}), mhs:60, lt:40}),col5: (args.ad3 - data(args).ad3.sum).toFixed(2)},
        inv9: {col1: "BS200", col2: data(args).ad4.sum.toFixed(2), col3: <NumberInp prod="ad4" init={args.ad4} onChange={inv_table} value={args.ad4} />, consrate:<NumberInp prod="crad4" init={args.crad4} onChange={inv_table} value={args.crad4}/>, hs: shp({inv:args.ad4,consrate:args.crad4}),col4: 40,order: orderdate({hs: shp({inv:args.ad4,consrate:args.crad4}), mhs:60, lt:40}),col5: (args.ad4 - data(args).ad4.sum).toFixed(2)},
        inv10: {col1: "VII", col2: data(args).ad5.sum.toFixed(2), col3: <NumberInp prod="ad5" init={args.ad5} onChange={inv_table} value={args.ad5} />, consrate:<NumberInp prod="crad5" init={args.crad5} onChange={inv_table} value={args.crad5}/>, hs: shp({inv:args.ad5,consrate:args.crad5}),col4: 40,order: orderdate({hs: shp({inv:args.ad5,consrate:args.crad5}), mhs:60, lt:40}),col5: (args.ad5 - data(args).ad5.sum).toFixed(2)},
        inv11: {col1: "MONO PA EO", col2: data(args).ad6.sum.toFixed(2), col3: <NumberInp prod="ad6" init={args.ad6} onChange={inv_table} value={args.ad6} />, consrate:<NumberInp prod="crad6" init={args.crad6} onChange={inv_table} value={args.crad6}/>, hs: shp({inv:args.ad6,consrate:args.crad6}),col4: 40,order: orderdate({hs: shp({inv:args.ad6,consrate:args.crad6}), mhs:60, lt:40}),col5: (args.ad6 - data(args).ad6.sum).toFixed(2)},
        inv12: {col1: "4T PA PEO", col2: data(args).ad7.sum.toFixed(2), col3: <NumberInp prod="ad7" init={args.ad7} onChange={inv_table} value={args.ad7} />, consrate:<NumberInp prod="crad7" init={args.crad7} onChange={inv_table} value={args.crad7}/>, hs: shp({inv:args.ad7,consrate:args.crad7}),col4: 40,order: orderdate({hs: shp({inv:args.ad7,consrate:args.crad7}), mhs:60, lt:40}),col5: (args.ad7 - data(args).ad7.sum).toFixed(2)},
        inv13:{col1: "ATF PA", col2: data(args).ad8.sum.toFixed(2), col3: <NumberInp prod="ad8" init={args.ad8} onChange={inv_table} value={args.ad8} />, consrate:<NumberInp prod="crad8" init={args.crad8} onChange={inv_table} value={args.crad8}/>, hs: shp({inv:args.ad8,consrate:args.crad8}),col4: 40,order: orderdate({hs: shp({inv:args.ad8,consrate:args.crad8}), mhs:60, lt:40}), col5: (args.ad8 - data(args).ad8.sum).toFixed(2)},
        inv14:{col1: "2T PA", col2: data(args).ad9.sum.toFixed(2), col3: <NumberInp prod="ad9" init={args.ad9} onChange={inv_table} value={args.ad9} />, consrate:<NumberInp prod="crad9" init={args.crad9} onChange={inv_table} value={args.crad9}/>, hs: shp({inv:args.ad9,consrate:args.crad9}),col4: 40,order: orderdate({hs: shp({inv:args.ad9,consrate:args.crad9}), mhs:60, lt:40}), col5: (args.ad9 - data(args).ad9.sum).toFixed(2)},
        inv15:{col1: "HYA", col2: data(args).ad10.sum.toFixed(2), col3: <NumberInp prod="ad10" init={args.ad10} onChange={inv_table} value={args.ad10} />, consrate:<NumberInp prod="crad10" init={args.crad10} onChange={inv_table} value={args.crad10}/>, hs: shp({inv:args.ad10,consrate:args.crad10}),col4: 40,order: orderdate({hs: shp({inv:args.ad10,consrate:args.crad10}), mhs:60, lt:40}),col5: (args.ad10 - data(args).ad10.sum).toFixed(2)},
        inv16:{col1: "DYE", col2: data(args).ad11.sum.toFixed(2), col3: <NumberInp prod="ad11" init={args.ad11} onChange={inv_table} value={args.ad11} />, consrate:<NumberInp prod="crad11" init={args.crad11} onChange={inv_table} value={args.crad11}/>, hs: shp({inv:args.ad11,consrate:args.crad11}),col4: 40,order: orderdate({hs: shp({inv:args.ad11,consrate:args.crad11}), mhs:60, lt:40}),col5: (args.ad11 - data(args).ad11.sum).toFixed(2)},
        inv17:{col1: "TURB", col2: data(args).ad12.sum.toFixed(2), col3: <NumberInp prod="ad12" init={args.ad12} onChange={inv_table} value={args.ad12} />, consrate:<NumberInp prod="crad12" init={args.crad12} onChange={inv_table} value={args.crad12}/>, hs: shp({inv:args.ad12,consrate:args.crad12}),col4: 40,order: orderdate({hs: shp({inv:args.ad12,consrate:args.crad12}), mhs:60, lt:40}),col5: (args.ad12 - data(args).ad12.sum).toFixed(2)}
    };
    var finance_table = {
        inv1: {col1: "500SN/600N", col2: data(args).bo1.sum.toFixed(2), hs: shp({inv:args.bo1,consrate:args.crbo1}), col4: 60, order: orderdate({ hs: shp({inv:args.bo1,consrate:args.crbo1}),mhs:60, lt:60}), col5: (args.bo1 - data(args).bo1.sum).toFixed(2)},
        inv2: {col1: "150SN", col2: data(args).bo2.sum.toFixed(2), hs: shp({inv:args.bo2,consrate:args.crbo2}),col4: 60,order: orderdate({hs: shp({inv:args.bo2,consrate:args.crbo2}), mhs:60, lt:60}),col5: (args.bo2 - data(args).bo2.sum).toFixed(2)},
        inv3: {col1: "BS150", col2: data(args).bo3.sum.toFixed(2), hs: shp({inv:args.bo3,consrate:args.crbo3}),col4: 60,order: orderdate({hs: shp({inv:args.bo3,consrate:args.crbo3}), mhs:60, lt:60}),col5: (args.bo3 - data(args).bo3.sum).toFixed(2)},
        inv4: {col1: "SN80/SN100", col2: data(args).bo4.sum.toFixed(2), hs: shp({inv:args.bo4,consrate:args.crbo4}),col4: 60,order: orderdate({hs: shp({inv:args.bo4,consrate:args.crbo4}), mhs:60, lt:60}),col5: (args.bo4 - data(args).bo4.sum).toFixed(2)},
        inv5: {col1: "DPK", col2: data(args).bo5.sum.toFixed(2), hs: shp({inv:args.bo5,consrate:args.crbo5}),col4: 60,order: orderdate({hs: shp({inv:args.bo5,consrate:args.crbo5}), mhs:60, lt:60}),col5: (args.bo5 - data(args).bo5.sum).toFixed(2)},

        inv6: {col1: "TBN+", col2: data(args).ad1.sum.toFixed(2), hs: shp({inv:args.ad1,consrate:args.crad1}),col4: 40,order: orderdate({hs: shp({inv:args.ad1,consrate:args.crad1}), mhs:60, lt:40}),col5: (args.ad1 - data(args).ad1.sum).toFixed(2)},
        inv7: {col1: "PPD", col2: data(args).ad2.sum.toFixed(2), hs: shp({inv:args.ad2,consrate:args.crad2}),col4: 40,order: orderdate({hs: shp({inv:args.ad2,consrate:args.crad2}), mhs:60, lt:40}),col5: (args.ad2 - data(args).ad2.sum).toFixed(2)},
        inv8: {col1: "CI-4", col2: data(args).ad3.sum.toFixed(2), hs: shp({inv:args.ad3,consrate:args.crad3}),col4: 40, order: orderdate({hs: shp({inv:args.ad3,consrate:args.crad3}), mhs:60, lt:40}),col5: (args.ad3 - data(args).ad3.sum).toFixed(2)},
        inv9: {col1: "BS200", col2: data(args).ad4.sum.toFixed(2), hs: shp({inv:args.ad4,consrate:args.crad4}),col4: 40,order: orderdate({hs: shp({inv:args.ad4,consrate:args.crad4}), mhs:60, lt:40}),col5: (args.ad4 - data(args).ad4.sum).toFixed(2)},
        inv10: {col1: "VII", col2: data(args).ad5.sum.toFixed(2), hs: shp({inv:args.ad5,consrate:args.crad5}),col4: 40,order: orderdate({hs: shp({inv:args.ad5,consrate:args.crad5}), mhs:60, lt:40}),col5: (args.ad5 - data(args).ad5.sum).toFixed(2)},
        inv11: {col1: "MONO PA EO", col2: data(args).ad6.sum.toFixed(2), hs: shp({inv:args.ad6,consrate:args.crad6}),col4: 40,order: orderdate({hs: shp({inv:args.ad6,consrate:args.crad6}), mhs:60, lt:40}),col5: (args.ad6 - data(args).ad6.sum).toFixed(2)},
        inv12: {col1: "4T PA PEO", col2: data(args).ad7.sum.toFixed(2), hs: shp({inv:args.ad7,consrate:args.crad7}),col4: 40,order: orderdate({hs: shp({inv:args.ad7,consrate:args.crad7}), mhs:60, lt:40}),col5: (args.ad7 - data(args).ad7.sum).toFixed(2)},
        inv13:{col1: "ATF PA", col2: data(args).ad8.sum.toFixed(2), hs: shp({inv:args.ad8,consrate:args.crad8}),col4: 40,order: orderdate({hs: shp({inv:args.ad8,consrate:args.crad8}), mhs:60, lt:40}), col5: (args.ad8 - data(args).ad8.sum).toFixed(2)},
        inv14:{col1: "2T PA", col2: data(args).ad9.sum.toFixed(2), hs: shp({inv:args.ad9,consrate:args.crad9}),col4: 40,order: orderdate({hs: shp({inv:args.ad9,consrate:args.crad9}), mhs:60, lt:40}), col5: (args.ad9 - data(args).ad9.sum).toFixed(2)},
        inv15:{col1: "HYA", col2: data(args).ad10.sum.toFixed(2), hs: shp({inv:args.ad10,consrate:args.crad10}),col4: 40,order: orderdate({hs: shp({inv:args.ad10,consrate:args.crad10}), mhs:60, lt:40}),col5: (args.ad10 - data(args).ad10.sum).toFixed(2)},
        inv16:{col1: "DYE", col2: data(args).ad11.sum.toFixed(2), hs: shp({inv:args.ad11,consrate:args.crad11}),col4: 40,order: orderdate({hs: shp({inv:args.ad11,consrate:args.crad11}), mhs:60, lt:40}),col5: (args.ad11 - data(args).ad11.sum).toFixed(2)},
        inv17:{col1: "TURB", col2: data(args).ad12.sum.toFixed(2), hs: shp({inv:args.ad12,consrate:args.crad12}),col4: 40,order: orderdate({hs: shp({inv:args.ad12,consrate:args.crad12}), mhs:60, lt:40}),col5: (args.ad12 - data(args).ad12.sum).toFixed(2)}
    
    }
    //var testobj = {a:1,b:"strsign", c:data(args).ad12.sum.toFixed(2)};
    useEffect(()=>{
        //localStorage.setItem(props.title + '_inv_table', JSON.stringify(inv_table_data))
        localStorage.setItem(props.title + "_inv_table", JSON.stringify(finance_table))
    }, [args])

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
            result = "later";}
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
            {/* <TabInTab /> */}
            {currentmonth[current({start: startdater, current:initdate, end:enddater})]} {` `} Month
            {/* as of: {`${initdate.getDate()}/${String(initdate.getMonth() + 1).padStart(2, '0')}/${initdate.getFullYear()} `} */}
            {/* Today's Date's month: {initdate.toLocaleDateString('en-US', { month: 'short' })}  */}
            <Center overflow={'auto'}>
                <Box bg='white' padding={3} border={"1px"} borderRadius='15px' width='80%' height='500px' shadow={'lg'} overflow={'auto'}>
                        <AgChartsReact options={chartOptions}/>
                </Box>
            </Center>
            {/* <Input onChange={handledate} type='date' width={160}/> */}
            {/* {display[current({start: startdater, current:initdate, end:enddater})]} */}
            <Button onClick={()=>{localStorage.clear()}}>clear local storage</Button>
            <Center overflow={'auto'} border={"1px"} borderRadius='15px'>
                <Flex width='90%' overflow={'auto'}>

                    <Box>
                        <TaBle title="Products" columns={prod_table_columns} data={prod_table_data}  />
                    </Box>
                    <Spacer width={10} />
                    <Box  >
                        <TaBle title="Inventory" columns={inv_table_columns} data={inv_table_data}  />
                    </Box>

                </Flex>
            </Center>
            
        </div>
    )
}

export default Graph3;
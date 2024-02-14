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
import { getCurrentUser, getCurrentUserId, query } from 'thin-backend';
import { useQuery } from 'thin-backend-react';

function TableDB(){
    const data = useQuery(query('january_sales_projections').orderByAsc('quantity'))
    const table_data = [];
    // data.forEach((product, index)=>{
    //     table_data.push({col1: product.quantity, col2: product.productName})
    // })
    const prod_table_columns = ["column1", "column2"];
    var prod_table_data = [
        {col1: 1, col2: 2},
        {col1: 3, col2: 4},
        {col1: 5, col2: 2}
    ]
    var cellBgColor = '';
    const tasks = useQuery(query('tasks').orderByDesc('createdAt'));
    if (tasks === null) {
        return <div>Loading ...</div>;
    }
    return <div>
                {/* <Button onClick={()=>{console.log(tasks)}}>Print data</Button> */}
                {tasks.map(task => <div>{task.title}</div>)}
                {data.map(product => <div>{product.quantity}</div>)}
                {/* <TaBle title="Products" columns={prod_table_columns} data={prod_table_data} bg={cellBgColor} /> */}
            </div>
}

function Graph3(props){
    var dataid = props.title + "stored_data";
    var data = DataFunction;
    
    const [args, SetArgs] = useState(() =>
        {
        //const backend_data = query(dataid).fetch();
        //let retrieve = query('january_sales_projections').fetch();
        //let _4T_value = retrieve[0].quantity;
        let stored_data = localStorage.getItem(dataid);
        return stored_data ?  JSON.parse(stored_data) : {
        bo1: 306.776, bo2: 237.701, bo3:152.46, bo4: 0, bo5: 1.04, bo6: 110, ad1:0.422, ad2:130, ad3:120, ad4:115, ad5: 109, ad6: 108, ad7: 140, ad8: 120, ad9:140, ad10: 169, ad11: 130, ad12: 123, //Starting inventory is a prop
        formulas: {
            _2T: populateformula({bo1:0.9050, bo5:0.08, ad9:0.0150}),
            _4T: populateformula({bo1:0.878, ad1:0.002,ad2:0.002, ad5:0.063, ad7:0.0550}),
            atfIII: populateformula({bo2:0.9317,ad8:0.068,ad11:0.0003, bo4:0}),
            DuramaxHD: populateformula({bo1:0.72, bo3:0.23,ad1:0.006,ad6:0.0440}), 
            FrontiaX: populateformula({bo1:0.6480, bo2:0.2160, ad2:0.002,ad5:0.080,ad7:0.0540}),
            Geo80W90:populateformula({bo1:0.7370,bo3:0.23,ad2:0.002,ad4:0.023, ad5:0.008}),
            Geo85W140:populateformula({bo1:0.070,bo3:0.8870,ad2:0.003,ad4:0.0400}),
            Hydrax32:populateformula({bo2:0.9895,ad2:0.002,ad10:0.0085}),
            HydraxZ46:populateformula({bo1:0.24,bo2:0.7495,ad2:0.002,ad10:0.0085}),
            HydraxZ68:populateformula({bo1:0.6895,bo2:0.3,ad2:0.002,ad10:0.0085}),
            PowerTransSP150:populateformula({bo1:0.760,bo3:0.223,ad2: 0.002,ad4:0.0150}),
            PowerTransSP220:populateformula({bo1:0.3280,bo3:0.65,ad2:0.002,ad4:0.02}),
            PowerTransSP320:populateformula({bo1:0.15, bo3:0.8330,ad2:0.002,ad4:0.0150}),
            Sb22D210:populateformula({bo2:1}),
            SentryHDSae40:populateformula({bo1:0.730,bo3:0.233,ad1:0.003,ad6:0.0340}),
            TurbofleetSae15W:populateformula({bo1:0.3950,bo2:0.3990,ad1:0.002,ad2:0.002,ad3:0.1170,ad5:0.085}),
            DuramaxExtra: populateformula({bo1:0.63, bo3:0.274, ad6: 0.044, ad5: 0.05, ad2: 0.002})
        },
        _2T:80, _4T: 320,atfIII: 12,DuramaxHD:102, FrontiaX:18,Geo80W90:10,Geo85W140:26,Hydrax32:2,HydraxZ46:5,HydraxZ68:9,PowerTransSP150:1,PowerTransSP220:3,PowerTransSP320:4,Sb22D210:3,SentryHDSae40:30,TurbofleetSae15W:93, DuramaxExtra: 20,
        crbo1: 14.3, crbo2: 1.4, crbo3:2.07, crbo4: 0.06, crbo5: 0.24, crbo6: 0.01, crad1:0.01, crad2:0.03, crad3:0.3, crad4:0.05, crad5: 0.71, crad6: 0.14, crad7: 0.44, crad8: 0.02, crad9:0.05, crad10: 0.003, crad11: 1, crad12: 1,
        trbo1: 0, trbo2: 0, trbo3:0, trbo4: 0, trbo5: 0, trbo6: 0, trad1:0, trad2:0, trad3:0, trad4:0, trad5: 0, trad6: 0, trad7: 0, trad8: 0, trad9:0, trad10: 0, trad11: 0, trad12: 0,
        mhs:30,
        prbo1: 1175, prbo2: 1090, prbo3:1375, prbo4: 0, prbo5: 0, prbo6: 0.01, prad1:3660, prad2:1185, prad3:4750, prad4:8450, prad5: 2330, prad6: 4250, prad7: 4670, prad8: 1095, prad9:6900, prad10: 8900, prad11: 1, prad12: 1,
        daysbo1: 30, daysbo2: 30, daysbo3:30, daysbo4: 30, daysbo5: 30, daysbo6: 30, daysad1:30, daysad2:30, daysad3:30, daysad4:30, daysad5: 30, daysad6: 30, daysad7: 30, daysad8:30, daysad9:30, daysad10: 30, daysad11: 30, daysad12: 30
    }}
    );
    var number_stateless = 0;
    const [numberStateful, SetNumberStateful] = useState(0);
    useEffect(() => {//this saves to storage everytime the dependence "args" changes
        localStorage.setItem(dataid, JSON.stringify(args));
        number_stateless = localStorage.getItem('number');
        SetNumberStateful(JSON.parse(localStorage.getItem('number')))
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
        data(args).series15, data(args).series16, data(args).series17, data(args).series18
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
        getCurrentUser().then((value)=>{console.log(value.email)})
        console.log(getCurrentUser())
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
        let new_val = number;
        console.log(`${id}: ${number}`)
        SetArgs((current) => {
            return {...current, [id]: new_val}
        });
    }
    function product_total(args){
        let productlist = ["_2T", "_4T", "atfIII", "DuramaxHD", "FrontiaX", "Geo80W90", "Geo85W140", "Hydrax32","HydraxZ46","HydraxZ68","PowerTransSP150","PowerTransSP220","PowerTransSP320","Sb22D210","SentryHDSae40","TurbofleetSae15W", "DuramaxExtra"]
        var sum = 0;
        for (const product of productlist) {
            sum = sum + parseFloat(args[product]);
        }
        return (sum);
    }
    
    var orderdate = (obj) => {
        let current = new Date()
        //let x = obj.mhs + obj.lt;
        let transit_holding_stock_period = parseFloat(obj.transit)/obj.consrate; 
        let mhs = parseFloat(obj.mhs);
        let hs = parseFloat(obj.hs);
        let lt = parseFloat(obj.lt);
        //let days_until_order = obj.hs - (mhs + obj.lt) + transit_holding_stock_period; //OPTION B
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

    var shp = (obj)=>{
        //let result = (obj.inv / obj.consrate).toFixed(1); //OPTION B
        let transit = parseFloat(obj.transit);
        let inv = parseFloat(obj.inv);
        let consrate = parseFloat(obj.consrate);
        let result = parseFloat((((inv + transit) / consrate)).toFixed(1));//OPTION A
        return result;
    }

    const [isButtonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const value = await getCurrentUser();
            if (value.email === "ellisrgrz@gmail.com") {
                setButtonDisabled(true);
            } else {
                //setButtonDisabled(true);
                setButtonDisabled(false); //limit access to just me
            }
        };
        fetchData();
    }, []); //306.776 ... 325.888

    const [access, SetAcess] = useState({product: false, inventory: false, transit: false, consumption: false})
    useEffect(()=>{
        const fetchData = async () => {
            let id = await getCurrentUser();
            SetAcess({product: !id.product, inventory: !id.inventory, transit: !id.transit, consumption: !id.consumption})
        }
        fetchData()
    },[])
    const [test, SetTest] = useState(12);
    useEffect(()=>{
        const fetchData = async () => {
            try {
                let _4T_initial = await query('january_sales_projections').fetch();
                let result = _4T_initial[0].quantity;
                SetTest(result)
            }
            catch(error) {
                console.log(`The error is ${error}`)
            }
            
        }
        fetchData();
    },[args])//what should stimulate this retreival of data from the front end,
    const backend_data = 0;
    async function initDbData(){
        const _4T_initial = await query('january_sales_projections').fetch();
        let result = _4T_initial[0].quantity;
        backend_data = result;
    }
    //initDbData();
    
    var prod_table_data_fake = async () => {
        const _4T_initial = await query('january_sales_projections').fetch();
        let result = _4T_initial[0].quantity;
        return result
    }
    var tester = prod_table_data_fake();
    var buttonsize = "md";
    var initdate = new Date();
    var prod_table_columns = ["Products", "Quantity (Tons)", "Maximize"]
    var prod_table_data = { //I could assign args backend data, or I could plug backend data straight into here
        prod1: {col1: "2T", col2: <NumberInp access={access.product} value={args._2T} prod="_2T" onChange={prodtable} init={args._2T} />, col4: <Button size={buttonsize} id='max' name='_2T' onClick={tablebutton} isDisabled={access.product} >Set Max</Button>},
        prod2: {col1: "4T", col2: <NumberInp access={access.product} value={args._4T} prod="_4T" onChange={prodtable} init={args._4T} />, col4: <Button size={buttonsize} id='max' name='_4T' onClick={tablebutton} isDisabled={access.product}>Set Max</Button>},
        prod3: {col1: "ATF III", col2: <NumberInp access={access.product} value={args.atfIII} prod="atfIII" onChange={prodtable} init={args.atfIII} />, col4: <Button size={buttonsize} id='max' name='atfIII' onClick={tablebutton} isDisabled={access.product}>Set Max</Button>},
        prod4: {col1: "Duramax HD", col2: <NumberInp access={access.product} value={args.DuramaxHD} prod="DuramaxHD" onChange={prodtable} init={args.DuramaxHD} />, col4: <Button size={buttonsize} id='max' name='DuramaxHD' onClick={tablebutton} isDisabled={access.product}>Set Max</Button>},
        prod17: {col1: "Duramax Extra", col2: <NumberInp access={access.product} value={args.DuramaxExtra} prod="DuramaxExtra" onChange={prodtable} init={args.DuramaxExtra} />, col4: <Button size={buttonsize} id='max' name='DuramaxExtra' onClick={tablebutton} isDisabled={access.product}>Set Max</Button>},
        prod5: {col1: "Frontia X", col2: <NumberInp access={access.product} value={args.FrontiaX} prod="FrontiaX" onChange={prodtable} init={args.FrontiaX} />, col4: <Button size={buttonsize} id='max' name='FrontiaX' onClick={tablebutton} isDisabled={access.product}>Set Max</Button>},
        prod6: {col1: "GEO 80W90", col2: <NumberInp access={access.product} value={args.Geo80W90} prod="Geo80W90" onChange={prodtable} init={args.Geo80W90} />, col4: <Button size={buttonsize} id='max' name='Geo80W90' onClick={tablebutton} isDisabled={access.product}>Set Max</Button>},
        prod7: {col1: "GEO 85W140", col2: <NumberInp access={access.product} value={args.Geo85W140} prod="Geo85W140" onChange={prodtable} init={args.Geo85W140} />, col4: <Button size={buttonsize} id='max' name='Geo85W140' onClick={tablebutton} isDisabled={access.product}>Set Max</Button>},
        prod8: {col1: "Hydrax 32", col2: <NumberInp access={access.product} value={args.Hydrax32} prod="Hydrax32" onChange={prodtable} init={args.Hydrax32} />, col4: <Button size={buttonsize} id='max' name='Hydrax32' onClick={tablebutton} isDisabled={access.product}>Set Max</Button>},
        prod9: {col1: "Hydrax Z 46", col2: <NumberInp access={access.product} value={args.HydraxZ46} prod="HydraxZ46" onChange={prodtable} init={args.HydraxZ46} />, col4: <Button size={buttonsize} id='max' name='HydraxZ46' onClick={tablebutton} isDisabled={access.product}>Set Max</Button>},
        prod10: {col1: "Hydrax Z 68", col2: <NumberInp access={access.product} value={args.HydraxZ68} prod="HydraxZ68" onChange={prodtable} init={args.HydraxZ68} />, col4: <Button size={buttonsize} id='max' name='HydraxZ68' onClick={tablebutton} isDisabled={access.product}>Set Max</Button>},
        prod11: {col1: "Power Trans SP 150", col2: <NumberInp access={access.product} value={args.PowerTransSP150} prod="PowerTransSP150" onChange={prodtable} init={args.PowerTransSP150} />, col4: <Button size={buttonsize} id='max' name='PowerTransSP150' onClick={tablebutton} isDisabled={access.product}>Set Max</Button>},
        prod12: {col1: "Power Trans SP 220", col2: <NumberInp access={access.product} value={args.PowerTransSP220} prod="PowerTransSP220" onChange={prodtable} init={args.PowerTransSP220} />, col4: <Button size={buttonsize} id='max' name='PowerTransSP220' onClick={tablebutton} isDisabled={access.product}>Set Max</Button>},
        prod13: {col1: "Power Trans SP 320", col2: <NumberInp access={access.product} value={args.PowerTransSP320} prod="PowerTransSP320" onChange={prodtable} init={args.PowerTransSP320} />, col4: <Button size={buttonsize} id='max' name='PowerTransSP320' onClick={tablebutton} isDisabled={access.product}>Set Max</Button>},
        prod14: {col1: "SB 22 D210", col2: <NumberInp access={access.product} value={args.Sb22D210} prod="Sb22D210" onChange={prodtable} init={args.Sb22D210} />, col4: <Button size={buttonsize} id='max' name='Sb22D210' onClick={tablebutton} isDisabled={access.product}>Set Max</Button>},
        prod15: {col1: "Sentry HD Sae 40", col2: <NumberInp access={access.product} value={args.SentryHDSae40} prod="SentryHDSae40" onChange={prodtable} init={args.SentryHDSae40} />, col4: <Button size={buttonsize} id='max' name='SentryHDSae40' onClick={tablebutton} isDisabled={access.product}>Set Max</Button>},
        prod16: {col1: "Turbofleet Sae 15W", col2: <NumberInp access={access.product} value={args.TurbofleetSae15W} prod="TurbofleetSae15W" onChange={prodtable} init={args.TurbofleetSae15W} />, col4: <Button size={buttonsize} id='max' name='TurbofleetSae15W' onClick={tablebutton} isDisabled={access.product}>Set Max</Button>},
        total: {col1: "Total", col2: product_total(args), col3: <Button size={'md'} isDisabled={isButtonDisabled} >Empty</Button> }
    }
    
    var inv_table_columns = ["Inventory", "Required", "In stock (Tons)", "In Transit (Tons)", "Avg. daily consumption rate (Tons)","Stock holding period","Lead time (days)", "Next order date", "Order Qty (days)","Order Qty (MT) ", "Price per MT", "Value (USD)"];
    var inv_table_data = {
        inv1: {col1: "500SN/600N", col2: (data(args).bo1.sum.toFixed(2)), col3: <NumberInp access={access.inventory} prod="bo1" init={args.bo1} onChange={inv_table} value={args.bo1} />,transit: <NumberInp access={access.transit} prod="trbo1" init={args.trbo1} onChange={inv_table} value={args.trbo1} />, consrate:<NumberInp access={access.consumption} prod="crbo1" init={args.crbo1} onChange={inv_table} value={args.crbo1}/>, 
            hs: shp({inv:args.bo1,consrate:args.crbo1, transit: args.trbo1}), col4: 60, order: orderdate({ hs: shp({inv:args.bo1,consrate:args.crbo1, transit: args.trbo1}),mhs:args.mhs, lt:60,transit: args.trbo1, consrate:args.crbo1}), qtyDays: <NumberInp init={args.daysbo1} access={false} onChange={inv_table} value={args.daysbo1} prod="daysbo1"/>, qtyTons: parseFloat((args.daysbo1 * args.crbo1).toFixed(2)), price: <NumberInp init={args.prbo1} access={false} onChange={inv_table} value={args.prbo1} prod="prbo1"/>, get value(){return this.qtyTons * args.prbo1}},
        inv2: {col1: "150SN", col2: (data(args).bo2.sum.toFixed(2)), col3: <NumberInp access={access.inventory} prod="bo2" init={args.bo2} onChange={inv_table} value={args.bo2} />,transit: <NumberInp access={access.transit} prod="trbo2" init={args.trbo2} onChange={inv_table} value={args.trbo2} />, consrate:<NumberInp access={access.consumption} prod="crbo2" init={args.crbo2} onChange={inv_table} value={args.crbo2}/>, 
            hs: shp({inv:args.bo2,consrate:args.crbo2, transit: args.trbo2}),col4: 60,order: orderdate({ hs: shp({inv:args.bo2,consrate:args.crbo2, transit: args.trbo2}),mhs:args.mhs, lt:60,transit: args.trbo2, consrate:args.crbo2}),qtyDays: <NumberInp init={args.daysbo2} access={false} onChange={inv_table} value={args.daysbo2} prod="daysbo2"/>, qtyTons: parseFloat((args.daysbo2 * args.crbo2).toFixed(2)), price: <NumberInp init={args.prbo2} access={false} onChange={inv_table} value={args.prbo2} prod="prbo2"/>, get value(){return this.qtyTons * args.prbo2}},
        inv3: {col1: "BS150", col2: (data(args).bo3.sum.toFixed(2)), col3: <NumberInp access={access.inventory} prod="bo3" init={args.bo3} onChange={inv_table} value={args.bo3} />,transit: <NumberInp access={access.transit} prod="trbo3" init={args.trbo3} onChange={inv_table} value={args.trbo3} />, consrate:<NumberInp access={access.consumption} prod="crbo3" init={args.crbo3} onChange={inv_table} value={args.crbo3}/>,
            hs: shp({inv:args.bo3,consrate:args.crbo3, transit: args.trbo3}),col4: 60,order: orderdate({ hs: shp({inv:args.bo3,consrate:args.crbo3, transit: args.trbo3}),mhs:args.mhs, lt:60,transit: args.trbo3, consrate:args.crbo3}),qtyDays: <NumberInp init={args.daysbo3} access={false} onChange={inv_table} value={args.daysbo3} prod="daysbo3"/>, qtyTons: parseFloat((args.daysbo3 * args.crbo3).toFixed(2)), price: <NumberInp init={args.prbo3} access={false} onChange={inv_table} value={args.prbo3} prod="prbo3"/>, get value(){return this.qtyTons * args.prbo3}},
        inv4: {col1: "SN80/SN100", col2: (data(args).bo4.sum.toFixed(2)), col3: <NumberInp access={access.inventory} prod="bo4" init={args.bo4} onChange={inv_table} value={args.bo4} />,transit: <NumberInp access={access.transit} prod="trbo4" init={args.trbo4} onChange={inv_table} value={args.trbo4} />, consrate:<NumberInp access={access.consumption} prod="crbo4" init={1} onChange={inv_table} value={args.crbo4}/>, 
            hs: shp({inv:args.bo4,consrate:args.crbo4, transit: args.trbo4}),col4: 60,order: orderdate({ hs: shp({inv:args.bo4,consrate:args.crbo4, transit: args.trbo4}),mhs:args.mhs, lt:60,transit: args.trbo4, consrate:args.crbo4}),qtyDays: <NumberInp init={args.daysbo4} access={false} onChange={inv_table} value={args.daysbo4} prod="daysbo4"/>, qtyTons: parseFloat((args.daysbo4 * args.crbo4).toFixed(2)), price: <NumberInp init={args.prbo4} access={false} onChange={inv_table} value={args.prbo4} prod="prbo4"/>, get value(){return this.qtyTons * args.prbo4}},
        inv5: {col1: "DPK", col2: (data(args).bo5.sum.toFixed(2)), col3: <NumberInp access={access.inventory} prod="bo5" init={args.bo5} onChange={inv_table} value={args.bo5} />,transit: <NumberInp access={access.transit} prod="trbo5" init={args.trbo5} onChange={inv_table} value={args.trbo5} />, consrate:<NumberInp access={access.consumption} prod="crbo5" init={args.crbo5} onChange={inv_table} value={args.crbo5}/>, 
            hs: shp({inv:args.bo5,consrate:args.crbo5, transit: args.trbo5}),col4: 60,order: orderdate({ hs: shp({inv:args.bo5,consrate:args.crbo5, transit: args.trbo5}),mhs:args.mhs, lt:60,transit: args.trbo5, consrate:args.crbo5}),qtyDays: <NumberInp init={args.daysbo5} access={false} onChange={inv_table} value={args.daysbo5} prod="daysbo5"/>, qtyTons: parseFloat((args.daysbo5 * args.crbo5).toFixed(2)), price: <NumberInp init={args.prbo5} access={false} onChange={inv_table} value={args.prbo5} prod="prbo5"/>, get value(){return this.qtyTons * args.prbo5}},

        inv6: {col1: "TBN+", col2: data(args).ad1.sum.toFixed(2), col3: <NumberInp access={access.inventory} prod="ad1" init={args.ad1} onChange={inv_table} value={args.ad1} />,transit: <NumberInp access={access.transit} prod="trad1" init={args.trad1} onChange={inv_table} value={args.trad1} />, consrate:<NumberInp access={access.consumption} prod="crad1" init={args.crad1} onChange={inv_table} value={args.crad1}/>, 
            hs: shp({inv:args.ad1,consrate:args.crad1, transit: args.trad1}),col4: 40,order: orderdate({ hs: shp({inv:args.ad1,consrate:args.crad1, transit: args.trad1}),mhs:args.mhs, lt:40,transit: args.trad1, consrate:args.crad1}),qtyDays: <NumberInp init={args.daysad1} access={false} onChange={inv_table} value={args.daysad1} prod="daysad1"/>, qtyTons: parseFloat((args.daysad1 * args.crad1).toFixed(2)), price: <NumberInp init={args.prad1} access={false} onChange={inv_table} value={args.prad1} prod="prad1"/>, get value(){return this.qtyTons * args.prad1}},
        inv7: {col1: "PPD", col2: data(args).ad2.sum.toFixed(2), col3: <NumberInp access={access.inventory} prod="ad2" init={args.ad2} onChange={inv_table} value={args.ad2} />,transit: <NumberInp access={access.transit} prod="trad2" init={args.trad2} onChange={inv_table} value={args.trad2} />, consrate:<NumberInp access={access.consumption} prod="crad2" init={args.crad2} onChange={inv_table} value={args.crad2}/>, 
            hs: shp({inv:args.ad2,consrate:args.crad2, transit: args.trad2}),col4: 40,order: orderdate({ hs: shp({inv:args.ad2,consrate:args.crad2, transit: args.trad2}),mhs:args.mhs, lt:40,transit: args.trad2, consrate:args.crad2}),qtyDays: <NumberInp init={args.daysad2} access={false} onChange={inv_table} value={args.daysad2} prod="daysad2"/>, qtyTons: parseFloat((args.daysad2 * args.crad2).toFixed(2)), price: <NumberInp init={args.prad2} access={false} onChange={inv_table} value={args.prad2} prod="prad2"/>, get value(){return this.qtyTons * args.prad2}},
        inv8: {col1: "CI-4", col2: data(args).ad3.sum.toFixed(2), col3: <NumberInp access={access.inventory} prod="ad3" init={args.ad3} onChange={inv_table} value={args.ad3} />,transit: <NumberInp access={access.transit} prod="trad3" init={args.trad3} onChange={inv_table} value={args.trad3} />, consrate:<NumberInp access={access.consumption} prod="crad3" init={args.crad3} onChange={inv_table} value={args.crad3}/>, 
            hs: shp({inv:args.ad3,consrate:args.crad3, transit: args.trad3}),col4: 40, order: orderdate({ hs: shp({inv:args.ad3,consrate:args.crad3, transit: args.trad3}),mhs:args.mhs, lt:40,transit: args.trad3, consrate:args.crad3}),qtyDays: <NumberInp init={args.daysad3} access={false} onChange={inv_table} value={args.daysad3} prod="daysad3"/>, qtyTons: parseFloat((args.daysad3 * args.crad3).toFixed(2)), price: <NumberInp init={args.prad3} access={false} onChange={inv_table} value={args.prad3} prod="prad3"/>, get value(){return this.qtyTons * args.prad3}},
        inv9: {col1: "GOA", col2: data(args).ad4.sum.toFixed(2), col3: <NumberInp access={access.inventory} prod="ad4" init={args.ad4} onChange={inv_table} value={args.ad4} />,transit: <NumberInp access={access.transit} prod="trad4" init={args.trad4} onChange={inv_table} value={args.trad4} />, consrate:<NumberInp access={access.consumption} prod="crad4" init={args.crad4} onChange={inv_table} value={args.crad4}/>, 
            hs: shp({inv:args.ad4,consrate:args.crad4, transit: args.trad4}),col4: 40,order: orderdate({ hs: shp({inv:args.ad4,consrate:args.crad4, transit: args.trad4}),mhs:args.mhs, lt:40,transit: args.trad4, consrate:args.crad4}),qtyDays: <NumberInp init={args.daysad4} access={false} onChange={inv_table} value={args.daysad4} prod="daysad4"/>, qtyTons: parseFloat((args.daysad4 * args.crad4).toFixed(2)), price: <NumberInp init={args.prad4} access={false} onChange={inv_table} value={args.prad4} prod="prad4"/>, get value(){return this.qtyTons * args.prad4}},
        inv10: {col1: "VII", col2: data(args).ad5.sum.toFixed(2), col3: <NumberInp access={access.inventory} prod="ad5" init={args.ad5} onChange={inv_table} value={args.ad5} />,transit: <NumberInp access={access.transit} prod="trad5" init={args.trad5} onChange={inv_table} value={args.trad5} />, consrate:<NumberInp access={access.consumption} prod="crad5" init={args.crad5} onChange={inv_table} value={args.crad5}/>, 
            hs: shp({inv:args.ad5,consrate:args.crad5, transit: args.trad5}),col4: 40,order: orderdate({ hs: shp({inv:args.ad5,consrate:args.crad5, transit: args.trad5}),mhs:args.mhs, lt:40,transit: args.trad5, consrate:args.crad5}),qtyDays: <NumberInp init={args.daysad5} access={false} onChange={inv_table} value={args.daysad5} prod="daysad5"/>, qtyTons: parseFloat((args.daysad5 * args.crad5).toFixed(2)), price: <NumberInp init={args.prad5} access={false} onChange={inv_table} value={args.prad5} prod="prad5"/>, get value(){return this.qtyTons * args.prad5}},
        inv11: {col1: "MONO PA EO", col2: data(args).ad6.sum.toFixed(2), col3: <NumberInp access={access.inventory} prod="ad6" init={args.ad6} onChange={inv_table} value={args.ad6} />,transit: <NumberInp access={access.transit} prod="trad6" init={args.trad6} onChange={inv_table} value={args.trad6} />, consrate:<NumberInp access={access.consumption} prod="crad6" init={args.crad6} onChange={inv_table} value={args.crad6}/>, 
            hs: shp({inv:args.ad6,consrate:args.crad6, transit: args.trad6}),col4: 40,order: orderdate({ hs: shp({inv:args.ad6,consrate:args.crad6, transit: args.trad6}),mhs:args.mhs, lt:40,transit: args.trad6, consrate:args.crad6}),qtyDays: <NumberInp init={args.daysad6} access={false} onChange={inv_table} value={args.daysad6} prod="daysad6"/>, qtyTons: parseFloat((args.daysad6 * args.crad6).toFixed(2)), price: <NumberInp init={args.prad6} access={false} onChange={inv_table} value={args.prad6} prod="prad6"/>, get value(){return this.qtyTons * args.prad6}},
        inv12: {col1: "4T PA PEO", col2: data(args).ad7.sum.toFixed(2), col3: <NumberInp access={access.inventory} prod="ad7" init={args.ad7} onChange={inv_table} value={args.ad7} />,transit: <NumberInp access={access.transit} prod="trad7" init={args.trad7} onChange={inv_table} value={args.trad7} />, consrate:<NumberInp access={access.consumption} prod="crad7" init={args.crad7} onChange={inv_table} value={args.crad7}/>, 
            hs: shp({inv:args.ad7,consrate:args.crad7, transit: args.trad7}),col4: 40,order: orderdate({ hs: shp({inv:args.ad7,consrate:args.crad7, transit: args.trad7}),mhs:args.mhs, lt:40,transit: args.trad7, consrate:args.crad7}),qtyDays: <NumberInp init={args.daysad7} access={false} onChange={inv_table} value={args.daysad7} prod="daysad7"/>, qtyTons: parseFloat((args.daysad7 * args.crad7).toFixed(2)), price: <NumberInp init={args.prad7} access={false} onChange={inv_table} value={args.prad7} prod="prad7"/>, get value(){return this.qtyTons * args.prad7}},
        inv13:{col1: "ATF PA", col2: data(args).ad8.sum.toFixed(2), col3: <NumberInp access={access.inventory} prod="ad8" init={args.ad8} onChange={inv_table} value={args.ad8} />,transit: <NumberInp access={access.transit} prod="trad8" init={args.trad8} onChange={inv_table} value={args.trad8} />, consrate:<NumberInp access={access.consumption} prod="crad8" init={args.crad8} onChange={inv_table} value={args.crad8}/>, 
            hs: shp({inv:args.ad8,consrate:args.crad8, transit: args.trad8}),col4: 40,order: orderdate({ hs: shp({inv:args.ad8,consrate:args.crad8, transit: args.trad8}),mhs:args.mhs, lt:40,transit: args.trad8, consrate:args.crad8}),qtyDays: <NumberInp init={args.daysad8} access={false} onChange={inv_table} value={args.daysad8} prod="daysad8"/>, qtyTons: parseFloat((args.daysad8 * args.crad8).toFixed(2)), price: <NumberInp init={args.prad8} access={false} onChange={inv_table} value={args.prad8} prod="prad8"/>, get value(){return this.qtyTons * args.prad8}},
        inv14:{col1: "2T PA", col2: data(args).ad9.sum.toFixed(2), col3: <NumberInp access={access.inventory} prod="ad9" init={args.ad9} onChange={inv_table} value={args.ad9} />,transit: <NumberInp access={access.transit} prod="trad9" init={args.trad9} onChange={inv_table} value={args.trad9} />, consrate:<NumberInp access={access.consumption} prod="crad9" init={args.crad9} onChange={inv_table} value={args.crad9}/>, 
            hs: shp({inv:args.ad9,consrate:args.crad9, transit: args.trad9}),col4: 40,order: orderdate({ hs: shp({inv:args.ad9,consrate:args.crad9, transit: args.trad9}),mhs:args.mhs, lt:40,transit: args.trad9, consrate:args.crad9}),qtyDays: <NumberInp init={args.daysad9} access={false} onChange={inv_table} value={args.daysad9} prod="daysad9"/>, qtyTons: parseFloat((args.daysad9 * args.crad9).toFixed(2)), price: <NumberInp init={args.prad9} access={false} onChange={inv_table} value={args.prad9} prod="prad9"/>, get value(){return this.qtyTons * args.prad9}},
        inv15:{col1: "HYA", col2: data(args).ad10.sum.toFixed(2), col3: <NumberInp access={access.inventory} prod="ad10" init={args.ad10} onChange={inv_table} value={args.ad10} />,transit: <NumberInp access={access.transit} prod="trad10" init={args.trad10} onChange={inv_table} value={args.trad10} />, consrate:<NumberInp access={access.consumption} prod="crad10" init={args.crad10} onChange={inv_table} value={args.crad10}/>, 
            hs: shp({inv:args.ad10,consrate:args.crad10, transit: args.trad10}),col4: 40,order: orderdate({ hs: shp({inv:args.ad10,consrate:args.crad10, transit: args.trad10}),mhs:args.mhs, lt:40,transit: args.trad10, consrate:args.crad10}),qtyDays: <NumberInp init={args.daysad10} access={false} onChange={inv_table} value={args.daysad10} prod="daysad10"/>, qtyTons: parseFloat((args.daysad10 * args.crad10).toFixed(2)), price: <NumberInp init={args.prad10} access={false} onChange={inv_table} value={args.prad10} prod="prad10"/>, get value(){return this.qtyTons * args.prad10}},
        inv16:{col1: "DYE", col2: data(args).ad11.sum.toFixed(2), col3: <NumberInp access={access.inventory} prod="ad11" init={args.ad11} onChange={inv_table} value={args.ad11} />,transit: <NumberInp access={access.transit} prod="trad11" init={args.trad11} onChange={inv_table} value={args.trad11} />, consrate:<NumberInp access={access.consumption} prod="crad11" init={args.crad11} onChange={inv_table} value={args.crad11}/>, 
            hs: shp({inv:args.ad11,consrate:args.crad11, transit: args.trad11}),col4: 40,order: orderdate({ hs: shp({inv:args.ad11,consrate:args.crad11, transit: args.trad11}),mhs:args.mhs, lt:40,transit: args.trad11, consrate:args.crad11}),qtyDays: <NumberInp init={args.daysad11} access={false} onChange={inv_table} value={args.daysad11} prod="daysad11"/>, qtyTons: parseFloat((args.daysad11 * args.crad11).toFixed(2)), price: <NumberInp init={args.prad11} access={false} onChange={inv_table} value={args.prad11} prod="prad11"/>, get value(){return this.qtyTons * args.prad11}},
        inv17:{col1: "TURB", col2: data(args).ad12.sum.toFixed(2), col3: <NumberInp access={access.inventory} prod="ad12" init={args.ad12} onChange={inv_table} value={args.ad12} />,transit: <NumberInp access={access.transit} prod="trad12" init={args.trad12} onChange={inv_table} value={args.trad12} />, consrate:<NumberInp access={access.consumption} prod="crad12" init={args.crad12} onChange={inv_table} value={args.crad12}/>, 
            hs: shp({inv:args.ad12,consrate:args.crad12, transit: args.trad12}),col4: 40,order: orderdate({ hs: shp({inv:args.ad12,consrate:args.crad12, transit: args.trad12}),mhs:args.mhs, lt:40,transit: args.trad12, consrate:args.crad12}),qtyDays: <NumberInp init={args.daysad12} access={false} onChange={inv_table} value={args.daysad12} prod="daysad12"/>, qtyTons: parseFloat((args.daysad12 * args.crad12).toFixed(2)), price: <NumberInp init={args.prad12} access={false} onChange={inv_table} value={args.prad12} prod="prad12"/>, get value(){return this.qtyTons * args.prad12}},
        inv18: {col1: "Total", col2:"", col3:"", col4:"", col5:"", col6: "", col7:"", col8:"", col9:"", col10:"", col11:"", col12:""}
    };
    var finance_table = {                                                                      
        inv1: {product: "500SN/600N", Qty: parseFloat(data(args).bo1.sum.toFixed(2)), Stockholding_period: shp({inv:args.bo1,consrate:args.crbo1, transit: args.trbo1}), leadtime: 60, supplier: "KDR",orderdate: orderdate({ hs: shp({inv:args.bo1,consrate:args.crbo1, transit: args.trbo1}),mhs:args.mhs, lt:60,transit: args.trbo1, consrate:args.crbo1}), paymentDueDate: paymentDue("KDR", "inv1", "order"), amountDue: amountDue("bo1",1).toLocaleString('en-US', { style: 'currency', currency: 'USD' })},
        inv2: {product: "150SN", Qty: parseFloat(data(args).bo2.sum.toFixed(2)), Stockholding_period: shp({inv:args.bo2,consrate:args.crbo2, transit: args.trbo2}),leadtime: 60,supplier: "KDR",orderdate: orderdate({ hs: shp({inv:args.bo2,consrate:args.crbo2, transit: args.trbo2}),mhs:args.mhs, lt:60,transit: args.trbo2, consrate:args.crbo2}), paymentDueDate: paymentDue("KDR", "inv2", "order"), amountDue: amountDue("bo2",1).toLocaleString('en-US', { style: 'currency', currency: 'USD' })},
        inv3: {product: "BS150", Qty: parseFloat(data(args).bo3.sum.toFixed(2)), Stockholding_period: shp({inv:args.bo3,consrate:args.crbo3, transit: args.trbo3}),leadtime: 60,supplier: "KDR",orderdate: orderdate({ hs: shp({inv:args.bo3,consrate:args.crbo3, transit: args.trbo3}),mhs:args.mhs, lt:60,transit: args.trbo3, consrate:args.crbo3}), paymentDueDate: paymentDue("KDR", "inv3", "order"), amountDue: amountDue("bo3",1).toLocaleString('en-US', { style: 'currency', currency: 'USD' })},
        inv4: {product: "SN80/SN100", Qty: parseFloat(data(args).bo4.sum.toFixed(2)), Stockholding_period: shp({inv:args.bo4,consrate:args.crbo4, transit: args.trbo4}), leadtime: 60,supplier: "Royal",orderdate: orderdate({ hs: shp({inv:args.bo4,consrate:args.crbo4, transit: args.trbo4}),mhs:args.mhs, lt:60,transit: args.trbo4, consrate:args.crbo4}), paymentDueDate: paymentDue("Royal", "inv4", "order"), amountDue: amountDue("bo4",1).toLocaleString('en-US', { style: 'currency', currency: 'USD' })},
        inv5: {product: "DPK", Qty: parseFloat(data(args).bo5.sum.toFixed(2)), Stockholding_period: shp({inv:args.bo5,consrate:args.crbo5, transit: args.trbo5}), leadtime: 60,supplier: "Royal",orderdate: orderdate({ hs: shp({inv:args.bo5,consrate:args.crbo5, transit: args.trbo5}),mhs:args.mhs, lt:60,transit: args.trbo5, consrate:args.crbo5}), paymentDueDate: paymentDue("Royal", "inv5", "order"), amountDue: amountDue("bo5",1).toLocaleString('en-US', { style: 'currency', currency: 'USD' })},
                                                                                        
        inv6: {product: "TBN+", Qty: parseFloat(data(args).ad1.sum.toFixed(2)), Stockholding_period: shp({inv:args.ad1,consrate:args.crad1, transit: args.trad1}),leadtime: 40,supplier: "IMCD",orderdate: orderdate({hs: shp({inv:args.ad1,consrate:args.crad1, transit: args.trad1}), mhs:args.mhs, lt:40}), paymentDueDate: paymentDue("IMCD", "inv6", "order"), amountDue: amountDue("ad1",1).toLocaleString('en-US', { style: 'currency', currency: 'USD' })},
        inv7: {product: "PPD", Qty: parseFloat(data(args).ad2.sum.toFixed(2)), Stockholding_period: shp({inv:args.ad2,consrate:args.crad2, transit: args.trad2}),leadtime: 40,supplier: "IMCD",orderdate: orderdate({hs: shp({inv:args.ad2,consrate:args.crad2, transit: args.trad2}), mhs:args.mhs, lt:40}), paymentDueDate: paymentDue("IMCD", "inv7", "order"), amountDue: amountDue("ad2",1).toLocaleString('en-US', { style: 'currency', currency: 'USD' })},
        inv8: {product: "CI-4", Qty: parseFloat(data(args).ad3.sum.toFixed(2)), Stockholding_period: shp({inv:args.ad3,consrate:args.crad3, transit: args.trad3}),leadtime: 40, supplier: "IMCD",orderdate: orderdate({hs: shp({inv:args.ad3,consrate:args.crad3, transit: args.trad3}), mhs:args.mhs, lt:40}), paymentDueDate: paymentDue("IMCD", "inv8", "order"), amountDue: amountDue("ad3",1).toLocaleString('en-US', { style: 'currency', currency: 'USD' })},
        inv9: {product: "GOA", Qty: parseFloat(data(args).ad4.sum.toFixed(2)), Stockholding_period: shp({inv:args.ad4,consrate:args.crad4, transit: args.trad4}),leadtime: 40,supplier: "IMCD",orderdate: orderdate({hs: shp({inv:args.ad4,consrate:args.crad4, transit: args.trad4}), mhs:args.mhs, lt:40}), paymentDueDate: paymentDue("IMCD", "inv9", "order"), amountDue: amountDue("ad4",1).toLocaleString('en-US', { style: 'currency', currency: 'USD' })},
        inv10: {product: "VII", Qty: parseFloat(data(args).ad5.sum.toFixed(2)), Stockholding_period: shp({inv:args.ad5,consrate:args.crad5, transit: args.trad5}),leadtime: 40,supplier: "Blackbull",orderdate: orderdate({hs: shp({inv:args.ad5,consrate:args.crad5, transit: args.trad5}), mhs:args.mhs, lt:40}), paymentDueDate: paymentDue("Blackbull", "inv10", "order"), amountDue: amountDue("ad5",1).toLocaleString('en-US', { style: 'currency', currency: 'USD' })},
        inv11: {product: "MONO PA EO", Qty: parseFloat(data(args).ad6.sum.toFixed(2)), Stockholding_period: shp({inv:args.ad6,consrate:args.crad6, transit: args.trad6}),leadtime: 40,supplier: "IMCD",orderdate: orderdate({hs: shp({inv:args.ad6,consrate:args.crad6, transit: args.trad6}), mhs:args.mhs, lt:40}), paymentDueDate: paymentDue("IMCD", "inv11", "order"), amountDue: amountDue("ad6",1).toLocaleString('en-US', { style: 'currency', currency: 'USD' })},
        inv12: {product: "4T PA PEO", Qty: parseFloat(data(args).ad7.sum.toFixed(2)), Stockholding_period: shp({inv:args.ad7,consrate:args.crad7, transit: args.trad7}),leadtime: 40,supplier: "IMCD",orderdate: orderdate({hs: shp({inv:args.ad7,consrate:args.crad7, transit: args.trad7}), mhs:args.mhs, lt:40}), paymentDueDate: paymentDue("IMCD", "inv12", "order"), amountDue: amountDue("ad7",1).toLocaleString('en-US', { style: 'currency', currency: 'USD' })},
        inv13:{product: "ATF PA", Qty: parseFloat(data(args).ad8.sum.toFixed(2)), Stockholding_period: shp({inv:args.ad8,consrate:args.crad8, transit: args.trad8}),leadtime: 40,supplier: "IMCD",orderdate: orderdate({hs: shp({inv:args.ad8,consrate:args.crad8, transit: args.trad8}), mhs:args.mhs, lt:40}), paymentDueDate: paymentDue("IMCD", "inv13", "order"), amountDue: amountDue("ad8",1).toLocaleString('en-US', { style: 'currency', currency: 'USD' })},
        inv14:{product: "2T PA", Qty: parseFloat(data(args).ad9.sum.toFixed(2)), Stockholding_period: shp({inv:args.ad9,consrate:args.crad9, transit: args.trad9}),leadtime: 40,supplier: "KDR",orderdate: orderdate({hs: shp({inv:args.ad9,consrate:args.crad9, transit: args.trad9}), mhs:args.mhs, lt:40}), paymentDueDate: paymentDue("KDR", "inv14", "order"), amountDue: amountDue("ad9",1).toLocaleString('en-US', { style: 'currency', currency: 'USD' })},
        inv15:{product: "HYA", Qty: parseFloat(data(args).ad10.sum.toFixed(2)), Stockholding_period: shp({inv:args.ad10,consrate:args.crad10, transit: args.trad10}),leadtime: 40,supplier: "IMCD",orderdate: orderdate({hs: shp({inv:args.ad10,consrate:args.crad10, transit: args.trad10}), mhs:args.mhs, lt:40}), paymentDueDate: paymentDue("IMCD", "inv15", "order"), amountDue: amountDue("ad10",1).toLocaleString('en-US', { style: 'currency', currency: 'USD' })},
        inv16:{product: "DYE", Qty: parseFloat(data(args).ad11.sum.toFixed(2)), Stockholding_period: shp({inv:args.ad11,consrate:args.crad11, transit: args.trad11}),leadtime: 40,supplier: "IMCD",orderdate: orderdate({hs: shp({inv:args.ad11,consrate:args.crad11, transit: args.trad11}), mhs:args.mhs, lt:40}), paymentDueDate: paymentDue("IMCD", "inv16", "order"), amountDue: amountDue("ad11",1).toLocaleString('en-US', { style: 'currency', currency: 'USD' })},
        inv17:{product: "TURB", Qty: parseFloat(data(args).ad12.sum.toFixed(2)), Stockholding_period: shp({inv:args.ad12,consrate:args.crad12, transit: args.trad12}),leadtime: 40,supplier: "IMCD",orderdate: orderdate({hs: shp({inv:args.ad12,consrate:args.crad12, transit: args.trad12}), mhs:args.mhs, lt:40}), paymentDueDate: paymentDue("IMCD", "inv17", "order"), amountDue: amountDue("ad12",1).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
    }
    useEffect(()=>{
        localStorage.setItem(props.title + "_inv_table", JSON.stringify(finance_table))
    }, [args])
    function paymentDue(supplier, inv, date){
        let paymentTerms = {Royal: 60, KDR: 6, Blackbull: 10, IMCD: 60}
        const [dayer, monther, yearer] = inv_table_data[inv][date].split('/').map(Number);
        let order_date = new Date(yearer,monther,dayer);
        let defer = paymentTerms[supplier];
        let due_date = new Date()
        due_date.setDate((order_date).getDate() + defer);
        return `${due_date.getDate()}/${due_date.getMonth()}/${due_date.getFullYear()}`
    }
    function amountDue(raw_material, length_of_stock){
        let cost_per_unit = {bo1:1200,bo2:1200,bo3:1200,bo4:1200,bo5:1200,bo6:1200,bo7:1200,ad1:1200,ad2:1200,ad3:1200,ad4:1200,ad5:1200,ad6:1200,ad7:4150,ad8:1200,ad9:1200,ad10:1200,ad11:1200,ad12:1200};
        let quantity = data(args)[raw_material].sum.toFixed(2);
        return cost_per_unit[raw_material] * quantity * length_of_stock;
    }
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
    function cellBgColor(col){
        if(col > 10){
            return 'red'
        }
        else {
            return ''
        }
    }
    async function getJanProj(){
        let janData = await query('january_sales_projections').fetch();
        let result = janData[0].quantity;
        console.log(janData);
        //return result;
    }
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
            {/* {numberStateful} */}
            <Button isDisabled={true} onClick={()=>{localStorage.clear()}}>clear local storage</Button>
            {/* <Button onClick={getJanProj}>Get Jan Projections</Button> */}
            <Center>Buffer stock (days): <NumberInp prod="mhs" init={args.mhs} onChange={inv_table} value={args.mhs} /></Center>
            <Center overflow={'auto'} border={"1px"} borderRadius='15px'>
                <Flex width='90%' overflow={'auto'}>

                    <Box>
                        <TaBle title="Products" columns={prod_table_columns} data={prod_table_data} bg={cellBgColor} />
                    </Box>
                    <Spacer width={10} />
                    <Box  >
                        <TaBle title="Inventory" columns={inv_table_columns} data={inv_table_data} bg={cellBgColor} />
                    </Box>

                </Flex>
            </Center>
            {/* <TableDB /> */}
        </div>
    )
}

export default Graph3;
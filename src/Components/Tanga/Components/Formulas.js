import { useEffect, useState } from "react";
import NumberInp from "./NumberInp";
import { Center } from "@chakra-ui/layout";
import { AgGridReact } from "ag-grid-react";
import { Button, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { deleteRecord, query, updateRecord } from "thin-backend";
import { useQuery } from "thin-backend-react";


function Formulas(){
    const formulas = useQuery(query('product_formulas'));
    const keymap = {"_500SN": "sn500", "_150SN":"sn150", "_BS150":"bs150", "_SN80":"sn80sn100", "DPK":"dpk", "TBN":"tbn", "PPD":"ppd", "CI4":"ci4", "GOA":"goa", "VII":"vii", "MONO_PA_EO":"mono", "_4T_PA_PEO":"pa4t", "ATF_PA":"atf", "_2T_PA":"pa2t", "HYA":"hya", "DYE":"dye", "Lubrizol8510":"lz8510"};

    const idmap = {
        "Sentry 4T": "f2f9942a-c350-43c9-b6b9-a3a393dafc5a",
        "Mogas 2T": "8419f052-a10f-4992-908d-26669dbede3a",
        "Duramax HD 40": "e45c36f6-ecb0-4958-b46e-af9dca1c8f17",
        "Turbofleet 15W/40": "055ecd2f-63ac-4225-aacf-a6003f87627f",
        "Sentry HD40": "eb60fd05-0229-44d3-a2ec-7fa948931582",
        "Dynatrans 85W/140": "24b807f9-f0dd-4b14-8a73-c992789e84b3",
        "Hydrax Z 68": "cbe9f35f-7865-441f-8db0-861bf1a79668",
        "Duramax Extra 25W/50": "67a92531-ab3d-4b9e-895c-6c6e42280437",
        "Mogas SB22": "58a2638f-180e-457f-97eb-c19a36da3708",
        "Dynatrans 80W/90": "5fe72dfd-2e74-4bba-8a7c-23bf7f051bc1",
        "Hydrax Z46": "3ec83a13-9d99-4d56-aaa4-f9448d3e5a31",
        "Prestina T68": "abab71c7-de9b-4268-996a-eddbffb55b6a",
        "Mogas ATF": "a447f2c2-aad5-41e2-bb76-ff85bfe3ae28",
        "Hydraz Z32": "646c9d75-6e33-4922-9438-d91bd4e13e53",
        "Frontia X 20W50": "5186e371-60c8-4cd1-b7f9-3299ea3f492d",
        "Powertrans SP150": "693e71f1-5bc0-4ab2-80cb-06fbdcc099e9",
        "Powertrans SP220": "faca54b3-0680-47ba-a868-c635526832ca",
        "Powertrans SP320": "28449845-2b5d-4eb9-99d4-5facd0fc0387"
    }
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
         "646c9d75-6e33-4922-9438-d91bd4e13e53": "Hydraz Z32",
        "5186e371-60c8-4cd1-b7f9-3299ea3f492d": "Frontia X 20W50",
        "693e71f1-5bc0-4ab2-80cb-06fbdcc099e9": "Powertrans SP150",
        "faca54b3-0680-47ba-a868-c635526832ca": "Powertrans SP220",
        "28449845-2b5d-4eb9-99d4-5facd0fc0387": "Powertrans SP320"
    }
    function summer(obj){
        return obj._500SN + obj._150SN + obj._BS150 + obj._SN80 + obj.DPK + obj.TBN + obj.PPD + obj.CI4 + obj.GOA + obj.VII + obj.MONO_PA_EO + obj._4T_PA_PEO + obj.ATF_PA + obj._2T_PA + obj.HYA + obj.DYE + obj.Lubrizol8510;
    }
    //initialize rowData as what is in the database
    const [rowData, SetRowData] = useState(() => {
        //let stored_formula = localStorage.getItem('formulas')
        return /*stored_formula ? JSON.parse(stored_formula) : */[
            {Product:"Sentry 4T", _500SN:0.8780, _150SN: 0, _BS150:0, _SN80:0, DPK:0, TBN:0.002,PPD:0.002, CI4:0, GOA:0,VII:0.0630,MONO_PA_EO:0, _4T_PA_PEO:0.0550, ATF_PA:0, _2T_PA:0, HYA:0, DYE:0, Lubrizol8510:0, get Total(){return summer(this)}},
            {Product:"Mogas 2T", _500SN:0.9050, _150SN: 0, _BS150:0, _SN80:0, DPK:0.08, TBN:0,PPD:0, CI4:0, GOA:0,VII:0,MONO_PA_EO:0, _4T_PA_PEO:0, ATF_PA:0, _2T_PA:0.015, HYA:0, DYE:0, Lubrizol8510:0, get Total(){return summer(this)}},
            {Product:"Duramax HD 40", _500SN:0.72, _150SN: 0, _BS150:0.23, _SN80:0, DPK:0, TBN:0.006,PPD:0, CI4:0, GOA:0,VII:0,MONO_PA_EO:0.0440, _4T_PA_PEO:0, ATF_PA:0, _2T_PA:0, HYA:0, DYE:0, Lubrizol8510:0, get Total(){return summer(this)}},
            {Product:"Turbofleet 15W/40", _500SN:0.3950, _150SN: 0.3990, _BS150:0, _SN80:0, DPK:0, TBN:0.002,PPD:0.002, CI4:0.1170, GOA:0,VII:0.0850,MONO_PA_EO:0, _4T_PA_PEO:0, ATF_PA:0, _2T_PA:0, HYA:0, DYE:0, Lubrizol8510:0, get Total(){return summer(this)}},
            {Product:"Sentry HD40", _500SN:0.73, _150SN: 0, _BS150:0.2330, _SN80:0, DPK:0, TBN:0.003,PPD:0, CI4:0, GOA:0,VII:0,MONO_PA_EO:0.0340, _4T_PA_PEO:0, ATF_PA:0, _2T_PA:0, HYA:0, DYE:0, Lubrizol8510:0, get Total(){return summer(this)}},
            {Product:"Dynatrans 85W/140", _500SN:0.07, _150SN: 0, _BS150:0.8870, _SN80:0, DPK:0, TBN:0,PPD:0.0030, CI4:0, GOA:0.04,VII:0,MONO_PA_EO:0, _4T_PA_PEO:0, ATF_PA:0, _2T_PA:0, HYA:0, DYE:0, Lubrizol8510:0, get Total(){return summer(this)}},
            {Product:"Hydrax Z 68", _500SN:0.6895, _150SN: 0.3, _BS150:0, _SN80:0, DPK:0, TBN:0,PPD:0.002, CI4:0, GOA:0,VII:0,MONO_PA_EO:0, _4T_PA_PEO:0, ATF_PA:0, _2T_PA:0, HYA:0.0085, DYE:0, Lubrizol8510:0, get Total(){return summer(this)}},
            {Product:"Duramax Extra 25W/50", _500SN:0.630, _150SN: 0, _BS150:0.2740, _SN80:0, DPK:0, TBN:0,PPD:0.002, CI4:0, GOA:0,VII:0.0500,MONO_PA_EO:0.0440, _4T_PA_PEO:0, ATF_PA:0, _2T_PA:0, HYA:0, DYE:0, Lubrizol8510:0, get Total(){return summer(this)}},
            {Product:"Mogas SB22", _500SN:0, _150SN: 1, _BS150:0, _SN80:0, DPK:0, TBN:0,PPD:0, CI4:0, GOA:0,VII:0,MONO_PA_EO:0, _4T_PA_PEO:0, ATF_PA:0, _2T_PA:0, HYA:0, DYE:0, Lubrizol8510:0, get Total(){return summer(this)}},
            {Product:"Dynatrans 80W/90", _500SN:0.7370, _150SN: 0, _BS150:0.2300, _SN80:0, DPK:0, TBN:0,PPD:0.002, CI4:0, GOA:0.0230,VII:0.0080,MONO_PA_EO:0, _4T_PA_PEO:0, ATF_PA:0, _2T_PA:0, HYA:0, DYE:0, Lubrizol8510:0, get Total(){return summer(this)}},
            {Product:"Hydrax Z46", _500SN:0.2400, _150SN: 0.7495, _BS150:0, _SN80:0, DPK:0, TBN:0,PPD:0.002, CI4:0, GOA:0,VII:0,MONO_PA_EO:0, _4T_PA_PEO:0, ATF_PA:0, _2T_PA:0, HYA:0.0085, DYE:0, Lubrizol8510:0, get Total(){return summer(this)}},
            {Product:"Prestina T68", _500SN:0.6710, _150SN: 0.32, _BS150:0, _SN80:0, DPK:0, TBN:0,PPD:0.002, CI4:0, GOA:0,VII:0,MONO_PA_EO:0, _4T_PA_PEO:0, ATF_PA:0, _2T_PA:0, HYA:0, DYE:0, Lubrizol8510:0.007, get Total(){return summer(this)}},
            {Product:"Mogas ATF", _500SN:0, _150SN: 0.9317, _BS150:0, _SN80:0, DPK:0, TBN:0,PPD:0, CI4:0, GOA:0,VII:0,MONO_PA_EO:0, _4T_PA_PEO:0, ATF_PA:0.0680, _2T_PA:0, HYA:0, DYE:0.0003, Lubrizol8510:0, get Total(){return summer(this)}},
            {Product:"Hydraz Z32", _500SN:0, _150SN: 0.9895, _BS150:0, _SN80:0, DPK:0, TBN:0,PPD:0.002, CI4:0, GOA:0,VII:0,MONO_PA_EO:0, _4T_PA_PEO:0, ATF_PA:0, _2T_PA:0, HYA:0.0085, DYE:0, Lubrizol8510:0, get Total(){return summer(this)}},
            {Product:"Frontia X 20W50", _500SN:0.6480, _150SN: 0.2160, _BS150:0, _SN80:0, DPK:0, TBN:0,PPD:0.002, CI4:0, GOA:0,VII:0.08,MONO_PA_EO:0, _4T_PA_PEO:0.0540, ATF_PA:0, _2T_PA:0, HYA:0, DYE:0, Lubrizol8510:0, get Total(){return summer(this)}},
            
            {Product:"Powertrans SP150", _500SN:0.76, _150SN: 0, _BS150:0.2230, _SN80:0, DPK:0, TBN:0,PPD:0.002, CI4:0, GOA:0.0150,VII:0,MONO_PA_EO:0, _4T_PA_PEO:0, ATF_PA:0, _2T_PA:0, HYA:0, DYE:0, Lubrizol8510:0, get Total(){return summer(this)}},
            {Product:"Powertrans SP220", _500SN:0.3280, _150SN: 0, _BS150:0.6500, _SN80:0, DPK:0, TBN:0,PPD:0.002, CI4:0, GOA:0.002,VII:0,MONO_PA_EO:0, _4T_PA_PEO:0, ATF_PA:0, _2T_PA:0, HYA:0, DYE:0, Lubrizol8510:0, get Total(){return summer(this)}},
            {Product:"Powertrans SP320", _500SN:0.15, _150SN: 0, _BS150:0.8330, _SN80:0, DPK:0, TBN:0,PPD:0.002, CI4:0, GOA:0.0150,VII:0,MONO_PA_EO:0, _4T_PA_PEO:0, ATF_PA:0, _2T_PA:0, HYA:0, DYE:0, Lubrizol8510:0, get Total(){return summer(this)}}
        ]    
    })
    var rows = [];
    var cols = [];
    rows = formulas.map((product, index)=>{
        if(idmap_reverse[product.id] !== undefined){
            return {Product: idmap_reverse[product.id], _500SN: product.sn500, _150SN: product.sn150, _BS150:product.bs150, _SN80: product.sn80sn100, DPK:product.dpk, TBN:product.tbn,PPD:product.ppd, CI4:product.ci4, GOA:product.goa,VII:product.vii,MONO_PA_EO:product.mono, _4T_PA_PEO:product.pa4t, ATF_PA:product.atf, _2T_PA:product.pa2t, HYA:product.hya, DYE:product.dye, Lubrizol8510:product.lz8510, get Total(){return summer(this)}}
        }
    })

    var columnWidth = 100;
    var editable = true;
    var cols = [
            {field: "Product"/*, editable: true, cellEditor: 'agNumberCellEditor' */, pinned: 'left'},
            {field: "_500SN", editable: editable, cellEditor: 'numberEditor', width: columnWidth},
            {field: "_150SN", editable: editable, cellEditor: 'numberEditor', width: columnWidth},
            {field: "_BS150", editable: editable, cellEditor: 'numberEditor', width: columnWidth},
            {field: "_SN80", editable: editable, cellEditor: 'numberEditor', width: columnWidth},
            {field: "DPK", editable: editable, cellEditor: 'numberEditor', width: columnWidth},
            {field: "TBN", editable: editable, cellEditor: 'numberEditor', width: columnWidth},
            {field: "PPD", editable: editable, cellEditor: 'numberEditor', width: columnWidth},
            {field: "CI4", editable: editable, cellEditor: 'numberEditor', width: columnWidth},
            {field: "GOA", editable: editable, cellEditor: 'numberEditor', width: columnWidth},
            {field: "VII", editable: editable, cellEditor: 'numberEditor', width: columnWidth},
            {field: "MONO_PA_EO", editable: editable, cellEditor: 'numberEditor', width: columnWidth},
            {field: "_4T_PA_PEO", editable: editable, cellEditor: 'numberEditor', width: columnWidth},
            {field: "ATF_PA", editable: editable, cellEditor: 'numberEditor', width: columnWidth},
            {field: "_2T_PA", editable: editable, cellEditor: 'numberEditor', width: columnWidth},
            {field: "HYA", editable: editable, cellEditor: 'numberEditor', width: columnWidth},
            {field: "DYE", editable: editable, cellEditor: 'numberEditor', width: columnWidth},
            {field: "Lubrizol8510", editable: editable, cellEditor: 'numberEditor', width: columnWidth},
            {field: "Total", width: columnWidth}
        ]


    function onCellChange(e){
        let value = e.value;
        let product = e.data.Product;
        let inventory = e.column.colId;
        let inv_index = String(keymap[inventory]);
        
        //console.log(keymap[inventory])
        console.log(`change ${keymap[inventory]} of ${product} to ${value}`);
        //console.log(product);
        //console.log(formulasToExport(rowData))
        updateRecord('product_formulas',idmap[product], {[inv_index]: value})
        //updateRecord('productformulas',"4T", {sn500:919})
        //localStorage.setItem('formula_for_graph3', JSON.stringify(formulasToExport(rowData)))
        //updateRecord('product_formulas',)
    }
    
    return (
        <div>
            <Button onClick={()=>{console.log(rows)}}>Print rows</Button>
            <Center>
                <div className="ag-theme-quartz" style={{ height: 700, width:1200 }} >
                    {/* The AG Grid component */}
                    <AgGridReact 
                        rowData={rows} 
                        columnDefs={cols} 
                        rowSelection='multiple' 
                        onCellValueChanged={onCellChange}
                        />
                </div>
            </Center>
        </div>
    )
}

export default Formulas;
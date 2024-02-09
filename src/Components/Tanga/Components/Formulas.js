import { useEffect, useState } from "react";
import NumberInp from "./NumberInp";
import { Center } from "@chakra-ui/layout";
import { AgGridReact } from "ag-grid-react";
import { Button, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";

function Testcompo(){
    return <Button>Hey</Button>
}
function Formulas(){
    const [number, SetNumber] = useState(() => {
        let stored_number = localStorage.getItem('number');
        return stored_number ? JSON.parse(stored_number) : 0
    });

    useEffect(() => {
        localStorage.setItem('number', JSON.stringify(number))
    }, [number])

    function changeNumber(value, id){
        SetNumber(currentValue => value)
    }
    function populateformula(obj){
        let result = {product: "", bo1:0,bo2:0,bo3:0,bo4:0,bo5:0,bo6:0,bo7:0,ad1:0,ad2:0,ad3:0,ad4:0,ad5:0,ad6:0,ad7:0,ad8:0,ad9:0,ad10:0,ad11:0,ad12:0,ad13:0};
        for (const key in obj) {
            result[key] = obj[key];
        }
        return result;
    }
    const [test, SetTest] = useState(0);
    function handleTest(value, id){
        SetTest(value)
    }
    function Total_ext(){
        let array = Object.entries(this);
        let sum = 0;
        array.forEach((value, index)=>{
            if(index < array.length() - 1){
                sum =+ value[1];
            } 
        })
        return sum
    }
    function summer(obj){
        return obj._500SN + obj._150SN + obj._BS150 + obj._SN80 + obj.DPK + obj.TBN + obj.PPD + obj.CI4 + obj.GOA + obj.VII + obj.MONO_PA_EO + obj._4T_PA_PEO + obj.ATF_PA + obj._2T_PA + obj.HYA + obj.DYE + obj.Lubrizol8510;
    }
    const [rowData, SetRowData] = useState(() => {
        let stored_formula = localStorage.getItem('formulas')
        return stored_formula ? JSON.parse(stored_formula) : [
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
    var columnWidth = 100;
    const [colDefs, setColDefs] = useState(() => {
        return [
            {field: "Product"/*, editable: true, cellEditor: 'numberEditor' */, pinned: 'left'},
            {field: "_500SN", /*editable: true, cellEditor: 'numberEditor', */width: columnWidth},
            {field: "_150SN", /*editable: true, cellEditor: 'numberEditor', */width: columnWidth},
            {field: "_BS150", /*editable: true, cellEditor: 'numberEditor', */width: columnWidth},
            {field: "_SN80", /*editable: true, cellEditor: 'numberEditor', */width: columnWidth},
            {field: "DPK", /*editable: true, cellEditor: 'numberEditor', */width: columnWidth},
            {field: "TBN", /*editable: true, cellEditor: 'numberEditor', */width: columnWidth},
            {field: "PPD", /*editable: true, cellEditor: 'numberEditor', */width: columnWidth},
            {field: "CI4", /*editable: true, cellEditor: 'numberEditor', */width: columnWidth},
            {field: "GOA", /*editable: true, cellEditor: 'numberEditor', */width: columnWidth},
            {field: "VII", /*editable: true, cellEditor: 'numberEditor', */width: columnWidth},
            {field: "MONO_PA_EO", /*editable: true, cellEditor: 'numberEditor', */width: columnWidth},
            {field: "_4T_PA_PEO", /*editable: true, cellEditor: 'numberEditor', */width: columnWidth},
            {field: "ATF_PA", /*editable: true, cellEditor: 'numberEditor', */width: columnWidth},
            {field: "_2T_PA", /*editable: true, cellEditor: 'numberEditor', */width: columnWidth},
            {field: "HYA", /*editable: true, cellEditor: 'numberEditor', */width: columnWidth},
            {field: "DYE", /*editable: true, cellEditor: 'numberEditor', */width: columnWidth},
            {field: "Lubrizol8510", /*editable: true, cellEditor: 'numberEditor', */width: columnWidth},
            {field: "Total", width: columnWidth}
        ]
    })
    var formulasToExport = (obj) => {
        return {
        _2T: formulaFunction(0, obj),
        _4T: formulaFunction(1, obj),
        DuramaxHD: formulaFunction(2, obj),
        TurbofleetSae15W:formulaFunction(3, obj),
        SentryHDSae40:formulaFunction(4, obj),
        Geo85W140:formulaFunction(5, obj),
        HydraxZ68:formulaFunction(6, obj),
        Sb22D210:formulaFunction(8, obj),
        Geo80W90:formulaFunction(9, obj),
        HydraxZ46:formulaFunction(10, obj),
        atfIII: formulaFunction(12, obj),
        Hydrax32:formulaFunction(13, obj),
        FrontiaX: formulaFunction(14, obj),
        PowerTransSP150:formulaFunction(15, obj),
        PowerTransSP220:formulaFunction(16, obj),
        PowerTransSP320:formulaFunction(17, obj)
    }
    }
    function formulaFunction(product, input_object){
        //let product = 0;
        let result = {bo1: 0, bo2: 0, bo3:0, bo4: 0, bo5: 0, bo6: 0, ad1:0, ad2:0, ad3:0, ad4:0, ad5: 0, ad6: 0, ad7: 0, ad8: 0, ad9:0, ad10: 0, ad11: 0, ad12: 0};
        let keyMap = {_500SN:"bo1", _150SN: "bo2", _BS150:"bo3", _SN80:"bo4", DPK:"bo5", TBN:"ad1",PPD:"ad2", CI4:"ad3", GOA:"ad4",VII:"ad5",MONO_PA_EO:"ad6", _4T_PA_PEO:"ad7", ATF_PA:"ad8", _2T_PA:"ad9", HYA:"ad10", DYE:"ad11", Lubrizol8510:"ad12"};
        let obj = input_object[product]
        for (const key in obj) {
            result[keyMap[key]] = obj[key];
        }
        return result
    }
    function printRowData(){
        console.log(rowData);
    }
    function onCellChange(e){
        //console.log(e);
        console.log(formulasToExport(rowData))
        localStorage.setItem('formula_for_graph3', JSON.stringify(formulasToExport(rowData)))
    }
    
    return (
        <div>
            {/* <Center>
                <NumberInp prod="number" init={number} value={number} onChange={changeNumber} />
            </Center> */}
            {/* <Button onClick={()=>{console.log(formulasToExport)}}>test</Button> */}
            {/* Number: {number} */}
            {/* <Button onClick={printRowData}>Print row data</Button> */}
            {/* <Button onClick={()=>{console.log(rowData[0].total)}}>Print total of row1</Button> */}
            <Center>
                <div className="ag-theme-quartz" style={{ height: 700, width:1200 }} >
                    {/* The AG Grid component */}
                    <AgGridReact 
                        rowData={rowData} 
                        columnDefs={colDefs} 
                        rowSelection='multiple' 
                        onCellValueChanged={onCellChange}
                        />
                </div>
            </Center>
            
        </div>
    )
}

export default Formulas;
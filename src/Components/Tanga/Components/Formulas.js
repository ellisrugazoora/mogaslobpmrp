import { useEffect, useState } from "react";
import NumberInp from "./NumberInp";
import { Center } from "@chakra-ui/layout";
import { AgGridReact } from "ag-grid-react";
import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";

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
    const [rowData, SetRowData] = useState(() => {
        let stored_formula = localStorage.getItem('formulas')
        return stored_formula ? JSON.parse(stored_formula) : [
            {a:1, b:<NumberInp prod="number" init={number} value={number} onChange={changeNumber} />},
            {a:1, b:2},
            {a:1, b:2},
            {a:1, b:2},
            {a:1, b:2},

        ]
    })
    const [colDefs, setColDefs] = useState(() => {
        return [
            {field: "a"},
            {field: "b"}
        ]
    })
    return (
        <div>
            <Center>
                <NumberInp prod="number" init={number} value={number} onChange={changeNumber} />
            </Center>
            Number: {number}
            <Center>
                <div className="ag-theme-quartz" style={{ height: 700, width:950 }} >
                    {/* The AG Grid component */}
                    <AgGridReact rowData={rowData} columnDefs={colDefs} rowSelection='multiple' />
                </div>
            </Center>
            
        </div>
    )
}

export default Formulas;
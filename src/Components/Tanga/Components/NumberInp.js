import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/number-input";

function NumberInp(props){
    function handlechange(number){
        props.onChange(number, props.prod);
    }
    function handleaccess(){
        props.access();
    }
    return (
        <NumberInput isDisabled={props.access} step={1}  size={'md'}  defaultValue={props.init} onChange={handlechange} value={props.value} width={'150px'}>
            <NumberInputField bg={"white"} isDisabled={props.access}/>
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    )
}

export default NumberInp;
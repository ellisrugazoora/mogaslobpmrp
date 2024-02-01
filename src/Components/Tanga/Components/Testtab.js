import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function Testtab(props){
    //var testsave = localStorage.getItem('hello');
    const [num, SetNum] = useState(()=> {
        let storedObject = localStorage.getItem('testobj');
        return storedObject ? JSON.parse(storedObject) : {a: "hello", b:"world", c:0}
    })

    function handleincrement(){
        SetNum(prevObject => ({
            ...prevObject,
            c: prevObject.c + 1
          }));
    }
    useEffect(
        ()=>{
            localStorage.setItem('testobj', JSON.stringify(num));
        },[num]
    )
    return (
        <div>
            Test for: {props.name} <br />
            {/* <Button onClick={Savedata({name: 'hello', content: 1})}>Save</Button> */}
            <Button onClick={handleincrement}>Increment number</Button> <br />
            {/* <Button onClick={Savedata({name: 'testobj', content: num})}>Save</Button> <br /> */}
            Recall stateful: {num.c} <br />
        </div>
    )
}

export default Testtab;
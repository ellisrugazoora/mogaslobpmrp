import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function Savedata(props){
    localStorage.setItem(props.name, JSON.stringify(props.content));
    
    /*
    const [object, SetObject] = useState(() => {
        let storedObject = localStorage.getItem(props.name);
        return storedObject ? JSON.parse(storedObject) : {a: "hello", b:"world", c:0}
    })

    useEffect(() => {//this is for storage
        localStorage.setItem(props.name, JSON.stringify(object));
      },[object]);
    

    function editobject(){
        SetObject(prevObject => ({
            ...prevObject,
            c: prevObject.c + 1
          }));
    }
    return (
        <div>
            <Button onClick={editobject}>Increment {props.name}</Button>
            Object prop a: {object.a} <br />
            Object prop a: {object.b} <br />
            Object prop c: {object.c} <br />
        </div>
    )*/
}

export default Savedata;

import { Button } from "@chakra-ui/react";

function Joseph(){

    var personal_information = {name: "Joseph", age: 29, tribe: "mgogo"};

    return (
        <div>
            Enter your name: <input type="name" /> <Button>Save</Button> <br/>
            Enter your age: <input type="age" /><Button> save the age</Button>
            <p>Habari, jina yangu ni {personal_information.name}</p>
            



        </div>

    )
}

export default Joseph;
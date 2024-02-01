import { Center, ChakraProvider, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/table";
import TestTab from "./TaBle";

function TableComp(props){
    return (
        <div className="table">
            {props.data.a}
            <p>{props.data.a}</p>
           <Center>
            <TableContainer className="tablecont" border={"0.5px outset"} borderRadius={"10px"} width={"50%"}>
              <Table variant='striped' colorScheme='teal' /*style={{border: '1px outset', borderRadius: '10px'}}*/>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                  <Tr>
                    <Td>feet</Td>
                    <Td>centimetres (cm)</Td>
                    <Td isNumeric>30.48</Td>
                  </Tr>
                  <Tr>
                    <Td><Input type="number" defaultValue={10} bg={"white"}></Input></Td>
                    <Td><NumberInput defaultValue={100}>
                          <NumberInputField bg={"white"}/>
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>  </Td>
                    <Td isNumeric>0.91444</Td>
                  </Tr>
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
            </Center>
            <br />
            
        </div>
    )
}

export default TableComp;
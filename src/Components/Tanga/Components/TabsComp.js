import { Button } from "@chakra-ui/react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs"

function TabsComp(props){
    var date = new Date();
    var month = date.getMonth()
    return (
         <div className="tabs" width='100%' >
            <Button onClick={()=>{console.log(`Month: ${month}`)}} hidden>month</Button>
            <Tabs isLazy isFitted width={'100%'} defaultIndex={month}>
                <TabList width={'100%'} minWidth={520}>
                    <Tab fontSize={15}>{props.one.title}</Tab>
                    <Tab>{props.two.title}</Tab>
                    <Tab is>{props.three.title}</Tab>
                    <Tab>{props.four.title}</Tab>
                    <Tab>{props.five.title}</Tab>
                    <Tab>{props.six.title}</Tab>
                    <Tab>{props.seven.title}</Tab>
                    <Tab>{props.eight.title}</Tab>
                </TabList>
                <TabPanels width={'100%'} minWidth={520}> 
                    <TabPanel overflow={'auto'} width={'100%'} height={880}> {props.one.content} </TabPanel>
                    <TabPanel overflow={'auto'} width={'100%'} height={880}> {props.two.content} </TabPanel>
                    <TabPanel overflow={'auto'} width={'100%'} height={880}> {props.three.content} </TabPanel>
                    <TabPanel overflow={'auto'} width={'100%'} height={880}>{props.four.content}</TabPanel>
                    <TabPanel overflow={'auto'} width={'100%'} height={880}> {props.five.content} </TabPanel>
                    <TabPanel overflow={'auto'} width={'100%'} height={880}> {props.six.content} </TabPanel>
                    <TabPanel overflow={'auto'} width={'100%'} height={880}> {props.seven.content} </TabPanel>
                    <TabPanel overflow={'auto'} width={'100%'} height={880}> {props.eight.content} </TabPanel>
                </TabPanels>
            </Tabs>
         </div>
    )
}

export default TabsComp
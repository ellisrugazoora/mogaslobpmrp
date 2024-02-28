import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

function TabInTab(props){
    return (
        <div /*className="tabs"*/ width='100%'>
            <Tabs isLazy isFitted width={'100%'} /*height={"100vh"}*/ minWidth={500}>
                <TabList width={'100%'} minWidth={500}>
                    <Tab>{props.one.title}</Tab>
                    <Tab>{props.two.title}</Tab>
                </TabList>
                <TabPanels width={'100%'}>
                    <TabPanel overflow={'auto'} width={'100%'} height={900}>{props.one.content}</TabPanel>
                    <TabPanel>{props.two.content}</TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    
        )
}

export default TabInTab;
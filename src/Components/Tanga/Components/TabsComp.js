import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs"

function TabsComp(props){
    return (
        <div className="tabs" width='100%'>
            <Tabs isFitted width={'100vw'} /*minWidth={1850}*/ height={"100vh"}>
                <TabList>
                    {/* <Tab>{props.home.title}</Tab> */}
                    <Tab>{props.one.title}</Tab>
                    <Tab>{props.two.title}</Tab>
                    <Tab>{props.three.title}</Tab>
                    <Tab>{props.four.title}</Tab>
                    <Tab>{props.five.title}</Tab>
                    <Tab>{props.six.title}</Tab>
                    <Tab>{props.seven.title}</Tab>
                    {/* <Tab>{props.eight.title}</Tab> */}
                    {/*<Tab>{props.seven.title}</Tab> */}
                </TabList>
                <TabPanels width={'100%'} /*overflow={'auto'}*/>
                    {/* <TabPanel> {props.home.content} </TabPanel> */}
                    <TabPanel> {props.one.content} </TabPanel>
                    <TabPanel> {props.two.content} </TabPanel>
                    <TabPanel > {props.three.content} </TabPanel>
                    <TabPanel >{props.four.content}</TabPanel>
                    <TabPanel> {props.five.content} </TabPanel>
                    <TabPanel > {props.six.content} </TabPanel>
                    <TabPanel > {props.seven.content} </TabPanel>
                    {/* <TabPanel> {props.eight.content} </TabPanel> */}
                    {/* <TabPanel >{props.seven.content}</TabPanel> */}
                </TabPanels>
            </Tabs>
        </div>
    )
}

export default TabsComp
const DataObject = {baseoil1: {
    quarter: "Base Oil 1",
    //quarterz: "pseudo1", only 1 xkey per group
    iphone: 140,
    mac: 16,
    ipad: 14,
    wearables: 12,
    spare: 50,
}, //the sum of all should equal current inventory. If 
baseoil2: {
    quarter: "Base Oil 2",
    //quarterz: "pseudo2",
    iphone: 124,
    mac: 20,
    ipad: 14,
    wearables: 12,
    spare: 30,
},
baseoil3: {
    quarter: "Base Oil 3",
    //quarterz: "pseudo3",
    iphone: 112,
    mac: 20,
    ipad: 18,
    wearables: 14,
    spare: 36,
},
additive1: {
    quarter: "Additive 1",
    //quarterz: "pseudo4",
    iphone: 118,
    mac: 24,
    ipad: 14,
    wearables: 14,
    spare: 36,
},
additive2: {
    quarter: "Additive 2",
    //quarterz: "pseudo5",
    iphone: 124,
    mac: 18,
    ipad: 16,
    wearables: 18,
    spare: 26,
},
additive3: {
    quarter: "Additive 3",
    //quarterz: "pseudo8",
    iphone: 108,
    mac: 22,
    ipad: 14,
    wearables: 20,
    spare: 80,
},
series1: {
    type: 'bar',
    xKey: 'quarter',
    yKey: 'iphone',
    yName: '4T',
    stacked: true},
series2: {
    type: 'bar',
    xKey: 'quarter',
    yKey: 'mac',
    yName: '2T',
    stacked: true
},
series3: {
    type: 'bar',
    xKey: 'quarter',
    yKey: 'ipad',
    yName: 'Sentry',
    stacked: true
},
series4: {
    type: 'bar',
    xKey: 'quarter',
    yKey: 'wearables',
    yName: 'Duramax HD',
    stacked: true
},
series5: {
    type: 'bar',
    xKey: 'quarter',
    yKey: 'spare',
    yName: 'Spare',
    stacked: true,
}

};

export default DataObject;
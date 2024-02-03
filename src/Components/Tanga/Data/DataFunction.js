function DataFunction(mult){ 

    let val = (product, inventory) => {
        let result = mult[product] * mult.formulas[product][inventory];
        return result;
    }
    let total = (inv) => {
        let result = val("_2T", inv) + val("_4T", inv) + val("atfIII", inv) + val("DuramaxHD", inv) + val("FrontiaX", inv) + val("Geo80W90", inv) + val("Geo85W140", inv) + val("Hydrax32", inv) + val("HydraxZ46", inv) + val("HydraxZ68", inv) + val("PowerTransSP150", inv) + val("PowerTransSP220", inv) + val("PowerTransSP320", inv) + val("Sb22D210", inv) + val("SentryHDSae40", inv) + val("TurbofleetSae15W", inv)
        return result
    }
    var spare_fn = (inv) => {
        let result = mult[inv] - total(inv);
        if(result > 0){
            return result
        }
        else {
            return 0;
            //console.log(`Result: ${result}`)
        }
    }
    //find the limiting reagent
    return {bo1: {
        quarter: "500SN/600N",
        _2T: val("_2T", "bo1"),
        _4T: val("_4T", "bo1"),
        spare: spare_fn("bo1"),//mult.bo1 - total("bo1"),
        atfIII: val("atfIII", "bo1"),
        sum: total("bo1"),
        DuramaxHD:val("DuramaxHD", "bo1"),
        FrontiaX:val("FrontiaX", "bo1"),
        Geo80W90:val("Geo80W90", "bo1"),
        Geo85W140:val("Geo85W140", "bo1"),
        Hydrax32:val("Hydrax32", "bo1"),
        HydraxZ46:val("HydraxZ46", "bo1"),
        HydraxZ68:val("HydraxZ68", "bo1"),
        PowerTransSP150:val("PowerTransSP150", "bo1"),
        PowerTransSP220:val("PowerTransSP220", "bo1"),
        PowerTransSP320:val("PowerTransSP320", "bo1"),
        Sb22D210:val("Sb22D210", "bo1"),
        SentryHDSae40:val("SentryHDSae40", "bo1"),
        TurbofleetSae15W:val("TurbofleetSae15W", "bo1"),
    }, //the sum of all should equal current inventory. If 
    bo2: {
        quarter: "150SN",
        _2T: val("_2T", "bo2"),
        _4T: val("_4T", "bo2"),
        spare: spare_fn("bo2"),
        atfIII: val("atfIII", "bo2"),
        sum: total("bo2"),
        DuramaxHD:val("DuramaxHD", "bo2"),
        FrontiaX:val("FrontiaX", "bo2"),
        Geo80W90:val("Geo80W90", "bo2"),
        Geo85W140:val("Geo85W140", "bo2"),
        Hydrax32:val("Hydrax32", "bo2"),
        HydraxZ46:val("HydraxZ46", "bo2"),
        HydraxZ68:val("HydraxZ68", "bo2"),
        PowerTransSP150:val("PowerTransSP150", "bo2"),
        PowerTransSP220:val("PowerTransSP220", "bo2"),
        PowerTransSP320:val("PowerTransSP320", "bo2"),
        Sb22D210:val("Sb22D210", "bo2"),
        SentryHDSae40:val("SentryHDSae40", "bo2"),
        TurbofleetSae15W:val("TurbofleetSae15W", "bo2"),
    },
    bo3: {
        quarter: "BS150",
        _2T: val("_2T", "bo3"),
        _4T: val("_4T", "bo3"),
        spare: spare_fn("bo3"),
        atfIII: val("atfIII", "bo3"),
        sum: total("bo3"),
        DuramaxHD:val("DuramaxHD", "bo3"),
        FrontiaX:val("FrontiaX", "bo3"),
        Geo80W90:val("Geo80W90", "bo3"),
        Geo85W140:val("Geo85W140", "bo3"),
        Hydrax32:val("Hydrax32", "bo3"),
        HydraxZ46:val("HydraxZ46", "bo3"),
        HydraxZ68:val("HydraxZ68", "bo3"),
        PowerTransSP150:val("PowerTransSP150", "bo3"),
        PowerTransSP220:val("PowerTransSP220", "bo3"),
        PowerTransSP320:val("PowerTransSP320", "bo3"),
        Sb22D210:val("Sb22D210", "bo3"),
        SentryHDSae40:val("SentryHDSae40", "bo3"),
        TurbofleetSae15W:val("TurbofleetSae15W", "bo3"),
    },
    bo4: {
        quarter: "SN80/SN100",
        _2T: val("_2T", "bo4"),
        _4T: val("_4T", "bo4"),
        spare: spare_fn("bo4"),
        atfIII: val("atfIII", "bo4"),
        sum: total("bo4"),
        DuramaxHD:val("DuramaxHD", "bo4"),
        FrontiaX:val("FrontiaX", "bo4"),
        Geo80W90:val("Geo80W90", "bo4"),
        Geo85W140:val("Geo85W140", "bo4"),
        Hydrax32:val("Hydrax32", "bo4"),
        HydraxZ46:val("HydraxZ46", "bo4"),
        HydraxZ68:val("HydraxZ68", "bo4"),
        PowerTransSP150:val("PowerTransSP150", "bo4"),
        PowerTransSP220:val("PowerTransSP220", "bo4"),
        PowerTransSP320:val("PowerTransSP320", "bo4"),
        Sb22D210:val("Sb22D210", "bo4"),
        SentryHDSae40:val("SentryHDSae40", "bo4"),
        TurbofleetSae15W:val("TurbofleetSae15W", "bo4"),
    },
    bo5: {
        quarter: "DPK",
        _2T: val("_2T", "bo5"),
        _4T: val("_4T", "bo5"),
        spare: spare_fn("bo5"),
        atfIII: val("atfIII", "bo5"),
        sum: total("bo5"),
        DuramaxHD:val("DuramaxHD", "bo5"),
        FrontiaX:val("FrontiaX", "bo5"),
        Geo80W90:val("Geo80W90", "bo5"),
        Geo85W140:val("Geo85W140", "bo5"),
        Hydrax32:val("Hydrax32", "bo5"),
        HydraxZ46:val("HydraxZ46", "bo5"),
        HydraxZ68:val("HydraxZ68", "bo5"),
        PowerTransSP150:val("PowerTransSP150", "bo5"),
        PowerTransSP220:val("PowerTransSP220", "bo5"),
        PowerTransSP320:val("PowerTransSP320", "bo5"),
        Sb22D210:val("Sb22D210", "bo5"),
        SentryHDSae40:val("SentryHDSae40", "bo5"),
        TurbofleetSae15W:val("TurbofleetSae15W", "bo5"),
    },
    ad1: {
        quarter: "TBN+",
        _2T: val("_2T", "ad1"),
        _4T: val("_4T", "ad1"),
        spare: spare_fn("ad1"),
        atfIII: val("atfIII", "ad1"),
        sum: total("ad1"),
        DuramaxHD:val("DuramaxHD", "ad1"),
        FrontiaX:val("FrontiaX", "ad1"),
        Geo80W90:val("Geo80W90", "ad1"),
        Geo85W140:val("Geo85W140", "ad1"),
        Hydrax32:val("Hydrax32", "ad1"),
        HydraxZ46:val("HydraxZ46", "ad1"),
        HydraxZ68:val("HydraxZ68", "ad1"),
        PowerTransSP150:val("PowerTransSP150", "ad1"),
        PowerTransSP220:val("PowerTransSP220", "ad1"),
        PowerTransSP320:val("PowerTransSP320", "ad1"),
        Sb22D210:val("Sb22D210", "ad1"),
        SentryHDSae40:val("SentryHDSae40", "ad1"),
        TurbofleetSae15W:val("TurbofleetSae15W", "ad1"),
    },
    ad2: {
        quarter: "PPD",
        _2T: val("_2T", "ad2"),
        _4T: val("_4T", "ad2"),
        spare: spare_fn("ad2"),
        atfIII: val("atfIII", "ad2"),
        sum: total("ad2"),
        DuramaxHD:val("DuramaxHD", "ad2"),
        FrontiaX:val("FrontiaX", "ad2"),
        Geo80W90:val("Geo80W90", "ad2"),
        Geo85W140:val("Geo85W140", "ad2"),
        Hydrax32:val("Hydrax32", "ad2"),
        HydraxZ46:val("HydraxZ46", "ad2"),
        HydraxZ68:val("HydraxZ68", "ad2"),
        PowerTransSP150:val("PowerTransSP150", "ad2"),
        PowerTransSP220:val("PowerTransSP220", "ad2"),
        PowerTransSP320:val("PowerTransSP320", "ad2"),
        Sb22D210:val("Sb22D210", "ad2"),
        SentryHDSae40:val("SentryHDSae40", "ad2"),
        TurbofleetSae15W:val("TurbofleetSae15W", "ad2")
    },
    ad3: {
        quarter: "CI-4",
        _2T: val("_2T", "ad3"),
        _4T: val("_4T", "ad3"),
        spare: spare_fn("ad3"),
        atfIII: val("atfIII", "ad3"),
        sum: total("ad3"),
        DuramaxHD:val("DuramaxHD", "ad3"),
        FrontiaX:val("FrontiaX", "ad3"),
        Geo80W90:val("Geo80W90", "ad3"),
        Geo85W140:val("Geo85W140", "ad3"),
        Hydrax32:val("Hydrax32", "ad3"),
        HydraxZ46:val("HydraxZ46", "ad3"),
        HydraxZ68:val("HydraxZ68", "ad3"),
        PowerTransSP150:val("PowerTransSP150", "ad3"),
        PowerTransSP220:val("PowerTransSP220", "ad3"),
        PowerTransSP320:val("PowerTransSP320", "ad3"),
        Sb22D210:val("Sb22D210", "ad3"),
        SentryHDSae40:val("SentryHDSae40", "ad3"),
        TurbofleetSae15W:val("TurbofleetSae15W", "ad3")
    },
    ad4: {
        quarter: "GOA",
        _2T: val("_2T", "ad4"),
        _4T: val("_4T", "ad4"),
        spare: spare_fn("ad4"),
        atfIII: val("atfIII", "ad4"),
        sum: total("ad4"),
        DuramaxHD:val("DuramaxHD", "ad4"),
        FrontiaX:val("FrontiaX", "ad4"),
        Geo80W90:val("Geo80W90", "ad4"),
        Geo85W140:val("Geo85W140", "ad4"),
        Hydrax32:val("Hydrax32", "ad4"),
        HydraxZ46:val("HydraxZ46", "ad4"),
        HydraxZ68:val("HydraxZ68", "ad4"),
        PowerTransSP150:val("PowerTransSP150", "ad4"),
        PowerTransSP220:val("PowerTransSP220", "ad4"),
        PowerTransSP320:val("PowerTransSP320", "ad4"),
        Sb22D210:val("Sb22D210", "ad4"),
        SentryHDSae40:val("SentryHDSae40", "ad4"),
        TurbofleetSae15W:val("TurbofleetSae15W", "ad4")
    },
    ad5: {
        quarter: "VII",
        _2T: val("_2T", "ad5"),
        _4T: val("_4T", "ad5"),
        spare: spare_fn("ad5"),
        atfIII: val("atfIII", "ad5"),
        sum: total("ad5"),
        DuramaxHD:val("DuramaxHD", "ad5"),
        FrontiaX:val("FrontiaX", "ad5"),
        Geo80W90:val("Geo80W90", "ad5"),
        Geo85W140:val("Geo85W140", "ad5"),
        Hydrax32:val("Hydrax32", "ad5"),
        HydraxZ46:val("HydraxZ46", "ad5"),
        HydraxZ68:val("HydraxZ68", "ad5"),
        PowerTransSP150:val("PowerTransSP150", "ad5"),
        PowerTransSP220:val("PowerTransSP220", "ad5"),
        PowerTransSP320:val("PowerTransSP320", "ad5"),
        Sb22D210:val("Sb22D210", "ad5"),
        SentryHDSae40:val("SentryHDSae40", "ad5"),
        TurbofleetSae15W:val("TurbofleetSae15W", "ad5")
    },
    ad6: {
        quarter: "MONO PA EO",
        _2T: val("_2T", "ad6"),
        _4T: val("_4T", "ad6"),
        spare: spare_fn("ad6"),
        atfIII: val("atfIII", "ad6"),
        sum: total("ad6"),
        DuramaxHD:val("DuramaxHD", "ad6"),
        FrontiaX:val("FrontiaX", "ad6"),
        Geo80W90:val("Geo80W90", "ad6"),
        Geo85W140:val("Geo85W140", "ad6"),
        Hydrax32:val("Hydrax32", "ad6"),
        HydraxZ46:val("HydraxZ46", "ad6"),
        HydraxZ68:val("HydraxZ68", "ad6"),
        PowerTransSP150:val("PowerTransSP150", "ad6"),
        PowerTransSP220:val("PowerTransSP220", "ad6"),
        PowerTransSP320:val("PowerTransSP320", "ad6"),
        Sb22D210:val("Sb22D210", "ad6"),
        SentryHDSae40:val("SentryHDSae40", "ad6"),
        TurbofleetSae15W:val("TurbofleetSae15W", "ad6")
    },
    ad7: {
        quarter: "4T PA PEO",
        _2T: val("_2T", "ad7"),
        _4T: val("_4T", "ad7"),
        spare: spare_fn("ad7"),
        atfIII: val("atfIII", "ad7"),
        sum: total("ad7"),
        DuramaxHD:val("DuramaxHD", "ad7"),
        FrontiaX:val("FrontiaX", "ad7"),
        Geo80W90:val("Geo80W90", "ad7"),
        Geo85W140:val("Geo85W140", "ad7"),
        Hydrax32:val("Hydrax32", "ad7"),
        HydraxZ46:val("HydraxZ46", "ad7"),
        HydraxZ68:val("HydraxZ68", "ad7"),
        PowerTransSP150:val("PowerTransSP150", "ad7"),
        PowerTransSP220:val("PowerTransSP220", "ad7"),
        PowerTransSP320:val("PowerTransSP320", "ad7"),
        Sb22D210:val("Sb22D210", "ad7"),
        SentryHDSae40:val("SentryHDSae40", "ad7"),
        TurbofleetSae15W:val("TurbofleetSae15W", "ad7")
    },
    ad8: {
        quarter: "ATF PA",
        _2T: val("_2T", "ad8"),
        _4T: val("_4T", "ad8"),
        spare: spare_fn("ad8"),
        atfIII: val("atfIII", "ad8"),
        sum: total("ad8"),
        DuramaxHD:val("DuramaxHD", "ad8"),
        FrontiaX:val("FrontiaX", "ad8"),
        Geo80W90:val("Geo80W90", "ad8"),
        Geo85W140:val("Geo85W140", "ad8"),
        Hydrax32:val("Hydrax32", "ad8"),
        HydraxZ46:val("HydraxZ46", "ad8"),
        HydraxZ68:val("HydraxZ68", "ad8"),
        PowerTransSP150:val("PowerTransSP150", "ad8"),
        PowerTransSP220:val("PowerTransSP220", "ad8"),
        PowerTransSP320:val("PowerTransSP320", "ad8"),
        Sb22D210:val("Sb22D210", "ad8"),
        SentryHDSae40:val("SentryHDSae40", "ad8"),
        TurbofleetSae15W:val("TurbofleetSae15W", "ad8")
    },
    ad9: {
        quarter: "2T PA",
        _2T: val("_2T", "ad9"),
        _4T: val("_4T", "ad9"),
        spare: spare_fn("ad9"),
        atfIII: val("atfIII", "ad9"),
        sum: total("ad9"),
        DuramaxHD:val("DuramaxHD", "ad9"),
        FrontiaX:val("FrontiaX", "ad9"),
        Geo80W90:val("Geo80W90", "ad9"),
        Geo85W140:val("Geo85W140", "ad9"),
        Hydrax32:val("Hydrax32", "ad9"),
        HydraxZ46:val("HydraxZ46", "ad9"),
        HydraxZ68:val("HydraxZ68", "ad9"),
        PowerTransSP150:val("PowerTransSP150", "ad9"),
        PowerTransSP220:val("PowerTransSP220", "ad9"),
        PowerTransSP320:val("PowerTransSP320", "ad9"),
        Sb22D210:val("Sb22D210", "ad9"),
        SentryHDSae40:val("SentryHDSae40", "ad9"),
        TurbofleetSae15W:val("TurbofleetSae15W", "ad9")
    },
    ad10: {
        quarter: "HYA",
        _2T: val("_2T", "ad10"),
        _4T: val("_4T", "ad10"),
        spare: spare_fn("ad10"),
        atfIII: val("atfIII", "ad10"),
        sum: total("ad10"),
        DuramaxHD:val("DuramaxHD", "ad10"),
        FrontiaX:val("FrontiaX", "ad10"),
        Geo80W90:val("Geo80W90", "ad10"),
        Geo85W140:val("Geo85W140", "ad10"),
        Hydrax32:val("Hydrax32", "ad10"),
        HydraxZ46:val("HydraxZ46", "ad10"),
        HydraxZ68:val("HydraxZ68", "ad10"),
        PowerTransSP150:val("PowerTransSP150", "ad10"),
        PowerTransSP220:val("PowerTransSP220", "ad10"),
        PowerTransSP320:val("PowerTransSP320", "ad10"),
        Sb22D210:val("Sb22D210", "ad10"),
        SentryHDSae40:val("SentryHDSae40", "ad10"),
        TurbofleetSae15W:val("TurbofleetSae15W", "ad10")
    },
    ad11: {
        quarter: "DYE",
        _2T: val("_2T", "ad11"),
        _4T: val("_4T", "ad11"),
        spare: spare_fn("ad11"),
        atfIII: val("atfIII", "ad11"),
        sum: total("ad11"),
        DuramaxHD:val("DuramaxHD", "ad11"),
        FrontiaX:val("FrontiaX", "ad11"),
        Geo80W90:val("Geo80W90", "ad11"),
        Geo85W140:val("Geo85W140", "ad11"),
        Hydrax32:val("Hydrax32", "ad11"),
        HydraxZ46:val("HydraxZ46", "ad11"),
        HydraxZ68:val("HydraxZ68", "ad11"),
        PowerTransSP150:val("PowerTransSP150", "ad11"),
        PowerTransSP220:val("PowerTransSP220", "ad11"),
        PowerTransSP320:val("PowerTransSP320", "ad11"),
        Sb22D210:val("Sb22D210", "ad11"),
        SentryHDSae40:val("SentryHDSae40", "ad11"),
        TurbofleetSae15W:val("TurbofleetSae15W", "ad11")
    },
    ad12: {
        quarter: "TURB",
        _2T: val("_2T", "ad12"),
        _4T: val("_4T", "ad12"),
        spare: spare_fn("ad12"),
        atfIII: val("atfIII", "ad12"),
        sum: total("ad12"),
        DuramaxHD:val("DuramaxHD", "ad12"),
        FrontiaX:val("FrontiaX", "ad12"),
        Geo80W90:val("Geo80W90", "ad12"),
        Geo85W140:val("Geo85W140", "ad12"),
        Hydrax32:val("Hydrax32", "ad12"),
        HydraxZ46:val("HydraxZ46", "ad12"),
        HydraxZ68:val("HydraxZ68", "ad12"),
        PowerTransSP150:val("PowerTransSP150", "ad12"),
        PowerTransSP220:val("PowerTransSP220", "ad12"),
        PowerTransSP320:val("PowerTransSP320", "ad12"),
        Sb22D210:val("Sb22D210", "ad12"),
        SentryHDSae40:val("SentryHDSae40", "ad12"),
        TurbofleetSae15W:val("TurbofleetSae15W", "ad12")
    },
    ad13: {
        quarter: "TM PA",
        _2T: val("_2T", "ad13"),
        _4T: val("_4T", "ad13"),
        spare: spare_fn("ad13"),
        atfIII: val("atfIII", "ad13"),
        sum: total("ad13"),
        DuramaxHD:val("DuramaxHD", "ad13"),
        FrontiaX:val("FrontiaX", "ad13"),
        Geo80W90:val("Geo80W90", "ad13"),
        Geo85W140:val("Geo85W140", "ad13"),
        Hydrax32:val("Hydrax32", "ad13"),
        HydraxZ46:val("HydraxZ46", "ad13"),
        HydraxZ68:val("HydraxZ68", "ad13"),
        PowerTransSP150:val("PowerTransSP150", "ad13"),
        PowerTransSP220:val("PowerTransSP220", "ad13"),
        PowerTransSP320:val("PowerTransSP320", "ad13"),
        Sb22D210:val("Sb22D210", "ad13"),
        SentryHDSae40:val("SentryHDSae40", "ad13"),
        TurbofleetSae15W:val("TurbofleetSae15W", "ad13")
    },
    series1: {
        type: 'bar',
        xKey: 'quarter',
        yKey: '_2T', //replaced iphone with 4T
        yName: '_2T', 
        stacked: true
    },
    series2: {
        type: 'bar',
        xKey: 'quarter',
        yKey: '_4T', //replaced mac with 2T
        yName: '_4T',
        stacked: true
     },
    series3: {
        type: 'bar',
        xKey: 'quarter',
        yKey: 'atfIII',
        yName: 'atfIII',
        stacked: true,
    },
    series4: {
        type: 'bar',
        xKey: 'quarter',
        yKey: 'DuramaxHD',
        yName: 'DuramaxHD',
        stacked: true,
    },
    series5: {
        type: 'bar',
        xKey: 'quarter',
        yKey: 'FrontiaX',
        yName: 'FrontiaX',
        stacked: true,
    },
    series6: {
        type: 'bar',
        xKey: 'quarter',
        yKey: 'Geo80W90',
        yName: 'Geo80W90',
        stacked: true,
    },
    series7: {
        type: 'bar',
        xKey: 'quarter',
        yKey: 'Geo85W140',
        yName: 'Geo85W140',
        stacked: true,
    },
    series8: {
        type: 'bar',
        xKey: 'quarter',
        yKey: 'Hydrax32',
        yName: 'Hydrax32',
        stacked: true,
    },
    series9: {
        type: 'bar',
        xKey: 'quarter',
        yKey: 'HydraxZ46',
        yName: 'HydraxZ46',
        stacked: true,
    },
    series10: {
        type: 'bar',
        xKey: 'quarter',
        yKey: 'HydraxZ68',
        yName: 'HydraxZ68',
        stacked: true,
    },
    series11: {
        type: 'bar',
        xKey: 'quarter',
        yKey: 'PowerTransSP150',
        yName: 'PowerTransSP150',
        stacked: true,
    },
    series12: {
        type: 'bar',
        xKey: 'quarter',
        yKey: 'PowerTransSP220',
        yName: 'PowerTransSP220',
        stacked: true,
    },
    series13: {
        type: 'bar',
        xKey: 'quarter',
        yKey: 'PowerTransSP320',
        yName: 'PowerTransSP320',
        stacked: true,
    },
    series14: {
        type: 'bar',
        xKey: 'quarter',
        yKey: 'Sb22D210',
        yName: 'Sb22D210',
        stacked: true,
    },
    series15: {
        type: 'bar',
        xKey: 'quarter',
        yKey: 'SentryHDSae40',
        yName: 'SentryHDSae40',
        stacked: true,
    },
    series16: {
        type: 'bar',
        xKey: 'quarter',
        yKey: 'TurbofleetSae15W',
        yName: 'TurbofleetSae15W',
        stacked: true,
    },
    series17: {
        type: 'bar',
        xKey: 'quarter',
        yKey: 'spare',
        yName: 'Spare',
        stacked: true,
    },
    
    
    };
}
export default DataFunction;
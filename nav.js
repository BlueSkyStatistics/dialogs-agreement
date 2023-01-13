const nav = {
    "name": "Agreement",
    "tab": "agreement",
    "buttons": [
        {
            "name": "Method",
            "icon": "icon-layout",
            "children": [
                "./BlandAltman",
                "./cohensKappa",
                "./diagnosticTesting",
                "./fleissKappaUpd",
                "./intraClassCorrelationCoefficients"
            ]
        },        
        {
            "name": "Scale",
            "icon": "icon-standardize",
            "children": [
                "./reliabilityAnalysisCronbachsAlpha",
                "./reliabilityAnalysisMcDonaldsOmega"
            ]
        }

    ]
}

module.exports.nav = nav

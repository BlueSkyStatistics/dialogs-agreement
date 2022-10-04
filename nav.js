const nav = {
    "name": "Agreement",
    "tab": "agreement",
    "buttons": [
        {
            "name": "Scale",
            "icon": "icon-standardize",
            "children": [
                "./reliabilityAnalysisCronbachsAlpha",
                "./reliabilityAnalysisMcDonaldsOmega"
            ]
        },
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
        }
    ]
}

module.exports.nav = nav

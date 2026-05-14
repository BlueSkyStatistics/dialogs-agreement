const nav = {
    "id": "menu-agreement",
    "buttons": [
        {
            "id": "menu-agreement-method",
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
            "id": "menu-agreement-scale",
            "icon": "icon-standardize",
            "children": [
                "./reliabilityAnalysisCronbachsAlpha",
                "./reliabilityAnalysisMcDonaldsOmega"
            ]
        }

    ]
}

module.exports.nav = nav

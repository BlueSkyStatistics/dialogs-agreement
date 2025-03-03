/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

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

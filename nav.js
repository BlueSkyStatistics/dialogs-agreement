/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

const {getT} = require("../../../../localization");
let t = getT('menutoolbar')
const nav = () => ({
    "name": t('agreement_top_level_title'),// {ns: 'menutoolbar'}),
    "tab": "agreement",
    "buttons": [
        {
            "name": t('agreement_Method'),// {ns: 'menutoolbar'}),
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
            "name": t('agreement_Scale'),// {ns: 'menutoolbar'}),
            "icon": "icon-standardize",
            "children": [
                "./reliabilityAnalysisCronbachsAlpha",
                "./reliabilityAnalysisMcDonaldsOmega"
            ]
        }

    ]
})

module.exports = {
    nav: nav(),
    render: () => nav()
}

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

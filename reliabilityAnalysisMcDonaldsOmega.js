/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */




class reliabilityAnalysisMcDonaldsOmega extends baseModal {
    static dialogId = 'reliabilityAnalysisMcDonaldsOmega'
    static t = baseModal.makeT(reliabilityAnalysisMcDonaldsOmega.dialogId)

    constructor() {
        var config = {
            id: reliabilityAnalysisMcDonaldsOmega.dialogId,
            label: reliabilityAnalysisMcDonaldsOmega.t('title'),
            modalType: "two",
            RCode: `
            require(psych)
            psych::omega(  {{dataset.name}}[,c({{selected.tvarbox1 | safe}})])
                `
        }
        var objects = {
            content_var: { el: new srcVariableList(config) },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: reliabilityAnalysisMcDonaldsOmega.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content],
            nav: {
                name: reliabilityAnalysisMcDonaldsOmega.t('navigation'),
                icon: "icon-omega_mcdonald",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: reliabilityAnalysisMcDonaldsOmega.t('help.title'),
            r_help: reliabilityAnalysisMcDonaldsOmega.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: reliabilityAnalysisMcDonaldsOmega.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new reliabilityAnalysisMcDonaldsOmega().render()
}

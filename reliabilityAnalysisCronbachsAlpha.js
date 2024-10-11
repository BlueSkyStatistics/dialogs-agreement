


class reliabilityAnalysisCronbachsAlpha extends baseModal {
    static dialogId = 'reliabilityAnalysisCronbachsAlpha'
    static t = baseModal.makeT(reliabilityAnalysisCronbachsAlpha.dialogId)

    constructor() {
        var config = {
            id: reliabilityAnalysisCronbachsAlpha.dialogId,
            label: reliabilityAnalysisCronbachsAlpha.t('title'),
            modalType: "two",
            RCode: `
            require(psych)
            local({
            reliabilityRes <- psych::alpha(  {{dataset.name}}[,c({{selected.tvarbox1 | safe}})],keys=c({{selected.tvarbox2 | safe}}))
            colnames(reliabilityRes$total)[1]="Cronbach\'s Alpha"
            colnames(reliabilityRes$total)[2]="Cronbach\'s Standardized Alpha"
            colnames(reliabilityRes$total)[3]="Guttman\'s Lambda 6"
            BSkyFormat(reliabilityRes$total,decimalDigitsRounding=4,singleTableOutputHeader="Reliability Statistics")
            colnames(reliabilityRes$alpha.drop)[1]="Cronbach\'s Alpha"
            colnames(reliabilityRes$alpha.drop)[2]="Cronbach\'s Standardized Alpha"
            colnames(reliabilityRes$alpha.drop)[3]="Guttman\'s Lambda 6"
            BSkyFormat(reliabilityRes$alpha.drop,decimalDigitsRounding=4,singleTableOutputHeader="Reliability if an item is dropped")
            BSkyFormat(reliabilityRes$item.stats,decimalDigitsRounding=4,singleTableOutputHeader="Item Statistics")
            BSkyFormat(reliabilityRes$response.freq,decimalDigitsRounding=4,singleTableOutputHeader="Non missing response frequency for each item")
            })
                `
        }
        var objects = {
            content_var: { el: new srcVariableList(config) },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: reliabilityAnalysisCronbachsAlpha.t('tvarbox1'),
                    no: "tvarbox1",
                    filter: "String|Numeric|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            tvarbox2: {
                el: new dstVariableList(config, {
                    label: reliabilityAnalysisCronbachsAlpha.t('tvarbox2'),
                    no: "tvarbox2",
                    filter: "String|Numeric|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content, objects.tvarbox2.el.content],
            nav: {
                name: reliabilityAnalysisCronbachsAlpha.t('navigation'),
                icon: "icon-cronbachs_alpha",
                // icon: icon-alpha,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: reliabilityAnalysisCronbachsAlpha.t('help.title'),
            r_help: "help(data,package='utils')",
            body: reliabilityAnalysisCronbachsAlpha.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new reliabilityAnalysisCronbachsAlpha().render()
}

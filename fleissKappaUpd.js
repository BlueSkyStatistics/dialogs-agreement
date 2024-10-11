

class fleissKappaUpd extends baseModal {
    static dialogId = 'fleissKappaUpd'
    static t = baseModal.makeT(fleissKappaUpd.dialogId)

    constructor() {
        var config = {
            id: fleissKappaUpd.dialogId,
            label: fleissKappaUpd.t('title'),
            modalType: "two",
            RCode: `
require(irrCAC)
fkappa.res <- irrCAC::fleiss.kappa.raw( ratings = {{dataset.name}}[, c({{selected.ratervars | safe}})], 
\tweights = "{{selected.weights | safe}}",{{if (options.selected.categLabels != "")}} categ.labels = c({{selected.categLabels | safe}}), {{/if}}
\n\tconflev = {{selected.cilevel | safe}}, {{if (options.selected.N != "")}}N = {{selected.N | safe}}{{/if}})
#Displaying Fleiss' Kappa Statistics
BSkyFormat(fkappa.res$est, singleTableOutputHeader = "Fleiss' Kappa Statistics" )
#Rating categories used in the analysis
BSkyFormat(fkappa.res$categories, singleTableOutputHeader = "Rating categories used" )
#Cross tabulating the weighter variables
{{if (options.selected.freqlistchkbox =="TRUE")}}#Cross tabulating the weighter variables\nBSkyFormat(fkappa.res$weights, singleTableOutputHeader = "Crosstab of weighter variables" ){{/if}}
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "move" }) },
            ratervars: {
                el: new dstVariableList(config, {
                    label: fleissKappaUpd.t('ratervars'),
                    no: "ratervars",
                    filter: "Numeric|String|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            cilevel: {
                el: new advancedSlider(config, {
                    no: "cilevel",
                    label: fleissKappaUpd.t('cilevel'),
                    min: 0,
                    max: 1,
                    step: 0.05,
                    value: 0.95,
                    extraction: "NoPrefix|UseComma"
                })
            },
            freqlistchkbox: {
                el: new checkbox(config, {
                    label: fleissKappaUpd.t('freqlistchkbox'),
                    no: "freqlistchkbox",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
            weights: {
                el: new comboBox(config, {
                    no: 'weights',
                    label: fleissKappaUpd.t('weights'),
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["unweighted", "quadratic", "ordinal", "linear", "radical", "ratio", "circular", "bipolar"],
                    default: "unweighted"
                })
            },
            N: {
                el: new input(config, {
                    no: 'N',
                    label: fleissKappaUpd.t('N'),
                    placeholder: "",
                    allow_spaces: true,
                    extraction: "TextAsIs",
                    type: "numeric",
                    value: "",
                }),
            },
            categLabels: {
                el: new input(config, {
                    no: 'categLabels',
                    label: fleissKappaUpd.t('categLabels'),
                    placeholder: "",
                    allow_spaces: true,
                    extraction: "TextAsIs",
                    type: "character",
                    value: "",
                }),
            },
        }
        var opts = {
            el: new optionsVar(config, {
                no: "fk_options",
                name: fleissKappaUpd.t('options'),
                content: [
                    objects.weights.el,
                    objects.N.el,
                    objects.categLabels.el
                ]
            })
        };
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.ratervars.el.content, objects.cilevel.el.content, objects.freqlistchkbox.el.content],
            bottom: [opts.el.content],
            nav: {
                name: fleissKappaUpd.t('navigation'),
                icon: "icon-kappa_fleiss",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: fleissKappaUpd.t('help.title'),
            r_help: "help(data,package='utils')",
            body: fleissKappaUpd.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new fleissKappaUpd().render()
}

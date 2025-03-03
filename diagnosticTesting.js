/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */



class diagnosticTesting extends baseModal {
    static dialogId = 'diagnosticTesting'
    static t = baseModal.makeT(diagnosticTesting.dialogId)

    constructor() {
        var config = {
            id: diagnosticTesting.dialogId,
            label: diagnosticTesting.t('title'),
            modalType: "two",
            RCode: `
require(epiR)
require(DescTools)
# create the frequency table
# use the Rev function to reverse the row and column order so that the larger numeric value is ordered first
mytable <- Rev(table({{dataset.name}}\${{selected.testvar | safe}}, {{dataset.name}}\${{selected.outvar | safe}}, useNA="no"), margin=c(1,2))
#Perform the test
BSkyres <- epi.tests(mytable, conf.level={{selected.cilevel | safe}})
# create the statistic table
BSkyres.table <- rbind(BSkyres$detail$se, BSkyres$detail$sp, 
	BSkyres$detail$pv.pos, BSkyres$detail$pv.neg, BSkyres$detail$diag.ac, 
	BSkyres$detail$lr.pos, BSkyres$detail$lr.neg, BSkyres$detail$nndx, 
	BSkyres$detail$youden, BSkyres$detail$p.rout, BSkyres$detail$p.rin, 
	BSkyres$detail$p.tpdn, BSkyres$detail$p.tndp, BSkyres$detail$p.dntp, BSkyres$detail$p.dptn, BSkyres$detail$diag.or, 
	BSkyres$detail$ap, BSkyres$detail$tp)
rownames(BSkyres.table) <- c("Sensitivity", "Specificity", \n\t"Positive Predictive Value (PPV)", "Negative Predictive Value (NPV)", \n\t"Diagnostic Accuracy", "Likelihood Ratio (+ test)", \n\t"Likelihood Ratio (- test)", "Number Needed to Diagnose", \n\t"Youden's Index", "Proportion Outcome Ruled Out", \n\t"Proportion Outcome Ruled In", "proportion of true outcome negative subjects that test positive", \n\t"proportion of true outcome positive subjects that test negative", "proportion of test positive subjects that are outcome negative","proportion of test negative subjects that are outcome positive", "Diagnostic Odds Ratio", "Apparent Prevalence", \n\t"True Prevalence")
BSkyFormat(BSkyres$tab, singleTableOutputHeader="Frequency Table: Test = {{selected.testvar | safe}} vs Outcome = {{selected.outvar | safe}}")
BSkyFormat(BSkyres.table, singleTableOutputHeader="Diagnostic Testing Statistics with {{selected.cilevel | safe}} Level Confidence Intervals")
#Removing temporary objects
if (exists("BSkyres")) rm (BSkyres)
if (exists("BSkyres.table")) rm (BSkyres.table)
# DescTools package masks some functions, so detaching
desctools.exit <- detach("package:DescTools")
`
        }
        var objects = {
            content_var: { el: new srcVariableList(config, { action: "move" }) },
            outvar: {
                el: new dstVariable(config, {
                    label: diagnosticTesting.t('outvar'),
                    no: "outvar",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            testvar: {
                el: new dstVariable(config, {
                    label: diagnosticTesting.t('testvar'),
                    no: "testvar",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            cilevel: {
                el: new advancedSlider(config, {
                    no: "cilevel",
                    label: diagnosticTesting.t('cilevel'),
                    min: 0,
                    max: 1,
                    step: 0.05,
                    value: 0.95,
                    extraction: "NoPrefix|UseComma"
                })
            },
            /*label1: { el: new labelVar(config, { label: diagnosticTesting.t('label1'), h: 6 }) },
            equal: { el: new radioButton(config, { label: diagnosticTesting.t('equal'), no: "weight", increment: "equal", value: "two.sided", state: "checked", extraction: "ValueAsIs" }) },
            quadratic: { el: new radioButton(config, { label: diagnosticTesting.t('quadratic'), no: "weight", increment: "quadratic", value: "greater", state: "", extraction: "ValueAsIs" }) },*/
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.outvar.el.content, objects.testvar.el.content, objects.cilevel.el.content],
            nav: {
                name: diagnosticTesting.t('navigation'),
                //  icon: "icon-dt",
                icon: "icon-table_basic",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: diagnosticTesting.t('help.title'),
            r_help: diagnosticTesting.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: diagnosticTesting.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new diagnosticTesting().render()
}

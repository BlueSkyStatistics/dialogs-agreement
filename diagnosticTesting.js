/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Diagnostic Testing",
        navigation: "Diagnostic Testing",
        outvar: "Outcome Variable (1=positive, 0=negative):",
        testvar: "Test Variable (1=positive, 0=negative):",
        cilevel: "Confidence Level:",
        help: {
            title: "Diagnostic Testing",
            r_help: "help(epi.tests,package=epiR)",
            body: `
<b>Description</b></br>
This computes various measures appropriate in diagnostic testing studies for a binary test versus a binary gold standard outcome for detecting a "disease".<br/>
Outcome Variable: Variable containing the values for the gold standard.  This must be a numeric variable coded as 1 = "disease" positive and 0 = "disease" negative, since the computations depend on this order.<br/>
Test Variable: Variable containing the values for the test under consideration.  This must be a numeric variable coded as 1 = "disease" positive and 0 = "disease" negative, since the computations depend on this order.<br/>
Confidence Level: Desired confidence interval level<br/>
<br/>
<b>Usage</b>
<br/>
<code> 
epi.tests(dat, conf.level = 0.95)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
dat: An object of class table containing the individual cell frequencies created by tabulating the outcome and test variable. The Outcome Variable contains the values for the gold standard.  This must be a numeric variable coded as 1 = "disease" positive and 0 = "disease" negative, since the computations depend on this order. The test variable contains the values for the test under consideration.  This must be a numeric variable coded as 1 = "disease" positive and 0 = "disease" negative, since the computations depend on this order.
</li>
<li>
Confidence Level: Desired confidence interval level
</li>
</ul>
<b>Details</b></br>
Exact binomial confidence limits are calculated for test sensitivity, specificity, and positive and negative predictive value (see Collett 1999 for details).</br>
Confidence intervals for positive and negative likelihood ratios are based on formulae provided by Simel et al. (1991).</br>
Diagnostic accuracy is defined as the proportion of all tests that give a correct result. Diagnostic odds ratio is defined as how much more likely will the test make a correct diagnosis than an incorrect diagnosis in patients with the disease (Scott et al. 2008). The number needed to diagnose is defined as the number of paitents that need to be tested to give one correct positive test. Youden's index is the difference between the true positive rate and the false positive rate. Youden's index ranges from -1 to +1 with values closer to 1 if both sensitivity and specificity are high (i.e. close to 1).</br>
<b>Value</b></br>
See detailed help below to access R help that will describe the values returned</br>
<b>Package</b></br>
epiR;DescTools</br>
<b>Help</b></br>
For detailed help click on the R icon on the top right hand side of this dialog overlay or run the following command help(epi.tests,package=epiR) by creating a R code chunk by clicking + in the output window
			`}
    }
}
class diagnosticTesting extends baseModal {
    constructor() {
        var config = {
            id: "diagnosticTesting",
            label: localization.en.title,
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
                    label: localization.en.outvar,
                    no: "outvar",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            testvar: {
                el: new dstVariable(config, {
                    label: localization.en.testvar,
                    no: "testvar",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            cilevel: {
                el: new advancedSlider(config, {
                    no: "cilevel",
                    label: localization.en.cilevel,
                    min: 0,
                    max: 1,
                    step: 0.05,
                    value: 0.95,
                    extraction: "NoPrefix|UseComma"
                })
            },
            /*label1: { el: new labelVar(config, { label: localization.en.label1, h: 6 }) },
            equal: { el: new radioButton(config, { label: localization.en.equal, no: "weight", increment: "equal", value: "two.sided", state: "checked", extraction: "ValueAsIs" }) },
            quadratic: { el: new radioButton(config, { label: localization.en.quadratic, no: "weight", increment: "quadratic", value: "greater", state: "", extraction: "ValueAsIs" }) },*/
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.outvar.el.content, objects.testvar.el.content, objects.cilevel.el.content],
            nav: {
                name: localization.en.navigation,
                //  icon: "icon-dt",
                icon: "icon-table_basic",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new diagnosticTesting().render()
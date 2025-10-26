/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Cohen's Kappa",
        navigation: "Cohen's Kappa",
        obs1var: "Observer 1:",
        obs2var: "Observer 2:",
        cilevel: "Confidence Level:",
        label1: "Category Weights",
        equal: "Cicchetti-Allison (equal-spacing)",
        quadratic: "Fleiss-Cohen (quadratic)",
        agreeplot: "Agreement plot and Bangdiwala statistics",
        help: {
            title: "Cohen's Kappa",
            r_help: "help(Kappa,package=vcd)",
            body: `
                <b>Description</b></br>
Cohen's kappa measures agreement between two observers that measure the same subjects.  Unweighted kappa is for unordered categories, while weighted kappa is for ordered categories.  For weighted kappa, more weight is given the closer the categories are.  Kappa can range between -1 and 1, with 1 being perfect agreement and 0 no better than chance.  Negative values indicate agreement worse than chance alone, but is rare in practice.  The observers must measure the subjects on the same scale with all categories used by each observer.  This yields a square contingency table.  A contingency table and the kappa statistics are provided.</br>
Observer 1: Variable containing the values provided by an observer; can be either numeric or a factor</br>
Observer 2: Variable containing the values provided by a second observer; can be either numeric or a factor</br>
Confidence Level: Desired confidence interval level for the kappa statistics</br>
Category Weights:  Desired weight for levels of category disagreement</br>
Agreement plot and Bangdiwala statistics: option to produce an agreement plot with Bangdiwala statistics</br>
<b>Package</b></br>
gmodels;vcd</br>
<b>Help</b></br>
For detailed help click on the R icon on the top right hand side of this dialog overlay or run the following command help(Kappa,package=vcd) by creating a R code chunk by clicking + in the output window
                `}
    }
}

class cohensKappa extends baseModal {
    constructor() {
        var config = {
            id: "cohensKappa",
            label: localization.en.title,
            modalType: "two",
            RCode: `
require(gmodels)
require(vcd)
# cross-tabulation of observer values
crosstab <- gmodels::CrossTable(x = {{dataset.name}}\${{selected.obs1var | safe}},y = {{dataset.name}}\${{selected.obs2var | safe}},expected=FALSE,prop.r=TRUE,prop.c=TRUE,prop.t=TRUE,prop.chisq=FALSE,chisq = FALSE,fisher=FALSE,mcnemar=FALSE,resid=FALSE,sresid=FALSE,asresid=FALSE,missing.include=FALSE)
# contingency table and kappa computations
tab <- table({{dataset.name}}\${{selected.obs1var | safe}},{{dataset.name}}\${{selected.obs2var | safe}})
kappa.res <- Kappa(tab,weights="{{selected.weight | safe}}")
kappa.tab <- rbind(kappa.res$Unweighted,kappa.res$Weighted)
kappa.ci <- vcd:::confint.Kappa(kappa.res,level={{selected.cilevel | safe}})
kappa.final <- cbind(kappa.tab,kappa.ci)
rownames(kappa.final) <- c("Unweighted","Weighted ({{selected.weight | safe}})")
colnames(kappa.final) <- c("Kappa","Std Err","Lower","Upper")
BSkyFormat(kappa.final,singleTableOutputHeader="Kappa Statistics and CIs ({{selected.cilevel | safe}} level): {{selected.obs1var | safe}} vs {{selected.obs2var | safe}}")
cat("Note: Kappa will only be correct for square tables when each observer uses the same categories.")
# agreement plot and Bangdiwala statistics
if ({{selected.agreeplot | safe}}) {
agree <- vcd::agreementplot(tab,xlab="{{selected.obs1var | safe}}",ylab="{{selected.obs2var | safe}}",main="Agreement Plot")
BSkyFormat(unlist(agree),singleTableOutputHeader="Bangdiwala Statistics")
}
            `
        }
        var objects = {
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            obs1var: {
                el: new dstVariable(config, {
                    label: localization.en.obs1var,
                    no: "obs1var",
                    filter: "Numeric|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            obs2var: {
                el: new dstVariable(config, {
                    label: localization.en.obs2var,
                    no: "obs2var",
                    filter: "Numeric|Ordinal|Nominal|Scale",
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
            agreeplot: {
                el: new checkbox(config, {
                    label: localization.en.agreeplot,
                    no: "agreeplot",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
            label1: { el: new labelVar(config, { label: localization.en.label1, h: 6 }) },
            equal: { el: new radioButton(config, { label: localization.en.equal, no: "weight", increment: "equal", value: "Equal-Spacing", state: "checked", extraction: "ValueAsIs" }) },
            quadratic: { el: new radioButton(config, { label: localization.en.quadratic, no: "weight", increment: "quadratic", value: "Fleiss-Cohen", state: "", extraction: "ValueAsIs" }) },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.obs1var.el.content, objects.obs2var.el.content, objects.cilevel.el.content, objects.label1.el.content, objects.equal.el.content, objects.quadratic.el.content, objects.agreeplot.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-kappa_cohen",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new cohensKappa().render()



class cohensKappa extends baseModal {
    static dialogId = 'cohensKappa'
    static t = baseModal.makeT(cohensKappa.dialogId)

    constructor() {
        var config = {
            id: cohensKappa.dialogId,
            label: cohensKappa.t('title'),
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
                    label: cohensKappa.t('obs1var'),
                    no: "obs1var",
                    filter: "Numeric|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            obs2var: {
                el: new dstVariable(config, {
                    label: cohensKappa.t('obs2var'),
                    no: "obs2var",
                    filter: "Numeric|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            cilevel: {
                el: new advancedSlider(config, {
                    no: "cilevel",
                    label: cohensKappa.t('cilevel'),
                    min: 0,
                    max: 1,
                    step: 0.05,
                    value: 0.95,
                    extraction: "NoPrefix|UseComma"
                })
            },
            agreeplot: {
                el: new checkbox(config, {
                    label: cohensKappa.t('agreeplot'),
                    no: "agreeplot",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
            label1: { el: new labelVar(config, { label: cohensKappa.t('label1'), h: 6 }) },
            equal: { el: new radioButton(config, { label: cohensKappa.t('equal'), no: "weight", increment: "equal", value: "Equal-Spacing", state: "checked", extraction: "ValueAsIs" }) },
            quadratic: { el: new radioButton(config, { label: cohensKappa.t('quadratic'), no: "weight", increment: "quadratic", value: "Fleiss-Cohen", state: "", extraction: "ValueAsIs" }) },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.obs1var.el.content, objects.obs2var.el.content, objects.cilevel.el.content, objects.label1.el.content, objects.equal.el.content, objects.quadratic.el.content, objects.agreeplot.el.content],
            nav: {
                name: cohensKappa.t('navigation'),
                icon: "icon-kappa_cohen",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: cohensKappa.t('help.title'),
            r_help: "help(data,package='utils')",
            body: cohensKappa.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new cohensKappa().render()
}

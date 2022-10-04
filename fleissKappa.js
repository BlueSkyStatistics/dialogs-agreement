
var localization ={
    en:{  
        title: "Fleiss' Kappa",
        navigation:   "Fleiss' Kappa",
        ratervars: "Rater Variables:",
        cilevel: "Confidence Level:",
           
        freqlistchkbox:"Cross-tabulate Rater Variables",
        help: {
            title: "Fleiss' Kappa",
            r_help: "help(spi, package=rel)",
            body: `
<b>Description</b></br>
This computes Fleiss's kappa statistic of agreement for two or more raters with nominal outcome data.  If any rater has a missing value for an observation, that observation is removed from the analysis.</br>
Rater Variables:  Variables corresponding to each rater.  They can be numeric, factor, or ordinal variables.</br>
Confidence Interval Level:  Desired level of the confidence interval for Fleiss' kappa.</br>
Cross-tabulate Rater Variables:  Option to show a frequency table cross-tabulating the rater variables in a list format.  Observations with missing values are shown in the table, but are not included in the calculation of totals and percentages.</br>
<b>Package</b></br>
rel;arsenal</br>
<b>Help</b></br>
For detailed help click on the R icon on the top right hand side of this dialog overlay or run the following command help(spi, package=rel) by creating a R code chunk by clicking + in the output window
`}
            
}

}













class fleissKappa extends baseModal {
    constructor() {
        var config = {
            id: "fleissKappa",
            label: localization.en.title,
            modalType: "two",
            RCode: `
require(rel)
require(arsenal)
fkappa.res <- spi(data={{dataset.name}}[ , c({{selected.ratervars | safe}})], weight="unweighted", conf.level={{selected.cilevel | safe}})

fkappa.results <- data.frame(Raters=fkappa.res$obs, N=fkappa.res$sample, Fleiss_kappa=fkappa.res$est, std.err=fkappa.res$se, ci.level=fkappa.res$conf.level, lower=fkappa.res$lb, upper=fkappa.res$ub)

rownames(fkappa.results) <- NULL

rater.vars <- data.frame(Rater.Variables={{selected.ratervars | safe}})

BSkyFormat(rater.vars, singleTableOutputHeader="Rater Variables") 
BSkyFormat(fkappa.results, singleTableOutputHeader="Fleiss' Kappa")

if ({{selected.freqlistchkbox | safe}}) 
{
mytab <- table({{dataset.name}}[, c({{selected.ratervars | safe}})], useNA="ifany")
multiway <- freqlist(mytab,na.options="showexclude",sparse=FALSE)
BSkyFormat(as.data.frame(multiway),singleTableOutputHeader="Cross-tabulation of Rater Variables")
}
`
        }

        var objects = {
            content_var: {el: new srcVariableList(config, {action: "move"})},
            ratervars: {el: new dstVariableList(config, {
                label: localization.en.ratervars, 
                no: "ratervars", 
                filter: "Numeric|Ordinal|Nominal|Scale",
                extraction: "NoPrefix|UseComma|Enclosed",
                required:true,
            }), r: ['{{ var | safe}}']},

            
            cilevel: {
                el: new advancedSlider(config,{
                        no: "cilevel",
                        label: localization.en.cilevel,
                        min: 0,
                        max: 1,
                        step: 0.05,
                        value: 0.95,
                        extraction: "NoPrefix|UseComma"
                    })
            },

            freqlistchkbox: {
                el: new checkbox(config, {
                    label: localization.en.freqlistchkbox, 
                    no: "freqlistchkbox",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                  
                   // dependant_objects: ["input_no_value", "input_value"],
                })
            },
           
            
            

                   
        }
        
        const content = {
            left: [  objects.content_var.el.content ],
            right: [objects.ratervars.el.content, objects.cilevel.el.content, objects.freqlistchkbox.el.content  ],
            nav: {
                name: localization.en.navigation,
                icon: "icon-kappa_fleiss",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}

module.exports.item = new fleissKappa().render()
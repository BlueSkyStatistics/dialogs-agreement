
var localization ={
    en:{  
        title: "Intraclass Correlation Coefficients",
        navigation:   "Intraclass Correlation Coefficients",
        ratervars: "Rater Variables:",
        cilevel: "Confidence Level:",
           
        modeldetails:"Model Details",
        help: {
            title: "Intraclass Correlation Coefficients",
            r_help: "help(ICC, package=psych)",
            body: `
<b>Description</b></br>
This computes the 6 intraclass correlation coefficients (ICC) of Shrout and Fleiss (1979, Psychological Bulletin).  Estimation is done using linear mixed effects models with restricted maximum likelihood, so this can handle missing data.</br>
Shrout and Fleiss consider six cases of reliability of ratings done by k raters on n targets.</br>
ICC1: Each target is rated by a different set of k judges and the judges are selected at random.  This is a measure of absolute agreement in the ratings.</br>
ICC2: A random sample of k judges rate each target.</br>
ICC3: A fixed set of k judges rate each target. There is no generalization to a larger population of judges.</br>
Then, for each of these cases, is reliability to be estimated for a single rating or for the average of k ratings? ICC1 is sensitive to differences in means between raters and is a measure of absolute agreement. ICC2 and ICC3 remove mean differences between raters, but are sensitive to interactions of raters by subjects. The difference between ICC2 and ICC3 is whether raters are seen as fixed or random effects.  ICC1k, ICC2k, and ICC3K reflect the means of k raters.</br>
Rater Variables:  Variables corresponding to each rater.  These must be numeric variables.</br>
Confidence Interval Level:  Desired level of the confidence interval for the ICC's</br>
Model Details:  Show details from the underlying mixed effects linear models</br>
<b>Package</b></br>
psych</br>
<b>Help</b></br>
For detailed help click on the R icon on the top right hand side of this dialog overlay or run the following command help(ICC, package=psych) by creating a R code chunk by clicking + in the output window
			`}
            
}

}

class intraClassCorrelationCoefficients extends baseModal {
    constructor() {
        var config = {
            id: "intraClassCorrelationCoefficients",
            label: localization.en.title,
            modalType: "two",
            RCode: `
            require(psych)
            mydata.cols <- as.matrix({{dataset.name}}[, c({{selected.ratervars | safe}})])
            icc.results <- ICC(mydata.cols, alpha=1-{{selected.cilevel | safe}}, lmer=TRUE)
            
            names(icc.results$results)[6] <- "p.value"
            sample.size <- data.frame(Obs=icc.results$n.obs, Raters=icc.results$n.judge)
            icc.results.msw <- data.frame(MSW=icc.results$MSW)
            names(icc.results$lme)[2] <- "Proportion"
            
            icc.fixedeffects <- summary(icc.results$summary)$coefficients
            
            rater.vars <- data.frame(Rater.Variables=c({{selected.ratervars | safe}}))
            
            BSkyFormat(rater.vars, singleTableOutputHeader="Rater Variables Used")
            BSkyFormat(sample.size, singleTableOutputHeader="Sample Size")
            BSkyFormat(icc.results$results, singleTableOutputHeader="Intraclass Correlation Coefficients (CI level = {{selected.cilevel | safe}})")
            
            if ({{selected.modeldetails | safe}}) {
            BSkyFormat(icc.results$stats, singleTableOutputHeader="ANOVA Statistics")
            BSkyFormat(icc.results.msw, singleTableOutputHeader="Mean Squares Within")
            BSkyFormat(icc.results$lme, singleTableOutputHeader="Variance Decomposition")
            BSkyFormat(icc.fixedeffects, singleTableOutputHeader="Fixed Effects")
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

            modeldetails: {
                el: new checkbox(config, {
                    label: localization.en.modeldetails, 
                    no: "modeldetails",
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
            right: [objects.ratervars.el.content, objects.cilevel.el.content, objects.modeldetails.el.content  ],
            nav: {
                name: localization.en.navigation,
                icon: "icon-icc",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}

module.exports.item = new intraClassCorrelationCoefficients().render()
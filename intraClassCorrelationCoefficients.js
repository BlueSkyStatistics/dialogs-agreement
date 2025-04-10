/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */



class intraClassCorrelationCoefficients extends baseModal {
    static dialogId = 'intraClassCorrelationCoefficients'
    static t = baseModal.makeT(intraClassCorrelationCoefficients.dialogId)

    constructor() {
        var config = {
            id: intraClassCorrelationCoefficients.dialogId,
            label: intraClassCorrelationCoefficients.t('title'),
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
                label: intraClassCorrelationCoefficients.t('ratervars'), 
                no: "ratervars", 
                filter: "Numeric|Ordinal|Nominal|Scale",
                extraction: "NoPrefix|UseComma|Enclosed",
                required:true,
            }), r: ['{{ var | safe}}']},

            
            cilevel: {
                el: new advancedSlider(config,{
                        no: "cilevel",
                        label: intraClassCorrelationCoefficients.t('cilevel'),
                        min: 0,
                        max: 1,
                        step: 0.05,
                        value: 0.95,
                        extraction: "NoPrefix|UseComma"
                    })
            },

            modeldetails: {
                el: new checkbox(config, {
                    label: intraClassCorrelationCoefficients.t('modeldetails'), 
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
                name: intraClassCorrelationCoefficients.t('navigation'),
                icon: "icon-icc",
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: intraClassCorrelationCoefficients.t('help.title'),
            r_help: intraClassCorrelationCoefficients.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: intraClassCorrelationCoefficients.t('help.body')
        }
;
    }
}


module.exports = {
    render: () => new intraClassCorrelationCoefficients().render()
}

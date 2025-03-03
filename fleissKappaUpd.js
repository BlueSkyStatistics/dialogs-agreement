/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

var localization = {
    en: {
        title: "Fleiss' Kappa",
        navigation: "Fleiss' Kappa",
        ratervars: "Rater Variables:",
        cilevel: "Confidence Level:",
        options: "Advanced",
        categLabels: "Optionally specify all possible ratings separated by , e.g. 1,2,3,4,5 or \"low\",\"medium\",\"high\" ",
        freqlistchkbox: "Cross-tabulate weightings of the rater variables",
        weights: "Select a predefined weight",
        N: "Optional parameter representing population size (if any)",
        help: {
            title: "Fleiss' Kappa",
            r_help: "help(fleiss.kappa.raw, package=irrCAC)",
            body: `
<b>Description</b></br>
Fleiss' generalized kappa among multiple raters (2, 3, +) when the input data represent the raw ratings reported for each subject and each rater.</br>
If any rater has a missing value for an observation, that observation is removed from the analysis.</br>
We also provide the option to cross-tabulate the weightings of the rater variables.</br>
<b>Usage</b>
<br/>
<code> 
fleiss.kappa.raw(ratings = dataset1[ , c('var1','var2','var3')], weights = "unweighted", categ.labels = NULL,</br>
  conflev = 0.95, N = Inf)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
ratings:  Variables corresponding to each rater where each column represents one rater and each row one subject. They can be numeric, factor, or ordinal variables.</br>
</li>
<li>
weights: A mandatory parameter that is either a string variable or a matrix. The string describes one of the predefined weights and must take one of the values ("unweighted","quadratic", "ordinal", "linear", "radical", "ratio", "circular", "bipolar"). </br>
If this parameter is a matrix then it must be a square matrix qxq where q is the number of posssible categories where a subject can be classified. If some of the q possible categories are not used, then it is strongly advised to specify the complete list of possible categories as a vector in parametr categ.labels. Otherwise, the program may not work.</br>
NOTE: Specifying a matrix is NOT supported in the syntax. You need to paste the code and edit to speecify a matrix.</br>
</li>
<li>
conflev:  The confidence level associated with the confidence interval. Its default value is 0.95.</br>
</li>
<li>
N: An optional parameter representing the population size (if any). It may be use to perform the final population correction to the variance. Its default value is infinity.
</li>
</ul>
<b>Value</b></br>
A data list containing 3 objects: (1) a one-row data frame containing various statistics including the requested agreement coefficient, (2) the weight matrix used in the calculations if any, and (3) the categories used in the analysis. These could be categories reported by the raters, or those that were available to the raters whether they used them or not. </br>The output data frame contains the following variables: "coeff.name" (coefficient name-here it will be "Fleiss' Kappa"), "pa" (the percent agreement), "pe" (the percent chance agreement), coeff.val (the agreement coefficient estimate-Fleiss' Kappa), "coeff.se" (the standard error), "conf.int" (Fleiss Kappa's confidence interval), "p.value"(Fleiss Kappa's p-value), "w.name"(the weights' identification).
<b>Package</b></br>
irrCAC</br>
<b>Help</b></br>
For detailed help click on the R icon on the top right hand side of this dialog overlay or run the following command help(fleiss.kappa.raw, package=irrCAC) by creating a R code chunk by clicking + in the output window
`}
    }
}

class fleissKappaUpd extends baseModal {
    constructor() {
        var config = {
            id: "fleissKappaUpd",
            label: localization.en.title,
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
                    label: localization.en.ratervars,
                    no: "ratervars",
                    filter: "Numeric|String|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
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
            freqlistchkbox: {
                el: new checkbox(config, {
                    label: localization.en.freqlistchkbox,
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
                    label: localization.en.weights,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["unweighted", "quadratic", "ordinal", "linear", "radical", "ratio", "circular", "bipolar"],
                    default: "unweighted"
                })
            },
            N: {
                el: new input(config, {
                    no: 'N',
                    label: localization.en.N,
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
                    label: localization.en.categLabels,
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
                name: localization.en.options,
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
                name: localization.en.navigation,
                icon: "icon-kappa_fleiss",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new fleissKappaUpd().render()
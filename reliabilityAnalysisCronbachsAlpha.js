/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Reliability Analysis (Cronbach's Alpha)",
        navigation: "Cronbachs Alpha",
        tvarbox1: "All Items",
        tvarbox2: "Enter items above that are reverse scored",
        help: {
            title: "Cronbach's Alpha",
            r_help: "help(alpha, package=psych)",
            body: `
            <b>Reliability statistics table gives you​</b></br>
•	Cronbach’s alpha: Cronbach’s α (values ≥ .7 or .8 indicate good reliability; Kline (1999))​<br/>
•	std.alpha: The standarized alpha based upon the correlations​<br/>
•	Guttman’s lambda 6 (calculated from the squared multiple correlation or ‘smc’)​​<br/>
•	average_r: average inter-item correlation (this is used to calculate std.alpha)​​<br/>
•	mean: scale mean (the mean of the means of all individuals)​​<br/>
•	sd: scale standard deviation​​<br/></br>
<b>Interpreting reliability if an item is dropped​</b></br>
•	Refers to the overall Cronbach’s alpha when that particular item (in the row) has been dropped/deleted</br>
•	When the raw Cronbach’s alpha values of any row is greater than the overall α in the reliability statistics table above, this means that dropping that particular item in the row will increase the overall Cronbach’s alpha of the scale.​</br>
•	The other columns of this table refer to how the other statistics will change if that particular item has been dropped/deleted.​</br>
<b>How to interpret ‘Item statistics’?​</b></br>
•	raw.r: The correlation of each item with the total score, not corrected for item overlap.​</br>
•	r.drop: item-total correlation without that item itself (i.e., item-rest correlation or corrected item-total correlation); low item-total correlations indicate that the item doesn’t correlate well with the scale overall​</br>
•	r.cor: item-total correlation corrected for item overlap and scale reliability​</br>
•	mean and sd: mean and sd of the scale if that item is dropped​</br>
•	All items should correlate with the total score, so we’re looking for items that don’t correlate with the overall score from the scale. If r.drop values are less than about .3, it means that particular item doesn’t correlate very well with the scale overall.​</br>​</br>
<b>How to interpret the final frequency table?​​</b></br>
•	This table tells us what percentage of people gave each response to each of the items (i.e., if you have a 5-point scale, then it tells you how many percent of responses were 1, 2, 3, 4, or 5).​</br>
•	This helps you check the distribution of responses and whether everyone is giving the same responses (which will lead to low reliability).​</br>
If your scale contains items that are reversed scored, you need to specify them. The keys argument allows you to.</br> </br> 

<b>Description</b></br>
Find two estimates of reliability: Cronbach's alpha and Guttman's Lambda 6.​
<br/>
<b>Usage</b>
<br/>
<code> 
alpha(x, keys=NULL,cumulative=FALSE, title=NULL, max=10,na.rm = TRUE,​
   check.keys=FALSE,n.iter=1,delete=TRUE,use="pairwise",warnings=TRUE,n.obs=NULL)​
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
x​: A data.frame or matrix of data, or a covariance or correlation matrix​
</li>
<li>
keys​: If some items are to be reversed keyed, then either specify the direction of all items or just a vector of which items to reverse​
</li>
<li>
title​: Any text string to identify this run​
</li>
<li>
cumulative​: should means reflect the sum of items or the mean of the items. The default value is means.​
</li>
<li>
max​: the number of categories/item to consider if reporting category frequencies. Defaults to 10, passed to link{response.frequencies}​
</li>
<li>
na.rm​: The default is to remove missing values and find pairwise correlations​
</li>
<li>
check.keys​: if TRUE, then find the first principal component and reverse key items with negative loadings. Give a warning if this happens.​
</li>
<li>
n.iter​: Number of iterations if bootstrapped confidence intervals are desired​
</li>
<li>
delete​: Delete items with no variance and issue a warning​
</li>
<li>
use​: Options to pass to the cor function: "everything", "all.obs", "complete.obs", "na.or.complete", or "pairwise.complete.obs". The default is "pairwise"​
</li>
<li>
warnings​: By default print a warning and a message that items were reversed. Suppress the message if warnings = FALSE​
</li>
<li>
n.obs​: If using correlation matrices as input, by specify the number of observations, we can find confidence intervals​
</li>
</ul>
<b>Details</b></br>
Alpha is one of several estimates of the internal consistency reliability of a test.​​</br>
<b>Value</b><br/>
total​: a list containing​​</br>
raw_alpha​: alpha based upon the covariances​​</br>
std.alpha​: The standarized alpha based upon the correlations​​</br>
G6(smc)​: Guttman's Lambda 6 reliability​</br>
average_r​: The average inter-item correlation​​</br>
mean​: For data matrices, the mean of the scale formed by summing the items​​</br>
sd​: For data matrices, the standard deviation of the total score​​</br>
alpha.drop​: A data frame with all of the above for the case of each item being removed one by one.​​</br>
item.stats​: A data frame including​​</br>
n​: number of complete cases for the item​​</br>
raw.r​: The correlation of each item with the total score, not corrected for item overlap.​​</br>
std.r​: The correlation of each item with the total score (not corrected for item overlap) if the items were all standardized​​</br>
r.cor​: Item whole correlation corrected for item overlap and scale reliability​​</br>
r.drop​: Item whole correlation for this item against the scale without this item​​</br>
mean​: for data matrices, the mean of each item​​</br>
sd​: For data matrices, the standard deviation of each item​​</br>
response.freq​: For data matrices, the frequency of each item response (if less than 20)​​</br>
boot​: a 6 column by n.iter matrix of boot strapped resampled values​​</br>
Unidim​: An index of unidimensionality​​</br>
Fit​: The fit of the off diagonal matrix​​</br>
<b>Package</b></br>
psych</br>
<b>Help</b></br>
For detailed help click on the R icon on the top right hand side of this dialog overlay or run the following command help(alpha, package=psych) by creating a R code chunk by clicking + in the output window

			`}
    }
}

class reliabilityAnalysisCronbachsAlpha extends baseModal {
    constructor() {
        var config = {
            id: "reliabilityAnalysisCronbachsAlpha",
            label: localization.en.title,
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
                    label: localization.en.tvarbox1,
                    no: "tvarbox1",
                    filter: "String|Numeric|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            tvarbox2: {
                el: new dstVariableList(config, {
                    label: localization.en.tvarbox2,
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
                name: localization.en.navigation,
                icon: "icon-cronbachs_alpha",
                // icon: icon-alpha,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new reliabilityAnalysisCronbachsAlpha().render()
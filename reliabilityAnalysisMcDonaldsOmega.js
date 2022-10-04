
var localization = {
    en: {
        title: "Reliability Analysis (McDonald's Omega)",
        navigation: "McDonald's Omega",
        tvarbox1: "All Items",
        help: {
            title: "McDonald's Omega",
            r_help: "help(omega, package=psych)",
            body: `
            <b>Description</b></br>
Calculate McDonald's omega estimates of general and total factor saturation
<br/>
<b>Usage</b>
<br/>
<code> 
omega(m,nfactors=3,fm="minres",n.iter=1,p=.05,poly=FALSE,key=NULL,
    flip=TRUE,digits=2, title="Omega",sl=TRUE,labels=NULL,
plot=TRUE,n.obs=NA,rotate="oblimin",Phi=NULL,option="equal",covar=FALSE, ...)
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
m​: A correlation matrix, or a data.frame/matrix of data, or (if Phi) is specified, an oblique factor pattern matrix
</li>
<li>
nfactors: The number of grouped factors
</li>
<li>
fm​: factor method (the default is minres) fm="pa" for principal axes, fm="minres" for a minimum residual (OLS) solution, fm="pc" for principal components (see note), or fm="ml" for maximum likelihood.
</li>
<li>
n.iter: How many replications to do in omega for bootstrapped estimates​
</li>
<li>
p: probability of two tailed conference boundaries
</li>
<li>
digits​: if specified, round the output to digits​
</li>
<li>
poly: should the correlation matrix be found using polychoric/tetrachoric or normal Pearson correlations
</li>
<li>
key​: a vector of +/- 1s to specify the direction of scoring of items. The default is to assume all items are positively keyed, but if some items are reversed scored, then key should be specified.​
</li>
</ul>
<b>Value</b><br/>
omega hierarchical: The ω_h coefficient<br/>
omega.lim: The limit of ω_h as the test becomes infinitly large<br/>
omega total: The omega_t coefficient<br/>
alpha: Cronbach's α<br/>
schmid: The Schmid Leiman transformed factor matrix and associated matrices<br/>
schmid$sl: The g factor loadings as well as the residualized factors<br/>
schmid$orthog: Varimax rotated solution of the original factors<br/>
schmid$oblique: The oblimin or promax transformed factors<br/>
schmid$phi: the correlation matrix of the oblique factors<br/>
schmid$gloading: The loadings on the higher order, g, factor of the oblimin factors<br/>
key: A vector of -1 or 1 showing which direction the items were scored.<br/>
model: a list of two elements, one suitable to give to the sem function for structure equation models, the other, to give to the lavaan package.<br/>
sem: The output from a sem analysis<br/>
omega.group: The summary statistics for the omega total, omega hierarchical (general) and omega within each group.<br/>
scores: Factor score estimates are found for the Schmid-Leiman solution. To get scores for the hierarchical model see the note in detailed R help.<br/>
various fit statisticsvarious fit statistics, see output<br/>
<b>Package</b></br>
psych​</br>
<b>Help</b></br>
For detailed help click on the R icon on the top right hand side of this dialog overlay or run the following command help(omega, package=psych) by creating a R code chunk by clicking + in the output window
			`}
    }
}

class reliabilityAnalysisMcDonaldsOmega extends baseModal {
    constructor() {
        var config = {
            id: "reliabilityAnalysisMcDonaldsOmega",
            label: localization.en.title,
            modalType: "two",
            RCode: `
            require(psych)
            psych::omega(  {{dataset.name}}[,c({{selected.tvarbox1 | safe}})])
                `
        }
        var objects = {
            content_var: { el: new srcVariableList(config) },
            tvarbox1: {
                el: new dstVariableList(config, {
                    label: localization.en.tvarbox1,
                    no: "tvarbox1",
                    filter: "String|Numeric|Date|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                    required: true
                }), r: ['{{ var | safe}}']
            },
        }
        const content = {
            left: [objects.content_var.el.content],
            right: [objects.tvarbox1.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-omega_mcdonald",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new reliabilityAnalysisMcDonaldsOmega().render()
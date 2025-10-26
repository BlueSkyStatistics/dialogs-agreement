/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Bland-Altman Plot",
        navigation: "Bland-Altman Plot",
        Group1: "Observer 1 Value:",
        Group2: "Observer 2 Value:",
        StandardDevWidth: "Standard Deviation Width",
        label1: "Differences calculated as Observer 1 - Observer 2",
        label2: "To change the default settings on the plot including titles, line types, and line colors, modify the Plot Options",
        maintitle: "Main title",
        ylab: "Y axis label (Difference)",
        xlab: "X axis label (Mean)",
        label3: "Diff = 0 Reference Line",
        Ref0Color: "Color (After color selection, click outside the control to apply)",
        Ref0LineType: "Line Type",
        label4: "Mean Difference Line",
        MeanDiffColor: "Color (After color selection, click outside the control to apply)",
        MeanDiffLineType: "Line Type",
        label5: "SD Reference Lines",
        SDRefLineColor: "Color (After color selection, click outside the control to apply)",
        SDRefLineType: "Line Type",
        label6: "Options for Confidence Intervals for Mean and SD Lines",
        ExtraCI: "Plot CIs for Primary Lines",
        CIValue: "CI Level (%)",
        label7: "Mean Diff CI",
        MeanDiffCIColor: "Color (After color selection, click outside the control to apply)",
        MeanDiffCILineType: "Line Type",
        label8: "SD CI",
        SDCIColor: "Color (After color selection, click outside the control to apply)",
        SDCILineType: "Line Type",
        PlotTheme: "Plot Theme",
		OptvarPlotsOpt: "Plot Options",
        help: {
            title: "Bland-Altman Plot",
            r_help: "help(bland.altman.stats, package='BlandAltmanLeh')",
            body: `
<b>Description</b></br>
This plot is used to assess the agreement between two continuous measurements. This is commonly used to compare values between two observers or a new assay to a gold standard assay.​</br>
This plot may also be known as a Tukey mean-difference plot.​</br>
Observer 1 Value: Specify the variable containing the numeric value as scored by observer 1.​</br>
Observer 2 Value: Specify the variable containing the numeric value as scored by observer 2.​</br>
Standard Deviation Width: Specify how many standard deviations from the mean difference reference you would like reference lines drawn.</br>
Additional plotting options can be modified using the Plot Options menu. </br>
A table of the values for each of the lines are included with the figure in the output.</br>
We use bland.altman.stats function within the BlandAltmanLeh package to calculate differences and mean values for the chosen varianles and ggplot function withing the ggplot2 package to create this plot</br>
<b>Package</b></br>
BlandAltmanLeh;ggplot2;ggthemes</br>
<b>Help</b></br>
For detailed help click on the R icon on the top right hand side of this dialog overlay or run the following command help(bland.altman.stats, package="BlandAltmanLeh") by creating a R code chunk by clicking + in the output window
                `}
    }
}

class BlandAltman extends baseModal {
    constructor() {
        var config = {
            id: "BlandAltman",
            label: localization.en.title,
            modalType: "two",
            RCode: `
require(BlandAltmanLeh)
require(ggplot2)
require(ggthemes)
#### Calculate differences and mean values for the chosen variables
ba.stats <- bland.altman.stats( {{dataset.name}}\${{selected.Group1 | safe}} , {{dataset.name}}\${{selected.Group2 | safe}} )
#### Print mean difference line and the 95% CI for this line
BSkyFormat(ba.stats$lines,singleTableOutputHeader="Mean Difference Lines for {{selected.Group1 | safe}} and {{selected.Group2 | safe}} ")
#### Print the 95% CI for each of these lines
BSkyFormat(ba.stats$CI.lines,singleTableOutputHeader="95% CIs for Mean Difference Lines for {{selected.Group1 | safe}} and {{selected.Group2 | safe}} ")
#### Coherce the statistics into data frames to pass to ggplot
my.points <- data.frame(difference = ba.stats$diffs, means = ba.stats$means)
my.lines <- as.data.frame(t(ba.stats$lines))
my.ci.lines <- as.data.frame(t(ba.stats$CI.lines))
#### Generate the plot
## Standard plot
ba.plot <- ggplot(my.points, aes(x = means, y = difference)) + geom_point(size = 4) + geom_hline(yintercept = 0, linetype = "{{selected.Ref0LineType | safe}}", color = "{{selected.Ref0Color | safe}}", size = 1.1) + geom_hline(aes(yintercept = mean.diffs), data = my.lines, linetype = "{{selected.MeanDiffLineType | safe}}", color = "{{selected.MeanDiffColor | safe}}", size = 1.1) + geom_hline(aes(yintercept = lower.limit), data = my.lines, linetype = "{{selected.SDRefLineType | safe}}", color = "{{selected.SDRefLineColor | safe}}", size = 1.1) + geom_hline(aes(yintercept = upper.limit), data = my.lines, linetype = "{{selected.SDRefLineType | safe}}", color = "{{selected.SDRefLineColor | safe}}", size = 1.1) +  labs(title = "{{selected.maintitle | safe}}", x = "{{selected.xlab | safe}}", y = "{{selected.ylab | safe}}") + {{selected.PlotTheme | safe}}
## Now add CI lines if requested
if( {{selected.ExtraCI | safe}} == TRUE ) {
    ba.plot <- ba.plot + geom_hline(aes(yintercept = lower.limit.ci.lower), data = my.ci.lines, linetype = "{{selected.SDCILineType | safe}}", color = "{{selected.SDCIColor | safe}}", size = 1.1) + geom_hline(aes(yintercept = lower.limit.ci.upper), data = my.ci.lines, linetype = "{{selected.SDCILineType | safe}}", color = "{{selected.SDCIColor | safe}}", size = 1.1) + geom_hline(aes(yintercept = upper.limit.ci.lower), data = my.ci.lines, linetype = "{{selected.SDCILineType | safe}}", color = "{{selected.SDCIColor | safe}}", size = 1.1) + geom_hline(aes(yintercept = upper.limit.ci.upper), data = my.ci.lines, linetype = "{{selected.SDCILineType | safe}}", color = "{{selected.SDCIColor | safe}}", size = 1.1) + geom_hline(aes(yintercept = mean.diff.ci.lower), data = my.ci.lines, linetype = "{{selected.MeanDiffCILineType | safe}}", color = "{{selected.MeanDiffCIColor | safe}}", size = 1.1) + geom_hline(aes(yintercept = mean.diff.ci.upper), data = my.ci.lines, linetype = "{{selected.MeanDiffCILineType | safe}}", color = "{{selected.MeanDiffCIColor | safe}}", size = 1.1)
}
## Display the plot
print(ba.plot)
`
        }
        var objects = {
            label1: { el: new labelVar(config, { label: localization.en.label1, h: 6 }) },
            content_var: { el: new srcVariableList(config, {action: "move"}) },
            Group1: {
                el: new dstVariable(config, {
                    label: localization.en.Group1,
                    no: "Group1",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            Group2: {
                el: new dstVariable(config, {
                    label: localization.en.Group2,
                    no: "Group2",
                    filter: "Numeric|Scale",
                    extraction: "NoPrefix|UseComma",
                    required: true,
                }), r: ['{{ var | safe}}']
            },
            StandardDevWidth: {
                el: new advancedSlider(config, {
                    no: "StandardDevWidth",
                    label: localization.en.StandardDevWidth,
                    min: 0,
                    max: 3,
                    step: 0.01,
                    value: 1.96,
                    extraction: "NoPrefix|UseComma"
                })
            },
            label2: { el: new labelVar(config, { label: localization.en.label2, h: 6 }) },
            maintitle: {
                el: new input(config, {
                    no: 'maintitle',
                    label: localization.en.maintitle,
                    placeholder: "",
                    allow_spaces:true,
                    extraction: "TextAsIs",
                    value: "Bland-Altman Plot",
                    type: "character"
                })
            },
            ylab: {
                el: new input(config, {
                    no: 'ylab',
                    label: localization.en.ylab,
                    allow_spaces:true,
                    value: "Difference",
                    extraction: "TextAsIs",
                    type: "character"
                })
            },
            xlab: {
                el: new input(config, {
                    no: 'xlab',
                    label: localization.en.xlab,
                    allow_spaces:true,
                    value: "Mean",
                    extraction: "TextAsIs",
                    type: "character"
                })
            },
            label3: { el: new labelVar(config, { label: localization.en.label3, h: 6 }) },
            Ref0Color: {
                el: new colorInput(config, {
                    no: 'Ref0Color',
                    label: localization.en.Ref0Color,
                    placeholder: "#000000",
                    allow_spaces:true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#000000"
                })
            },
            Ref0LineType: {
                el: new comboBox(config, {
                    no: 'Ref0LineType',
                    label: localization.en.Ref0LineType,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["solid", "dashed", "dotted", "dotdash", "longdash", "twodash"],
                    default: "solid"
                })
            },
            label4: { el: new labelVar(config, { label: localization.en.label4, h: 6 }) },
            MeanDiffColor: {
                el: new colorInput(config, {
                    no: 'MeanDiffColor',
                    label: localization.en.MeanDiffColor,
                    placeholder: "#000000",
                    allow_spaces:true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#000000"
                })
            },
            MeanDiffLineType: {
                el: new comboBox(config, {
                    no: 'MeanDiffLineType',
                    label: localization.en.MeanDiffLineType,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["solid", "dashed", "dotted", "dotdash", "longdash", "twodash"],
                    default: "dashed"
                })
            },
            label5: { el: new labelVar(config, { label: localization.en.label5, h: 6 }) },
            SDRefLineColor: {
                el: new colorInput(config, {
                    no: 'SDRefLineColor',
                    label: localization.en.SDRefLineColor,
                    placeholder: "#000000",
                    allow_spaces:true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#000000"
                })
            },
            SDRefLineType: {
                el: new comboBox(config, {
                    no: 'SDRefLineType',
                    label: localization.en.SDRefLineType,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["solid", "dashed", "dotted", "dotdash", "longdash", "twodash"],
                    default: "longdash"
                })
            },
            label6: { el: new labelVar(config, { label: localization.en.label6, h: 6 }) },
            ExtraCI: {
                el: new checkbox(config, {
                    label: localization.en.ExtraCI,
                    no: "ExtraCI",
                    bs_type: "valuebox",
                    extraction: "BooleanValue",
                    true_value: "TRUE",
                    false_value: "FALSE",
                })
            },
            CIValue: {
                el: new advancedSlider(config, {
                    no: "CIValue",
                    label: localization.en.CIValue,
                    min: 0,
                    max: 100,
                    step: 5,
                    value: 95,
                    extraction: "NoPrefix|UseComma"
                })
            },
            label7: { el: new labelVar(config, { label: localization.en.label7, h: 6 }) },
            MeanDiffCIColor: {
                el: new colorInput(config, {
                    no: 'MeanDiffCIColor',
                    label: localization.en.MeanDiffCIColor,
                    placeholder: "#FF0000",
                    allow_spaces:true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#FF0000"
                })
            },
            MeanDiffCILineType: {
                el: new comboBox(config, {
                    no: 'MeanDiffCILineType',
                    label: localization.en.MeanDiffCILineType,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["solid", "dashed", "dotted", "dotdash", "longdash", "twodash"],
                    default: "dotted"
                })
            },
            label8: { el: new labelVar(config, { label: localization.en.label8, h: 6 }) },
            SDCIColor: {
                el: new colorInput(config, {
                    no: 'SDCIColor',
                    label: localization.en.SDCIColor,
                    placeholder: "#0000FF",
                    allow_spaces:true,
                    type: "character",
                    extraction: "TextAsIs",
                    value: "#0000FF"
                })
            },
            SDCILineType: {
                el: new comboBox(config, {
                    no: 'SDCILineType',
                    label: localization.en.SDCILineType,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["solid", "dashed", "dotted", "dotdash", "longdash", "twodash"],
                    default: "dotted"
                })
            },
            PlotTheme: {
                el: new comboBox(config, {
                    no: 'PlotTheme',
                    label: localization.en.PlotTheme,
                    multiple: false,
                    extraction: "NoPrefix|UseComma",
                    options: ["theme_base()",  "theme_calc()", "theme_clean()", "theme_economist()", "theme_economist_white()", "theme_excel()", "theme_excel_new()", "theme_few()", "theme_fivethirtyeight()", "theme_foundation()", "theme_gdocs()", "theme_grey()", "theme_hc()", "theme_igray()", "theme_map()", "theme_pander()", "theme_par()", "theme_solarized()", "theme_solarized2()", "theme_solid()", "theme_stata()", "theme_tufte()", "theme_wsj()"],
                    default: "theme_cleantable()"
                })
            },
        }
        var plotOptions = {
            el: new optionsVar(config, {
                no: "plotOptions",
                name: localization.en.OptvarPlotsOpt,
                content: [
                    objects.maintitle.el,
                    objects.ylab.el,
                    objects.xlab.el,
                    objects.label3.el,
                    objects.Ref0Color.el,
                    objects.Ref0LineType.el,
                    objects.label4.el,
                    objects.MeanDiffColor.el,
                    objects.MeanDiffLineType.el,
                    objects.label5.el,
                    objects.SDRefLineColor.el,
                    objects.SDRefLineType.el,
                    objects.label6.el,
                    objects.ExtraCI.el,
                    objects.CIValue.el,
                    objects.label7.el,
                    objects.MeanDiffCIColor.el,
                    objects.MeanDiffCILineType.el,
                    objects.label8.el,
                    objects.SDCIColor.el,
                    objects.SDCILineType.el,
                    objects.PlotTheme.el,
                ]
            })
        };
        const content = {
            head: [objects.label1.el.content],
            left: [objects.content_var.el.content],
            right: [objects.Group1.el.content, objects.Group2.el.content, objects.StandardDevWidth.el.content,],
            bottom: [objects.label2.el.content, plotOptions.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-bland_altman",
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new BlandAltman().render()
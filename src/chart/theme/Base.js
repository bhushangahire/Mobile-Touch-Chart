/**
 * @class Ext.chart.theme.Base
 * Provides default colors for non-specified things. Should be sub-classed when creating new themes.
 * @ignore
 */
Ext.chart.theme = function(config, base) {
        config = config || {};
        var i = 0, l, colors, color,
            seriesThemes, markerThemes,
            seriesTheme, markerTheme, 
            key, gradients = [],
            midColor, midL;
        
        if (config.baseColor) {
            midColor = Ext.draw.Color.fromString(config.baseColor);
            midL = midColor.getHSL()[2];
            if (midL < 0.15) {
                midColor = midColor.getLighter(0.3);
            } else if (midL < 0.3) {
                midColor = midColor.getLighter(0.15);
            } else if (midL > 0.85) {
                midColor = midColor.getDarker(0.3);
            } else if (midL > 0.7) {
                midColor = midColor.getDarker(0.15);
            }
            config.colors = [ midColor.getDarker(0.3).toString(),
                              midColor.getDarker(0.15).toString(),
                              midColor.toString(),
                              midColor.getLighter(0.15).toString(),
                              midColor.getLighter(0.3).toString()];

            delete config.baseColor;
        }
        if (config.colors) {
            colors = config.colors.slice();
            markerThemes = base.markerThemes;
            seriesThemes = base.seriesThemes;
            l = colors.length;
            base.colors = colors;
            for (; i < l; i++) {
                color = colors[i];
                markerTheme = markerThemes[i] || {};
                seriesTheme = seriesThemes[i] || {};
                markerTheme.fill = seriesTheme.fill = markerTheme.stroke = seriesTheme.stroke = color;
                markerThemes[i] = markerTheme;
                seriesThemes[i] = seriesTheme;
            }
            base.markerThemes = markerThemes.slice(0, l);
            base.seriesThemes = seriesThemes.slice(0, l);
        //the user is configuring something in particular (either markers, series or pie slices)
        }
        for (key in base) {
            if (key in config) {
                if (Ext.isObject(config[key]) && Ext.isObject(base[key])) {
                    Ext.apply(base[key], config[key]);
                } else {
                    base[key] = config[key];
                }
            }
        }
        if (config.useGradients) {
            colors = base.colors || (function () {
                var ans = [];
                for (i = 0, seriesThemes = base.seriesThemes, l = seriesThemes.length; i < l; i++) {
                    ans.push(seriesThemes[i].fill || seriesThemes[i].stroke);
                }
                return ans;
            })();
            for (i = 0, l = colors.length; i < l; i++) {
                midColor = Ext.draw.Color.fromString(colors[i]);
                if (midColor) {
                    color = midColor.getDarker(0.1).toString();
                    midColor = midColor.toString();
                    key = 'theme-' + midColor.substr(1) + '-' + color.substr(1);
                    gradients.push({
                        id: key,
                        angle: 45,
                        stops: {
                            0: {
                                color: midColor.toString()
                            },
                            100: {
                                color: color.toString()
                            }
                        }
                    });
                    colors[i] = 'url(#' + key + ')'; 
                }
            }
            base.gradients = gradients;
            base.colors = colors;
        }
        /*
        base.axis = Ext.apply(base.axis || {}, config.axis || {});
        base.axisLabel = Ext.apply(base.axisLabel || {}, config.axisLabel || {});
        base.axisTitle = Ext.apply(base.axisTitle || {}, config.axisTitle || {});
        */
        Ext.apply(this, base);
    };

Ext.chart.theme.Theme = Ext.extend(Object, {
    /* Begin Definitions */

    //requires: ['Ext.draw.Color'],

    /* End Definitions */

    theme: 'Base',
    themeAttrs: false,
    
    initTheme: function(theme) {
        var me = this,
            themes = Ext.chart.theme,
            key, gradients;
        if (theme) {
            theme = theme.split(':');
            for (key in themes) {
                if (key == theme[0]) {
                    gradients = theme[1] == 'gradients';
                    me.themeAttrs = new themes[key]({
                        useGradients: gradients
                    });
                    if (gradients) {
                        me.gradients = me.themeAttrs.gradients;
                    }
                    if (me.themeAttrs.background) {
                        me.background = me.themeAttrs.background;
                    }
                    return;
                }
            }
            throw "No theme found named " + theme;
        }
    }
});

Ext.chart.theme.Base = Ext.extend(Object, {

    //requires: ['Ext.chart.theme.Theme'],

    constructor: function(config) {
        Ext.chart.theme.call(this, config, {
            background: false,
            axis: {
                stroke: '#444',
                'stroke-width': 1
            },
            axisLabelTop: {
                fill: '#444',
                font: '12px Arial, Helvetica, sans-serif',
                spacing: 2,
                padding: 5,
                renderer: function(v) { return v; }
            },
            axisLabelRight: {
                fill: '#444',
                font: '12px Arial, Helvetica, sans-serif',
                spacing: 2,
                padding: 5,
                renderer: function(v) { return v; }
            },
            axisLabelBottom: {
                fill: '#444',
                font: '12px Arial, Helvetica, sans-serif',
                spacing: 2,
                padding: 5,
                renderer: function(v) { return v; }
            },
            axisLabelLeft: {
                fill: '#444',
                font: '12px Arial, Helvetica, sans-serif',
                spacing: 2,
                padding: 5,
                renderer: function(v) { return v; }
            },
            axisTitleTop: {
                font: 'bold 18px Arial',
                fill: '#444'
            },
            axisTitleRight: {
                font: 'bold 18px Arial',
                fill: '#444',
                rotate: {
                    x:0, y:0,
                    degrees: 270
                }
            },
            axisTitleBottom: {
                font: 'bold 18px Arial',
                fill: '#444'
            },
            axisTitleLeft: {
                font: 'bold 18px Arial',
                fill: '#444',
                rotate: {
                    x:0, y:0,
                    degrees: 270
                }
            },
            series: {
                'stroke-width': 0
            },
            seriesLabel: {
                font: '12px Arial',
                fill: '#333'
            },
            marker: {
                stroke: '#555',
                fill: '#000',
                radius: 3,
                size: 3
            },
            colors: [ "#94ae0a", "#115fa6","#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"],
            seriesThemes: [{
                fill: "#115fa6"
            }, {
                fill: "#94ae0a"
            }, {
                fill: "#a61120"
            }, {
                fill: "#ff8809"
            }, {
                fill: "#ffd13e"
            }, {
                fill: "#a61187"
            }, {
                fill: "#24ad9a"
            }, {
                fill: "#7c7474"
            }, {
                fill: "#a66111"
            }],
            markerThemes: [{
                fill: "#115fa6",
                type: 'circle' 
            }, {
                fill: "#94ae0a",
                type: 'cross'
            }, {
                fill: "#a61120",
                type: 'plus'
            }]
        });
    }
});

Ext.onReady(function() {
    var palette = ['#b1da5a', '#4ce0e7', '#e84b67', '#da5abd', '#4d7fe6', '#fec935'],
        names = ['Green', 'Sky', 'Red', 'Purple', 'Blue', 'Yellow'],
        i = 0, j = 0, l = palette.length, themes = Ext.chart.theme,
        categories = [['#f0a50a', '#c20024', '#2044ba', '#810065', '#7eae29'],
                      ['#6d9824', '#87146e', '#2a9196', '#d39006', '#1e40ac'],
                      ['#fbbc29', '#ce2e4e', '#7e0062', '#158b90', '#57880e'],
                      ['#ef5773', '#fcbd2a', '#4f770d', '#1d3eaa', '#9b001f'],
                      ['#7eae29', '#fdbe2a', '#910019', '#27b4bc', '#d74dbc'],
                      ['#44dce1', '#0b2592', '#996e05', '#7fb325', '#b821a1']],
        cats = categories.length;
    
    //Create themes from base colors
    for (; i < l; i++) {
        themes[names[i]] = (function(color) {
            return Ext.extend(themes.Base, {
                constructor: function(config) {
                    themes.Base.prototype.constructor.call(this, Ext.apply({
                        baseColor: color
                    }, config));
                }
            });
        })(palette[i]);
    }
    
    //Create theme from color array
    for (i = 0; i < cats; i++) {
        themes['Category' + (i + 1)] = (function(category) {
            return Ext.extend(themes.Base, {
                constructor: function(config) {
                    themes.Base.prototype.constructor.call(this, Ext.apply({
                        colors: category
                    }, config));
                }
            });
        })(categories[i]);
    }
});

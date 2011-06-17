/**
 * @class Ext.chart.TipSurface
 * @ignore
 */

Ext.chart.TipSurface = Ext.extend(Ext.draw.Component, {

    spriteArray: false,
    renderFirst: true,

    constructor: function(config) {
        Ext.chart.TipSurface.superclass.constructor.apply(this, arguments);
        if (config.sprites) {
            this.spriteArray = [].concat(config.sprites);
            delete config.sprites;
        }
    },

    onRender: function() {
        var me = this,
            i = 0,
            l = 0,
            sp,
            sprites;
            Ext.chart.TipSurface.superclass.onRender.apply(me, arguments);
        sprites = me.spriteArray;
        if (me.renderFirst && sprites) {
            me.renderFirst = false;
            for (l = sprites.length; i < l; i++) {
                sp = me.surface.add(sprites[i]);
                sp.setAttributes({
                    hidden: false
                },
                true);
            }
        }
    }
});
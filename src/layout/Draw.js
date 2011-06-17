/**
 * @class Ext.layout.component.Draw
 * @extends Ext.layout.Component
 * @private
 *
 */

Ext.layout.Draw = Ext.extend(Ext.layout.AutoComponentLayout , {

    type: 'draw',

    onLayout : function(width, height) {
        this.owner.surface.setSize(width, height);
        Ext.layout.Draw.superclass.onLayout.apply(this, arguments);
    }
});

Ext.regLayout('draw', Ext.layout.Draw);

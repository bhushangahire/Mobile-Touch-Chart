/**
 * @class Ext.draw.Component
 * @extends Ext.Component
 */

Ext.draw.Component = Ext.extend(Ext.Component, {
    
    //requires: ['Ext.draw.Surface', 'Ext.layout.component.Draw' ],
    
    /**
     * @cfg {Array} implOrder
     * Defines the priority order for which Surface implementation to use. The first
     * one supported by the current environment will be used.
     */
    implOrder: ['SVG', 'Canvas', 'VML'],

    baseCls:  'x-surface',

    componentLayout: 'draw',

    /**
     * @cfg {Boolean} viewBox
     * Turn on view box support which will scale and position items in the draw component to fit to the component while
     * maintaining aspect ratio. Defaults to true.
     */
    viewBox: true,

    /**
     * @cfg {Boolean} autoSize
     * Turn on autoSize support which will set the bounding div's size to the natural size of the contents. Defaults to false.
     */
    autoSize: false,

    initComponent: function() {
        //this.callParent(arguments);
        Ext.draw.Component.superclass.initComponent.call(this);
        this.addEvents(
            'mousedown',
            'mouseup',
            'mousemove',
            'mouseenter',
            'mouseleave',
            'click'
        );
    },

    /**
     * Create the Surface on initial render
     */
    //onRender: function() { // old API of EXT JS4
    // With Touch API
    onRender: function(container, position) {
        var me = this,
            viewBox = me.viewBox,
            autoSize = me.autoSize,
            bbox, items, width, height, x, y;
        //me.callParent(arguments);
        Ext.draw.Component.superclass.onRender.apply(this, arguments);
        me.createSurface();

        items = me.surface.items;

        if (viewBox || autoSize) {
            bbox = items.getBBox();
            width = bbox.width;
            height = bbox.height;
            x = bbox.x;
            y = bbox.y;
            if (me.viewBox) {
                me.surface.setViewBox(x, y, width, height);
            }
            else {
                // AutoSized
                me.autoSizeSurface();
            }
        }
    },

    autoSizeSurface: function() {
        var me = this,
            items = me.surface.items,
            bbox = items.getBBox(),
            width = bbox.width,
            height = bbox.height;
        items.setAttributes({
            translate: {
                x: -bbox.x,
                y: -bbox.y
            }
        }, true);
        if (me.rendered) {
            me.setSize(width, height);
        }
        else {
            me.surface.setSize(width, height);
        }
        me.el.setSize(width, height);
    },

    /**
     * Create the Surface instance. Resolves the correct Surface implementation to
     * instantiate based on the 'implOrder' config.
     */
    createSurface: function() {
        var surface = Ext.draw.Surface.newInstance(Ext.apply({}, {
                width: this.width,
                height: this.height,
                renderTo: this.el
            }, this.initialConfig));
        this.surface = surface;

        function refire(eventName) {
            return function(e) {
                this.fireEvent(eventName, e);
            };
        }

        surface.on({
            scope: this,
            mouseup: refire('mouseup'),
            mousedown: refire('mousedown'),
            mousemove: refire('mousemove'),
            mouseenter: refire('mouseenter'),
            mouseleave: refire('mouseleave'),
            click: refire('click')
        });
    },


    /**
     * Clean up the Surface instance on component destruction
     */
    onDestroy: function() {
        var surface = this.surface;
        if (surface) {
            surface.destroy();
        }
        // this.callParent(arguments);
        Ext.draw.Component.superclass.onDestroy.call(this);
    }

});

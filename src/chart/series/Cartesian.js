/**
 * @class Ext.chart.series.Cartesian
 * @extends Ext.chart.series.Series
 *
 * Common base class for series implementations which plot values using x/y coordinates.
 *
 * @constructor
 */

Ext.chart.series.Cartesian = Ext.extend(Ext.chart.series.Series, {

    /**
     * The field used to access the x axis value from the items from the data
     * source.
     *
     * @property xField
     * @type String
     */
    xField: null,

    /**
     * The field used to access the y-axis value from the items from the data
     * source.
     *
     * @property yField
     * @type String
     */
    yField: null,

    /**
     * Indicates which axis the series will bind to
     *
     * @property axis
     * @type String
     */
    axis: 'left'
});

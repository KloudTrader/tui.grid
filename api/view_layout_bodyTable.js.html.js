tui.util.defineNamespace("fedoc.content", {});
fedoc.content["view_layout_bodyTable.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview Class for the table layout in the body(data) area\n * @author NHN Ent. FE Development Team\n */\n'use strict';\n\nvar View = require('../../base/view');\nvar util = require('../../common/util');\nvar dimensionConstMap = require('../../common/constMap').dimension;\n\nvar CELL_BORDER_WIDTH = dimensionConstMap.CELL_BORDER_WIDTH;\n\n/**\n * Class for the table layout in the body(data) area\n * @module view/layout/bodyTable\n * @extends module:base/view\n */\nvar BodyTable = View.extend(/**@lends module:view/layout/bodyTable.prototype */{\n    /**\n     * @constructs\n     * @param {Object} options - Options\n     * @param {String} [options.whichSide='R'] L or R (which side)\n     */\n    initialize: function(options) {\n        View.prototype.initialize.call(this);\n\n        this.setOwnProperties({\n            dimensionModel: options.dimensionModel,\n            renderModel: options.renderModel,\n            columnModel: options.columnModel,\n            viewFactory: options.viewFactory,\n            painterManager: options.painterManager,\n            whichSide: options.whichSide || 'R'\n        });\n\n        this.listenTo(this.dimensionModel, 'columnWidthChanged', this._onColumnWidthChanged);\n\n        // To prevent issue of appearing vertical scrollbar when dummy rows exists\n        this.listenTo(this.renderModel, 'change:dummyRowCount', this._resetOverflow);\n        this.listenTo(this.dimensionModel, 'change:bodyHeight', this._resetHeight);\n\n        this._attachAllTableEventHandlers();\n    },\n\n    tagName: 'div',\n\n    className: 'table_container',\n\n    template: _.template(\n        '&lt;table width=\"100%\" border=\"0\" cellspacing=\"1\" cellpadding=\"0\" bgcolor=\"#EFEFEF\">' +\n        '   &lt;colgroup>&lt;%=colGroup%>&lt;/colgroup>' +\n        '   &lt;tbody>&lt;%=tbody%>&lt;/tbody>' +\n        '&lt;/table>'),\n\n    /**\n     * Event handler for 'columnWidthChanged' event on a dimension model.\n     * @private\n     */\n    _onColumnWidthChanged: function() {\n        var columnWidthList = this.dimensionModel.getColumnWidthList(this.whichSide),\n            $colList = this.$el.find('col'),\n            totalWidth = 0;\n\n        _.each(columnWidthList, function(width, index) {\n            $colList.eq(index).css('width', width - BodyTable.EXTRA_WIDTH);\n            totalWidth += width + CELL_BORDER_WIDTH;\n        }, this);\n\n        // to solve the overflow issue in IE7\n        // (don't automatically expand to child's width when overflow:hidden)\n        if (util.isBrowserIE7()) {\n            this.$el.width(totalWidth);\n        }\n    },\n\n    /**\n     * Resets the overflow of element based on the dummyRowCount in renderModel.\n     * @private\n     */\n    _resetOverflow: function() {\n        var overflow = 'visible';\n\n        if (this.renderModel.get('dummyRowCount') > 0) {\n            overflow = 'hidden';\n        }\n        this.$el.css('overflow', overflow);\n    },\n\n    /**\n     * Resets the height of element based on the dummyRowCount in renderModel\n     * @private\n     */\n    _resetHeight: function() {\n        var dimensionModel = this.dimensionModel;\n\n        if (this.renderModel.get('dummyRowCount') > 0) {\n            this.$el.height(dimensionModel.get('bodyHeight') - dimensionModel.getScrollXHeight());\n        } else {\n            this.$el.css('height', '');\n        }\n    },\n\n    /**\n     * Reset position of a table container\n     * @param {number} top  조정할 top 위치 값\n     */\n    resetTablePosition: function() {\n        this.$el.css('top', this.renderModel.get('top'));\n    },\n\n    /**\n     * Renders elements\n     * @returns {View.Layout.Body} This object\n     */\n    render: function() {\n        this._destroyChildren();\n\n        this.$el.html(this.template({\n            colGroup: this._getColGroupMarkup(),\n            tbody: ''\n        }));\n\n        this._addChildren(this.viewFactory.createRowList({\n            bodyTableView: this,\n            el: this.$el.find('tbody'),\n            whichSide: this.whichSide\n        }));\n        this._renderChildren();\n\n        // To prevent issue of appearing vertical scrollbar when dummy rows exists\n        this._resetHeight();\n        this._resetOverflow();\n        return this;\n    },\n\n    /**\n     * 테이블 내부(TR,TD)에서 발생하는 이벤트를 this.el로 넘겨 해당 요소들에게 위임하도록 설정한다.\n     * @private\n     */\n    _attachAllTableEventHandlers: function() {\n        var cellPainters = this.painterManager.getCellPainters();\n\n        _.each(cellPainters, function(painter) {\n            painter.attachEventHandlers(this.$el, '');\n        }, this);\n    },\n\n    /**\n     * table 요소를 새로 생성한다.\n     * (IE7-9에서 tbody의 innerHTML 변경할 수 없는 문제를 해결하여 성능개선을 하기 위해 사용)\n     * @param {string} tbodyHtml - tbody의 innerHTML 문자열\n     * @returns {jquery} - 새로 생성된 table의 tbody 요소\n     */\n    redrawTable: function(tbodyHtml) {\n        this.$el[0].innerHTML = this.template({\n            colGroup: this._getColGroupMarkup(),\n            tbody: tbodyHtml\n        });\n\n        return this.$el.find('tbody');\n    },\n\n    /**\n     * Table 열 각각의 width 조정을 위한 columnGroup 마크업을 반환한다.\n     * @returns {string} &lt;colgroup> 안에 들어갈 마크업 문자열\n     * @private\n     */\n    _getColGroupMarkup: function() {\n        var whichSide = this.whichSide,\n            columnWidthList = this.dimensionModel.getColumnWidthList(whichSide),\n            columnModelList = this.columnModel.getVisibleColumnModelList(whichSide, true),\n            html = '';\n\n        _.each(columnModelList, function(columnModel, index) {\n            var name = columnModel.columnName,\n                width = columnWidthList[index] - BodyTable.EXTRA_WIDTH;\n\n            html += '&lt;col data-column-name=\"' + name + '\" style=\"width:' + width + 'px\">';\n        });\n        return html;\n    }\n}, {\n    // IE7에서만 TD의 padding 만큼 넓이가 늘어나는 버그를 위한 예외처리를 위한 값\n    EXTRA_WIDTH: util.isBrowserIE7() ? 20 : 0 // eslint-disable-line no-magic-numbers\n});\n\nmodule.exports = BodyTable;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"
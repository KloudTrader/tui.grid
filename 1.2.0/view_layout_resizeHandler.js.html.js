tui.util.defineNamespace("fedoc.content", {});
fedoc.content["view_layout_resizeHandler.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview ResizeHandler for the Header\n * @author NHN Ent. FE Development Team\n */\n'use strict';\n\nvar View = require('../../base/view');\n\n/**\n * Reside Handler class\n * @module view/layout/resizeHandler\n * @extends module:base/view\n */\nvar ResizeHandler = View.extend(/**@lends module:view/layout/resizeHandler.prototype */{\n    /**\n     * @constructs\n     * @param {Object} options - Options\n     */\n    initialize: function(options) {\n        this.setOwnProperties({\n            dimensionModel: options.dimensionModel,\n            columnModel: options.columnModel,\n            whichSide: options.whichSide || 'R',\n\n            isResizing: false,\n            $target: null,\n            differenceLeft: 0,\n            initialWidth: 0,\n            initialOffsetLeft: 0,\n            initialLeft: 0\n        });\n        this.listenTo(this.dimensionModel, 'change:which columnWidthChanged', this._refreshHandlerPosition);\n    },\n\n    tagName: 'div',\n\n    className: 'resize_handle_container',\n\n    events: {\n        'mousedown .resize_handle': '_onMouseDown',\n        'dblclick .resize_handle': '_onDblClick'\n    },\n\n    template: _.template(\n        '&lt;div columnindex=\"&lt;%=columnIndex%>\" ' +\n        'data-column-name=\"&lt;%=columnName%>\" ' +\n        'class=\"resize_handle' +\n        '&lt;% if(isLast === true) ' +\n        ' print(\" resize_handle_last\");%>' +\n        '\" ' +\n        'style=\"&lt;%=height%>\" ' +\n        'title=\"마우스 드래그를 통해 컬럼의 넓이를 변경할 수 있고,더블클릭을 통해 넓이를 초기화할 수 있습니다.\">' +\n        '&lt;/div>'),\n\n    /**\n     * Return an object that contains an array of column width and an array of column model.\n     * @returns {{widthList: (Array|*), modelList: (Array|*)}} Column Data\n     * @private\n     */\n    _getColumnData: function() {\n        var columnModel = this.columnModel,\n            dimensionModel = this.dimensionModel,\n            columnWidthList = dimensionModel.getColumnWidthList(this.whichSide),\n            columnModelList = columnModel.getVisibleColumnModelList(this.whichSide, true);\n\n        return {\n            widthList: columnWidthList,\n            modelList: columnModelList\n        };\n    },\n\n    /**\n     * Returns the HTML string of all handler.\n     * @returns {String}\n     * @private\n     */\n    _getResizeHandlerMarkup: function() {\n        var columnData = this._getColumnData(),\n            columnModelList = columnData.modelList,\n            headerHeight = this.dimensionModel.get('headerHeight'),\n            length = columnModelList.length,\n            resizeHandleMarkupList;\n\n        resizeHandleMarkupList = _.map(columnModelList, function(columnModel, index) {\n            return this.template({\n                columnIndex: index,\n                columnName: columnModel.columnName,\n                isLast: index + 1 === length,\n                height: headerHeight\n            });\n        }, this);\n        return resizeHandleMarkupList.join('');\n    },\n\n    /**\n     * Render\n     * @returns {module:view/layout/resizeHandler} This object\n     */\n    render: function() {\n        var headerHeight = this.dimensionModel.get('headerHeight'),\n            htmlStr = this._getResizeHandlerMarkup();\n\n        this.$el.empty().show().html(htmlStr).css({\n            marginTop: -headerHeight,\n            height: headerHeight\n        });\n        this._refreshHandlerPosition();\n\n        return this;\n    },\n\n    /**\n     * Refresh the position of every handler.\n     * @private\n     */\n    _refreshHandlerPosition: function() {\n        var columnData = this._getColumnData(),\n            columnWidthList = columnData.widthList,\n            $resizeHandleList = this.$el.find('.resize_handle'),\n            $table = this.$el.parent().find('table:first'),\n            isChanged = false,\n            $handler,\n            columnName,\n            curPos = 0,\n            BORDER_WIDTH = 1,\n            HANDLER_WIDTH_HALF = 3,\n            width;\n\n        tui.util.forEachArray($resizeHandleList, function(item, index) {\n            $handler = $resizeHandleList.eq(index);\n            columnName = $handler.attr('data-column-name');\n            width = $table.find('th[data-column-name=' + columnName + ']').width();\n            if (tui.util.isExisty(width)) {\n                isChanged = isChanged || (width !== columnWidthList[index]);\n            } else {\n                width = columnWidthList[index];\n            }\n            curPos += width + BORDER_WIDTH;\n            $handler.css('left', curPos - HANDLER_WIDTH_HALF);\n        });\n    },\n\n    /**\n     * Returns whether resizing is in progress or not.\n     * @returns {boolean}\n     * @private\n     */\n    _isResizing: function() {\n        return !!this.isResizing;\n    },\n\n    /**\n     * Event handler for the 'mousedown' event\n     * @param {MouseEvent} mouseEvent - mouse event\n     * @private\n     */\n    _onMouseDown: function(mouseEvent) {\n        this._startResizing(mouseEvent);\n    },\n\n    /**\n     * Event handler for the 'dblclick' event\n     * @param {MouseEvent} mouseEvent - mouse event\n     * @private\n     */\n    _onDblClick: function(mouseEvent) {\n        var $target = $(mouseEvent.target),\n            index = parseInt($target.attr('columnindex'), 10);\n\n        this.dimensionModel.restoreColumnWidth(this._getHandlerColumnIndex(index));\n        this._refreshHandlerPosition();\n    },\n\n    /**\n     * Event handler for the 'mouseup' event\n     * @private\n     */\n    _onMouseUp: function() {\n        this._stopResizing();\n    },\n\n    /**\n     * Event handler for the 'mousemove' event\n     * @param {MouseEvent} mouseEvent - mouse event\n     * @private\n     */\n    _onMouseMove: function(mouseEvent) {\n        var left, width, index;\n\n        /* istanbul ignore else */\n        if (this._isResizing()) {\n            mouseEvent.preventDefault();\n\n            left = mouseEvent.pageX - this.initialOffsetLeft;\n            width = this._calculateWidth(mouseEvent.pageX);\n            index = parseInt(this.$target.attr('columnindex'), 10);\n\n            this.$target.css('left', left + 'px');\n            this.dimensionModel.setColumnWidth(this._getHandlerColumnIndex(index), width);\n            this._refreshHandlerPosition();\n        }\n    },\n\n    /**\n     * Returns the width of the column based on given mouse position and the initial offset.\n     * @param {number} pageX - mouse x position\n     * @returns {number}\n     * @private\n     */\n    _calculateWidth: function(pageX) {\n        var difference = pageX - this.initialOffsetLeft - this.initialLeft;\n        return this.initialWidth + difference;\n    },\n\n    /**\n     * Find the real index (based on visibility) of the column using index value of the handler and returns it.\n     * @param {number} index - index value of the handler\n     * @returns {number}\n     * @private\n     */\n    _getHandlerColumnIndex: function(index) {\n        return (this.whichSide === 'R') ? (index + this.columnModel.getVisibleColumnFixCount(true)) : index;\n    },\n\n    /**\n     * Start resizing\n     * @param {event} mouseDownEvent - mouse event\n     * @private\n     */\n    _startResizing: function(mouseDownEvent) {\n        var columnData = this._getColumnData(),\n            columnWidthList = columnData.widthList,\n            $target = $(mouseDownEvent.target);\n\n        this.isResizing = true;\n        this.$target = $target;\n        this.initialLeft = parseInt($target.css('left').replace('px', ''), 10);\n        this.initialOffsetLeft = this.$el.offset().left;\n        this.initialWidth = columnWidthList[$target.attr('columnindex')];\n        $('body').css('cursor', 'col-resize');\n        $(document)\n            .bind('mousemove', $.proxy(this._onMouseMove, this))\n            .bind('mouseup', $.proxy(this._onMouseUp, this));\n\n        // for IE8 and under\n        if ($target[0].setCapture) {\n            $target[0].setCapture();\n        }\n    },\n\n    /**\n     * Stop resizing\n     * @private\n     */\n    _stopResizing: function() {\n        // for IE8 and under\n        if (this.$target &amp;&amp; this.$target[0].releaseCapture) {\n            this.$target[0].releaseCapture();\n        }\n\n        this.isResizing = false;\n        this.$target = null;\n        this.initialLeft = 0;\n        this.initialOffsetLeft = 0;\n        this.initialWidth = 0;\n\n        $('body').css('cursor', 'default');\n        $(document)\n            .unbind('mousemove', $.proxy(this._onMouseMove, this))\n            .unbind('mouseup', $.proxy(this._onMouseUp, this));\n    },\n\n    /**\n     * Destroy\n     */\n    destroy: function() {\n        this.stopListening();\n        this._stopResizing();\n        this.remove();\n    }\n});\n\nmodule.exports = ResizeHandler;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"
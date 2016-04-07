tui.util.defineNamespace("fedoc.content", {});
fedoc.content["view_layout_toolbar_controlPanel.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview Class for the control panel in the toolbar\n * @author NHN Ent. FE Development Team\n */\n'use strict';\n\nvar View = require('../../../base/view');\n\n/**\n * Class for the control panel in the toolbar\n * @module view/layout/toolbar/controlPanel\n * @extends module:base/view\n */\nvar ControlPanel = View.extend(/**@lends module:view/layout/toolbar/controlPanel.prototype */{\n    /**\n     * @constructs\n     * @param {Object} options - Options\n     */\n    initialize: function(options) {\n        this.setOwnProperties({\n            gridId: options.gridId,\n            toolbarModel: options.toolbarModel,\n            $btnExcel: null,\n            $btnExcelAll: null\n        });\n\n        this.listenTo(this.toolbarModel,\n            'change:isExcelButtonVisible change:isExcelAllButtonVisible', this.render);\n    },\n\n    events: {\n        'click a.excel_download_button': '_onClickExcel'\n    },\n\n    tagName: 'div',\n\n    className: 'btn_setup',\n\n    templateExcelBtn: _.template(\n        '&lt;a href=\"#\" class=\"excel_download_button btn_text &lt;%=className%>\">' +\n        '&lt;span>&lt;em class=\"excel\">&lt;/em>&lt;%=text%>&lt;/span>' +\n        '&lt;/a>'\n    ),\n\n    /**\n     * Click event handler for excel download buttons\n     * @param  {MouseEvent} mouseEvent - MouseEvent object\n     * @private\n     */\n    _onClickExcel: function(mouseEvent) {\n        var grid = tui.Grid.getInstanceById(this.gridId),\n            net = grid.getAddOn('Net'),\n            $target;\n\n        mouseEvent.preventDefault();\n\n        if (net) {\n            $target = $(mouseEvent.target).closest('a');\n\n            if ($target.hasClass('excel_page')) {\n                net.download('excel');\n            } else if ($target.hasClass('excel_all')) {\n                net.download('excelAll');\n            }\n        }\n    },\n\n    /**\n     * Renders.\n     * @returns {View.Layout.Toolbar.ControlPanel} - this object\n     */\n    render: function() {\n        var toolbarModel = this.toolbarModel;\n\n        this.$el.empty();\n\n        if (toolbarModel.get('isExcelButtonVisible')) {\n            this.$el.append(this.templateExcelBtn({\n                className: 'excel_page',\n                text: '엑셀 다운로드'\n            }));\n        }\n        if (toolbarModel.get('isExcelAllButtonVisible')) {\n            this.$el.append(this.templateExcelBtn({\n                className: 'excel_all',\n                text: '전체 엑셀 다운로드'\n            }));\n        }\n        return this;\n    }\n});\n\nmodule.exports = ControlPanel;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"
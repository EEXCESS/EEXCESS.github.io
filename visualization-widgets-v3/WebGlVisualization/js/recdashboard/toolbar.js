var IQHN = IQHN || {};
/**
 * Toolbar for the visualization.
 * Holds rows, sections and buttons.
 * The goal is to seperate HTML and JQuery stuff from the tool's logic as far as possible
 */
IQHN.ToolbarHandler = function () {

    this.buttons_ = [];
    this.render();
    IQHN.Debugger.debug("ToolbarHandler", "Creating toolbar", 3);
};
/**
 * Creates the HTML of the Toolbar.
 */
IQHN.ToolbarHandler.prototype.render = function () {

    IQHN.Debugger.debug("ToolbarHandler", "Rendering toolbar", 5);
    var toolbar_config = IQHN.config.rec_dashboard.toolbar;
    this.buttons_ = [];
    for (var row_key in this.buttons) {

        var current_row = IQHN.ToolbarHandler.prototype.buttons[row_key];
        var row_html = this.getRowHtml(row_key);
        jQuery(toolbar_config.selector).append(
                row_html
                );
        IQHN.Debugger.debug("ToolbarHandler", "Adding row html for " + row_key, 5);
        for (var section_key in current_row) {

            var current_section = current_row[section_key];
            jQuery('#' + toolbar_config.row_id_prefix + row_key).append(
                    this.getSectionHtml(section_key)
                    );
            IQHN.Debugger.debug("ToolbarHandler", "Adding section html for " + section_key, 5);
            for (var button_key in current_section) {
                var button_data = current_section[button_key];
                var button = new IQHN.Button(button_key, button_data.label, button_data.icon);
                jQuery('#' + toolbar_config.section_id_prefix + section_key).append(
                        button.toHtml()
                        );
                IQHN.Debugger.debug("ToolbarHandler", "Adding button html for " + button_key, 5);
                button.onClick(button_data.fct);
                if (button_data.visible === false)
                    button.hide();
                this.buttons_.push(button);
            }
        }
    }
};
/**
 * Toolbar data
 * Each row holds sections that have the buttons.
 * 
 * Each button is identifed by its key in this object.
 * fct is the function to be called when clicked.
 * Remember that the @see{IQHN.Button} object can be accessed via data.btn in the event obj.
 * 
 */
IQHN.ToolbarHandler.prototype.buttons = {
    row1: {
        section1: {
            rec_focusparentcol: {
                fct: function (e) {
                    var rdbh = IQHN.Scene.getCurrentScene().getRecDashboardHandler();
                    var rec = rdbh.last_clicked_rec;
                    if (rec)
                        rec.defocusAndZoomOut();
                    var button = e.data.btn;
                    button.hide();
                },
                label: "Zoom out to collection",
                icon: "zoom-out.png",
                visible: false
            },
            scene_directcompare_activate: {
                fct: function (e) {
                    var scene = IQHN.Scene.getCurrentScene();
                    scene.getComparer().direct.activate();
                    var button = e.data.btn;
                    button.hide();

                    var rdbh = IQHN.Scene.getCurrentScene().getRecDashboardHandler();
                    rdbh.toolbar.getButton("scene_directcompare_deactivate").show();
                },
                label: "Turn On Direct-Compare",
                icon: "compare.png",
                visible: true
            },
            scene_directcompare_deactivate: {
                fct: function (e) {
                    var scene = IQHN.Scene.getCurrentScene();
                    scene.getComparer().direct.deactivate();
                    var button = e.data.btn;
                    button.hide();

                    var rdbh = IQHN.Scene.getCurrentScene().getRecDashboardHandler();
                    rdbh.toolbar.getButton("scene_directcompare_activate").show();
                },
                label: "Turn Off Direct-Compare",
                icon: "compare.png",
                visible: false
            },
            test_animstop: {
                fct: function (e) {
                    IQHN.Scene.getCurrentScene().getAnimation().finishAllAnimations();
                },
                label: "Stop all anims",
                visible: true
            },
            test_rotate_coll: {
                fct: function (e) {

                    /** @type{IQHN.Collection} **/
                    var coll = _.last(IQHN.Scene.getCurrentScene().getCollections());
                    IQHN.Scene.getCurrentScene().getAnimation().finishAnimation("coll_rot_" + coll.getId());
                    coll.setRotation(coll.getRotation() + 45.0);
                },
                label: "Rotate last coll +45°",
                visible: true
            },
            test_rotate_coll_anim: {
                fct: function (e) {

                    /** @type{IQHN.Collection} **/
                    var coll = _.last(IQHN.Scene.getCurrentScene().getCollections());
                    IQHN.Scene.getCurrentScene().getAnimation().finishAnimation("coll_rot_" + coll.getId());
                    coll.setRotation(coll.getRotation() + 90, true);
                },
                label: "Rotate last coll animation +90°",
                visible: true
            },
            coll_removeallring_reps: {
                fct: function (e) {
                    _.each(IQHN.RingRepresentation.activeRepresentations, function (ring_rep) {

                        if (!ring_rep)
                            return;
                        /** @type {IQHN.Collection} */
                        var coll = ring_rep.getCollection();
                        coll.deleteRingRepresentation();
                        coll.setStatus(IQHN.Collection.STATUSFLAGS.NORMAL);
                    });
                },
                label: "Remove Ring-Representations",
                visible: true
            },
            reset_flipbook: {
                fct: function (e) {

                    var pos_handler = IQHN.Scene.getCurrentScene().getCollectionPositionHandler();
                    pos_handler.setIsOneFocused(false);
                    pos_handler.calculatePositions();

                },
                label: "Reset Focus",
                visible: true
            }
        }


    }

};
/**
 * Returns the button with the given identifier or null.
 * @param {String} id Identifier of the button to find
 * @returns {IQHN.Button | null}
 */
IQHN.ToolbarHandler.prototype.getButton = function (id) {

    for (var i = 0; i < this.buttons_.length; i++) {
        if (this.buttons_[i].getId() === id)
            return this.buttons_[i];
    }
    return null;
};
/**
 * Returns the html string of the given row
 * @param {String} key
 * @returns {String} Html
 */
IQHN.ToolbarHandler.prototype.getRowHtml = function (key) {
    var config = IQHN.config.rec_dashboard.toolbar;
    return '<div class="webgl_toolbar_row" id="' + config.row_id_prefix + key + '"></div>';
};
/**
 * Returns the html string of the given section
 * @param {String} key
 * @returns {String} Html
 */
IQHN.ToolbarHandler.prototype.getSectionHtml = function (key) {
    var config = IQHN.config.rec_dashboard.toolbar;
    return '<div class="webgl_toolbar_section" id="' + config.section_id_prefix + key + '"></div>';
};
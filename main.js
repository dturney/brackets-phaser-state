/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, Mustache*/

define(function (require, exports, module) {
    'use strict';
    
    var phaserTempFile = require("text!lib/phaser-state.js");
    
    var CommandManager = brackets.getModule("command/CommandManager");
    var Menus = brackets.getModule("command/Menus");
    var EditorManager = brackets.getModule("editor/EditorManager");
    var Dialogs = brackets.getModule("widgets/Dialogs");
    //var CodeMirror = brackets.getModule("thirdparty/CodeMirror2/lib/codemirror");
    var DocumentManager = brackets.getModule("document/DocumentManager");
    
    var modal = require('text!lib/modal.html');
    var templateVars = { statename : 'StateName' };
  
    /**
     * Create a Phaser State
     * 
     */
    function handlePhaserState() {
        var $promptInput;
        var dia = Dialogs.showModalDialogUsingTemplate(Mustache.render(modal,templateVars));
    
        //console.log(phaserTempFile);
        
        var editor = EditorManager.getCurrentFullEditor();
        
        if (editor) {
            if (editor._codeMirror.getValue().length > 0) {
                $('#templates_warning').show();
            } else {
                $('#templates_good').show();
            }
        } else {
            $('#templates_error').show();
        }

        var createPhaserState = function () {
            //console.log($promptInput.val());
            
            var replacedText = phaserTempFile.replace(new RegExp('StateName', 'g'), $promptInput.val());
            
            DocumentManager.getCurrentDocument().setText(replacedText);

        };
        
        $('#templates_modalOKBtn').click(createPhaserState);
        
        $promptInput = dia.getElement().find('.text-input');
        $promptInput.focus();
            
    }

    var PHASER_STATE_CMD_ID = "tvo.phaser-state";
    CommandManager.register("Create Phaser State", PHASER_STATE_CMD_ID, handlePhaserState);
    
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    menu.addMenuDivider();
    menu.addMenuItem(PHASER_STATE_CMD_ID, "Ctrl-Alt-M");

});

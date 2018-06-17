/**
 * Precept Demo's entry point and main loop.
 * @module app/main
 */
define(function (require) {

// Disable closing forms by clicking overlay.
//    $.jqm.params.closeoverlay = false;

// Load all the 3rd-party modules
//    var g = require('jqgrid');
//    var g = require('jqgrid');
    var l = require('en');
    var ts = require('themeswitcher');
    var ms = require('jquerymultiselect');
    var msf = require('jquerymultiselectfilter');
    
// turn on themeswitcher
    $("#switcher").themeswitcher({
       imgPath: './img/images/'
    });
    
    var inbox = require('./inboxTable');
    inbox.setGrid("#inbox_table");
    inbox.setPager("#inbox_pager");
    inbox.setImageBox("#inbox_box");
    inbox.setImageText("#inbox_text");
    inbox.InboxTableGrid();
    $('#inbox_table_container').draggable();

    $(".image_group").controlgroup();
    
    $(function() {
      var tabs = $('#tabs').tabs();
      tabs.find(".ui-tabs-nav").sortable({
        axis: "x",
        stop: function() {
          tabs.tabs("refresh"); 
        }
      });
    });

    function UserAction() {
      var xhttp = new XMLHttpRequest();
          xhttp.open("POST", "Your Rest URL Here", false);
          xhttp.setRequestHeader("Content-type", "application/json");
          xhttp.send();
      var response = JSON.parse(xhttp.responseText);
    }

});

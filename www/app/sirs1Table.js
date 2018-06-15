/**
 * @module app/sirs1
 */
 define(function () {
 var grid,pager,thePatient;
   return {

     setGrid: function(sel) {
       grid = $(sel);
     },

     setPager: function(sel) {
       pager = $(sel);
     },

    sirs1Button: $(function() {
      var url = 'http://dev.precepthealth.ch:8079/REST/CALLMLM?mlmName=SIRS-Notification1&mlmInstitution=Medexter Healthcare, Vienna, Austria';
      $('#sirs1Button').click(function(e) {
      e.preventDefault();
      $.ajax({
        url: url,
        type:'POST',
        dataType:'json',
        headers: {
         'Authorization':'Basic YWRtaW46czNjcmV0',
         'Accept':'application/json',
         'Content-Type':'application/json'
        },
        data: JSON.stringify({ "type": "number", "primaryTime": null, "applicability": 1, "value": 123 })

      }).done( function(data) {
        var msg = data.value;
        $("#sirs1ButtonDialogText").text("value:" + msg);
        $(function(data) {
         $("#sirs1ButtonDialog").dialog();
           title: "SIRS test result"
        });
        console.log(data);
        console.log(data.value);
      })
    })
    }),

    runMLM2Button: $(function() {
      var url = 'http://dev.precepthealth.ch:8079/REST/CALLMLM?mlmName=SIRS-Notification2&mlmInstitution=Medexter Healthcare, Vienna, Austria';
      $('#runMLM2Button').click(function(e) {
      var row = grid.jqGrid('getGridParam','selrow');
      if(!row) {
       $("<div>Please select a row.</div>").dialog({
         modal:true,
         buttons: [{
           text: "Ok",
           click: function() {
             $(this).dialog("close");
           }
         }]
       });
       return;
      }
      var rowData = grid.jqGrid('getRowData',row);
      var thePatient = rowData.IDPatient;

      $.ajax({
        url: url,
        type:'POST',
        dataType:'json',
        headers: {
         'Authorization':'Basic YWRtaW46czNjcmV0',
         'Accept':'application/json',
         'Content-Type':'application/json'
        },
        data: JSON.stringify({ "type": "number", "primaryTime": null, "applicability": 1, "value": thePatient })

      }).done( function(data) {
        var msg = data.value;
        if(!msg) {
          msg = "No SIRS detected."
        }
        $("#runMLM2ButtonDialogText").text("value:" + msg);
        $(function(data) {
         $("#runMLM2ButtonDialog").dialog();
        });
      })
      })
    }),

     SIRS1TableGrid: function () {
     var lastsel2;
       return grid.jqGrid ({
         url: './php/sirs1Table.php?action=get',
         datatype: 'json',
         method: 'POST',
         loadonce: true,
         shrinkToFit: false,
         width: 500,
         colNames: ['id','Patient ID','Temp.','Heart rate','Resp. rate','PaCO2','WB cell count','Immature band'],
         colModel: [
           {name: 'id', index: 'id', key: 'true',hidden:true},
           {name: 'IDPatient', index: 'IDPatient'},
           {name: 'temperature', index: 'temperature', editable:true},
           {name: 'heartRate', index: 'heartRate', editable:true},
           {name: 'respRate', index: 'respRate', editable:true},
           {name: 'PaCO2', index: 'PaCO2', editable:true},
           {name: 'WBcellCount', index: 'WBcellCount', editable:true},
           {name: 'immatureBand', index: 'immatureBand', editable:true}
         ],
         viewrecords: true,
         caption: 'Patient Monitor Data - SIRS',
         pager: '#sirs1_pager',
         editurl: './php/sirs1Table.php?action=edit',
         ondblClickRow: function(id) {
           if(id && id!=lastsel2) {
             grid.restoreRow(lastsel2);
             grid.editRow(id,true);
//             data = grid.jqGrid('getRowData',id);
//             thePatient = data.IDPatient;
             lastset2=id;
           }
         },
      }).gridResize();
     } 
   } 
 });

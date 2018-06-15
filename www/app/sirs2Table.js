/**
 * @module app/sirs2
 */
 define(function () {
 var grid,pager,patientId;
   return {

     setGrid: function(sel) {
       grid = $(sel);
     },

     setPager: function(sel) {
       pager = $(sel);
     },

     patientMenu: function() {
       $.ajax({
         url: './php/getPatientMenu.php',
       }).done( function(data) {
         $("#patientMenuContainer").html(data);
         $("#patientMenu").selectmenu({
           width:100, 
           select: function(event, ui) {
             var value = $(this).val();
             console.log("value =",value);
             patientId = value;
           }
         });
       })
     },

    runMLM4Button: $(function() {
      var url = 'http://dev.precepthealth.ch:8079/REST/CALLMLM?mlmName=SIRS-Notification4&mlmInstitution=Medexter Healthcare, Vienna, Austria';
      $('#runMLM4Button').click(function(e) {
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
        data: JSON.stringify({ "type": "number", "primaryTime": null, "applicability": 1, "value": patientId })

      }).done( function(data) {
        var msg = data.value;
        if(!msg) {
          msg = "No SIRS alert sent."
        }
        $("#runMLM4ButtonDialogText").text("value:" + msg);
        $(function(data) {
         $("#runMLM4ButtonDialog").dialog();
        });
      })
      })
    }),
     SIRS2TableGrid: function () {
       var formEditingOptions = {
         reloadAfterSubmit:true,
         closeAfterAdd:true,
         closeAfterEdit:true,
         afterComplete: function () {
           grid.setGridParam({datatype: 'json'}).trigger('reloadGrid');
       //    $(this).patientMenu();
       $.ajax({
         url: './php/getPatientMenu.php',
       }).done( function(data) {
         $("#patientMenuContainer").html(data);
         $("#patientMenu").selectmenu({
           width:100, 
           select: function(event, ui) {
             var value = $(this).val();
             console.log("value =",value);
             patientId = value;
           }
         });
       })
         },
         jqGridAfterDelRow: function() {
         
       $.ajax({
         url: './php/getPatientMenu.php',
       }).done( function(data) {
         $("#patientMenuContainer").html(data);
         $("#patientMenu").selectmenu({
           width:100, 
           select: function(event, ui) {
             var value = $(this).val();
             console.log("value =",value);
             patientId = value;
           }
         });
       })
         }
       }
       return grid.jqGrid ({
         url: './php/sirs2Table.php?action=get',
//         url: 'http://dev.precepthealth.ch/php/sirs2Table.php?action=get',
//         editurl: 'http://dev.precepthealth.ch/php/sirs2Table.php?action=edit',
         editurl: './php/sirs2Table.php?action=edit',
         datatype: 'json',
         method: 'POST',
         //toppager: true,
         loadonce: true,
         shrinkToFit: false,
         width: 500,
         colNames: ['id','Patient ID','Date','Temp.','Heart rate','Resp. rate','PaCO2','WB cell count','Immature band'],
         colModel: [
           {name: 'id', index: 'id', hidden:true},
           {name: 'IDPatient', index: 'IDPatient', editable:true},
           {name: 'Date', index: 'Date'},
           {name: 'temperature', index: 'temperature', editable:true},
           {name: 'heartRate', index: 'heartRate', editable:true},
           {name: 'respRate', index: 'respRate', editable:true},
           {name: 'PaCO2', index: 'PaCO2', editable:true},
           {name: 'WBcellCount', index: 'WBcellCount', editable:true},
           {name: 'immatureBand', index: 'immatureBand', editable:true}
         ],
         viewrecords: true,
         caption: 'SIRS Table 2',
         pager: '#sirs2_pager',
         jsonReader: {
           repeatitems: false,
           page: function() {return 1;},
           root: function(obj) {return obj;},
           records: function(obj) {return obj.length;}
         },
         ondblClickRow: function(id) {
           grid.jqGrid('editGridRow',id,formEditingOptions);
         },
//      }).navGrid(pager.selector, {
      }).navGrid('#sirs2_pager', {
          add:true, 
          edit:true,
          del:true,
          search:true,
          view:true,
          refresh:true
          
      },formEditingOptions,
      formEditingOptions,formEditingOptions,{    
      }).gridResize(); 
     } 
   } 
 });

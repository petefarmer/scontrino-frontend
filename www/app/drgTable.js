/**
 * @module app/drgTable
 */
 define(function () {
 var grid,pager;
   return {


     setGrid: function(sel) {
       grid = $(sel);
     },

     setPager: function(sel) {
       pager = $(sel);
     },

     DRGTableGrid: function () {
       var formEditingOptions = {
         closeOnEscape:true,
         closeAfterEdit:true
       }
       return grid.jqGrid ({
         url: './php/drgTable.php?action=get',
         editurl: './php/drgTable.php?action=edit',
         datatype: 'json',
         method: 'POST',
         //toppager: true,
         loadonce: true,
         shrinkToFit: false,
         width: 500,
         colNames: ['ID','MS DRG','FY 2010 Post Acute','FY 2010 Spec. Pay','MDC','Type','Title','Weights','Geometric Mean LOS','Arithmetic Mean LOS'],
         colModel: [
           {name: 'id', index: 'id', key: 'true'},
           {name: 'ms_drg', index: 'ms_drg', editable:true},
           {name: 'fy_2010_post_acute', index: 'fy_2010_post_acute', editable:true},
           {name: 'fy_2010_special_pay', index: 'fy_2010_special_pay', editable:true},
           {name: 'mdc', index: 'mdc', editable:true},
           {name: 'type', index: 'type', editable:true},
           {name: 'title', index: 'title', editable:true},
           {name: 'weights', index: 'weights', editable:true},
           {name: 'geometric_mean_los', index: 'geometric_mean_los', editable:true},
           {name: 'arithmetic_mean_los', index: 'arithmetic_mean_los', editable:true}
         ],
         viewrecords: true,
         caption: 'DRG Table',
         pager: '#drg_pager',
         /*
         jsonReader: {
           repeatitems: false,
           page: function() {return 1;},
           root: function(obj) {return obj;},
           records: function(obj) {return obj.length;}
         }
         */
         ondblClickRow: function(id) {
           grid.jqGrid('editGridRow',id,formEditingOptions);
         },
//      }).navGrid(pager.selector, {
      }).navGrid('#drg_pager', {
          add:true,
          edit:true,
          del:true,
          search:true,
          view:true,
          refresh:true
         // cloneToTop:true
          
      },formEditingOptions,formEditingOptions,
      {/*prmDel*/
      }); 
     } 
   } 
 });

/**
 * @module app/foldersTable
 */
define(function () {
  var grid,pager;	
  var productsTable = $("#products_table");
  return {
/** @param {string} sel - A jQuery-style selector string of format '#foo_table',
 * set as an id attribute of an HTML table element.
 */
        setGrid: function (sel) {
         grid = $(sel);
        },
/** @param {string} sel -  A jQuery-style selector string, format '#foo', set as an
 * id attribute of an HTML div element for the jqGrid pager and toolbar 
 */
        setPager: function (sel) {
         pager = $(sel);
        },
	/** @constructor FoldersTableGrid
	 */
    FoldersTableGrid: function () {
    
       var formEditingOptions = {
	    reloadAfterSubmit:true,
	    closeAfterEdit:true,
	    closeOnEscape:true,
	    closeAfterAdd:true,
	    viewPagerButtons:false,
	    beforeSubmit: function(postdata,formid) {

                var gfId = postdata.globalfolderid; 
                var pId = postdata.parentid; 
		var fId = postdata.folderid;
		var retFlag,errMsg;

                var rows = grid.getDataIDs();
		$.each(rows, function(k,v) {
		  var parent = grid.getRowData(v).parentid;
		  if ((gfId === parent)&&(pId != 0)) {
		    retFlag = -1;
		    errMsg = "Cannot demote folder which contains subfolders. Move subfolders first.";
		  }

		if((fId == 1)&&(pId != 0)) {
		  retFlag = -1;
		  errMsg = "Cannot move Default folder.";
		}
	    	
		});

		if(gfId === pId) {
		  retFlag = -1;
		  errMsg = "Folder cannot be its own parent.";
		}

		if(retFlag < 0) {
	          return[false,errMsg];
	        }else{
	    	  postdata.foldername = postdata.foldername.trim(); // trim the indentation spaces added in the CFC
	    	  return[true,''];
		}
	    },

	    beforeShowForm: function() {
	        // strip the indentation spaces prepended in the CFC   
	    	var t = $('input#foldername').val().trim();
	    	$('input#foldername').val(t);	    	
	    },
	       afterComplete: function(response,postdata,formid) {
	         productsTable.setGridParam({datatype:'json'}).trigger('reloadGrid', [{page:1}]);
	    }
       }

      return grid.jqGrid({
	           url: './cfc/foldersTable.cfc?method=getFolders',
	       editurl: './cfc/foldersTable.cfc?method=setFolder',
	      datatype: 'json',
	        height: 'auto',
	         width: 'auto',
	       caption: '<span class="gridtitle">Folders</span>',
	      hidegrid: false,
	      toppager: true,
	     pgbuttons: false,
	       pginput: false,
      jsonReader: {
                  root: "ROWS",
                  page: "PAGE",
                 total: "TOTAL",
               records: "RECORDS",
                  cell: "",
                    id: "0"
      },
      colNames: [
       'Global folder Id','Folder Id','Parent Folder','User code','Client code','Folder name','Products'
      ],
      colModel: [
       {name:'globalfolderid',index:'globalfolderid',hidden:true,editable:true,
        editoptions:{edithidden:false}
       },
       {name:'folderid',index:'folderid',hidden:true,editable:true,
        editoptions:{edithidden:false}
       },
       {name:'parentid',index:'parentid',hidden:true,editable:true,
	edittype: 'select',
	editrules: {edithidden:true},
	editoptions: {
	  dataUrl: './cfc/foldersTable.cfc?method=getSuperFoldersSelect'
	}
       },
       {name:'usercode',index:'usercode',hidden:true,editable:true,
        editoptions:{edithidden:false}
       },
       {name:'clientcode',index:'clientcode',hidden:true, editable:true,
        editoptions:{edithidden:false}
       },
       {name:'foldername',index:'foldername',sortable:false,editable:true,width:'250'},
       {name:'count',index:'count',sortable:false,editable:false,width:'75',align:'center'}
       ],
       ondblClickRow: function(id) {
         grid.jqGrid('editGridRow',id, formEditingOptions);
       },
      }).navGrid(pager.selector, 
        { add:true, edit:true, del:true, search:false, view:false, refresh:false,
	  addtext:'New Folder', edittext:'Edit', deltext:'Delete', cloneToTop: true
	}, 
	  formEditingOptions,
	  formEditingOptions,
          { // prmDel
	    closeOnEscape: true,
	    reloadAfterSubmit: true,
	    beforeSubmit: function(postdata,formid) {
	      var errFlag = true;
	      var errMsg = "";
	      var gfId = postdata;
	      var rows = grid.getRowData();
	      $.each(rows, function(k,v) {
		  if (gfId == v.globalfolderid) {
		    if (v.count != 0) {
		      errFlag = false;
		      errMsg = "Cannot delete non-empty folder.";
		    }
		    if (v.folderid == 1) {
		      errFlag = false;
	              errMsg = "Cannot delete Default folder.";
		    }
		  }
		  if (gfId == v.parentid) {
		      errFlag = false;
                      errMsg = "Cannot delete a folder which contains subfolders. Move subfolders first.";
		  }
	        }
              );
	      return[errFlag,errMsg];
	    }

          },
	{}
      ); // close grid
    }
  }
});

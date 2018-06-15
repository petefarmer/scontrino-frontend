/**
 * @module app/runRuleTable
 */
define(function () {
	
	var rulesGrid = $("#rules_table");
	var runRuleTable = $("#run_rule_table");
	var ruleGroupsGrid = $("#rulegroups_table");
	var selectedid;
	
  return {
	  runRuleGrid: function() {

	  return runRuleTable.jqGrid({

            gridComplete: function() {
	      var html = '<a href=download.cfm?type=runrulexls><img src=./img/xl.png width=30></a>';
              $(".runRuleDownloadXLSButton").html(html).show().effect("shake");
	    },
		  url: './cfc/runRulesTable.cfc?method=run',
		  datatype: 'json',
		  loadonce: true,
		  colNames:[ 'rowID', 'Report ID', 'Product type', 'Product name', 
                              'Version number', 'Run date', 'Value', 'Rule result'

                 ],
     colModel:[  
               {name:'rowid', index:'rowid', sortable: false, hidden:true},
               {name:'reportnumber', index:'reportnumber', align:"left", sortable: true, width: 65, hidden:false},
               {name:'producttype', index:'producttype', align:"left", sortable: true, width: 90},
               {name:'productname', index:'productname', align:"left", sortable: true, width: 220},
               {name:'versionnumber', index:'versionnumber', align:"center", sortable:true, width: 75},
               {
                name:'datetimerun',index:'datetimerun', align:"center", 
		sortable:true,
		formatter: 'date',
		formatoptions: {srcformat: 'd M Y h:i', newformat: 'd M Y'}
               },
               {
	        name:'value_totalscore',index:'value_totalscore', 
		align:"center", sortable: false, width: 65,
		formatter:'number'
               },
               {name:'ruleresult_overallresult',index:'ruleresult_overallresult', align:"center", sortable: false, width: 65}
              ],

          height: 'auto',
          width: 950,
          hidegrid: false,
          viewrecords: true,
          caption: 'Rule Results',
          mtype:'POST',
          subGrid : true, 
          subGridModel: [
                          	{
                          		params: ['versionnumber'] 
                          	}
                          ], 
           subGridRowExpanded: function(subgrid_id, row_id) {
        	   
        	   var rowData = $(this).getRowData(row_id);
        	   var reportNumber = rowData['reportnumber'];
        	   var versionNumber = rowData['versionnumber'];
        	   
                   var subgrid_table_id, pager_id, selectedRuleGroupId; 
                   subgrid_table_id = subgrid_id+"_t"; 
                   pager_id = "p_"+subgrid_table_id;
				
                   $("#"+subgrid_id).html("<table id='"+subgrid_table_id+"' class='scroll'></table><div id='"+pager_id+"' class='scroll'></div>");

                   jQuery("#"+subgrid_table_id).jqGrid({ 
                                             url:"./cfc/runRulesTable.cfc?method=run&type=group&subgrid=yes&id="+selectedid+"&reportid="+reportNumber+"&versionId="+versionNumber, 
                                        datatype: "json", 
					colNames: ['Rule','Value','Rule result'], 
					colModel: [ 
						{name:"rulenum",index:"rulenum",align:"left",sortable:false}, 
						{
						 name:"value",index:"value",
						 align:"right",sortable:true,
						 formatter: 'number',
						 formatoptions: {decimalplaces: 2}
						}, 
						{name:"ruleresult",index:"ruleresult",align:"right",sortable:true}
						], 
					rowNum:20,
					loadonce: true,
					pager: pager_id,  
					sortorder: "asc", 
					height: '100%',
					beforeSelectRow: function(rowid, e) {
					   return false;
					},
					jsonReader: {
						root: "ROWS",
						page: "PAGE",
						total: "TOTAL",
						records:"RECORDS",
						cell: "",
						id: "0"
					}	 
				}); 
				jQuery("#"+subgrid_table_id).jqGrid('navGrid',"#"+pager_id,{edit:false,add:false,del:false,search:false}) 
           }, 
		
		//end subgrid
           
      jsonReader: {
                  root: "ROWS",
                  page: "PAGE",
                 total: "TOTAL",
               records: "RECORDS",
                  cell: "",
                    id: "0"
      },

           pager: "#runrule_pager",
           toppager: true,
	  })
        
      },
        
        runRuleButton: $(function() {
          	
          	$("#runRuleButton").click(function(e){
          			e.preventDefault();
          			
          			$("#runRuleMessage").children().remove();
                                $(".runRuleDownloadXLSButton").hide();
        	     	
          			//single
          			var selRowId = rulesGrid.jqGrid ('getGridParam', 'selrow');
        			selectedid = rulesGrid.jqGrid ('getCell', selRowId, 'createdruleid');
        			var type = 'Single';
        			
        			
        			if (selectedid==undefined){
        			//group
        				var selRowId = ruleGroupsGrid.jqGrid ('getGridParam', 'selrow');
        				selectedid = ruleGroupsGrid.jqGrid ('getCell', selRowId, 'rulegroupid');
        				var type = 'Group';
        			}

                                // set title bar caption
        			if (type === 'Single') {
                                  runRuleTable.setCaption('Rule Results');
                                }else{
                                  runRuleTable.setCaption('Rule Group Results');
                                }

        			//none selected
          			if (selectedid==undefined){
        	     		$("#runRuleMessage").append("<span id='ruleAlert'>Please select a rule/rule group. Then click the Run rule button.</span>");
        	     	}
        	     	else {
        				runRule(selectedid,type);
        			}
        		})
        		
        		function runRule(Id,type){
          		
          			var showVersions = $("#showVersionsForRunRules").val();
          			
          			if (type =='Single'){
          				var value_totalscore_title = 'Value';
          				var ruleresult_overallresult_title = 'Rule result';
          				var options = {formatter:'number',formatoptions:{decimalplaces:2}};
          				runRuleTable.hideCol('subgrid');
          			}
          			else {
          				var value_totalscore_title = 'Total score';
          				var ruleresult_overallresult_title = 'Overall result';
          				var options = {formatter:'none'};
          				runRuleTable.showCol('subgrid');
          			}
          			
          			runRuleTable
                                .setGridWidth(950,false)
          			.setGridParam({postData: {id: Id, type: type, showVersions: showVersions},datatype:'json'})
          			.setLabel("value_totalscore",value_totalscore_title)
          			.setLabel("ruleresult_overallresult",ruleresult_overallresult_title)
          			.setColProp("value_totalscore",options)
          			.trigger('reloadGrid', [{page:1}]);
          		
          		}
        		
          	
          	}),

    };
});

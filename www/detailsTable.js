/**
 * @module app/detailsTable
 */
define(['../app/dry','../app/basketDialog','../app/colModel'],function (dry,basketDialog,colModel) {

var grid,
    pager,
    errorMsg,
    errorFlag,
    detailsId,
    showNames,
    fieldNames,
    theColModel,
    productType,
    productsTable,
    selectFieldNames,
    productTypeName;

  return {
/** 
* @param {integer} productType - A producttypeid from producttypes_2013.
* A hack point for any additional setup prior to instantiating the grid.
*/
       initGrid: function(pt,ptn) {
         productType = parseInt(pt);
         productTypeName = ptn; 
	   // ex. productTypeName = "Leveraged Return"
	 // additional setup...
	 // back reference to calling grid id
	 productsTable = $("#products_table");
       },
/** 
 * @param {string} sel - A jQuery-style selector string of format '#foo_table',
 * set as an id attribute of an HTML table element.
 */
       setGrid: function (sel) {
         grid = $(sel);
       },

/** 
 * @param {string} fn - A comma-delimited string of field names from details.producttypes_2013.
 */
       setFieldNames: function (fn) {
         fieldNames = fn;
       },

/** 
 * @param {string} sn - A comma-delimited string of shownames from details.producttypes_2013.
 */
       setShowNames: function (sn) {
         showNames = sn;
       },

/** 
 * @param {string} sel -  A jQuery-style selector string, format '#foo', set as an
 * id attribute of an HTML div element for the jqGrid pager and toolbar 
 */
       setPager: function (sel) {
         pager = $(sel);
         // Notice that this function returns a pager object, not the selector!
         // Address selector (ex. in 'navGrid') using pager.selector.
         return pager;
       },

/** 
 * @param {integer} row -  Row number set in productsTable calling method.
 */
       setDetailsId: function (id) {
         detailsId = id;
       },
/** 
 * @param {string} list -  A comma-delimited list of field names from reports2014heaven.selectfields
 */
       setSelectFieldNames: function (snames) {
         selectFieldNames = snames;
       },
/** 
* @constructor  DetailsTableGrid 
*/

       DetailsTableGrid: function () {

 var theColModel = colModel.getColModel(productType,fieldNames,showNames,selectFieldNames);

var data_url = '../www/cfc/detailsTable.cfc?method=getDetails&detailsid=' + detailsId;
 
    // formEditionOptions is a private object which controls most
    // of our custom form behaviour; geometry/layout, adding buttons, 
    // event-handling and server-side validation.
    // We need to promote a few indent levels for wide code blocks ahead...
    var formEditingOptions = {
             // geometry and positioning
                      width: 'auto',
               recreateForm: true,
             closeAfterEdit: true,
                editCaption: productTypeName,
             beforeShowForm: function(formid) {
               formid.closest(".ui-jqdialog").position({
                         of: window,
                         my: "left top",
                         at: "left top"
               });
              },
	      onInitializeForm: function(formid) {
               // Make some buttons for generating autocall data, etc.
               // and dealing with basket weightings. Show as required.
		// 4 = auto-call, 106 = CLI
	       // this will eventually need to be a switch on productType
		if ((productType === 4) || (productType === 106)) {
// Get a clone of the default 'Submit' button to use as our starting point.
                  var generateBtn = $('#sData').clone();
                  generateBtn.attr('id','Generate');
                  generateBtn.attr('name','Generate');
                  generateBtn.insertBefore('#sData');
                  $('#Generate').button({
                   label: "Generate"
                  }).click( function() {
		    // get a bunch of inputs from the formdata
                    var strikeDate = $('input#strikedatevalue').val();
                    var finalMarketDate = $('input#finalmarketdatevalue').val();
                    var autocallTime = $('input#autocalltime').val();
                    var acFreq = $('select#acfreq').val();
                    var acLevel = $('input#aclevel').val();
                    var annAcAmount = $('input#annacamount').val();
                    var couponAndAcDirection = $('select#couponandacdirection').val();
		    // validate them
		    if(!strikeDate) { alert("Strike date cannot be empty.") }
		    if(!finalMarketDate) { alert("Final market date cannot be empty.") }
		    if(!autocallTime) { alert("First autocall time cannot be null.") }
		    if(!acFreq) { alert("Autocall frequency cannot be null.") }
		    if(!acLevel) { alert("Autocall level cannot be null.") }
		    if(!annAcAmount) { alert("Annual autocall amount cannot be null.") }
		    if(!couponAndAcDirection) { alert("Coupon and ac date direction cannot be null.") }
		    // convert them to expected formats (more date stupidity)
		    var washDate = function(date) {
		               d = date.split("-");
		              dd = d.shift();
		             Mmm = d.shift();
		            yyyy = d.shift();
		       return(dd + " " + Mmm + " " + yyyy);
		    };
		    strikeDate = washDate(strikeDate);
                    finalMarketDate = washDate(finalMarketDate);
		    // acFreq begins counting at one, not zero
		    var freqs = ["the zeroth element","w","m","q","s","a"];
		    acFreq = freqs[acFreq];
		    // query the web service
                    $.ajax({
                         url: './cfc/stresstestproductadmin.cfc?method=generateautocalls',
	                type: 'POST',
		    datatype:'json',
	                data: {
	                            strikedate: strikeDate,
	                       finalmarketdate: finalMarketDate,
	                          autocalltime: autocallTime,
	                                acfreq: acFreq,
		                       aclevel: acLevel,
                                   annacamount: annAcAmount,
			  couponandacdirection: couponAndAcDirection
	                }
                    }).done( function(data) {
		    // then update the form fields
		      var d = JSON.parse(data);
		      $('input#generated_acdates').val(d.GENERATED_ACDATES);
		      $('input#generated_acreturns').val(d.GENERATED_ACRETURNS);
		      $('input#generated_aclevels').val(d.GENERATED_ACLEVELS);
                    }); // close ajax
                  }); // close click
                  // to get rid of extra CSS styling and make it look like the other buttons
                  $('#Generate').removeClass('ui-button ui-widget ui-button-text-icon-primary');
		}
		var weightingsBtn = $('#sData').clone();
		weightingsBtn.attr('id','Weightings');
		weightingsBtn.attr('name','Weightings');
		weightingsBtn.insertBefore('#sData');
		$('#Weightings').button({
		  label:"Weightings"
		}).click( function() {
		 var u = $('#underlyingid :selected');
		 var w = $('#underlyingweighting').val();
		 var uId = [];
		 var uLabel = [];
		 var wList = w.split(",");
		 u.each(function(i) {
		   uId[i]  = u[i].value;
		   uLabel[i] = u[i].label;
		 });
                  basketDialog.setDialog("#basket");
		  basketDialog.setUnderlyings(uId,uLabel,wList);
		  basketDialog.BasketDialog();
		});
           // again, clear CSS styling
                $('#Weightings').removeClass('ui-button ui-widget ui-button-text-icon-primary');
		// need to check for assetstyle, if basket, show, else hide
		var rowArray = grid.getRowData();
		var row = rowArray[0];
		switch(parseInt(row.assetstyle)) {
		   case 0:
		     $("#Weightings").show();
		     break;
		   case 1:
		   case 2:
		   case 3:
		   case 4:
		  default:
		     $("#Weightings").hide();
		}

		var fakeSubmitBtn = $('#sData').clone();
		fakeSubmitBtn.attr('id','FakeSubmit');
		fakeSubmitBtn.attr('name','FakeSubmit');
		fakeSubmitBtn.insertBefore('#sData');
		$('#FakeSubmit').button({
		  label: "Submit"
		}).click(function(){
                  var d = $('.DataTD > :input');
		  var url = '/products/cfc/productvalidation.cfc?method=validateproductform';
		  var params = "";
		  $.each(d, function(k,v) {
		      params += '&' + v.id + '=' + v.value;
		  });
	          params += ("&producttype=" + productType);
		  formData = encodeURI(params);

                  $.ajax({
                     url: url,
	            type: 'POST',
                    data: {
	              formdata: formData
	            },
                  }).done(function(data){
	              console.log(data);
		      // if cool, call REAL submit
		      // if bogus, show errors
                  // init return values
		     var   status = "",
		           types = "";

	 	     var d = JSON.parse(data);
		     status = d.STATUS;
		     types  = d.TYPES;

		     if (status == "valid") {
                       // rejoin the REAL submit code path
		       if (types == "warning") {
		         errorFlag = false;
		         errorMsg = d.MESSAGES;
		         var ignoreWarningsBtn = $('#sData').clone();
		             ignoreWarningsBtn.attr('id','IgnoreWarnings');
                             ignoreWarningsBtn.attr('name','IgnoreWarnings');
                             ignoreWarningsBtn.insertBefore('#FakeSubmit');
			     $('#IgnoreWarnings').button({
			       label: 'Ignore Warnings'
			     }).click(function(){
		               errorFlag = true;
		              $('#sData').click();
			     });
                             $('#IgnoreWarnings').removeClass('ui-button ui-widget ui-button-text-icon-primary');
			     $('#IgnoreWarnings').show();
                       }else{
		         errorFlag = true;
		       }
		       $('#sData').click();
                     }else{
		       console.log("status = ",status);
		       console.log("types = ",types);
		       errorFlag = false;
		       errorMsg = d.MESSAGES;
		       $('#sData').click();
		     }
		  });
		});
                $('#FakeSubmit').removeClass('ui-button ui-widget ui-button-text-icon-primary');
		$('#sData').hide();
	      },
              afterShowForm: function(formid) {
		// does this work?
                var row = $("#id_g").val();
		// yup.
              },
              onClose: function(id) {
                 // Destroy the grid, but save 
                 // the HTML <table> element for reuse.
                 grid.jqGrid('GridUnload');
                 return true;
               },
               beforeSubmit: function(postdata,formid) {
                  return [errorFlag,errorMsg];
               },
               afterSubmit: function() {
                          grid.jqGrid('GridUnload');
                          return [true,"spoo"];
               },
	       afterComplete: function(response,postdata,formid) {
                 productsTable.setGridParam({datatype:'json'}).trigger('reloadGrid');
                }
              }; // formEditingOptions
              // Finally we're ready to create the grid, which we will
	      // return as DetailsTableGrid.
              return grid.jqGrid({
                       url: data_url,
                  datatype: 'json',
		   jqModal: true,
		     modal: true,
              // The man behind the curtain sits here, at the loadComplete callback.
              loadComplete: function (id) {
                grid.jqGrid('editGridRow', detailsId, formEditingOptions, {
		   jqModal: true,
		     modal: true,
                   overlay: 0,
                   onClose: function () {
                     grid.jqGrid('GridUnload');
                     return false;
                   }
                });
              },
                jsonReader: {
                      root: "ROWS",
                      page: "PAGE",
                     total: "TOTAL",
                   records: "RECORDS",
                  userdata: "VALDATA",
                      cell: "",
                        id: "0"
	        },
                  colModel: theColModel,
		 //loadError: dry.handleError,
                     pager: pager,
                    rowNum: true,
               viewrecords: true,
                    height: 'auto',
                     width: 'auto',
                  hidegrid: true,
                     mtype: 'POST',
                   editurl: '../www/cfc/detailsTable.cfc?method=setDetails'
	  });
    } // DetailsTableGrid constructor
   };
});

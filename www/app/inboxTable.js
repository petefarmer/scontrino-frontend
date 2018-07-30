/**
 * @module app/inboxTable
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

     setImageBox: function(sel) {
       imageBox = $(sel);
     },

     setImageText: function(sel) {
       imageText = $(sel);
     },


     InboxTableGrid: function () {
       var formEditingOptions = {
         closeOnEscape:true,
         closeAfterEdit:true
       }
       return grid.jqGrid ({
//         url: './php/inboxTable.php?action=get',
         url: './php/inboxTable.php',
//         editurl: './php/inboxTable.php?action=edit',
         editurl: './php/inboxTable.php',
         datatype: 'json',
         method: 'POST',
	 /*
         postData: {
	   action: 'get',
         },
	 */
         //toppager: true,
         loadonce: true,
         shrinkToFit: false,
         width: 500,
         colNames: ['id','name','address','filename','ocr_text'],
         colModel: [
           {name: 'id', index: 'id', key: 'true'},
           {name: 'name', index: 'name', editable:true},
           {name: 'address', index: 'address', editable:true},
           {name: 'filename', index: 'filename', editable:true},
           {name: 'ocr_text', index: 'ocr_text', editable:false, hidden:true}
         ],
         viewrecords: true,
         caption: 'Inbox Table',
         pager: '#inbox_pager',
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
	 onSelectRow: function(id) {
	   console.log("row selected");
           rowid = grid.jqGrid('getGridParam','selrow');
	   row = grid.getRowData(rowid);
           filename = row['filename'];
	   ext = filename.split('.').pop();
console.log("ext = ", ext);
	
	   text = row['ocr_text'];

           tmpsrc = "https://storage.googleapis.com/scontrino-194211.appspot.com/" + filename;
           tmpsrc = tmpsrc.trim();
           src = tmpsrc.replace(/\s/gi, "%20");
console.log("tmpsrc = ",tmpsrc);
           src = src.trim();
console.log("src = ",src);


	   if (new String(ext).valueOf() == new String("jpg").valueOf()) {
             img_html = "<img src='" + src + "' style='max-width:200px;height:auto;'></img>";
	   }else if (new String(ext).valueOf() == new String("pdf").valueOf()) {
             img_html = '<object data="' + src + '" type="application/pdf" width="300" height="200"> alt : <a href="' + src + '">' + src + '</a> </object>'
	   }
 //            img_html = "<img src='" + src + "' style='max-width:200px;height:auto;'></img>";
	   text_html = "<textarea style='height:200px;'>" + text + "</textarea>";

	   $("#image_box").html(img_html);
	   $("#image_text").html(text_html);

	   console.log("img_html = ",img_html);
	   console.log("filename = ",filename);
	 },
//      }).navGrid(pager.selector, {
      }).navGrid('#inbox_pager', {
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

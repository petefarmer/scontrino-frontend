<cfcomponent displayname="foldersTable">

<cffunction name="gridStructNew" access="private" output="no" returntype="struct">
 <cfset var aStruct = StructNew()/>
 <cfset aStruct.strMsg = ""/>
 <cfset aStruct.strMsgType = "Success"/> <!--- really? is this a guarantee? --->
 <cfset aStruct.valData = ""/> <!--- breaking ST convention, going camel. --->
 <cfset aStruct.strReturn = ""/>
 <cfreturn aStruct/>
</cffunction>
<!--------------------------------------------------------------------------->
<!--------------------------------------------------------------------------->
<!----- getFolders() -------------------------------------------------------->
<!------------- returns folders for client as a lump of JSON. --------------->
<!--------------------------------------------------------------------------->
 <cffunction name="getFolders" access="remote" output="no" returntype="any" returnformat="JSON">

  <cfquery name="qGetFolders" datasource="#application.research_dsn#">
   SELECT *
   FROM folders
   WHERE clientcode = #Session.auth.clientid#
  </cfquery>

  <cfset resultSet = qGetFolders/>

  <cfset var gridStruct = gridStructNew()/>
  <cfset var arrGrid = ArrayNew(1)/>
  <cfset var i = 1/> <!--- Why doesn't CF let me use an index attribute in cfloop? --->
  <!--- ...and how odd that our array index begins at 1, not 0? wtf?!?--->
  <cfloop query="resultSet">
   <cfset arrGrid[i] = [globalfolderid,folderid,usercode,clientcode,foldername]/>
   <cfset i = i + 1/>
  </cfloop>
  <cfset gridStruct.strMsg = "Fetched #resultSet.recordcount# records."/>
  <cfset gridStruct.valData = {type="#gridStruct.strMsgType#", msg="#gridStruct.strMsg#"}/>
  <cfset gridStruct.strReturn = {records=#resultSet.recordcount#, rows=arrGrid, valData=#gridStruct.valData#}/>
  
  <cfreturn gridStruct.strReturn/>

 </cffunction>
<!--------------------------------------------------------------------------->
<!--------- setFolders(HTTP params)    -------------------------------------->
<!--------------------------------------------------------------------------->
 <cffunction name="setFolder" access="remote" output="false" returntype="any">
  <cfargument name="globalfolderid" type="any" required="false"/>
  <cfargument name="folderid" type="any" required="false"/>
  <cfargument name="usercode" type="any" required="false"/>
  <cfargument name="clientcode" type="any" required="false"/>
  <cfargument name="foldername" type="string" required="true"/>
  <cfargument name="oper" type="any" required="true"/>
  <cfargument name="id" type="any" required="false"/>
<!--- This is an example of how through BAD DESIGN we spend much of --------->
<!--- our time solving problems that we have created for ourselves. --------->
  <cfquery name="qGetNextFolderId" datasource="#application.research_dsn#">
	  SELECT max(folderid)+1 
	  AS nextFolderId 
	  FROM folders
	  WHERE clientcode=#session.auth.clientcode#
  </cfquery>
  <cfset var nextFolderId = qGetNextFolderId.nextFolderId/>

  <cfswitch expression="#oper#">
   <cfcase value="edit">
    <cfif arguments.usercode eq #session.auth.userid#>
     <cfquery name="qEditFolder" datasource="#application.research_dsn#">
	    UPDATE folders
	    SET foldername = "#arguments.foldername#"
	    WHERE folderid = #arguments.folderid#
     </cfquery>
     <cfelse>
      <cfreturn/>
    </cfif>
   </cfcase>
   <cfcase value="add">
    <cfquery name="qAddFolder" datasource="#application.research_dsn#">
	   INSERT INTO folders 
	   VALUES (NULL,#nextFolderId#,#session.auth.userid#,#session.auth.clientid#,"#arguments.foldername#")
    </cfquery>
   </cfcase>
  </cfswitch>
 </cffunction>
</cfcomponent>



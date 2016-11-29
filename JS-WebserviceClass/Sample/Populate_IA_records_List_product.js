// To populate insurance affiliation records from list 

{!REQUIRESCRIPT("/soap/ajax/31.0/connection.js")} 
{!REQUIRESCRIPT("/soap/ajax/18.0/apex.js")} 
{!REQUIRESCRIPT('//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js')} 
{!REQUIRESCRIPT('//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js')} 


//Starts from here 
try{ 

//Call JQuery function 
jQuery(function() { 
//Append the jQuery CSS CDN Link to the Head tag. 
//The CSS file does not work requirescript function in button, hence jQuery function 
jQuery('head').append('<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/start/jquery-ui.css" type="text/css" />'); 
}); 

//Global variables 
//Get all selected records 
var records = {!GETRECORDIDS($ObjectType.Contact)}; 
var selectAllFlag=false; 

//open the Jquery dialog box when atleast one record is selected 
if(records[0] != null) 
{ 
functionDialog(); 
} 
else 
{ 
//Made changes on 8/29/2016 
//alert user if does not selects a single record 
//alert('Open dialog box here with all products selected'); 

//Made changes on 11/18/2016 
//removed confirmation when no product is selected 

//set records to null, else there will be js error 
records=null; 
selectAllFlag=true; 
functionDialog(); 

} 

//Define functions here 
function functionDialog() 
{ 
//Call JQuery function 

jQuery(function() 
{ 
//Create the HTML(DIV Tag) for the Dialog. 
var html = '<div id="dialog" title="Insurance Affiliation records"><p>1.Insert records: Click Insert <br/>2.Get records size: Click Size<br/></p><div id="myDialogText"></div> </div>'; 

//Check if the Dialog(DIV Tag) already exists if not then Append the same to the Body tag. 

if(!jQuery('[id=dialog]').size()){ 
jQuery('body').append(html); 
} 

//Open the jQuery Dialog. 
jQuery( "#dialog" ).dialog({ 
autoOpen: true, 
modal: true, 
show: { 
effect: "bounce", 
duration: 500 
}, 
hide: { 
effect: "bounce", 
duration: 500 
}, 

open: function(event, ui) { jQuery('.ui-dialog-titlebar-close').hide(); }, 
buttons:{ 
Insert: function(){functionInsert();}, 
Size: function(){functionSize();}, 
Close: function() { 
location.reload(true); 
jQuery( this ).dialog( "close" );} 

} 
}); 

});//JQuery function ends here 
} 

function functionInsert() { 
//this should be ajax call, need to have a call back function 
//alert('Call insert function here '); 
jQuery("#myDialogText").text('Result: '+'Processing'); 

var msg = sforce.apex.execute("Product_Service","createInsuranceAffiliationRecords",{productIds:records, countRequest:false, selectAll: selectAllFlag}); 
jQuery("#myDialogText").text('Result: '+msg); 
} 



function functionSize() { 
//this should be ajax call, need to have a call back function 
//alert('Call size function here'); 
jQuery("#myDialogText").text('Result: '+'Processing'); 

var msg = sforce.apex.execute("Product_Service","createInsuranceAffiliationRecords",{productIds:records, countRequest:true, selectAll: selectAllFlag}); 
jQuery("#myDialogText").text('Result: '+msg); 
} 


}//Try ends here 
catch(e){ 
alert('An Error has Occured. Error: ' + e); 
}
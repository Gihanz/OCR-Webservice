function chkSpecialChars(txtid) {
	var splChars = "*|,\":<>[]{}`\';()@&$#%";
	var value = document.getElementById(txtid).value;
	for ( var i = 0; i < value.length; i++) {
		if (splChars.indexOf(value.charAt(i)) != -1) {
			return true;
		}
	}
	return false;
}

function validateCurrency(textId){
   var value=document.getElementById(textId).value;
   if(value!=""){
	   var regex  = /^\d{1,20}(\.\d{0,2})?$/;
	   if (regex.test(value)){
		   document.getElementById(textId).value=parseFloat(document.getElementById(textId).value).toFixed(2);
		return true;
	   }else{
		//document.getElementById("message3").innerHTML = "Please enter valid amount";
		// openErrorPopup();
         setMessageDialog(validationTitle,"<span >Please enter valid amount</span>");		
		return false;
		}
	}
}

function calcDiscrAmt(textId){
 var value=document.getElementById(textId).value;
   if(value!="" && validateCurrency(textId) ){
     setAmountType();
   }else{
      document.getElementById(textId).value="";
	  setAmountType();
   }
}

function calcDiscrAmt(acttextid,textid){

    var Number=converToNumber(acttextid);
	document.getElementById(textid).value=Number; 
    var currency=currencyFormat(Number);
	document.getElementById(acttextid).value=currency;
	
	if(acttextid!='sdepositAmount')
	setAmountType();
}

function setAmountDetails(){
   document.getElementById("sdepositAmount").value=currencyFormat(converToNumber("depositAmount"));
    document.getElementById("sdeclaredAmount").value=currencyFormat(converToNumber("declaredAmount"));
	 document.getElementById("sreceivedAmount").value=currencyFormat(converToNumber("receivedAmount"));
	  document.getElementById("sdiscrAmount").value=currencyFormat(converToNumber("discrAmount"));

}

function converToNumber(textid){

    var xvalue=document.getElementById(textid).value;
    return Number(xvalue.replace(/[^0-9\.]+/g,""));
}

function currencyFormat (num) {
    return "R" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

function setAmountType(){
    var declaredAmt=document.getElementById("declaredAmount").value;
	if(declaredAmt=="")
	declaredAmt="0.00"
	else
		document.getElementById("declaredAmount").value=parseFloat(document.getElementById("declaredAmount").value).toFixed(2);
	var receivedAmt=document.getElementById("receivedAmount").value;
	if(receivedAmt=="")
	receivedAmt="0.00";
	else
		document.getElementById("receivedAmount").value=parseFloat(document.getElementById("receivedAmount").value).toFixed(2);
	var discrAmt=0.00;
	
	if(declaredAmt!="" && receivedAmt!="")
	   var discrAmt=parseFloat(receivedAmt)-parseFloat(declaredAmt);
	   
    document.getElementById("discrAmount").value=Math.abs(parseFloat(discrAmt)).toFixed(2);
	var discramount=Math.abs(parseFloat(discrAmt));
	document.getElementById("sdiscrAmount").value=currencyFormat(discramount);
	
	if(parseFloat(discrAmt)>0){
	document.getElementById("discrepancyTypeCode").value="OVER";
	}else if(parseFloat(discrAmt)<0){
	  document.getElementById("discrepancyTypeCode").value="SHORT";
	}else{
	   document.getElementById("discrepancyTypeCode").value="";
	}
	
	  if(document.getElementById("declaredAmount").value!="" && document.getElementById("receivedAmount").value!=""){
	      if(parseFloat(discrAmt)==0){		  
		      //document.getElementById("ErrormessageDiv").innerHTML = "Discrepancy is invalid";
			  //openErrorMsgPopup();
			   setMessageDialog(validationTitle,"<span >Discrepancy is invalid</span>");
			 
		   }		  
	  }
	  
	  
}


function clearFields(){
	
	document.getElementById('customerCode').value="";
	document.getElementById('customerName').value="";
	document.getElementById('customerGroupCode').value="";
	document.getElementById('customerGroupName').value="";
	
	document.getElementById('tellerCode').value="";
    document.getElementById('tellerName').value="";
	
	var cashCenterSelect = document.getElementById("cashCenterCode");
    document.getElementById("cashCenterName").value = cashCenterSelect.options[cashCenterSelect.selectedIndex].text;
	
	
	
}


var denoms;
function getDenoms() {

//alert("getDenoms");
	     $.ajax({
				type : "POST",
				url : CONTEXT_ROOT + "/ajax/getDenoms",
				success : function(result) {
					denoms=result;
					//alert(denoms);
					
				},
				error : function(e) {
					//document.getElementById("ErrormessageDiv").innerHTML = "Error Occurred"+e;
					//openErrorMsgPopup();
					setMessageDialog(validationTitle,"<span >Error occured while fetching Denominations</span>");
				}
			});
}


function addComments(){
  var comments=document.getElementById("comment").value;
  var discrepancyId=document.getElementById("discrepancyId").value;
  comments=comments.trim();
  if(comments=="" || discrepancyId==""){
     setMessageDialog(validationTitle,"<span >Please Enter Comments</span>");
  }else{
 $.blockUI({ 
            message: $('#loadingmessage'), 
            css: { 
                top:  ($(window).height() - 100) /2 + 'px', 
                left: ($(window).width() - 100) /2 + 'px', 
                width: '100px' ,
				zIndex:2147483656
            } 
        }); 
		     $.ajax({
					type : "POST",
					url : CONTEXT_ROOT + "/ajax/addComments",
					data : 'discrepancyId=' + discrepancyId+'&comments='+comments,
					success : function(results) {
					$.unblockUI();	
						if(results=="1"){					
						  
						   // document.getElementById("ErrormessageDiv").innerHTML = "<div class='redColor'>Comments added successfully</div>";
						    //openErrorMsgPopup();
							document.getElementById("comment").value="";
							setMessageDialog('Message',"<span >Comments added successfully</span>");
						  						   
						}else{
						   setMessageDialog(errorTitle,"<span >Error occurred while adding Comments. Please try again</span>");
						}
						
					},
					error : function(e) {
					     $.unblockUI();	
						 setMessageDialog(errorTitle,"<span >Error occurred while adding Comments</span>");
						//document.getElementById("ErrormessageDiv").innerHTML = "Error occurred while adding Comments";
						//openErrorMsgPopup();
						
					}
				});
    }

}

var commetDetails;
function getComments(){
 
  var discrepancyId=document.getElementById("discrepancyId").value;
  
  if(discrepancyId==""){
  
  }else{
 $.blockUI({ 
            message: $('#loadingmessage'), 
            css: { 
                top:  ($(window).height() - 100) /2 + 'px', 
                left: ($(window).width() - 100) /2 + 'px', 
                width: '100px' ,
				zIndex:2147483656
            } 
        }); 
		     $.ajax({
					type : "POST",
					url : CONTEXT_ROOT + "/ajax/getComments",
					data : 'discrepancyId=' + discrepancyId,
					success : function(results) {
					$.unblockUI();	
						
						showComments(results);
						commetDetails=results;
						
					},
					error : function(e) {
					     $.unblockUI();	
						//document.getElementById("ErrormessageDiv").innerHTML = "<div class='redColor'>Error Occurred while fetching Comments<div>";
						//openErrorMsgPopup();
						setMessageDialog(errorTitle,"<span >Error Occurred while fetching Comments</span>");
						
					}
				});
    }

}
function setComments(index){
  document.getElementById('retailComments').value=commetDetails[index].comment;

}

function showComments(results){
    var tellerName=document.getElementById("tellerName").value;
   var html='<table style="width: 95%; border-collapse: collapse;"	border="1"	class="display"><tr><th class="viewListTblTH" style="width:150px;">Date Comment Added</th><th  class="viewListTblTH" style="width:300px;">Comment Added By</th></tr>';
   if(results!=""){
     for(var i=0;i<results.length;i++){
	 html=html+'<tr  onclick="setComments('+i+')" style="cursor:pointer;cursor:hand"><td>'+results[i].createdOn+'</td><td>';
	 if(results[i].createdBy!="")
		 html=html+results[i].createdBy;
	 else
		 html=html+tellerName;
	 html=html+'</td></tr>';
	 }
   }
    html=html+'</table>';
	html=html+'<table style="width:95%;padding-top:10px;"><tr><td style="width:95%;">Comments</td></tr><tr><td style="width:95%;"><textarea style="width:100%;height:140px;" id="retailComments" readOnly></textarea></td></tr></table>';
	
	document.getElementById('historyDiv').innerHTML=html;

}

function getTellerDetails() {
console.log("inside teller details");
var cashCenterCode=document.getElementById("cashCenterCode").value;
console.log("cashcenterCode"+cashCenterCode);
$('#jg_popup_inner').css("zIndex","1000");
		$.blockUI({ 
            message: $('#loadingmessage'), 
            css: { 
                top:  ($(window).height() - 100) /2 + 'px', 
                left: ($(window).width() - 100) /2 + 'px', 
                width: '100px' ,
				zIndex:2147483656
            } 
        }); 
		     $.ajax({
					type : "POST",
					url : CONTEXT_ROOT + "/ajax/getEmployees",
					data : 'cashCentreCode=' + cashCenterCode,
					success : function(results) {
					$.unblockUI();	
						if(results!=""){
						$('#jg_popup_inner').css("zIndex","21474836567");
						   prepareTellerDetailsTable(results,0);
						}else{
						  
						   //document.getElementById("ErrormessageDiv").innerHTML = "Teller Details Not Found";
						   //openErrorMsgPopup();
						   setMessageDialog('Message',"<span >Teller Details Not Found</span>");
						    $('.ui-dialog').css("zIndex","21474836567");
						}
						
					},
					error : function(e) {
					$.unblockUI();	
						//document.getElementById("ErrormessageDiv").innerHTML = "Error Occurred while fetching TellerDetails";
						//openErrorMsgPopup();
						setMessageDialog(errorTitle,"<span >Error occurred while fetching TellerDetails</span>");
						 $('.ui-dialog').css("zIndex","21474836567");
					}
				});
	}

	function searchTellerDeatails(){
	   var cashCenterCode=document.getElementById("cashCenterCode").value;
	   var sEmployeeCode=document.getElementById("sEmployeeCode").value;
	   var sEmployeeNumber=document.getElementById("sEmployeeNumber").value;
	   
	   var dataUrl="";
	   if(sEmployeeCode!=""){
	   dataUrl="&employeeCode="+sEmployeeCode;
	   }
	   if(sEmployeeNumber!=""){
	   dataUrl=dataUrl="&employeeNumber="+sEmployeeNumber;
	   }
	   console.log(dataUrl);
	   $('#jg_popup_inner').css("zIndex","1000");
		$.blockUI({ 
            message: $('#loadingmessage'), 
            css: { 
                top:  ($(window).height() - 100) /2 + 'px', 
                left: ($(window).width() - 100) /2 + 'px', 
                width: '100px' ,
				zIndex:2147483656
            } 
        }); 
	    $.ajax({
					type : "POST",
					url : CONTEXT_ROOT + "/ajax/getEmployees",
					data : 'cashCentreCode=' + cashCenterCode+dataUrl,
					success : function(results) {
					$.unblockUI();
					
						if(results!=""){
						$('#jg_popup_inner').css("zIndex","21474836567");
						   prepareTellerDetailsTable(results,1);
						}else{
						  
						    //document.getElementById("ErrormessageDiv").innerHTML = "Teller Details Not Found";
						   //openErrorMsgPopup();
						   setMessageDialog('Message',"<span >Teller Details Not Found</span>");
						    $('.ui-dialog').css("zIndex","21474836567");
						}
						
					},
					error : function(e) {
					    $.unblockUI();					
						//document.getElementById("ErrormessageDiv").innerHTML = "Error Occurred while fetching TellerDetails";
						//openErrorMsgPopup();
						setMessageDialog(errorTitle,"<span >Error occurred while fetching Teller Details</span>");
						 $('.ui-dialog').css("zIndex","21474836567");
					}
				});
	
	}
	
	function getCustomerDetails(){
	
	     console.log("inside teller details");
         var cashCenterCode=document.getElementById("cashCenterCode").value;
           console.log("cashcenterCode"+cashCenterCode);
		   var results="";
		    prepareSearchCustomerDetailTable(results,0);
		     $.ajax({
					type : "POST",
					url : CONTEXT_ROOT + "/ajax/searchCustomers",
					data : 'cashCentreCode=' + cashCenterCode,
					success : function(results) {
						if(results!=""){
						   prepareSearchCustomerDetailTable(results,0);
						}else{
						  
						    //document.getElementById("ErrormessageDiv").innerHTML = "Customer Details Not Found";
						   //openErrorMsgPopup();
						   //setMessageDialog(errorTitle,"<span >Error occurred while fetching Teller Details</span>");
						}
						
					},
					error : function(e) {
						document.getElementById("ErrormessageDiv").innerHTML = "Error Occurred while fetching Customer Details";
						openErrorMsgPopup();
					}
				});
	
	}
	
	function searchCustomersDetails(){
	    console.log("inside teller details");
        var cashCenterCode=document.getElementById("cashCenterCode").value;
        console.log("cashcenterCode"+cashCenterCode);

       var sCustomerIBT=document.getElementById("sCustomerIBT").value;
	   var sCustomerName=document.getElementById("sCustomerName").value;
       var scisGroupCode=document.getElementById("scisGroupCode").value;
	   var dataUrl="";
	   if(sCustomerIBT!=""){
	   dataUrl="&customerIBT="+sCustomerIBT;
	   }
	   if(sCustomerName!=""){
	   dataUrl=dataUrl+"&customerName="+sCustomerName;
	   }
	     if(scisGroupCode!=""){
	   dataUrl=dataUrl+"&groupCISCode="+scisGroupCode;
	   }
	  
		
	   console.log(dataUrl);
	    if(scisGroupCode!=""){
		$('#jg_popup_inner').css("zIndex","1000");
		$.blockUI({ 
            message: $('#loadingmessage'), 
            css: { 
                top:  ($(window).height() - 100) /2 + 'px', 
                left: ($(window).width() - 100) /2 + 'px', 
                width: '100px' ,
				zIndex:2147483656
            } 
        }); 
		     $.ajax({
					type : "POST",
					url : CONTEXT_ROOT + "/ajax/searchCustomers",
					data : 'cashCentreCode=' + cashCenterCode+dataUrl,
					success : function(results) {
					    $.unblockUI();					
						if(results!=""){
						   $('#jg_popup_inner').css("zIndex","21474836567");
						   prepareSearchCustomerDetailTable(results,1);
						}else{						  
						  // document.getElementById("ErrormessageDiv").innerHTML = "Customer Details Not Found";
						   //openErrorMsgPopup();
						   setMessageDialog('Message',"<span >Customer Details Not Found</span>");
						   $('.ui-dialog').css("zIndex","21474836567");
						}
						
					},
					error : function(e) {					
					    $.unblockUI();					
						//document.getElementById("ErrormessageDiv").innerHTML = "Error Occurred while fetching Customer Details";
						//openErrorMsgPopup();
						setMessageDialog(errorTitle,"<span >Error Occurred while fetching Customer Details</span>");
						 $('.ui-dialog').css("zIndex","21474836567");
						
					}
				});
			}else{
			   $('#jg_popup_inner').css("zIndex","1000");
			   document.getElementById("message3").innerHTML = "Please Select Bank";
		        openErrorPopup();
				 $('.ui-dialog').css("zIndex","21474836567");
		       document.getElementById("scisGroupCode").focus();
			}
	}
	
	

function setCustomerDetails(cisCustCode,customerName,customerGroupCode,customerGroupName){

    document.getElementById('customerCode').value=cisCustCode;
	document.getElementById('customerName').value=customerName;
	document.getElementById('customerGroupCode').value=customerGroupCode;
	document.getElementById('customerGroupName').value=customerGroupName;
	$.jeegoopopup.close();

}

function prepareSearchCustomerDetailTable(results,fromfg){
	
	var html='<table id="customerTblData" style="width: 100%" class="display">'+
				' <thead>'+
					' <tr>'+
						' <th class="viewListTblTH" style="width: 10%; text-align: left;">Customer Code</th>'+
						' <th class="viewListTblTH" style="width: 10%; text-align: left;">Customer Name</th>'+
						' <th class="viewListTblTH" style="width: 10%; text-align: left;">Bank Group Code</th>'+
						' <th class="viewListTblTH" style="width: 10%; text-align: left;">Bank Group Name</th>'+
						
				    ' </tr>'+
				' </thead>'+
				' <tbody>';
				var str;
				if(results!=""){
				  for(var i=0;i<results.length;i++){
				 console.log(">>>>>>>>>>>>>>>>>"+results[i].cisCustCode);
				  html= html+'<tr ondblclick="setCustomerDetails(\''+results[i].cisCustCode+'\',\''+results[i].customerName+'\',\''+results[i].customerGroupCode+'\',\''+results[i].customerGroupName+'\')" style="cursor:hand;cusror:cursor;text-decoration:none;color:#000000">'+
				         '<td>'+results[i].cisCustCode+'</td>'+
						 '<td>'+results[i].customerName+'</td>'+
						 '<td>'+results[i].customerGroupCode+'</td>'+
						 '<td>'+results[i].customerGroupName+'</td>'+
						 '</tr>';
				  }
				
				}
				html= html+'</tbody>'+
			' </table>';
			console.log(html)
			if(fromfg==0)
			prepareCustomerSearch();	
            		
			document.getElementById('customerDetailsDiv').innerHTML=html;
			$('#customerTblData').dataTable();
	
	
	}
	
	
		
function prepareTellerDetailsTable(results,fromfg){
	
	var html='<table id="tellerTblData" style="width: 100%" class="display">'+
				' <thead>'+
					' <tr>'+
						' <th class="viewListTblTH" style="width: 10%; text-align: left;">Employee Code</th>'+
						' <th class="viewListTblTH" style="width: 10%; text-align: left;">Employee Number</th>'+
						' <th class="viewListTblTH" style="width: 10%; text-align: left;">First Name</th>'+
						' <th class="viewListTblTH" style="width: 10%; text-align: left;">Last Name</th>'+						
				    ' </tr>'+
				' </thead>'+
				' <tbody>';
				var str;
				if(results!=""){
				  for(var i=0;i<results.length;i++){
				 console.log(">>>>>>>>>>>>>>>>>"+results[i].employeeCode);
				  html= html+'<tr ondblclick="setTellerDetails(\''+results[i].employeeCode+'\',\''+results[i].employeeNumber+'\',\''+results[i].firstName+''+results[i].lastName+'\')" style="cursor:hand;cusror:cursor;text-decoration:none;color:#000000">'+
				         '<td>'+results[i].employeeCode+'</td>'+
						 '<td>'+results[i].employeeNumber+'</td>'+
						 '<td>'+results[i].firstName+'</td>'+
						 '<td>'+results[i].lastName+'</td>'+
						 '</tr>';
				  }
				
				}
				html= html+'</tbody>'+
			' </table>';
			//console.log(html);
			/*if(fromfg==0)
			prepareTellerSearch();*/	
             document.getElementById('tellerDetailsDiv').innerHTML="";			
			document.getElementById('tellerDetailsDiv').innerHTML=html;
			$('#tellerTblData').dataTable();
	
	
	}
	
	function setTellerDetails(employeeCode,employeeNumber,employeeName){
	
	     document.getElementById('tellerCode').value=employeeCode;
		 document.getElementById('tellerName').value=employeeName;
		 //document.getElementById('tellerDetailsDiv').value=employeeCode;
		$.jeegoopopup.close();
	      
	}

function shiftBRIndex() {
	for ( var index = 0; index < rowCountList.length; index++) {
		
		document.getElementById('discrepancyBRDownId' + rowCountList[index]).name = "retailDiscrepancyBRDownVOs["
				+ index + "].discrepancyBRDownId";
		document.getElementById('denominationType' + rowCountList[index]).name = "retailDiscrepancyBRDownVOs["
				+ index + "].denominationType";
		document.getElementById('denomination' + rowCountList[index]).name = "retailDiscrepancyBRDownVOs["
				+ index + "].denomination";
				document.getElementById('denominationName' + rowCountList[index]).name = "retailDiscrepancyBRDownVOs["
				+ index + "].denominationName";
				
		document.getElementById('quantity' + rowCountList[index]).name = "retailDiscrepancyBRDownVOs["
				+ index + "].quantity";
		document.getElementById('denominationValue' + rowCountList[index]).name = "retailDiscrepancyBRDownVOs["
				+ index + "].denominationValue";
		document.getElementById('totalValue' + rowCountList[index]).name = "retailDiscrepancyBRDownVOs["
				+ index + "].totalValue";
		

	}

}

function getCalender() {
	// alert("getcalendar"+this.id)
	var id = this.id;
	NewCssCal(id);

}

function isNumericQty(rowno) {
	var x = document.getElementById("quantity" + rowno).value;
	if (x == "") {
		document.getElementById("quantity" + rowno).value = "";
		document.getElementById("totalValue" + rowno).value = "0.00";
	} else if (isNaN(x) || x.indexOf(".") > -1 || x.indexOf(" ") > -1) {
		document.getElementById("message3").innerHTML = "Please enter Numeric Value";
		openErrorPopup();
		document.getElementById("quantity" + rowno).focus();
		return false;
	} else if (x.length > 3) {
		document.getElementById("message3").innerHTML = "Size exceded for Quantity\nMaximum size of Quantity is 3 digits";
		openErrorPopup();
		document.getElementById("quantity" + rowno).focus();
	}
	callTotal(rowno);

}

function setbuttons() {
	// alert(rowCountList.length)
	if (rowCountList.length > 0) {
		// for ( var i = 0; i < rowCountList.length - 1; i++) {
		for ( var i = 0; i <= rowCountList.length - 1; i++) {
			// alert( rowCountList[i])
			if (rowCountList.length > 1)
				var delhtml = "<img src='" + CONTEXT_ROOT
						+ "/images/01.png' alt='delete' id='delbuton"
						+ rowCountList[i] + "' onclick=\"deleteTR('"
						+ rowCountList[i] + "')\" title='Delete BreakDown'>";
			else
				delhtml = "";

			var addhtml = "";
			if (i == rowCountList.length - 1) {
				var addhtml = "<img src='"
						+ CONTEXT_ROOT
						+ "/images/4.jpg' alt='delete' id='delbuton"
						+ rowCountList[i]
						+ "' title='Add BreakDown' style='width:20px;height:20px;float:left' onclick=\"addRow()\">";

			}

			document.getElementById("delimgspan" + rowCountList[i]).innerHTML = delhtml;
			document.getElementById("addimgspan" + rowCountList[i]).innerHTML = addhtml;
		}
	}
}

function deleteRow() {
	var id = this.id;
	var rowno = id.substring(9, id.length);
	deleteTR(rowno);
}

function getDenominationObj() {
	var id = this.id;
	var rowno = id.substring(16, id.length);
	getDenominationList(rowno);
}

function getDenominationValObj() {
	var id = this.id;
	var rowno = id.substring(12, id.length);
	getDenominationVal(rowno);
}

function isNumericQtyObj() {
	var id = this.id;
	var rowno = id.substring(8, id.length);
	// alert(rowno)
	isNumericQty(rowno);
}

/*
 * function isNumeric(id) { var val=document.getElementById(id).value; return
 * !isNaN(parseFloat(val)) && isFinite(val); }
 */

function getDenominationList(rowno) {
	console.log("in list");
	// alert("ajax"+rowno)
	document.getElementById("denominationValue" + rowno).value = "0.00";
	document.getElementById("totalValue" + rowno).value = "0.00";
	document.getElementById("quantity" + rowno).value = "";
	removeAllOptions("denomination" + rowno);
	// ajaxcall
	callTotal(rowno);
	getDenominationTypes(rowno);

}


function getDenominationTypes(rowno) {

	var selectelement = document.getElementById("denominationType" + rowno);
	var denominationement = document.getElementById("denomination" + rowno);
	var denominationType = selectelement.value;
	removeAllOptions("denomination" + rowno);
	
			
			for ( var i = 0; i < denoms.length; i++) {
				//alert(denoms[i].denomTypeCode+">>>>>>>>>>"+denominationType)
				if(denoms[i].denomTypeCode==denominationType){
				var optn = document.createElement("OPTION");
				optn.text = denoms[i].description;
				optn.value = denoms[i].code;
				denominationement.options.add(optn);
				}
			}
		
}

function getDenominationVal(rowno) {
	// alert("ajax"+rowno)
	document.getElementById("denominationValue" + rowno).value = "0.00";
	document.getElementById("totalValue" + rowno).value = "0.00";
	callTotal(rowno);
	if (document.getElementById('denomination' + rowno).value != ""
			&& document.getElementById('denomination' + rowno).value != "-1") {
		getDenomValueAjax(rowno);
	}
}


function getDenomValueAjax(rowno){
    var denomCode = document.getElementById("denomination" + rowno).value;
	var result=getDnomValue(denomCode);
	if(result!=""){
	var denominationValue = parseFloat(result).toFixed(2);
	document.getElementById("denominationValue" + rowno).value = denominationValue;
	callTotal(rowno);
	}

}

function getDnomValue(denomCode){
   
   for ( var i = 0; i < denoms.length; i++) {
				//alert(denoms[i].denomTypeCode+">>>>>>>>>>"+denominationType)
				if(denoms[i].code==denomCode){
				   return denoms[i].value;
				}
			}

}

function callTotal(rowno) {
	var denominationValue = document
			.getElementById("denominationValue" + rowno).value;
	var quantity = document.getElementById("quantity" + rowno).value;
	if(quantity.length>0){
		var totalValue = parseFloat(denominationValue) * parseInt(quantity);
		document.getElementById("totalValue" + rowno).value = parseFloat(totalValue)
			.toFixed(2);
	}

}

function removeAllOptions(selectboxId) {
	var selectbox = document.getElementById(selectboxId);
	var i;
	for (i = selectbox.options.length - 1; i >= 1; i--) {

		selectbox.remove(i);
	}
}
function addOption(selectbox, text, value) {
	var optn = document.createElement("OPTION");
	optn.text = text;
	optn.value = value;
	selectbox.options.add(optn);
}
function deleteTR(rowno){
document.getElementById("message").innerHTML = "Are you sure do you want to delete <input type='hidden' id=\"delRowNumber\" value=\""+rowno+"\"  > ?";
				
		openConfirmBox();
}

function deleteTR1(rowno) {
	//var res = confirm("Are you sure do you want to delete the BreakDown ");
	//if (res == true) {
	//alert(rowno)
		var table = document.getElementById("dataTable");
		var rowCount = table.rows.length;
		// alert(rowCount)
		for ( var i = 1; i < rowCount; i++) {
			var row = table.rows[i];
			if (row.id == "tr" + rowno) {
				if (document.getElementById("discrepancyBRDownId" + rowno).value != "")
					delIds.push(document.getElementById("discrepancyBRDownId"
							+ rowno).value);
				var temparr = [];
				for ( var index = 0; index < rowCountList.length; index++) {
					if (rowCountList[index] != rowno)
						temparr.push(rowCountList[index]);
				}
				rowCountList = temparr;
				table.deleteRow(i);
				shiftBRIndex();
				break;
			}
		}

		if (rowCount == 2) {
			addRow();
		} else {
			setbuttons();
		}
	//}

}
function callSave() {
	var chkfg = chkCallSave();
	if (chkfg == 1) {
		document.getElementById("savebtn").disabled = true;
		document.getElementById("cancelbtn").disabled = true;
		document.myform.submit();
	}

}
function callEditSave() {
	var chkfg = chkCallSave();
	if (chkfg == 1) {
		
		document.myform.submit();
	}

}



function chkCallSave() {
	var chkfg = 1;
	var brchk = 1;

	if (document.getElementById("cashCenterCode").value == "") {
	     
		//document.getElementById("messageDialogTxt").innerHTML = "Please Select Cash Centre";
		setMessageDialog(validationTitle,"<span >Please Select Cash Centre</span>");
		document.getElementById("cashCenterCode").focus();
		chkfg = 0;
	} 
	else if (document.getElementById("customerCode").value == "") {
		//document.getElementById("message3").innerHTML = "Please Select Customer Code";
		//openErrorPopup();
		setMessageDialog(validationTitle,"<span >Please Select Customer Code</span>");
		document.getElementById('customerCode').focus();
		chkfg = 0;
	}else if (document.getElementById("customerGroupCode").value == "") {
		//document.getElementById("message3").innerHTML = "Please Select Group Name";
		//openErrorPopup();
		setMessageDialog(validationTitle,"<span >Please Select Group Group Name</span>");
		document.getElementById("customerGroupCode").focus();
		chkfg = 0;
	}else if (document.getElementById("tellerCode").value == "") {
		//document.getElementById("message3").innerHTML = "Please Select Teller Number";
		//openErrorPopup();
		setMessageDialog(validationTitle,"<span >Please Select Teller Number</span>");
		document.getElementById("tellerCode").focus();
		chkfg = 0;
	}else if (document.getElementById("tellerName").value == "") {
		//document.getElementById("message3").innerHTML = "Please Select Teller Name";
		//openErrorPopup();
		setMessageDialog(validationTitle,"<span >Please Select Teller Name</span>");
		document.getElementById("tellerName").focus();
		chkfg = 0;
	}
	
	/*else if (document.getElementById("envelopeId").value == "") {
		document.getElementById("message3").innerHTML = "Please enter Envelope ID";
		openErrorPopup();
		document.getElementById("envelopeId").focus();
		chkfg = 0;
	}else if (document.getElementById("sealCode").value == "") {
		document.getElementById("message3").innerHTML = "Please enter Seal Code";
		openErrorPopup();
		document.getElementById("sealCode").focus();
		chkfg = 0;
	}*/else if (document.getElementById("discrLevelCode").value == "") {
		//document.getElementById("message3").innerHTML = "Please select Discrepancy level";
		//openErrorPopup();
		setMessageDialog(validationTitle,"<span >Please select Discrepancy level</span>");
		document.getElementById("discrLevelCode").focus();
		chkfg = 0;
	}
	
	else if (document.getElementById("depositAmount").value == "") {
		//document.getElementById("message3").innerHTML = "Please enter Deposit Amount";
		//openErrorPopup();
		setMessageDialog(validationTitle,"<span >Please enter Deposit Amount</span>");
		document.getElementById("depositAmount").focus();
		chkfg = 0;
	}else if (document.getElementById("declaredAmount").value == "") {
		//document.getElementById("message3").innerHTML = "Please enter Declared Amount";
		//openErrorPopup();
		setMessageDialog(validationTitle,"<span >Please enter Declared Amount</span>");
		document.getElementById("declaredAmount").focus();
		chkfg = 0;
	}else if (document.getElementById("receivedAmount").value == "") {
		//document.getElementById("message3").innerHTML = "Please enter Received Amount";
		//openErrorPopup();
		setMessageDialog(validationTitle,"<span >Please enter Received Amount</span>");
		document.getElementById("receivedAmount").focus();
		chkfg = 0;
	 //document.getElementById("ErrormessageDiv").innerHTML = "Discrepancy is invalid";
			//  openErrorMsgPopup();

	}else if (parseFloat(document.getElementById("discrAmount").value) == "") {
		
		chkfg = 0;
	   // document.getElementById("ErrormessageDiv").innerHTML = "Discrepancy is invalid";
       //openErrorMsgPopup();
	   setMessageDialog(validationTitle,"<span >Discrepancy is invalid</span>");

	} else if (parseFloat(document.getElementById("discrepancyTypeCode").value) == "") {
		
		chkfg = 0;
	   // document.getElementById("ErrormessageDiv").innerHTML = "Discrepancy is invalid";
       //openErrorMsgPopup();
	   setMessageDialog(validationTitle,"<span >Discrepancy is invalid</span>");

	}else {
		var count = 0;
		for ( var index = 0; index < rowCountList.length; index++) {
			count++;
			

			 if (document.getElementById('denominationType'
					+ rowCountList[index]).value == "-1") {
				brchk = 0;
				//document.getElementById("message3").innerHTML = "Please Select Denomination Type";
				//openErrorPopup();
				setMessageDialog(validationTitle,"<span >Please Select Denomination Type</span>");
				document.getElementById(
						'denominationType' + rowCountList[index]).focus();
				break;

			} else if (document.getElementById('denomination'
					+ rowCountList[index]).value == "-1") {
				brchk = 0;
				//document.getElementById("message3").innerHTML = "Please Select Denomination";
				//openErrorPopup();
				setMessageDialog(validationTitle,"<span >Please Select Denomination</span>");
				document.getElementById('denomination' + rowCountList[index])
						.focus();
				break;
			} else if (document
					.getElementById('quantity' + rowCountList[index]).value == "") {
				brchk = 0;
				//document.getElementById("message3").innerHTML = "Please Enter Quantity";
				//openErrorPopup();
				setMessageDialog(validationTitle,"<span >Please Enter Quantity</span>");
				document.getElementById('quantity' + rowCountList[index])
						.focus();
				break;
			} else if (document
					.getElementById('quantity' + rowCountList[index]).value <= 0) {
				brchk = 0;
				//document.getElementById("message3").innerHTML = "Quantity should be greaterthan 0";
				//openErrorPopup();
				setMessageDialog(validationTitle,"<span >Quantity should be greaterthan 0</span>");
				document.getElementById('quantity' + rowCountList[index])
						.focus();
				break;
			} else if ((document.getElementById('quantity'
					+ rowCountList[index]).value).length > 3) {
				brchk = 0;
				//document.getElementById("message3").innerHTML = "Size exceded for Quantity\nMaximum size of Quantity is 3 digits";
				//openErrorPopup();
				setMessageDialog(validationTitle,"<span >Size exceded for Quantity\nMaximum size of Quantity is 3 digits</span>");
				document.getElementById("quantity" + rowno).focus();
				break;
				
			} 
			
			var denomination = document.getElementById('denomination'
					+ rowCountList[index]);
        document.getElementById('denominationName'
					+ rowCountList[index]).value = denomination.options[denomination.selectedIndex].text;
		}
		if (count == 0) {
			//document.getElementById("message3").innerHTML = "Please fill atleast one Counterfeit Details";
			//openErrorPopup();
			setMessageDialog(validationTitle,"<span >Please fill atleast one Counterfeit Details</span>");
			brchk = 0;
		}
		if (brchk == 0) {
			// alert("please fill all mandatory fields in Discrepancy Break
			// Downs");
			chkfg = 0;
		}

	}

	if (chkfg == 1) {
		document.getElementById('delIds').value = delIds;		
		// document.myform.submit();
		var discrLevelCode = document.getElementById("discrLevelCode");
        document.getElementById("discrLevelDescription").value = discrLevelCode.options[discrLevelCode.selectedIndex].text;
		
		var discrepancyTypeCode = document.getElementById("discrepancyTypeCode");
        document.getElementById("discrepancyTypeName").value = discrepancyTypeCode.options[discrepancyTypeCode.selectedIndex].text;
		
		
	}
	return chkfg;

}

function validateDateObj() {
	dateValidation(this.id);
}
function returnConfirmation (){
  return true;
}


$(document).ready(function() {

	$(function() {
		$("#Validation").dialog({

			autoOpen : false,
			modal : true,
			 
			show : {
				duration : 1000
			},
			hide : {

				duration : 1000
			}
		});
	});

	openErrorPopup = function() { // #cancel is the id of the button
		$("#Validation").dialog("open");
		var state = true;
		if (state) {
			$("#Validation").animate({
				backgroundColor : "grey",
				color : "rgba(0, 0, 0, 0.48)",
				
				width : 500
			}, 1000);
		}
	};
	$("#valiationOkButton").click(function() {
	    $('.ui-dialog').css("zIndex","100");
		$("#Validation").dialog("close");
		$('#jg_popup_inner').css("zIndex","10000000000000000");
		
	});
	
	
	
	
	
	
	// success popup starts
	$(function() {
		$("#ErrorDiv").dialog({

			autoOpen : false,
			modal : true,
			show : {
				duration : 1000
			},
			hide : {

				duration : 1000
			}
		});
	});

	openErrorMsgPopup = function() { // #cancel is the id of the
		// button
		$("#ErrorDiv").dialog("open");
		var state = true;
		if (state) {
			$("#ErrorDiv").animate({
				backgroundColor : "grey",
				color : "rgba(0, 0, 0, 0.48)",
				width : 500
			}, 1000);
		}
	};
	$("#errorOkButton").click(function() {
	$('.ui-dialog').css("zIndex","100");
		$("#ErrorDiv").dialog("close");
		$('#jg_popup_inner').css("zIndex","10000000000000000");
		
	});
	// Error popups ends
	openConfirmBox = function() {
							console.log("inside cnfrm function");
							$("#dialog").dialog("open");
							var state = true;
							if (state) {
								$("#dialog").animate({
									backgroundColor : "grey",
									color : "rgba(0, 0, 0, 0.48)",
									width : 500
								}, 500);
							}
						};

						$("#canelYesButton")
								.click(
										function() {
											
											deleteTR1($(
													'#message #delRowNumber')
													.val());
													$("#dialog").dialog("close");
										});
						$("#canelNoButton").click(function() {
							$("#dialog").dialog("close");
						});
	
	getDenoms();
	getResParties();
	
});


function closeDiscrDetails(){
	
	    console.log("inside closeDiscrDetails");
		var discrepancyId=document.getElementById("discrepancyId").value;
        var closedDate=document.getElementById("closedDate").value;
        console.log("closedDate"+closedDate);
       var responsibleParty=document.getElementById("responsibleParty").value;
	  var closeReason=document.getElementById("closeReason").value;
       var actionTaken=document.getElementById("actionTaken").value;
	   var dataUrl="";
	   if(closedDate!=""){
	   dataUrl="&closedDate="+closedDate;
	   }
	   if(responsibleParty!=""){
	   dataUrl=dataUrl+"&resPartyCode="+responsibleParty;
	   dataUrl=dataUrl+"&resPartyName="+document.getElementById("responsibleParty").options[document.getElementById("responsibleParty").selectedIndex].text;
	   }
	     if(actionTaken!=""){
	   dataUrl=dataUrl+"&actionTaken="+actionTaken;
	   }
	   
	    if(closeReason!=""){
	   dataUrl=dataUrl+"&closurereason="+closeReason;
	   }
	  
		
	   console.log(dataUrl);
	    if(closedDate==""){
		   $('#jg_popup_inner').css("zIndex","1000");
			  setMessageDialog(validationTitle,"<span >Please Select Closed Date</span>");
				 $('.ui-dialog').css("zIndex","21474836567");
		       
		}else if(closeReason==""){
		    $('#jg_popup_inner').css("zIndex","1000");
			  setMessageDialog(validationTitle,"<span >Please Enter Reason </span>");
				 $('.ui-dialog').css("zIndex","21474836567");
		       
		}else if(responsibleParty==""){
		    $('#jg_popup_inner').css("zIndex","1000");
			  setMessageDialog(validationTitle,"<span >Please Select Responsible Party</span>");
				 $('.ui-dialog').css("zIndex","21474836567");
		       
		}else if(actionTaken==""){
		    $('#jg_popup_inner').css("zIndex","1000");
			  setMessageDialog(validationTitle,"<span >Please Enter Action Taken </span>");
				 $('.ui-dialog').css("zIndex","21474836567");
		       
		}else{
		$('#jg_popup_inner').css("zIndex","1000");
		$.blockUI({ 
            message: $('#loadingmessage'), 
            css: { 
                top:  ($(window).height() - 100) /2 + 'px', 
                left: ($(window).width() - 100) /2 + 'px', 
                width: '100px' ,
				zIndex:2147483656
            } 
        }); 
		     $.ajax({
					type : "POST",
					url : CONTEXT_ROOT + "/ajax/closeRetailDiscr",
					data : 'discrepancyId=' + discrepancyId+dataUrl,
					success : function(results) {
					    $.unblockUI();					
						if(results!=""){
						    $("#REFRESH_FG").val('1');
						   $('#jg_popup_inner').css("zIndex","21474836567");
						   
						  setMessageDialog('Message',"<span >Discrepancy closed successfully</span>");
						  $.jeegoopopup.close();
						}else{						  
						 
						   setMessageDialog('Message',"<span >Customer Details Not Found</span>");
						   $('.ui-dialog').css("zIndex","21474836567");
						}
						
					},
					error : function(e) {					
					    $.unblockUI();					
						setMessageDialog(errorTitle,"<span >Error Occurred while Closing Discrepancy</span>");
						 $('.ui-dialog').css("zIndex","21474836567");
						
					}
				});
			}
}

var resParties;
function getResParties() {

	
		     $.ajax({
					type : "POST",
					url : CONTEXT_ROOT + "/ajax/getResParties",
					success : function(result) {
						resParties=result;
						
						
					},
					error : function(e) {
						//document.getElementById("ErrormessageDiv").innerHTML = "Error Occurred"+e;
						//openErrorMsgPopup();
						setMessageDialog(validationTitle,"<span >Error occured while fetching Responsible Parties</span>");
					}
				});
	}
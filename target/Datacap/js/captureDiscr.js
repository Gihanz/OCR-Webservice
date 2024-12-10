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
function callAuthentic(apprrejfg) {
	var username = document.getElementById("suserName").value;
	var password = document.getElementById("spassword").value;
	if (username == "") {
		alert("Please enter Username");
		document.getElementById("suserName").focus();
	} else if (password == "") {
		alert("Please enter Password");
		document.getElementById("spassword").focus();
	} else {

		$.ajax({
			type : "POST",
			url : CONTEXT_ROOT + "/ajax/authenticate",
			data : 'suserName=' + username + '&spassword=' + password
					+ '&apprrejfg=' + apprrejfg,
			success : function(result) {
				if (result.length > 0) {
					document.getElementById("updatedUser").value = result;
					document.getElementById("approveRejFg").value = apprrejfg;
					closeDiv();
					document.myform.submit();
				} else {
					alert("Invalid username or Password, Please try again");
				}

			},
			error : function(e) {
				document.getElementById("ErrormessageDiv").innerHTML = "Error Occurred"+e;
				openErrorMsgPopup();
			}
		});

	}
}

function getDenominationTypes(rowno) {

	var selectelement = document.getElementById("denominationType" + rowno);
	var denominationement = document.getElementById("denomination" + rowno);
	var denominationType = selectelement.value;
	// alert(denominationType)
	$.ajax({
		type : "POST",
		url : CONTEXT_ROOT + "/ajax/denomTypes",
		data : 'type=' + denominationType,
		success : function(result) {
			removeAllOptions("denomination" + rowno);
			for ( var i = 0; i < result.length; i++) {
				var optn = document.createElement("OPTION");
				optn.text = result[i].description;
				optn.value = result[i].denominationId;
				denominationement.options.add(optn);
			}
		},
		error : function(e) {
			document.getElementById("ErrormessageDiv").innerHTML = "Error Occurred"+e;
			openErrorMsgPopup();
		}
	});
}

function getDenomValueAjax(rowno) {

	var denominationVal = document.getElementById("denomination" + rowno).value;
	// alert(denominationVal)
	$
			.ajax({
				type : "POST",
				url : CONTEXT_ROOT + "/ajax/denomVal",
				data : 'denominationId=' + denominationVal,
				success : function(result) {
					var denominationValue = parseFloat(result).toFixed(2);
					document.getElementById("denominationValue" + rowno).value = denominationValue;
					callTotal(rowno);
				},
				error : function(e) {
					document.getElementById("ErrormessageDiv").innerHTML = "Error Occurred"+e;
					openErrorMsgPopup();
				}
			});
}

function getBranchIBTAjax() {
   var memberNo=document.getElementById('bankMemberNumber').value;
	$.ajax({
		type : "POST",
		url : CONTEXT_ROOT + "/ajax/branchIBT/"+memberNo,
		success : function(result) {
			//alert(result)
			if(result=="NOTFOUND"){
				document.getElementById('mixed').checked=false;
				unCheckMixed();
				document.getElementById("ErrormessageDiv").innerHTML = "Default IBT Not Found";
				openErrorMsgPopup();
			}else{
			document.getElementById('branchIBT').value = result;
			//document.getElementById('branchIBT').readOnly = true;
			}
		},
		error : function(e) {
			document.getElementById("ErrormessageDiv").innerHTML = "Error Occurred"+e;
			openErrorMsgPopup();
			//alert('Error: ' + e);
		}
	});
}

function checkMixed() {
	if (document.getElementById('mixed').checked == true) {
		 var memberNo=document.getElementById('bankMemberNumber').value;
		 var alertmsg="";
		if (document.getElementById("bankName").value == "-1") 
			alertmsg="Please Select Bank Group";
		else if(memberNo=="" || memberNo.length==0)
			alertmsg="Bank MemberNumber doesn't exist";
		
		if(alertmsg!="" && alertmsg.length>0){
			document.getElementById('mixed').value = 0;
			document.getElementById('branchIBT').value = '';
			document.getElementById('mixed').checked=false;
			document.getElementById("message3").innerHTML = alertmsg;
			openErrorPopup();
			document.getElementById("bankName").focus();
		}else{
		    document.getElementById('mixed').value = 1;
		    document.getElementById("branchName2").options[0].innerHTML="---Not Applicable---";
		    getBranchIBTAjax();
		}
	} else {
		unCheckMixed();
	}

}

function unCheckMixed(){
	document.getElementById('mixed').value = 0;
	document.getElementById('branchIBT').value = '';
	var e = document.getElementById("branchName2");
	var branchIBT  = e.options[e.selectedIndex].value;
	document.getElementById('branchIBT').value= branchIBT;
	document.getElementById("branchName2").options[0].innerHTML="---Please Select---";
}

function shiftBRIndex() {
	for ( var index = 0; index < rowCountList.length; index++) {
		document.getElementById('discrepancyType' + rowCountList[index]).name = "discrepancyBRDownVO["
				+ index + "].discrepancyType";
		document.getElementById('discrepancyBRDownId' + rowCountList[index]).name = "discrepancyBRDownVO["
				+ index + "].discrepancyBRDownId";
		document.getElementById('denominationType' + rowCountList[index]).name = "discrepancyBRDownVO["
				+ index + "].denominationType";
		document.getElementById('denomination' + rowCountList[index]).name = "discrepancyBRDownVO["
				+ index + "].denomination";
		document.getElementById('quantity' + rowCountList[index]).name = "discrepancyBRDownVO["
				+ index + "].quantity";
		document.getElementById('denominationValue' + rowCountList[index]).name = "discrepancyBRDownVO["
				+ index + "].denominationValue";
		document.getElementById('totalValue' + rowCountList[index]).name = "discrepancyBRDownVO["
				+ index + "].totalValue";
		document.getElementById('tellerNumber' + rowCountList[index]).name = "discrepancyBRDownVO["
				+ index + "].tellerNumber";
		document.getElementById('sorterDate' + rowCountList[index]).name = "discrepancyBRDownVO["
				+ index + "].sorterDate";
		document.getElementById('sorterName' + rowCountList[index]).name = "discrepancyBRDownVO["
				+ index + "].sorterName";
		document.getElementById('boxDate' + rowCountList[index]).name = "discrepancyBRDownVO["
				+ index + "].boxDate";
		document.getElementById('bundleDate' + rowCountList[index]).name = "discrepancyBRDownVO["
				+ index + "].bundleDate";
		document.getElementById('createdDate' + rowCountList[index]).name = "discrepancyBRDownVO["
				+ index + "].createdDate";
		document.getElementById('createdUser' + rowCountList[index]).name = "discrepancyBRDownVO["
				+ index + "].createdUser";

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

function deleteTR(rowno) {
	var res = confirm("Are you sure do you want to delete the BreakDown ");
	if (res == true) {
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
	}

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
		// supervisoraAuthentication();
		document.myform.submit();
	}

}

function chkbranchIBT() {
	var branchIBT = document.getElementById("branchIBT").value;
	if (branchIBT.length > 18) {
		document.getElementById("message3").innerHTML = "Size exceded for Branch IBT\nMaximum size for Branch IBT is 18 characters.";
		openErrorPopup();
		document.getElementById("branchIBT").focus();
	} else if (chkSpecialChars('branchIBT')) {
		document.getElementById("message3").innerHTML = "Special characters Not allowed in BranchIBT.";
		openErrorPopup();
		document.getElementById("branchIBT").focus();
	}

}

function chkbranchCode() {
	var branchCode = document.getElementById("branchCode").value;
	if (branchCode.length > 18) {
		document.getElementById("message3").innerHTML = "Size exceded for Branch Code\nMaximum size for Branch Code is 18 characters.";
		openErrorPopup();
		document.getElementById("branchCode").focus();
	} else if (chkSpecialChars('branchCode')) {
		document.getElementById("message3").innerHTML = "Special characters Not allowed in BranchCode";
		openErrorPopup();
		document.getElementById("branchCode").focus();
	}

}

function chkCallSave() {
	var chkfg = 1;
	var brchk = 1;

	document.getElementById("branchIBT").value = (document
			.getElementById("branchIBT").value).trim();
	document.getElementById("branchCode").value = (document
			.getElementById("branchCode").value).trim();

	if (document.getElementById("cashCenterId").value == "") {
		document.getElementById("message3").innerHTML = "Please Select Cash Centre";
		openErrorPopup();
		document.getElementById("cashCenterName").focus();
		chkfg = 0;
	} 
	else if (document.getElementById("bankName").value == "-1") {
		document.getElementById("message3").innerHTML = "Please Select Bank Group";
		openErrorPopup();
		document.getElementById("bankName").focus();
		chkfg = 0;
	} else if (document.getElementById("branchName2").value == "" && document.getElementById("mixed").checked==false) {
		
		document.getElementById("message3").innerHTML = "Please Select Branch Name";
		openErrorPopup();		
		document.getElementById("branchName2").focus();
		chkfg = 0;
	} 
	else if ((document.getElementById("branchCode").value).length > 18) {
		document.getElementById("message3").innerHTML = "Size exceded for Branch Code\nMaximum size for Branch Code is 18 characters.";
		openErrorPopup();
		document.getElementById("branchCode").focus();
		chkfg = 0;
	} else if (chkSpecialChars('branchCode')) {
		document.getElementById("message3").innerHTML = "Special characters Not allowed in BranchCode";
		openErrorPopup();
		document.getElementById("branchCode").focus();
		chkfg = 0;
	} else if ((document.getElementById("branchIBT").value) == "") {
		document.getElementById("message3").innerHTML = "Please Enter Branch IBT";
		openErrorPopup();
		document.getElementById("branchIBT").focus();
		chkfg = 0;
	} else if ((document.getElementById("branchIBT").value).length > 18) {
		document.getElementById("message3").innerHTML = "Size exceded for Branch IBT\nMaximum size for Branch IBT is 18 characters.";
		openErrorPopup();
		document.getElementById("branchIBT").focus();
		chkfg = 0;
	} else if (chkSpecialChars('branchIBT')) {
		document.getElementById("message3").innerHTML = "Special characters Not allowed in BranchIBT";
		openErrorPopup();
		document.getElementById("branchIBT").focus();
		chkfg = 0;
	}else if ((document.getElementById("commentId").value) == "") {
		document.getElementById("message3").innerHTML = "Please Select Comment";
		openErrorPopup();
		document.getElementById("commentId").focus();
		chkfg = 0;
	} else {
		var count = 0;
		for ( var index = 0; index < rowCountList.length; index++) {
			count++;
			document.getElementById('tellerNumber' + rowCountList[index]).value = (document
					.getElementById('tellerNumber' + rowCountList[index]).value)
					.trim();
			document.getElementById('sorterName' + rowCountList[index]).value = (document
					.getElementById('sorterName' + rowCountList[index]).value)
					.trim();

			if (document
					.getElementById('discrepancyType' + rowCountList[index]).value == "-1") {
				brchk = 0;
				document.getElementById("message3").innerHTML = "Please Select Discrepancy Type";
				openErrorPopup();
				document
						.getElementById('discrepancyType' + rowCountList[index])
						.focus();
				break;
			} else if (document.getElementById('denominationType'
					+ rowCountList[index]).value == "-1") {
				brchk = 0;
				document.getElementById("message3").innerHTML = "Please Select Denomination Type";
				openErrorPopup();
				document.getElementById(
						'denominationType' + rowCountList[index]).focus();
				break;

			} else if (document.getElementById('denomination'
					+ rowCountList[index]).value == "-1") {
				brchk = 0;
				document.getElementById("message3").innerHTML = "Please Select Denomination";
				openErrorPopup();
				document.getElementById('denomination' + rowCountList[index])
						.focus();
				break;
			} else if (document
					.getElementById('quantity' + rowCountList[index]).value == "") {
				brchk = 0;
				document.getElementById("message3").innerHTML = "Please Enter Quantity";
				openErrorPopup();
				document.getElementById('quantity' + rowCountList[index])
						.focus();
				break;
			} else if (document
					.getElementById('quantity' + rowCountList[index]).value <= 0) {
				brchk = 0;
				document.getElementById("message3").innerHTML = "Quantity should be greaterthan 0";
				openErrorPopup();
				document.getElementById('quantity' + rowCountList[index])
						.focus();
				break;
			} else if ((document.getElementById('quantity'
					+ rowCountList[index]).value).length > 3) {
				brchk = 0;
				document.getElementById("message3").innerHTML = "Size exceded for Quantity\nMaximum size of Quantity is 3 digits";
				openErrorPopup();
				document.getElementById("quantity" + rowno).focus();
				break;
				
			} else if ((document.getElementById('totalValue'
					+ rowCountList[index]).value).length > 16) {
				brchk = 0;
				document.getElementById("message3").innerHTML = "Size exceded for Total Value\nMaximum size for Total Value is 16 digits";
				openErrorPopup();
				document.getElementById("totalValue" + rowno).focus();
				break;
			} else if (document.getElementById('tellerNumber'
					+ rowCountList[index]).value == "") {
				brchk = 0;
				document.getElementById("message3").innerHTML = "Please Enter Teller Number";
				openErrorPopup();
				document.getElementById('tellerNumber' + rowCountList[index])
						.focus();
				break;
			} else if ((document.getElementById('tellerNumber'
					+ rowCountList[index]).value).length > 15) {
				brchk = 0;
				document.getElementById("message3").innerHTML = "Size exceded for Teller Number\nMaximum size for Teller Number is 15 characters.";
				openErrorPopup();
				document.getElementById('tellerNumber' + rowCountList[index])
						.focus();
				break;
			} else if (chkSpecialChars('tellerNumber' + rowCountList[index])) {
				brchk = 0;
				document.getElementById("message3").innerHTML = "Special characters not allowed in Teller Number";
				openErrorPopup();
				document.getElementById('tellerNumber' + rowCountList[index])
						.focus();
				break;
			} else if (document.getElementById('sorterDate'
					+ rowCountList[index]).value == "") {
				brchk = 0;
				document.getElementById("message3").innerHTML = "Please Select Sorted Date";
				openErrorPopup();
				document.getElementById('sorterDate' + rowCountList[index])
						.focus();
				break;
			} else if (document.getElementById('sorterName'
					+ rowCountList[index]).value == "") {
				brchk = 0;
				document.getElementById("message3").innerHTML = "Please Enter Sorter Name";
				openErrorPopup();
				document.getElementById('sorterName' + rowCountList[index])
						.focus();
				break;

			} else if ((document.getElementById('sorterName'
					+ rowCountList[index]).value).length > 20) {
				brchk = 0;
				document.getElementById("message3").innerHTML = "Size exceded for Sorter Name\nMaximum size for Sorter Name is 20 characters.";
				openErrorPopup();
				document.getElementById('sorterName' + rowCountList[index])
						.focus();
				break;
			}

			else if (chkSpecialChars('sorterName' + rowCountList[index])) {
				brchk = 0;
				document.getElementById("message3").innerHTML = "Special characters not allowed in Sorter Name";
				openErrorPopup();
				document.getElementById('sorterName' + rowCountList[index])
						.focus();
				break;
			} else if (document.getElementById('boxDate' + rowCountList[index]).value == "") {
				brchk = 0;
				document.getElementById("message3").innerHTML = "Please Select Box Date";
				openErrorPopup();
				document.getElementById('boxDate' + rowCountList[index])
						.focus();
				break;

			} else if (document.getElementById('bundleDate'
					+ rowCountList[index]).value == "") {

				brchk = 0;
				document.getElementById("message3").innerHTML = "Please Select Bundle Date";
				openErrorPopup();
				document.getElementById('bundleDate' + rowCountList[index])
						.focus();
				break;
			}

			/*
			 * if (document.getElementById('discrepancyType' +
			 * rowCountList[index]).value == "-1" ||
			 * document.getElementById('denominationType' +
			 * rowCountList[index]).value == "-1" ||
			 * document.getElementById('denomination' +
			 * rowCountList[index]).value == "-1" || document
			 * .getElementById('quantity' + rowCountList[index]).value == "" ||
			 * document.getElementById('tellerNumber' +
			 * rowCountList[index]).value == "" ||
			 * document.getElementById('sorterDate' + rowCountList[index]).value == "" ||
			 * document.getElementById('sorterName' + rowCountList[index]).value == "" ||
			 * document.getElementById('boxDate' + rowCountList[index]).value == "" ||
			 * document.getElementById('bundleDate' + rowCountList[index]).value ==
			 * "") { brchk = 0; }
			 */
		}
		if (count == 0) {
			document.getElementById("message3").innerHTML = "Please fill atleast one Break Down Details";
			openErrorPopup();
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
	}
	return chkfg;

}

/*
 * function supervisoraAuthentication() {
 * document.getElementById('light').style.display = 'block'; var htmltxt = "<div
 * style='text-align:center;'><caption><h3>HOD Credentials </h3></caption><table
 * align=center><tr><td >Username</td><td><input id='suserName'
 * name='suserName' style='width:160px;' type='text'></td></tr>"; htmltxt =
 * htmltxt + "<tr> <td >Password</td><td><input type='password'
 * id='spassword' style='width:160px;'></td></tr><tr style='height:25px'></tr><tr>";
 * htmltxt = htmltxt + "<td colspan=2 style='text-align: center;' id=saveRow><input
 * type='button' id='Approve' class='button-main' value='Approve'
 * onclick='javascript:callAuthentic(0)'><input type='button' id='Reject'
 * class='button-main' value='Reject' onclick='javascript:callAuthentic(1)'><input
 * type='button' id='save' class='button-cancel' value='cancel'
 * onclick='closeDiv()'></td>"; htmltxt = htmltxt + "</tr></table></center></div>";
 * document.getElementById('light').innerHTML = htmltxt; }
 */
function closeDiv() {
	document.getElementById('light').style.display = 'none';
}
function validateDateObj() {
	dateValidation(this.id);
}

function dateValidation(txtId) {
	var value = document.getElementById(txtId).value;
	if (value.length > 0) {
		if (!isValidDate(value, 'yyyy-mm-dd')) {
			document.getElementById("message3").innerHTML = "Please enter a valid date";
			openErrorPopup();
			document.getElementById(txtId).value = "";
			document.getElementById(txtId).focus();

		} else {
			var todayDate = new Date();
			todayDate.setHours(0, 0, 0, 0);

			var brdate = new Date(value);
			brdate.setHours(0, 0, 0, 0);
			var earlierdaate = new Date(todayDate);
			earlierdaate.setDate(earlierdaate.getDate() - 30);
			earlierdaate.setHours(0, 0, 0, 0);
			var todaymont = 0;
			var earliermont = 0;

			var todayday = 0;
			var earlierday = 0;

			if (((todayDate.getMonth()) + 1) < 10)
				todaymont = "0" + ((todayDate.getMonth()) + 1);
			else
				todaymont = (todayDate.getMonth()) + 1;

			if (((earlierdaate.getMonth()) + 1) < 10)
				earliermont = "0" + ((earlierdaate.getMonth()) + 1);
			else
				earliermont = (earlierdaate.getMonth()) + 1;

			if ((todayDate.getDate()) < 10)
				todayday = "0" + (todayDate.getDate());
			else
				todayday = (todayDate.getDate());

			if ((earlierdaate.getDate()) < 10)
				earlierday = "0" + (earlierdaate.getDate());
			else
				earlierday = (earlierdaate.getDate());

			var todateformat = todayDate.getFullYear() + "-" + todaymont + "-"
					+ todayday;
			var fromdateformat = earlierdaate.getFullYear() + "-" + earliermont
					+ "-" + earlierday;
			console.log(todayDate);
			console.log(brdate);
			console.log(earlierdaate);

			if (brdate > todayDate) {
				document.getElementById("message3").innerHTML = "Date range is exceded.\n Valid Date range is from "
						+ fromdateformat + " to " + todateformat;
				openErrorPopup();
				document.getElementById(txtId).value = "";
				document.getElementById(txtId).focus();

			} else if (brdate < earlierdaate) {
				document.getElementById("message3").innerHTML = "Date range is exceded.\n Valid Date range is from "
						+ fromdateformat + " to " + todateformat;
				openErrorPopup();
				document.getElementById(txtId).value = "";
				document.getElementById(txtId).focus();
			}

		}
	}
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
		$("#Validation").dialog("close");
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
		$("#ErrorDiv").dialog("close");
		
	});
	// Error popups ends
	
	
	
	
	
});

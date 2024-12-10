setInterval("my_function();", 300000);

var waitMessage='<h1> Just a moment...!</h1>';
function my_function() {
	console.log("refreshing");
	//window.location.reload();
	var service= document.forms["discrepany"]["service"].value;
	var date= document.forms["discrepany"]["date"].value;
	if(service!=""  && date!=""){
	  	document.forms["discrepany"].submit();
	}else{
		window.location.reload();
	}
}

// need to assign value for nackErrorCode,errorFileType--> composite key in DB
var seqNo, fileName, createdDate, serviceType, fileTypeDisc, updatedDate, sourceId, errorFileType, nackErrorCode, fileCreateDate;
// sourceId,errorFileType,nackErrorCode;
function selectRadio(text) {
	console.log("1");
	var rates = document.getElementsByName('file');
	var rate_value;
	for ( var i = 0; i < rates.length; i++) {
		if (rates[i].checked) {
			rate_value = rates[i].value;
			console.log("selected " + rate_value);
		}
	}
	var split = rate_value.split(',');
	seqNo = split[0];
	fileName = split[1];
	createdDate = split[2];
	serviceType = split[3];
	fileTypeDisc = split[4];
	updatedDate = split[5];
	sourceId = split[6];
	fileCreateDate = split[7];
	console.log("seqNo " + seqNo + " fileName " + fileName + " createdDate "
			+ createdDate + " serviceType " + serviceType + " fileTypeDisc "
			+ fileTypeDisc + " updatedDate " + updatedDate + " sourceId "
			+ sourceId);
}

function selectErrorRadio(text) {
	console.log("1");
	var rates = document.getElementsByName('error');
	var rate_value;
	for ( var i = 0; i < rates.length; i++) {
		if (rates[i].checked) {
			rate_value = rates[i].value;
			console.log("selected " + rate_value);
		}
	}
	var split = rate_value.split(',');
	errorFileType = split[0];
	nackErrorCode = split[1];
	console.log("errorFileType " + errorFileType + " nackErrorCode "
			+ nackErrorCode);
}

$(document)
		.ready(
				function() {

					// NWREGENERATE
					$("#nwResubmit")
							.click(
									function() {

										if (seqNo === undefined || seqNo == ""
												|| seqNo == null) {

											document.getElementById("message3").innerHTML = "Select a record";
											openErrorPopup();
										} else {
											$.blockUI({ message: waitMessage });
											$
													.ajax({
														type : "POST",
														url : CONTEXT_ROOT
																+ "/ajax/NWResubmit",
														data : 'seqNumber='
																+ seqNo
																+ '&fileName='
																+ fileName
																+ '&createdDate='
																+ createdDate,
														success : function(
																result) {

															if (result == 1) {
																$.unblockUI();
																document
																		.getElementById("message4").innerHTML = "Request submitted succesfully";
																openSuccessPopup();
															} else if (result == 0) {
																$.unblockUI();
																document
																		.getElementById("message3").innerHTML = "Error submitting Request";
																openErrorPopup();
															} else {
																$.unblockUI();
																document
																		.getElementById("message3").innerHTML = " Please Retry ...!";
																openErrorPopup();
															}
//															window.location
//																	.reload();
														},
														error : function(e) {
															console
																	.log('Error  : '
																			+ e);
														}
													});
										}
									});

					// NWRESUBMIT
					$("#nwRegenerate")
							.click(
									function() {
										if (seqNo === undefined || seqNo == ""
												|| seqNo == null) {

											document.getElementById("message3").innerHTML = "Select a record";
											openErrorPopup();
										} else {
										$.blockUI({ message: waitMessage });
											$
													.ajax({
														type : "POST",
														url : CONTEXT_ROOT
																+ "/ajax/NWReGenerate",
														data : 'seqNumber='
																+ seqNo
																+ '&fileName='
																+ fileName
																+ '&createdDate='
																+ createdDate,
														success : function(
																result) {

															if (result == 1) {
																$.unblockUI();
																document
																		.getElementById("message4").innerHTML = "Request submitted succesfully";
																openSuccessPopup();
															} else if (result == 0) {
																$.unblockUI();
																document
																		.getElementById("message3").innerHTML = "Error submitting Request";
																openErrorPopup();
															} else {
																$.unblockUI();
																document
																		.getElementById("message3").innerHTML = " Please Retry ...!";
																openErrorPopup();
															}
//															window.location
//																	.reload();

														},
														error : function(e) {
															console
																	.log('Error  : '
																			+ e);
														}
													});
										}
									});

					// NWACK
					$("#nwAck")
							.click(
									function() {

										if (seqNo === undefined || seqNo == ""
												|| seqNo == null) {

											document.getElementById("message3").innerHTML = "Select a record";
											openErrorPopup();
										} else {
										$.blockUI({ message: waitMessage });
											$
													.ajax({
														type : "POST",
														url : CONTEXT_ROOT
																+ "/ajax/NWAck",
														data : 'seqNumber='
																+ seqNo
																+ '&fileName='
																+ fileName
																+ '&createdDate='
																+ createdDate,
														success : function(
																result) {
															// alert(result);

															if (result == 1) {
																$.unblockUI();
																document
																		.getElementById("message4").innerHTML = "Request submitted succesfully";
																openSuccessPopup();
															} else if (result == 0) {
																$.unblockUI();
																document
																		.getElementById("message3").innerHTML = "Error submitting Request";
																openErrorPopup();
															} else {
																$.unblockUI();
																document
																		.getElementById("message3").innerHTML = "Please Retry ...!";
																openErrorPopup();
															}

														},
														error : function(e) {
															console
																	.log('Error  : '
																			+ e);
														}
													});
										}
									});

					// NWNACK - FIXME need to chnage add extra papameter
					$("#nwNack").click(function() {
						openPopup(fileTypeDisc);
					});

					// NW--->NHSTATUS
					$("#nhStatus")
							.click(
									function() {
										if (seqNo === undefined || seqNo == ""
												|| seqNo == null) {

											document.getElementById("message3").innerHTML = "Select a record";
											openErrorPopup();
										} else {
										$.blockUI({ message: waitMessage });
											$
													.ajax({
														type : "POST",
														url : CONTEXT_ROOT
																+ "/ajax/NHStatus",
														data : 'seqNumber='
																+ seqNo
																+ '&fileName='
																+ fileName
																+ '&createdDate='
																+ createdDate,
														success : function(
																result) {

															if (result == 1) {
																$.unblockUI();
																document
																		.getElementById("message4").innerHTML = "Request submitted succesfully";
																openSuccessPopup();
															} else if (result == 0) {
																$.unblockUI();
																document
																		.getElementById("message3").innerHTML = "Error submitting Request";
																openErrorPopup();
															} else {
																$.unblockUI();
																document
																		.getElementById("message3").innerHTML = "Please Retry ...!";
																openErrorPopup();
															}
//															window.location
//																	.reload();
														},
														error : function(e) {
															console
																	.log('Error  : '
																			+ e);
														}
													});
										}
									});

					// NHACK
					$("#nhAck")
							.click(
									function() {
										if (seqNo === undefined || seqNo == ""
												|| seqNo == null) {

											document.getElementById("message3").innerHTML = "Select a record";
											openErrorPopup();
										} else {
										$.blockUI({ message: waitMessage });
											$
													.ajax({
														type : "POST",
														url : CONTEXT_ROOT
																+ "/ajax/NHResubmitAckNACK",
														data : 'seqNumber='
																+ seqNo
																+ '&fileName='
																+ fileName
																+ '&isAckNack=ACK&nackErrorCode=""&errorFileType=""',
														success : function(
																result) {

															if (result == 1) {
																$.unblockUI();
																document
																		.getElementById("message4").innerHTML = "Request submitted succesfully";
																openSuccessPopup();
															} else if (result == 0) {
																$.unblockUI();
																document
																		.getElementById("message3").innerHTML = "Error submitting Request";
																openErrorPopup();
															} else {
																$.unblockUI();
																document
																		.getElementById("message3").innerHTML = "Please Retry ...!";
																openErrorPopup();
															}
//															window.location
//																	.reload();

														},
														error : function(e) {
															console
																	.log('Error  : '
																			+ e);
														}
													});
										}
									});

					// NHNACK
					$("#nhNack").click(function() {
						openPopup(fileTypeDisc);
					});

					// NXACK
					$("#nxAck")
							.click(
									function() {
										if (seqNo === undefined || seqNo == ""
												|| seqNo == null) {

											document.getElementById("message3").innerHTML = "Select a record";
											openErrorPopup();
										} else {
											$.blockUI({ message: waitMessage });
											$
													.ajax({
														type : "POST",
														url : CONTEXT_ROOT
																+ "/ajax/NXResubmitAckNACK",
														data : 'seqNumber='
																+ seqNo
																+ '&fileName='
																+ fileName
																+ '&createdDate='
																+ createdDate
																+ '&isAckNack=ACK&nackErrorCode=""&errorFileType=""',
														success : function(
																result) {

															if (result == 1) {
																$.unblockUI();
																document
																		.getElementById("message4").innerHTML = "Request submitted succesfully";
																openSuccessPopup();
															} else if (result == 0) {
																$.unblockUI();
																document
																		.getElementById("message3").innerHTML = "Error submitting Request";
																openErrorPopup();
															} else {
																$.unblockUI();
																document
																		.getElementById("message3").innerHTML = " Please Retry ...!";
																openErrorPopup();
															}
//															window.location
//																	.reload();

														},
														error : function(e) {
															console
																	.log('Error  : '
																			+ e);
														}
													});
										}
									});

					// NXNACK
					$("#nxNack").click(function() {
						openPopup(fileTypeDisc);
					});
					// NCNACK
					$("#ncNack").click(function() {
						openPopup(fileTypeDisc);
					});
					//NCACK
					$("#ncAck")
							.click(
									function() {
									console.log("ncack clicked");
										if (seqNo === undefined || seqNo == ""
												|| seqNo == null) {

											document.getElementById("message3").innerHTML = "Select a record";
											openErrorPopup();
										} else {
										$.blockUI({ message: waitMessage });
											$
													.ajax({
														type : "POST",
														url : CONTEXT_ROOT
																+ "/ajax/NCResubmitAckNACK",
														data : 'seqNumber='
																+ seqNo
																+ '&fileName='
																+ fileName
																+ '&createdDate='
																+ createdDate
																+ '&isAckNack=ACK&nackErrorCode=""&errorFileType=""',
														success : function(
																result) {

															if (result == 1) {
																$.unblockUI();
																document
																		.getElementById("message4").innerHTML = "Request submitted succesfully";
																openSuccessPopup();
															} else if (result == 0) {
																$.unblockUI();
																document
																		.getElementById("message3").innerHTML = "Error submitting Request";
																openErrorPopup();
															} else {
																$.unblockUI();
																document
																		.getElementById("message3").innerHTML = " Please Retry ...!";
																openErrorPopup();
															}
//															window.location
//																	.reload();

														},
														error : function(e) {
															console
																	.log('Error  : '
																			+ e);
														}
													});
										}
									});
					
					
					// View File
					$("#View")
							.click(
									function() {

										if (seqNo === undefined || seqNo == ""
												|| seqNo == null) {

											document.getElementById("message3").innerHTML = "Select a record";
											openErrorPopup();
										} else {

											document.forms["viewform"]["seqNumber"].value = seqNo;
											document.forms["viewform"]["fileName"].value = fileName;
											document.forms["viewform"]["fileType"].value = fileTypeDisc;
											document.forms["viewform"]["sourceId"].value = sourceId;
											document.forms["viewform"]["fileUpdatedDate"].value = updatedDate;
											document.forms["viewform"]["fileService"].value = serviceType;
											document.forms["viewform"]["fileCreatedDate"].value = fileCreateDate;
											document.forms["viewform"]["searchDate"].value = $(
													'#date').val();
											document.getElementById("viewform")
													.submit();
										}

									});

					// Time Schedular
					$("#reschedule")
							.click(
									function() {
										var isValid = TimeValidation();
										console.log(isValid);
										if (isValid == true) {

											var startHour = document
													.getElementById('startHH').value;
											var startMin = document
													.getElementById('startMM').value;
											var endHour = document
													.getElementById('endHH').value;
											var endMin = document
													.getElementById('endMM').value;
											$.blockUI({ message: waitMessage });
											$
													.ajax({
														type : "POST",
														url : CONTEXT_ROOT
																+ "/ajax/NWControlRescheduler",
														data : 'startHour='
																+ startHour
																+ '&startMin='
																+ startMin
																+ '&endHour='
																+ endHour
																+ '&endMin='
																+ endMin,
														success : function(
																result) {

															if (result == 1) {
																$.unblockUI();
																document
																		.getElementById("message4").innerHTML = "Request submitted succesfully";
																openSuccessPopup();
															} else if (result == 0) {
																$.unblockUI();
																document
																		.getElementById("message3").innerHTML = "Error submitting Request";
																openErrorPopup();
															} else {
																$.unblockUI();
																document
																		.getElementById("message3").innerHTML = " Please Retry ...!";
																openErrorPopup();
															}

														},
														error : function(e) {
															console
																	.log('Error  : '
																			+ e);
														}
													});
										}
									});

					// error popup starts
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

					openErrorPopup = function() { // #cancel is the id of the
						// button
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

					// error popups end
					// success popup starts
					$(function() {
						$("#Success").dialog({

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

					openSuccessPopup = function() { // #cancel is the id of the
						// button
						$("#Success").dialog("open");
						var state = true;
						if (state) {
							$("#Success").animate({
								backgroundColor : "grey",
								color : "rgba(0, 0, 0, 0.48)",
								width : 500
							}, 1000);
						}
					};
					$("#successOkButton").click(function() {
						$("#Success").dialog("close");
						window.location.reload();
					});
					// success popups ends

				});

function openPopup(errorFileType) {

	console.log("errorFileType " + errorFileType);
	if (errorFileType === undefined || errorFileType == ""
			|| errorFileType == null) {
		document.getElementById("message3").innerHTML = "Please select a record";
		openErrorPopup();
	} else {
		$
				.ajax({
					type : "GET",
					url : CONTEXT_ROOT + "/ajax/errorReason",
					data : 'fileType=' + errorFileType,
					success : function(result) {
						var htmltxt = "<div style='text-align:center;'><caption><h3>NACK Discriptions </h3></caption></div><div style='height:260px;overflow:auto;'><table align=center border=1 style='border-collapse:collapse'><tr><td><b></b></td><td><b>File Type</b></td><td><b>Error Code</b></td><td style='width:300px; text-align:left;'><b>Description</b></td></tr>";
						document.getElementById('light').style.display = 'block';
						for ( var i = 0; i < result.length; i++) {
							htmltxt = htmltxt
									+ "<tr><td><input type=radio name=error value='"
									+ result[i].discrErrorFileType
									+ ","
									+ result[i].discrErrorCode
									+ "' onClick='selectErrorRadio(this)'/></td>	<td ><br />"
									+ result[i].discrErrorFileType
									+ "</td><td><br />"
									+ result[i].discrErrorCode
									+ "</td><td style='width:300px; text-align:left;'><br />"
									+ result[i].discrErrorDescription
									+ "</td></tr>";
						}
						htmltxt = htmltxt
								+ "</table></div><div><br /><button class='button-main' id=errorSubmit onClick='ff()'>Ok</button><button class='button-cancel' onclick='closeDiv()'>Cancel</button></div>";
						document.getElementById('light').innerHTML = htmltxt;
					},
					error : function(e) {
						console.log('Error  : ' + e);
					}
				});

	}
};

function closeDiv() {
	document.getElementById('light').style.display = 'none';
}

function ff() {
	console.log("error submit clicked from ff nackErrorCode " + nackErrorCode);

	if (nackErrorCode === undefined || nackErrorCode == ""
			|| nackErrorCode == null) {
		document.getElementById("light").style.zIndex = 0;
		document.getElementById("message3").innerHTML = "Select a reason to Nack";
		openErrorPopup();
	} else {
		document.getElementById('light').style.display = 'none';
		if (serviceType == 'NX') {
			$.blockUI({ message: waitMessage });
			$
					.ajax({
						type : "POST",
						url : CONTEXT_ROOT + "/ajax/NXResubmitAckNACK",
						data : 'seqNumber=' + seqNo + '&fileName=' + fileName
								+ '&createdDate=' + createdDate
								+ '&isAckNack=NACK&nackErrorCode='
								+ nackErrorCode + '&errorFileType='
								+ errorFileType,
						success : function(result) {

							if (result == 1) {
								$.unblockUI();
								document.getElementById("message4").innerHTML = "Request submitted succesfully";
								openSuccessPopup();
							} else if (result == 0) {
								$.unblockUI();
								document.getElementById("message3").innerHTML = "error submitting request";
								openErrorPopup();
							} else {
								$.unblockUI();
								document.getElementById("message3").innerHTML = "Please Retry ...!";
								openErrorPopup();
							}
							// window.location.reload();

						},
						error : function(e) {
							console.log('Error  : ' + e);
						}
					});
		}
		
		else if (serviceType == 'NC') {
			$.blockUI({ message: waitMessage });
			$
					.ajax({
						type : "POST",
						url : CONTEXT_ROOT + "/ajax/NCResubmitAckNACK",
						data : 'seqNumber=' + seqNo + '&fileName=' + fileName
								+ '&createdDate=' + createdDate
								+ '&isAckNack=NACK&nackErrorCode='
								+ nackErrorCode + '&errorFileType='
								+ errorFileType,
						success : function(result) {

							if (result == 1) {
								$.unblockUI();
								document.getElementById("message4").innerHTML = "Request submitted succesfully";
								openSuccessPopup();
							} else if (result == 0) {
								$.unblockUI();
								document.getElementById("message3").innerHTML = "error submitting request";
								openErrorPopup();
							} else {
								$.unblockUI();
								document.getElementById("message3").innerHTML = "Please Retry ...!";
								openErrorPopup();
							}
							// window.location.reload();

						},
						error : function(e) {
							console.log('Error  : ' + e);
						}
					});
		}

		else if (serviceType == 'NH') {
			$.blockUI({ message: waitMessage });
			$
					.ajax({
						type : "POST",
						url : CONTEXT_ROOT + "/ajax/NHResubmitAckNACK",
						data : 'seqNumber=' + seqNo + '&fileName=' + fileName
								+ '&isAckNack=NACK&nackErrorCode='
								+ nackErrorCode + '&errorFileType='
								+ errorFileType,
						success : function(result) {

							if (result == 1) {
								$.unblockUI();
								document.getElementById("message4").innerHTML = "Request submitted succesfully";
								openSuccessPopup();
							} else if (result == 0) {
								$.unblockUI();
								document.getElementById("message3").innerHTML = "Error submitting request";
								openErrorPopup();
							} else {
								$.unblockUI();
								document.getElementById("message3").innerHTML = "Please Retry ...!";
								openErrorPopup();
							}
							// window.location.reload();

						},
						error : function(e) {
							console.log('Error  : ' + e);
						}
					});
		}

		else if (serviceType == 'NW') {
			$.blockUI({ message: waitMessage });
			$
					.ajax({
						type : "POST",
						url : CONTEXT_ROOT + "/ajax/NWNack",
						data : 'seqNumber=' + seqNo + '&fileName=' + fileName
								+ '&createdDate=' + createdDate
								+ '&errorFileType=' + errorFileType
								+ '&errorCode=' + nackErrorCode,
						success : function(result) {
							if (result == 1) {
								$.unblockUI();
								document.getElementById("message4").innerHTML = "Request submitted succesfully";
								openSuccessPopup();
							} else if (result == 0) {
								$.unblockUI();
								document.getElementById("message3").innerHTML = "Error submitting request";
								openErrorPopup();
							} else {
								$.unblockUI();
								document.getElementById("message3").innerHTML = "Please Retry ...!";
								openErrorPopup();
							}
							// window.location.reload();

						},
						error : function(e) {
							console.log('Error  : ' + e);
						}
					});
		}
	}
}

function showSchedularDiv() {
	console.log("show div ");
	document.getElementById('schedular').style.display = 'block';
}

// validate date from filter
function validateDateObj(id) {
	console.log("date clicked " + id);
	dateValidation(id);
}

function dateValidation(txtId) {
	var value = document.getElementById(txtId).value;
	if (value.length > 0) {
		if (!isValidDate(value, 'yyyy-mm-dd')) {
			// alert("enter valid date");
			document.getElementById("message3").innerHTML = "Please enter a valid date";
			openErrorPopup();
			document.getElementById(txtId).value = "";
			document.getElementById(txtId).focus();

		}
	}
}

function reloadPage(service,date){
	
	if(service!=""  && date!=""){
	    document.forms["discrepany"]["service"].value=service;
		document.forms["discrepany"]["date"].value=date;
		document.forms["discrepany"].submit();
	}else{
		window.location.reload();
	}
}

function validateForm() {
	var service = document.forms["discrepany"]["service"].value;
	var date = document.forms["discrepany"]["date"].value;
	if (service == null || service == "") {
		document.getElementById("message3").innerHTML = "Please select service";
		openErrorPopup();
		return false;
	}

	if (date == null || date == "") {
		document.getElementById("message3").innerHTML = "Please select date";
		openErrorPopup();
		return false;
	}

}

function TimeValidation() {
	var start = document.getElementById('startHH').value + "."
			+ document.getElementById('startMM').value;
	var end = document.getElementById('endHH').value + "."
			+ document.getElementById('endMM').value;
	
	console.log("oHH " + oHH);
	var originalTime = oHH + "." + oMM;
	console.log("originalTIme " + originalTime);
	var ot = parseFloat(originalTime);
	console.log("ot " + ot);
	var vStart = parseFloat(start);
	console.log("vStart " + vStart);
	var vEnd = parseFloat(end);
	var d = new Date();
	var hh = d.getHours();
	var mm = d.getMinutes();
	var time = parseFloat(hh + '.' + mm);
	// alert(time);

	if (document.getElementById('startHH').value == ''
			|| document.getElementById('startMM').value == ''){
		document.getElementById("message3").innerHTML = "Please select Start Time";
		openErrorPopup();
		return false;
         }
          else if(document.getElementById('endHH').value == ''
			|| document.getElementById('endMM').value == '') {
		document.getElementById("message3").innerHTML = "Please select End Time";
		openErrorPopup();
		return false;
	} else {
		if (ot != vStart) {
			if (vStart <= time) {
				document.getElementById("message3").innerHTML = "Start Time should be grater than current time";
				openErrorPopup();
				return false;
			}

			if (vStart > vEnd) {
				document.getElementById("message3").innerHTML = "Start Time should be less than End time.";
				openErrorPopup();
				return false;
			}
		}
		else if(vEnd!=ot){
			if (vEnd < time) {
				document.getElementById("message3").innerHTML = "End Time should be greater than current time.";
				openErrorPopup();
				return false;
			}

			if (vEnd < vStart) {
				document.getElementById("message3").innerHTML = "End Time should be greater than Start Time.";
				openErrorPopup();
				return false;
			}

		}

		if (vStart < vEnd) {

			return true;
		}
	}
	return true;
}
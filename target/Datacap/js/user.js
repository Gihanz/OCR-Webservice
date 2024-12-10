function getUrlVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(
			window.location.href.indexOf('?') + 1).split('&');
	for ( var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}
var res=false;

function validateForm(operation) {

}

function chkSpecialChars(txtid) {
	var splChars = "*|,\":<>[]{}`\';()@&$#%";
	var value = document.getElementById(txtid).value;
	console.log("value is " + value);
	console.log("i is leng " + value.length);
	for ( var i = 0; i < value.length; i++) {
		console.log("i is " + i);
		if (splChars.indexOf(value.charAt(i)) != -1) {
			return true;
		}
	}
	return false;
}

function submitForm(){
console.log("in submit fun ");
document.forms["createUser"].submit();
}
$(document).ready(
		function() {
				
			// hide error messages
			$('#errorName').hide();
			$('#errorPasswordMissmatch').hide();
			$('#errorSurname').hide();
			$('#errorrole').hide();
			$('#errornamemaxlength').hide();
			$('#errorsurnamemaxlength').hide();
			$('#errorcashCenter').hide();

			
			$("#userName").focusout(
					function() {						
						var userName=$.trim($("#userName").val());
						$("#userName").val(userName);
						console.log("User Name>>"+userName);
						if(userName!="")
						validateUser(userName);
					});

			validateUser = function name(userName) {
				/* Validates the username of user */
				$.ajax({
					type : "GET",
					url : CONTEXT_ROOT + "/ajax/validateUser/" + userName,
					success : function(result) {
						console.log("user exist"+result);
						if(result=="1"){
							document.getElementById("message3").innerHTML = $("#userName").val() +" Already Exist";
							 $("#userName").val("");
							openErrorPopup();
						}
					},
					error : function(e) {
						alert('Error: ' + e);
					}
				});
			};
			
			
			//popups
			$(function() {
			$("#dialog").dialog({

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

		$("#update").click(function() { //#cancel is the id of the button
			$("#dialog").dialog("open");
			var state = true;
			if (state) {
				$("#dialog").animate({
					backgroundColor : "grey",
					color : "rgba(0, 0, 0, 0.48)",
					width : 500
				}, 1000);
			}
		});
		
		openConfirmBox=function(){
		console.log("inside cnfrm function");
		$("#dialog").dialog("open");
			var state = true;
			if (state) {
				$("#dialog").animate({
					backgroundColor : "grey",
					color : "rgba(0, 0, 0, 0.48)",
					width : 500
				}, 1000);
			}
		};
		
		$("#canelYesButton").click(function() {
		console.log("submitting form");
		submitForm();
		//$("#dialog").dialog("close");
		});
		$("#canelNoButton").click(function() {
		console.log("cancleing update");
			$("#dialog").dialog("close");
		});
		
		//open validation popup
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
		
	});

function checkUnlock() {

	if (document.getElementById('unlockChk').checked == true)
		document.getElementById('unlock').value = 1;
	else
		document.getElementById('unlock').value = 0;

}
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page isELIgnored="false" %>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.*"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<script src="<c:url value="/js/jquery.min.js"/>"></script>
<script src="<c:url value="/js/loadingoverlay.min.js"/>"></script>
<script language="JavaScript">
	function Validate(){
		var image =document.getElementById("image").value;
		if(image!=''){
			var checkimg = image.toLowerCase();
			if (!checkimg.match(/(\.jpg|\.png|\.JPG|\.PNG|\.jpeg|\.JPEG)$/)){
				alert("Please enter Image File Extensions .jpg,.png,.jpeg");
				document.getElementById("image").focus();
				return false;
			}
		}
		return true;
	}
	function updateFiles() {
        
        var oFiles = document.getElementById("files").files,
            nFiles = oFiles.length,
            nBytes = 0,
            fileNames = "";
    		
	    for (var nFileId = 0; nFileId < nFiles; nFileId++) {
			nBytes += oFiles[nFileId].size;
	        fileNames += "<li>"+oFiles[nFileId].name+"<br></li>";
	    }
	
	    var sOutput = nBytes + " bytes";
	    // code for multiples approximation
	    for (var aMultiples = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
	        sOutput = nApprox.toFixed(1) + " " + aMultiples[nMultiple];
	    }
	
	    document.getElementById("fileNum").innerHTML = nFiles;
	    document.getElementById("fileSize").innerHTML = sOutput;
	    document.getElementById("fileName").innerHTML = fileNames; 
	}
	$(document).ready(function () {

	    $("#extract").click(function (event) {

	    	$(this).prop("disabled",true);
	    	$.LoadingOverlay("show");
	    	$("#extractedProp").empty();
	        //stop submit the form, we will post it manually.
	        $("#extractForm").submit(function(e){
	            return false;
	        });

	        $.post({
	            url: 'extractData',
	            data : $('form[name=extractForm]').serialize(),
	            success: function (data) {
	            	for(var page of data) {
	                	$("#extractedProp").append('<fieldset id="'+page.pageId+'"><legend> '+page.fileName+' </legend></fieldset>');
	                	for(var prop of page.propData){
							var divID = '#' +page.pageId;
	                		$(divID).append('<div class="section _100"> <label for="'+prop.propDisplayName+'"> '+prop.propDisplayName+' </label> <div style="float: left;"> <input type="text" name="'+prop.propId+'" value="'+prop.ocrResult+'" /> </div> </div>');
	                	}	                		           
	                }
	            	$.LoadingOverlay("hide");
	            },
	            error: function (e) {
	                console.log("ERROR : ", e);
	                $.LoadingOverlay("hide");
	            }
	        });
	        $(this).prop("disabled",false);
	    });
	    
	 // Generate image list for previous page and next page buttons
	    var count = 0;
		var imgArr = [];
		<% List<String> imgList = (ArrayList<String>)request.getAttribute("imgList");
			for(String img : imgList)
			{  %>
				var imgString = "<%=img%>";
				imgArr.push(imgString);
				<%
			}		 
		%>
	    $("#previous_page").click(function (event) {				
			if(count>0){
				count--;
				var imageSrc = "data:image/jpg;base64,"+imgArr[count];
				$('#docViewer').attr('src',imageSrc);
				$('#img_count').text(count+1);
			}
	    });
	    
	    $("#next_page").click(function (event) {
			if(imgArr.length-1>count){
				count++;	    	
				var imageSrc = "data:image/jpg;base64,"+imgArr[count];
				$('#docViewer').attr('src',imageSrc); 
				$('#img_count').text(count+1);
			} 	
	    });
	    
	});
</script>
</head>
<jsp:include page="header.jsp" />
<body>

<!--  ************************ Upload Documents Box ************************ -->
<div class="grid_4" style="min-width:50%; height:80%">
	<div class="box" style="height:100%">
		<div class="header" style="background:#303030;">
			<h3>Upload Documents</h3>
		</div>
		<div class="content" style="height:100%">
			<p>
			<form:form method="POST" action="uploadFile" enctype="multipart/form-data">
				
				<table id="fileTable" style="width:100%;">
				<tr style="border-bottom: 1px solid #ddd; padding: 8px;">
					<td width="300px">
						Select Files to Add : <input type="file" id="files" name="fileName" onSubmit="return Validate();" onchange="updateFiles();" multiple>
					</td>
					<td>
						Selected Files : <span id="fileNum">0</span><br>
                		Total Size : <span id="fileSize">0</span><br>
                		<!-- <b>Attached Files : </b><br><span id="fileName">-</span><br> -->
					</td>
					<td width="1px" style="padding-right:20px">
						<input type="submit" value="Import" style="background:#313131; color:white;">
					</td>
					</form:form>
					<td width="1px" style="padding-right:10px">
						<form:form method="POST" action="clearFile" enctype="multipart/form-data">
							<input type="submit" value="Clear All" style="background:#313131; color:white;">
						</form:form>
					</td>					
				</tr>
				</table>
			</p>
			<div style="text-align:center; height:80%; overflow:auto">
				<div style="float:left">
					<button type="button" id="previous_page" style="background:#313131; color:white;">Previous Page</button>
				</div>
				<div style="display:inline-block; margin:0 auto">
					<img src="data:image/jpg;base64,${imgList[0]}" style="width:370px; border:outset" onerror="this.onerror=null; this.src='<c:url value="/images/tiff_icon.png"/>'" id="docViewer">
					<c:if test="${!empty imgList}">
					<span style="display:block; padding-top:5px"><div id="img_count" style="display:inline-block">1</div> &nbsp of &nbsp ${imgList.size()}</span>
					</c:if>
				</div>
				<div style="float:right">
					<button type="button" id="next_page" style="background:#313131; color:white;">Next Page</button>
				</div>
			</div>
		</div>
	</div>
</div>

<!--  ************************ Extract Data Button ************************ -->
<div class="grid_4">
	<div class="box" style="padding-top:300px;">
		<form:form modelAttribute="extractForm" name="extractData" method="post" id="extractForm">
			<img src="
	        <c:url value="/images/extract_icon.png"/>
	        " height="50px">
			<input type="submit" value="Extract" id="extract" style="background:#313131; color:white;">
		</form:form>
	</div>
</div>

<!--  ************************ Extracted Properties Grid ************************ -->
<div class="grid_8" style="min-width:300px; width:38%; height:80%">
	<div class="box" style="height:100%">
		<div class="header" style="background:#303030;">
			<h3>Extracted Data</h3>
		</div>
		<div id="extractData" style="display:block; height:100%">
		<form:form action="export" method="post" class="validate" style="height:100%">
			<div class="content" style="height:92%;" id="extractedProp">
			
				<!-- Extracted Data will appears here with AJAX call -->
				
			</div>
			<div class="actions">
				<div class="actions-right">
					<input type="submit" id="commit" value="Export To Filenet" style="background:#313131; color:white;"/>
				</div>
			</div>
		</form:form>
		</div>
	</div>	
</div>

<footer style="bottom: 0; position: fixed;"><jsp:include page="footer.jsp" /></footer>
</body>
</html>
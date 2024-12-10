<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<title>Datacap Application</title>
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="width=device-width,initial-scale=1">

<link rel="icon" href="images/icon.png" />

<spring:url value="css/normalize.css" var="normalizeCss" />
<spring:url value="css/global.css" var="globalCss" />

<link rel="stylesheet"  type="text/css" href="css/normalize.css" >
<link rel="stylesheet"  type="text/css" href="css/global.css" >

<%@ page isELIgnored="false"%>

 
<%
//HttpSession session = request.getSession(false);
String userName = (String)session.getAttribute("userName");
String userLoggedIn = (String)session.getAttribute("userLoggedIn");
%>

<div id="header_toolbar">
	<div class="container_12">
		<h1 class="grid_8"><img src="images/mit_logo_2.png" style="height:30px; padding-right: 20px">  Datacap Application</h1>
		<div class="grid_4" id="toolbar_buttons" style="float:right">
			<div class="toolbar_large">
				<div class="toolbutton">
					<div class="toolicon">
						<img src="images/user.png" width="16" height="16">
					</div>
					<div class="toolmenu">
						<div class="toolcaption" style="min-width: 46px;">
							<span>Welcome - <%=userName%></span>
						</div>
					</div>
				</div>
			</div>
			<div class="toolbar_large">
				<div class="toolbutton">
					<div class="toolmenu">
						<div class="toolcaption" style="min-width: 46px;">
							<span><a style="color:#9ecfff;" href="<%=request.getContextPath()%>/logout" id="doLogout-toolbar">Logout</a></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

</head>


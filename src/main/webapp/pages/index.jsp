<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page isELIgnored="false" %>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
<html>
   <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>Datacap Application</title>
      <link rel="icon" href="images/icon.png" />
      <link href="css/other.css" rel="stylesheet" type="text/css">
      <link href="css/login.css" rel="stylesheet" type="text/css">
      <script type="text/javascript">
         function validateForm(){
	         var flag = false;
	         var userName = document.getElementById('userName').value;         
	         if(null!=userName && userName!='')         
	         flag = true;         
	         else         
	         alert('Please enter UserName');
	         
	         if(flag){
		         var password = document.getElementById('password').value;   
		         if(null!=password && password!='')         
		         	flag = true;         
		         else{
		         alert('Please enter Password');   
		         flag = false;
		         }       
	         }
	         return flag; 
         }
         
      </script>
   </head>
   
   <body  background="<c:url value="/images/login-background.jpg"/>">
   <c:if test="${not empty responseMessage}">
      <div style="color:red; text-align:center; width:100%; position:absolute; top:50px;" align="center">${responseMessage}</div>
   </c:if>
   <div class="login">
      <form:form modelAttribute="logonForm" action="submitLogon" method="post">
         <h3 align="left" style="text-align: center;">Welcome to Datacap</h3>
         <table align="left" style="width:95%; font-family:sans-serif">
            <tr>
               <td style="padding-bottom: 10px">
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  User name:
                  <form:input path="userName" name="userName" id="userName" value="" />
               </td>
            </tr>
            <tr>
               <td>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  Password:&nbsp;&nbsp;
                  <form:password path="password" name="password" id="password" value=""/>
               </td>
            </tr>
            <tr>
               <td style="padding-left:83px;"><input type="submit" name="Submit"value="Login" onClick="return validateForm()"/></td>
            </tr>
            <tr>
               <td class="image" style="padding-top:10px;" align="right" >
                  <img src="
                  <c:url value="/images/MIT_logo.png"/>
                  " height="60px">
               </td>
            </tr>
         </table>
      </form:form>
   </div>
   <div class="copyright">
   (c) Copyright 2019, 2020 Millenniumit esp. MIT and the MIT esp logo are trademarks of MIT esp, registered in many jurisdictions worldwide. Java and all Java-based trademarks and logos are trademarks or registered trademarks of Oracle and/or its affiliates. The Oracle Outside In Technology included herein is subject to a restricted use license and can only be used in conjunction with this application. This Program is licensed under the terms of the license agreement accompanying the Program. This license agreement may be either located in a Program directory folder or library identified as "License" or "Non_MITesp_License", if applicable, or provided as a printed license agreement. Please read this agreement carefully before using the Program. By using the Program, you agree to these terms.
   </div>
   </body>
</html>
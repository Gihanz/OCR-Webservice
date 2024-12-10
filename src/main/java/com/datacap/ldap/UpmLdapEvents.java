package com.datacap.ldap;
import java.util.Iterator;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.Set;

import javax.naming.ldap.LdapContext;

public class UpmLdapEvents {	
	
	ResourceBundle configMsgBundle = ResourceBundle.getBundle("config");
	String providerUri = configMsgBundle.getString("providerUri");
	String AdminUser = configMsgBundle.getString("AdminUser");
	String adminPwd = configMsgBundle.getString("AdminPwd");
	String adminDN = configMsgBundle.getString("AdminDN");
	String allowedGroup = configMsgBundle.getString("allowedGroup");
	//String allowedAdminGroup = configMsgBundle.getString("allowedAdminGroup");
	String userLoggedIn = null;
	
	
	public String GetUserGroupsByUserName(String userName){
		try {
			LdapContext ldapContext = LdapClient.GetLdapContext(providerUri, AdminUser, adminPwd, adminDN);
			Map<String,String> userMap = LdapClient.GetUserGroupsByUserName(userName, ldapContext);
			Set keySet = userMap.keySet();
			Iterator iter = keySet.iterator();
			while(iter.hasNext())
			{
				String key = (String)iter.next();
				String value = userMap.get(key);
				
				if(allowedGroup.contains(key))
				{
					userLoggedIn="DatacapUser";
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return userLoggedIn;
	}	
	
	public String userAuthentication(String userName,String password) throws Exception
	{
		String loggedInUser = null;
		String responseMessage = null;
		String userDistinguishedName = getUserDistinguishedName(userName);
		try 
		{
			if(null!=userDistinguishedName)
			{
				
				int comaIndexOf = userDistinguishedName.indexOf(",");
				if(comaIndexOf!=-1){
					String adUserName = userDistinguishedName.substring(0,comaIndexOf);
					//log.debug("UserDN is "+adUserName);
					adUserName = adUserName.split("=")[1];
					//log.debug("adUserName is "+adUserName);
					userDistinguishedName = userDistinguishedName.substring(++comaIndexOf);
					//log.debug("userDistinguishedName is "+userDistinguishedName);
					LdapContext ldapContext = LdapClient.GetLdapContext(providerUri, adUserName, password, userDistinguishedName);
					//log.debug("ldapContext obtained "+ldapContext);
					responseMessage = "User Logged in successfully";

					userLoggedIn = GetUserGroupsByUserName(userName);
					System.out.println("userLoggedIn : "+userLoggedIn);
				}
			}			
			else{
				responseMessage = "User doesn't exists, please check username and password";
			}
		}
		catch (Exception e) {
			e.printStackTrace();			
			throw e;
		}
		
		return userLoggedIn;
	}
	
	public String getUserDistinguishedName(String userName)
	{
		String userDistinguishedName = null;
		LdapContext ldapContext;
		try {
			ldapContext = LdapClient.GetLdapContext(providerUri, AdminUser, adminPwd, adminDN);
			userDistinguishedName = LdapClient.GetUserDistinguishedName(userName,ldapContext);
			//log.debug("userDistinguishedName is "+userDistinguishedName);
						
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return userDistinguishedName;
	}
	
	public static void main(String a[]) throws Exception
	{
		UpmLdapEvents ldapEvents = new UpmLdapEvents();		
		
		try {
			ldapEvents.userAuthentication("gihanli","mit@1234");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}

package com.datacap.ldap;

import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.ldap.LdapContext;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.BasicAttribute;
import javax.naming.directory.DirContext;
import javax.naming.directory.ModificationItem;
import javax.naming.directory.SearchResult;
import javax.naming.ldap.InitialLdapContext;

/**
 * This Class use for all LDAP operations 
 * @author Dilan
 *
 */
class LdapClient {
	/**
	 * Common Domain Names
	 */
	private static String commonDN = "dc=filenetad,dc=local";
	/**
	 * User Object Class
	 */
	private static String userObjectClass = "(objectclass=user)";
	//private static String userObjectClass = "(&(samAccountName={0})(objectClass=user))";
	/**
	 * Group Object Class
	 */
	private static String groupObjectClass = "(objectclass=group)";
	//private static String groupObjectClass = "(&(samAccountName={0})(objectClass=group))";
	/**
	 * Get LDAP context to search and modify
	 * @throws Exception
	 */
	static LdapContext GetLdapContext(String providerUri, String AdminUser, String adminPwd, String adminDN) throws Exception{
		LdapContext ctx = null;
		try{
			Hashtable<String, String> env = new Hashtable<String, String>();
			env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
			env.put(Context.SECURITY_AUTHENTICATION, "Simple");
			env.put(Context.SECURITY_PRINCIPAL, "CN="+AdminUser+","+adminDN);
			env.put(Context.SECURITY_CREDENTIALS, adminPwd);
			env.put(Context.PROVIDER_URL, providerUri);
			//env.put(Context.REFERRAL, "follow");
			ctx = new InitialLdapContext(env, null);
			System.out.println("ctx obtained is "+ctx);
		}
		catch(Exception ex){
			throw ex;
		}
		return ctx;
	}
	/**
	 * Get All user belongs User Groups by User Name
	 * @throws Exception 
	 */
	static Map<String, String> GetUserGroupsByUserName(String userName, LdapContext ctx) throws Exception{
		Map<String, String> userGroups = new HashMap<String, String>();
		try {
			NamingEnumeration<SearchResult> answer = ctx.search(commonDN, "(&"+userObjectClass+"(sAMAccountName=" + userName+"))", SearchQueries.GetUserGroupsByUserName());
            if (answer.hasMore()) {
                Attributes attrs = answer.next().getAttributes();
                userGroups = GetGroupsMap(attrs);
            } else {
            	throw new Exception("User Name '" +userName+"' not found.");
            }
		} catch (Exception ex) {
			throw ex;
		}
		finally
		{
			ctx.close();
		}
		return userGroups;
	}
	
	/**
	 * Get User Distinguished Name
	 * @throws Exception 
	 */
	static String GetUserDistinguishedName(String userName, LdapContext ctx) throws Exception{
		String userDistinguishedName = "";
		try {
			NamingEnumeration<SearchResult> answer = ctx.search(commonDN, "(&"+userObjectClass+"(sAMAccountName=" + userName+"))", SearchQueries.GetDistinguishedName());
			if (answer.hasMore()) {
                Attributes attrs = answer.next().getAttributes();
                userDistinguishedName = GetUserNameValue(attrs);
            } else {
            	throw new Exception("User Name '" +userName+"' not found.");
            }
		} catch (Exception ex) {
			throw ex;
		} 
		return userDistinguishedName;
	}
	
	/**Get Single Value from attributes
	 * @throws Exception 
	 */
	private static String GetUserNameValue(Attributes attrs) throws Exception{
		String userName = "";
		if(attrs != null)
		{
			try {
				for(NamingEnumeration<?> ae = attrs.getAll(); ae.hasMore();)
				{
					Attribute attr = (Attribute) ae.next();					
					for(NamingEnumeration<?> e = attr.getAll(); e.hasMore();)
					{
						userName =  (String) e.next();
					}
				}
			} catch (Exception ex) {
				throw ex;
			}
		}
		return userName;
	} 
	/**Set all user groups to map
	 * @throws Exception 
	 */
	private static Map<String, String> GetGroupsMap(Attributes attrs) throws Exception
	{
		Map<String, String> userGroups = new HashMap<String, String>();
		if(attrs != null)
		{
			try {
				for(NamingEnumeration<?> ae = attrs.getAll(); ae.hasMore();)
				{
					Attribute attr = (Attribute) ae.next();
			
					for(NamingEnumeration<?> e = attr.getAll(); e.hasMore();)
					{
						String value = (String) e.next();
						System.out.println(" UserGroups are "+value);
						userGroups.put((value.split(",")[0]).split("=")[1], value);
					}
				}
			} catch (Exception ex) {
				throw ex;
			}
		}
		return userGroups;
	}

}

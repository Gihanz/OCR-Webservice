package com.datacap.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Base64.Encoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.chemistry.opencmis.client.api.Folder;
import org.apache.chemistry.opencmis.client.api.Session;
import org.apache.chemistry.opencmis.commons.PropertyIds;
import org.hibernate.HibernateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import com.datacap.export.exportOperations;
import com.datacap.form.logonForm;
import com.datacap.ldap.UpmLdapEvents;
import com.datacap.ocr.OcrOperations;
import com.datacap.response.ConfigBaseRs;
import com.datacap.response.ExtractRs;
import com.datacap.response.PagePropertyZoneRs;
import com.datacap.response.PropDataRs;
import com.datacap.service.DatacapService;

/*
Created By Gihan on Dec 6, 2019
*/
@Controller
@SessionAttributes("extractRsLst")
public class DatacapController {
	private static Logger log = LoggerFactory.getLogger(DatacapController.class);
	ResourceBundle configMsgBundle = ResourceBundle.getBundle("config");
	@Autowired
	private DatacapService serviceImpl;
	/**
	 * Exception Page
	 */
	public static final String exceptionPage = "ExceptionPage";
	

	@RequestMapping(value = "/logon")
	public String logon(Model model,@RequestParam(value="responseMessage",defaultValue = "", required = false) String responseMessage, HttpServletRequest request)
	{
		model.addAttribute("logonForm",new logonForm());	
		model.addAttribute("responseMessage",responseMessage);
		return "index";
	}
	
	@RequestMapping(value = "/submitLogon")
	public String submitLogon(Model model,@ModelAttribute("logonForm") logonForm logonForm,HttpServletRequest request)
	{
		log.debug(" userName "+logonForm.getUserName());
		String responseMessage= null;
		String responsePage = null;
		UpmLdapEvents ldapEvents = new UpmLdapEvents();
		String userLoggedIn = null;
		try {

			userLoggedIn =  ldapEvents.userAuthentication(logonForm.getUserName(), logonForm.getPassword());
			if(null!=userLoggedIn){	
				model.addAttribute("responseMessage",responseMessage);
				HttpSession session = request.getSession();
				session.setAttribute("userName", logonForm.getUserName());
				session.setAttribute("userLoggedIn", userLoggedIn);
				String clintHost = request.getRemoteHost();
				log.debug("clintHost "+clintHost);
				String clientIP = request.getRemoteAddr();
				log.debug("clientIP "+clientIP);
				log.debug(logonForm.getUserName()+"	Logged In from IpAdress "+clientIP);
				responsePage = "redirect:/addDocuments";
			}
			else{
				responseMessage= "User doesn't exists, please check Username and Password";
				model.addAttribute("responseMessage",responseMessage);
				responsePage = "redirect:/logon";
			}
				
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage = "Unable to login";
			model.addAttribute("responseMessage",responseMessage);
			responsePage = "redirect:/logon";
		}
		
		return responsePage;
	}
	
	@RequestMapping("/addDocuments")
	public String addDocuments(Model model,@RequestParam(value="responseMessage",defaultValue = "", required = false) String responseMessage,HttpServletRequest request)
	{
		try
		{
			String userName = null;
			HttpSession session = request.getSession(false);
			if(null!=session){
				userName = (String)session.getAttribute("userName");
				log.debug("userName is "+userName);
				if (userName == null)
				{
					return "redirect:/logout";
				}
			}
			else if(null==session)
			{
				return "redirect:/logout";
			}
			
			String userLoggedIn = (String)session.getAttribute("userLoggedIn");
			
			ConfigBaseRs configBaseRsLst = serviceImpl.getAllConfig().get(0);
			String rootPath = configBaseRsLst.getUploadLocation();
			File folder = new File(rootPath + File.separator + (String)session.getAttribute("userName"));
			File[] listOfFiles = folder.listFiles();

			List<String> imgDataUriList = new ArrayList<String> ();
			if(listOfFiles.length>0){
				try {
					
					for (File file : listOfFiles) {
						byte[] bytesArray = new byte[(int) file.length()];
						FileInputStream fis = new FileInputStream(file);
						fis.read(bytesArray); //read file into bytes[]
						fis.close();
						
						Encoder encoder = Base64.getEncoder();
						String encodedString = encoder.encodeToString(bytesArray);
						
						imgDataUriList.add(encodedString);
					}															
					
				} catch (FileNotFoundException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				}			
			}
			request.setAttribute("imgList", imgDataUriList);
			
			model.addAttribute("userLoggedIn", userLoggedIn);
			model.addAttribute("responseMessage", responseMessage);
			
		} catch (HibernateException ex) {
			request.setAttribute("exception", "exception");
			log.debug("Hibernate Exception occurred:\n", ex);
			log.error("Hibernate Exception occurred:\n", ex);
			return exceptionPage;
		}
		return "addDocuments";
	}
	
	@RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
	public String uploadFileHandler(Model model, @RequestParam("fileName") MultipartFile[] files, HttpServletRequest request) {

		String responseMessage= null;
		if (!files[0].isEmpty()) {
			
			try {
				
				// Creating the directory to store file
				ConfigBaseRs configBaseRsLst = serviceImpl.getAllConfig().get(0);
				String rootPath = configBaseRsLst.getUploadLocation();
				HttpSession session = request.getSession(false);
				File dir = new File(rootPath + File.separator + (String)session.getAttribute("userName"));
				if (!dir.exists())
					dir.mkdirs();
				
				for (MultipartFile file : files) {
					
					byte[] bytes = file.getBytes();
	
					// Create the file on server
					File serverFile = new File(dir.getAbsolutePath()+ File.separator + file.getOriginalFilename());
					BufferedOutputStream stream = new BufferedOutputStream(	new FileOutputStream(serverFile));
					stream.write(bytes);
					stream.close();
	
					log.info("Server File Location="+ serverFile.getAbsolutePath());				
				}	
				responseMessage= "Successfully uploaded";
				model.addAttribute("responseMessage",responseMessage);
				
			} catch (Exception e) {
				responseMessage= "Failed to upload."+ " => " + e.getMessage();
				model.addAttribute("responseMessage",responseMessage);				
			}
		} else {
			responseMessage= "Failed to upload. Please select atleast 1 file.";
			model.addAttribute("responseMessage",responseMessage);
		}
		return "redirect:/addDocuments"; 
	}
	
	@RequestMapping(value = "/clearFile", method = RequestMethod.POST)
	public String clearFileHandler(Model model, HttpServletRequest request) {

		String responseMessage= null;
			
			try {
				
				// Creating the directory to store file
				ConfigBaseRs configBaseRsLst = serviceImpl.getAllConfig().get(0);
				String rootPath = configBaseRsLst.getUploadLocation();
				HttpSession session = request.getSession(false);
				File folder = new File(rootPath + File.separator + (String)session.getAttribute("userName"));
				File[] listOfFiles = folder.listFiles();
				
				for (File file : listOfFiles) {
					file.delete();
		        }
								
				responseMessage= "Successfully cleared";
				model.addAttribute("responseMessage",responseMessage);
				
			} catch (Exception e) {
				responseMessage= "Failed to clear."+ " => " + e.getMessage();
				model.addAttribute("responseMessage",responseMessage);				
			}

		return "redirect:/addDocuments"; 
	}
	
	@RequestMapping(value = "/extractData", method = RequestMethod.POST)
	public @ResponseBody 
	List<ExtractRs> extractDataHandler(Model model, HttpServletRequest request) {

		String responseMessage= null;
		ConfigBaseRs configBaseRsLst = serviceImpl.getAllConfig().get(0);
		
		int qrZoneX = configBaseRsLst.getQrZoneX();
		int qrZoneY = configBaseRsLst.getQrZoneY();
		int qrZoneWidth = configBaseRsLst.getQrZoneWidth();
		int qrZoneHeight = configBaseRsLst.getQrZoneHeight();

		OcrOperations ocr = new OcrOperations();
		
		String rootPath = configBaseRsLst.getUploadLocation();
		HttpSession session = request.getSession(false);
		File folder = new File(rootPath + File.separator + (String)session.getAttribute("userName"));
		File[] listOfFiles = folder.listFiles();
		
		List<ExtractRs> extractRsLst = new ArrayList<ExtractRs>();
				
		if(listOfFiles.length>0){
			try {
				
				for (File file : listOfFiles) {
					
					String pageId = ocr.getQRcode(file, qrZoneX, qrZoneY, qrZoneWidth, qrZoneHeight);
					log.info("PageID : "+pageId);
					
					List<PagePropertyZoneRs> pagePropertyZoneRsLst = serviceImpl.getPagePropertyZoneData(pageId);
					List<PropDataRs> propDataRsLst = new ArrayList<PropDataRs>();
															
					for(PagePropertyZoneRs pagePropertyZone : pagePropertyZoneRsLst){
						int zoneX = pagePropertyZone.getZoneX();
						int zoneY = pagePropertyZone.getZoneY();
						int zoneWidth = pagePropertyZone.getZoneWidth();
						int zoneHeight = pagePropertyZone.getZoneHeight();
						
						log.info("Zone X = ["+zoneX+"], Zone Y = ["+zoneY+"], Zone Width = ["+zoneWidth+"], Zone Height = ["+zoneHeight+"]");
						
						String ocrResult = ocr.doOCR(file, zoneX, zoneY, zoneWidth, zoneHeight);
						log.info("Property = ["+pagePropertyZone.getPropertyDisplayName()+"], Value = ["+ocrResult+"]");
							
						PropDataRs propDataRs = new PropDataRs();
						propDataRs.setPropDisplayName(pagePropertyZone.getPropertyDisplayName());
						propDataRs.setPropId(pagePropertyZone.getPropertyId());
						propDataRs.setOcrResult(ocrResult);
						
						propDataRsLst.add(propDataRs);
						
					}
					ExtractRs extractRs = new ExtractRs();
					extractRs.setFileName(file.getName());
					extractRs.setPageId(pageId);
					extractRs.setDocumentClass(serviceImpl.getDocumentClass(pageId));
					extractRs.setPropData(propDataRsLst);
					
					extractRsLst.add(extractRs);
				}			
			}
			catch(Exception e) {
				log.info("Exception : "+e);
				responseMessage= "An unexpected error occurred while OCR process.";
				model.addAttribute("responseMessage",responseMessage);
			}
		}else{
			responseMessage= "Files not found. Please check import folder.";
			model.addAttribute("responseMessage",responseMessage);	
		}
		
		model.addAttribute("extractRsLst",extractRsLst);
		return extractRsLst; 
	}
	
	@RequestMapping(value = "/export", method = RequestMethod.POST)
	public String exportHandler(Model model, @ModelAttribute("extractRsLst") List<ExtractRs> extractRsLst, @RequestParam(value="responseMessage",defaultValue = "", required = false) String responseMessage, HttpServletRequest request) {
		
		ConfigBaseRs configBaseRsLst = serviceImpl.getAllConfig().get(0);
		String rootPath = configBaseRsLst.getUploadLocation();
		String cmisProtocol = configBaseRsLst.getCmisProtocol();
		String cmisUrl = configBaseRsLst.getCmisUri();
		String cmisUsername = configBaseRsLst.getCmisUsername();
		String cmisPassword = configBaseRsLst.getCmisPassword();
		String cmisAuthHttpBasic = configBaseRsLst.getCmisAuthHttpBasic();
		String cmisRepository = configBaseRsLst.getCmisRepository();
		String cmisExportFolder = configBaseRsLst.getCmisExportFolder();

		exportOperations expOpr = new exportOperations();
		Session cmisSession = expOpr.getCmisSession(cmisProtocol+"://"+cmisUrl, cmisAuthHttpBasic, cmisUsername, cmisPassword, cmisRepository);
		Folder expFolder = expOpr.getFolder(cmisSession, cmisExportFolder);
		
		HttpSession session = request.getSession(false);
		
		if(extractRsLst.size()>0){
			try {
				
				for (ExtractRs extractRs : extractRsLst) {

					Map<String, Object> docProps = new HashMap<String, Object>();
					File doc = new File(rootPath + File.separator + (String)session.getAttribute("userName") + File.separator + extractRs.getFileName());
					
					// Setting Document name and document class
					docProps.put(PropertyIds.NAME, extractRs.getFileName());
					docProps.put(PropertyIds.OBJECT_TYPE_ID, extractRs.getDocumentClass());				    
					// Setting Document properties
				    for(PropDataRs propDataRs : extractRs.getPropData()){
				    	docProps.put(propDataRs.getPropId(), request.getParameter(propDataRs.getPropId()));
				    }
				    log.info("Stating cmis export for :"+doc.getName());
					expOpr.exportDoc(cmisSession, expFolder, doc, docProps);
					log.info("Export completed");
				}
				
			}catch(Exception e) {
				log.info("Exception : "+e);
				responseMessage= "An unexpected error occurred while CMIS Export.";
				model.addAttribute("responseMessage",responseMessage);
			}
		}		
		
		model.addAttribute("responseMessage","Export Successfull");
		return "redirect:/addDocuments"; 
		
	}
	
	@RequestMapping(value = "/logout")
	public String logout(Model model, HttpServletRequest request)
	{
		HttpSession session = request.getSession(false);
		if(null!=session)
		{		
			String userName = (String)session.getAttribute("userName");
			String clintHost = request.getRemoteHost();
			log.debug("clintHost "+clintHost);
			String clientIP = request.getRemoteAddr();
			session.invalidate();
			log.debug("clientIP "+clientIP);
			log.debug(userName+" Logged Out from IpAdress "+clientIP);
			return "redirect:/logon";
		}
		else
		{	
			return "redirect:/logon";
		}

	}
		
	public static String getClientIpAddr(HttpServletRequest request) {  
	    String ip = request.getHeader("X-Forwarded-For");  
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = request.getHeader("Proxy-Client-IP");  
	    }  
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = request.getHeader("WL-Proxy-Client-IP");  
	    }  
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = request.getHeader("HTTP_X_FORWARDED_FOR");  
	    }  
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = request.getHeader("HTTP_X_FORWARDED");  
	    }  
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = request.getHeader("HTTP_X_CLUSTER_CLIENT_IP");  
	    }  
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = request.getHeader("HTTP_CLIENT_IP");  
	    }  
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = request.getHeader("HTTP_FORWARDED_FOR");  
	    }  
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = request.getHeader("HTTP_FORWARDED");  
	    }  
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = request.getHeader("HTTP_VIA");  
	    }  
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = request.getHeader("REMOTE_ADDR");  
	    }  
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = request.getRemoteAddr();  
	    }  
	    return ip;  
	}

}

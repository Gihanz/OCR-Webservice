package com.datacap.export;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.chemistry.opencmis.client.api.Document;
import org.apache.chemistry.opencmis.client.api.Folder;
import org.apache.chemistry.opencmis.client.api.Repository;
import org.apache.chemistry.opencmis.client.api.Session;
import org.apache.chemistry.opencmis.client.api.SessionFactory;
import org.apache.chemistry.opencmis.client.runtime.SessionFactoryImpl;
import org.apache.chemistry.opencmis.commons.SessionParameter;
import org.apache.chemistry.opencmis.commons.data.ContentStream;
import org.apache.chemistry.opencmis.commons.enums.BindingType;
import org.apache.chemistry.opencmis.commons.enums.VersioningState;
import org.apache.chemistry.opencmis.commons.exceptions.CmisObjectNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class exportOperations {
	
	private static Logger log = LoggerFactory.getLogger(exportOperations.class);
	public Session getCmisSession(String atompub_url, String auth_http_basic, String user, String password, String repository_id) {
		
		// default factory implementation
		SessionFactory factory = SessionFactoryImpl.newInstance();
		Map<String, String> parameter = new HashMap<String, String>();
		
		// connection settings
		parameter.put(SessionParameter.ATOMPUB_URL, atompub_url);
		parameter.put(SessionParameter.BINDING_TYPE, BindingType.ATOMPUB.value());
		parameter.put(SessionParameter.AUTH_HTTP_BASIC, auth_http_basic);
		parameter.put(SessionParameter.USER, user);
		parameter.put(SessionParameter.PASSWORD, password);
		parameter.put(SessionParameter.REPOSITORY_ID, repository_id);
		List<Repository> repositories = factory.getRepositories(parameter);
		  
		return repositories.get(0).createSession();
	}
		
	public Folder getFolder(Session session, String cmis_export_folder){
			
		Folder exportFolder = null;
		try {
			exportFolder = (Folder) session.getObjectByPath(cmis_export_folder);
		} catch (CmisObjectNotFoundException onfe) {
			log.info("Exception in file retrieve : "+onfe);
		}
		return exportFolder;	
	}

	public void exportDoc(Session session, Folder exportFolder, File doc, Map<String, Object> docProps){
		
		try {	            
		    InputStream isFile = new FileInputStream(doc);
		            
		    ContentStream contentStream = session.getObjectFactory().createContentStream(doc.getName(), doc.length(), "application/jpg", isFile);
		    log.info("ExportFolder : "+exportFolder.getId());
		    	    
		    Document d = exportFolder.createDocument(docProps, contentStream, VersioningState.MAJOR);
		            
		    log.info(d.getId());
		    isFile.close();	
		    
		} catch (Exception ex) {
		    log.info("Exception :"+ex);
		    ex.printStackTrace();
		}
		
	}

}

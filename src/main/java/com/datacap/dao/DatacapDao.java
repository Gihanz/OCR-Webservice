package com.datacap.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.datacap.response.ConfigBaseRs;
import com.datacap.response.PagePropertyZoneRs;


/*
Created By Gihan on Nov 10, 2019
*/
@Component
public class DatacapDao {
	private static Logger log =LoggerFactory.getLogger(DatacapDao.class);

	@PersistenceContext(unitName="datacapconfigPersistence")
	private EntityManager entityManager;
	
	public List<ConfigBaseRs> getAllConfig()
	{
		List<ConfigBaseRs> configBaseRsLst = new ArrayList<ConfigBaseRs>();
		String configQry = "Select DISTINCT cid, qrZoneX, qrZoneY, qrZoneWidth, qrZoneHeight, uploadLocation, cmisProtocol, cmisUri, cmisUsername, cmisPassword, cmisAuthHttpBasic, cmisRepository, cmisExportFolder from ConfigBase";
		log.debug("Query is "+configQry);
		Query qry = entityManager.createQuery(configQry);
		List<Object[]> lstConfig  = qry.getResultList();
		if(lstConfig !=null)
		{
			
			for(Object[] config:lstConfig)
			{
				ConfigBaseRs configBase = new ConfigBaseRs();
				if(null !=config[0])
				{
					configBase.setCid((Integer)config[0]);
				}
				if(null !=config[1])
				{
					configBase.setQrZoneX((Integer)config[1]);
				}
				if(null !=config[2])
				{
					configBase.setQrZoneY((Integer)config[2]);
				}
				if(null !=config[3])
				{
					configBase.setQrZoneWidth((Integer)config[3]);
				}
				if(null !=config[4])
				{
					configBase.setQrZoneHeight((Integer)config[4]);
				}
				if(null !=config[5])
				{
					configBase.setUploadLocation((String)config[5]);
				}
				if(null !=config[6])
				{
					configBase.setCmisProtocol((String)config[6]);
				}
				if(null !=config[7])
				{
					configBase.setCmisUri((String)config[7]);
				}
				if(null !=config[8])
				{
					configBase.setCmisUsername((String)config[8]);
				}
				if(null !=config[9])
				{
					configBase.setCmisPassword((String)config[9]);
				}
				if(null !=config[10])
				{
					configBase.setCmisAuthHttpBasic((String)config[10]);
				}
				if(null !=config[11])
				{
					configBase.setCmisRepository((String)config[11]);
				}
				if(null !=config[12])
				{
					configBase.setCmisExportFolder((String)config[12]);
				}
				configBaseRsLst.add(configBase);
			}
			
		}
		return configBaseRsLst;
	}
	
	public List<PagePropertyZoneRs> getPagePropertyZoneData(String pageId)
	{
		List<PagePropertyZoneRs> pagePropertyZoneRsLst = new ArrayList<PagePropertyZoneRs>();
		String pagePropertyZoneQry = "Select pagePropertyZoneBase.property_Display_Name, pagePropertyZoneBase.property_Id, pagePropertyZoneBase.zone_X, pagePropertyZoneBase.zone_Y, pagePropertyZoneBase.zone_Width, pagePropertyZoneBase.zone_Height "
				+"from Datacap.dbo.Page_Property_Zone_Base pagePropertyZoneBase join Datacap.dbo.Page_Base pageBase on pagePropertyZoneBase.pid=pageBase.pid "
				+"where pageBase.page_Id=:pageId";
		log.debug("Query is "+pagePropertyZoneQry);
		Query qry = entityManager.createNativeQuery(pagePropertyZoneQry).setParameter("pageId", pageId.toUpperCase());
		List<Object[]> lstPagePropertyZone  = qry.getResultList();
		if(lstPagePropertyZone !=null)
		{
			
			for(Object[] pagePropertyZone:lstPagePropertyZone)
			{
				PagePropertyZoneRs pagePropertyZoneRs = new PagePropertyZoneRs();
				if(null !=pagePropertyZone[0])
				{
					pagePropertyZoneRs.setPropertyDisplayName((String)pagePropertyZone[0]);
				}
				if(null !=pagePropertyZone[1])
				{
					pagePropertyZoneRs.setPropertyId((String)pagePropertyZone[1]);
				}
				if(null !=pagePropertyZone[2])
				{
					pagePropertyZoneRs.setZoneX((Integer)pagePropertyZone[2]);
				}
				if(null !=pagePropertyZone[3])
				{
					pagePropertyZoneRs.setZoneY((Integer)pagePropertyZone[3]);
				}
				if(null !=pagePropertyZone[4])
				{
					pagePropertyZoneRs.setZoneWidth((Integer)pagePropertyZone[4]);
				}
				if(null !=pagePropertyZone[5])
				{
					pagePropertyZoneRs.setZoneHeight((Integer)pagePropertyZone[5]);
				}						
				pagePropertyZoneRsLst.add(pagePropertyZoneRs);
			}
			
		}
		return pagePropertyZoneRsLst;
	}
	
	public String getDocumentClass(String pageId)
	{
		String documentClassQry = "Select DISTINCT documentClass from PageBase where pageId=:pageId";
		log.debug("Query is "+documentClassQry);
		Query qry = entityManager.createQuery(documentClassQry).setParameter("pageId", pageId.toUpperCase());
		
		return (String) qry.getSingleResult();
	}

	public static String convert(String[] name) { 
	    StringBuilder sb = new StringBuilder();
	    for (String st : name) { 
	        sb.append('\'').append(st).append('\'').append(',');
	    }
	    if (name.length != 0) sb.deleteCharAt(sb.length()-1);
	    return sb.toString();
	}
	
	public static String convertFromInteger(Integer[] name) { 
	    StringBuilder sb = new StringBuilder();
	    for (Integer st : name) { 
	        sb.append(st).append(',');
	    }
	    if (name.length != 0) sb.deleteCharAt(sb.length()-1);
	    return sb.toString();
	}
	
}

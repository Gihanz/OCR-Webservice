package com.datacap.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.datacap.response.ConfigBaseRs;
import com.datacap.response.PagePropertyZoneRs;
import com.datacap.dao.DatacapDao;


/*
Created By Gihan on Nov 10, 2019
*/
@Component
public class DatacapService {
	private static Logger log =LoggerFactory.getLogger(DatacapService.class);
	@Autowired
	private DatacapDao datacapDao;
		
	@Transactional(value="transactionManager",readOnly=true)
	public List<ConfigBaseRs> getAllConfig()
	{
		List<ConfigBaseRs> configBaseLst =  datacapDao.getAllConfig();
		return configBaseLst;
	}
	
	@Transactional(value="transactionManager",readOnly=true)
	public List<PagePropertyZoneRs> getPagePropertyZoneData(String pageId)
	{
		List<PagePropertyZoneRs> pagePropertyZoneLst =  datacapDao.getPagePropertyZoneData(pageId);
		return pagePropertyZoneLst;
	}
	
	@Transactional(value="transactionManager",readOnly=true)
	public String getDocumentClass(String pageId)
	{
		String documentClass =  datacapDao.getDocumentClass(pageId);
		return documentClass;
	}
}

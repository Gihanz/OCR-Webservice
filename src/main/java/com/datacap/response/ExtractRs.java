package com.datacap.response;

import java.util.List;

/*
Created By Gihan on Nov 17, 2019
*/
public class ExtractRs {
	
	private String fileName;
	private String pageId;
	private String DocumentClass;
	private List<PropDataRs> propData;
	
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getPageId() {
		return pageId;
	}
	public void setPageId(String pageId) {
		this.pageId = pageId;
	}
	public String getDocumentClass() {
		return DocumentClass;
	}
	public void setDocumentClass(String DocumentClass) {
		this.DocumentClass = DocumentClass;
	}
	public List<PropDataRs> getPropData() {
		return propData;
	}
	public void setPropData(List<PropDataRs> propData) {
		this.propData = propData;
	}

}

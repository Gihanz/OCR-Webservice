package com.datacap.response;

/*
Created By Gihan on Dec 17, 2019
*/
public class PropDataRs {
	private String propDisplayName;
	private String propId;
	private String ocrResult;
	
	public String getPropDisplayName() {
		return propDisplayName;
	}
	public void setPropDisplayName(String propDisplayName) {
		this.propDisplayName = propDisplayName;
	}
	public String getPropId() {
		return propId;
	}
	public void setPropId(String propId) {
		this.propId = propId;
	}
	public String getOcrResult() {
		return ocrResult;
	}
	public void setOcrResult(String ocrResult) {
		this.ocrResult = ocrResult;
	}
}

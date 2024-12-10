package com.datacap.response;

/*
Created By Gihan on Dec 17, 2019
*/
public class ConfigBaseRs 
{
	private int cid;
	private int qrZoneX;
	private int qrZoneY;
	private int qrZoneWidth;
	private int qrZoneHeight;
	private String uploadLocation;
	private String cmisProtocol;
	private String cmisUri;
	private String cmisUsername;
	private String cmisPassword;
	private String cmisAuthHttpBasic;
	private String cmisRepository;
	private String cmisExportFolder;

	public int getCid() {
		return cid;
	}
	public void setCid(int cid) {
		this.cid = cid;
	}
	public int getQrZoneX() {
		return qrZoneX;
	}
	public void setQrZoneX(int qrZoneX) {
		this.qrZoneX = qrZoneX;
	}
	public int getQrZoneY() {
		return qrZoneY;
	}
	public void setQrZoneY(int qrZoneY) {
		this.qrZoneY = qrZoneY;
	}
	public int getQrZoneWidth() {
		return qrZoneWidth;
	}
	public void setQrZoneWidth(int qrZoneWidth) {
		this.qrZoneWidth = qrZoneWidth;
	}
	public int getQrZoneHeight() {
		return qrZoneHeight;
	}
	public void setQrZoneHeight(int qrZoneHeight) {
		this.qrZoneHeight = qrZoneHeight;
	}
	public String getUploadLocation() {
		return uploadLocation;
	}
	public void setUploadLocation(String uploadLocation) {
		this.uploadLocation = uploadLocation;
	}
	public String getCmisProtocol() {
		return cmisProtocol;
	}
	public void setCmisProtocol(String cmisProtocol) {
		this.cmisProtocol = cmisProtocol;
	}
	public String getCmisUri() {
		return cmisUri;
	}
	public void setCmisUri(String cmisUri) {
		this.cmisUri = cmisUri;
	}
	public String getCmisUsername() {
		return cmisUsername;
	}
	public void setCmisUsername(String cmisUsername) {
		this.cmisUsername = cmisUsername;
	}
	public String getCmisPassword() {
		return cmisPassword;
	}
	public void setCmisPassword(String cmisPassword) {
		this.cmisPassword = cmisPassword;
	}
	public String getCmisAuthHttpBasic() {
		return cmisAuthHttpBasic;
	}
	public void setCmisAuthHttpBasic(String cmisAuthHttpBasic) {
		this.cmisAuthHttpBasic = cmisAuthHttpBasic;
	}
	public String getCmisRepository() {
		return cmisRepository;
	}
	public void setCmisRepository(String cmisRepository) {
		this.cmisRepository = cmisRepository;
	}
	public String getCmisExportFolder() {
		return cmisExportFolder;
	}
	public void setCmisExportFolder(String cmisExportFolder) {
		this.cmisExportFolder = cmisExportFolder;
	}
	
}

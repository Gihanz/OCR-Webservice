package com.datacap.ocr;

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.Rectangle;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.zxing.BinaryBitmap;
import com.google.zxing.LuminanceSource;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.NotFoundException;
import com.google.zxing.Result;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.common.HybridBinarizer;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import net.sourceforge.tess4j.util.ImageHelper;
import net.sourceforge.tess4j.util.LoadLibs;

public class OcrOperations {
	
	private static Logger log = LoggerFactory.getLogger(OcrOperations.class);
	
	public static BufferedImage toBufferedImage(Image img)
	{
	    if (img instanceof BufferedImage){
	        return (BufferedImage) img;
	    }

	    BufferedImage bimage = new BufferedImage(img.getWidth(null), img.getHeight(null), BufferedImage.TYPE_INT_ARGB);
	    Graphics2D bGr = bimage.createGraphics();
	    bGr.drawImage(img, 0, 0, null);
	    bGr.dispose();
	    return bimage;
	}
	
	/**
	 * Get OCR output from given region
	 */
	public String doOCR(File pathToFile, int x, int y, int width, int height){
		
		String str = null;
		ITesseract image = new Tesseract();
		System.loadLibrary("liblept1780");

		File tessFolder = LoadLibs.extractTessResources("tessdata");
		image.setDatapath(tessFolder.getAbsolutePath());
		image.setLanguage("eng");
		
		try {
			Image origin = ImageIO.read(pathToFile);
			BufferedImage bufferedImg = toBufferedImage(origin);
			BufferedImage textImage = ImageHelper.convertImageToGrayscale(bufferedImg);

			Rectangle rect =  new Rectangle(x, y, width, height);
			str = image.doOCR(textImage, rect);
			str = str.replaceAll("\\r\\n|\r|\n", " ").replaceAll("(\\s)+", " ").trim();
			log.info("OCR Result : "+str);
			
		}catch(TesseractException e){
			log.info("Exception "+e.getMessage());
		}catch(IOException e){
			log.info("Exception "+e.getMessage());
		}
		return str;
	}
	
	/**
	 * Read QR code
	 */
	public String getQRcode(File pathToFile, int x, int y, int width, int height){
		
		Result result = null;
		try {
			BufferedImage bufferedImage = ImageIO.read(pathToFile);
	        LuminanceSource source = new BufferedImageLuminanceSource(bufferedImage.getSubimage(x, y, width, height));
	        BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source));
	        
            result = new MultiFormatReader().decode(bitmap);
            log.info("QRCode : "+result.getText());
            
        } catch (NotFoundException e) {
        	log.info("There is no QR code in the image");
        }catch (IOException e) {
        	log.info("Could not decode QR Code, IOException :: " + e.getMessage());
        }	
		return result.getText();
		
	}

}

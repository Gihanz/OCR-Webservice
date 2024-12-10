package com.datacap.util;

import org.springframework.context.support.ClassPathXmlApplicationContext;
import com.datacap.service.DatacapService;

/*
Created By Gihan on Nov 10, 2019
*/
public class SpringOrmMain 
{

public static void main(String[] args) {
		
		//Create Spring application context
		ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("classpath:/spring.xml");
		
		//Get service from context.
		DatacapService productService = ctx.getBean(DatacapService.class);
		
}
		
}

package org.mo.com.json;

import org.mo.com.logging.RLogger;

public class FJsonObjectTest
{
   public static void main(String[] args){
      try{
         FJsonDocument document = new FJsonDocument();
         document.loadFile("D:/Microbject/json.txt");
         System.out.println(document.toJson());
      }catch(Exception exception){
         RLogger.find(FJsonObjectTest.class).error(null, "main", exception);
      }
   }
}

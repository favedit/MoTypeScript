package org.mt.filename;

import org.mo.com.io.FFileInfo;
import org.mo.com.io.FFileInfos;
import org.mo.com.io.RDirectory;
import org.mo.com.io.RFile;
import org.mo.com.lang.RString;

public class RFilenameRename
{
   protected static FFileInfos _sources;

   protected static FFileInfos _targets;

   public static FFileInfo findSource(String code){
      for(FFileInfo source : _sources){
         String shortName = source.name();
         if(shortName.contains("Seitokaichou][" + code + "話")){
            return source;
         }
      }
      return null;
   }

   public static void main(String[] args){
      String sourcePath = "H:/Download/Finish/[ReinForce] Okusama ga Seitokaichou! (BDRip 1920x1080 x264 FLAC)";
      String targetPath = "H:/Download/Finish/[ReinForce] Okusama ga Seitokaichou! (BDRip 1920x1080 x264 FLAC)";
      _sources = RDirectory.listFiles(sourcePath, false);
      _targets = RDirectory.listFiles(targetPath, false);
      for(FFileInfo target : _targets){
         String shortName = target.name();
         String code = RString.mid(shortName, "Seitokaichou! - ", "(BDRip 1920x1080 x264 FLAC)");
         if(code.startsWith("0")){
            code = code.substring(1);
         }
         // 查找来源
         FFileInfo source = findSource(code);
         if(null != source){
            System.out.println(code);
            String sourceShortName = source.name();
            sourceShortName = sourceShortName.substring(0, sourceShortName.length() - 4) + ".srt";
            RFile.rename(target.fileName(), targetPath + "/" + sourceShortName);
         }
      }
   }
}

package org.mo.eng.entity;

import org.mo.eng.data.FDataContext;
import org.mo.eng.data.IConnectionConsole;
import org.mo.eng.data.IDatabaseConsole;

public class FEntityContext
      extends FDataContext
      implements
         IEntityContext
{
   public FEntityContext(IDatabaseConsole dbConsole){
      super(dbConsole);
   }

   @Override
   public String defaultName(){
      // TODO Auto-generated method stub
      return null;
   }

   @Override
   public void setDefaultName(String defaultName){
      // TODO Auto-generated method stub
   }

   @Override
   public IConnectionConsole activeConnectionConsole(){
      // TODO Auto-generated method stub
      return null;
   }

   @Override
   public IConnectionConsole activeConnectionConsole(String name){
      // TODO Auto-generated method stub
      return null;
   }

   @Override
   public void commit(){
      // TODO Auto-generated method stub

   }

   @Override
   public void rollback(){
      // TODO Auto-generated method stub
   }

   @Override
   public void close() throws Exception{
      // TODO Auto-generated method stub

   }
}

export class FProductResourceConsole {
   public toJson(): string {
      var data: any = new Object();
      var meta: any = data.meta = new Object();
      var materials: any = data.materials = new Array();
      var conditions: any = data.conditions = new Array();
      var content: any = data.content = new Object();
      return JSON.stringify(data);
   }
}

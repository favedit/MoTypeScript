export class FContentVariable {
   public toJson(): string {
      var data: any = new Object();
      data.id = '123';
      var meta: any = data.meta = new Object();
      meta.code = 'code';
      var materials: any = data.materials = new Array();
      var conditions: any = data.conditions = new Array();
      var content: any = data.content = new Object();
      return JSON.stringify(data);
   }
}

////SKObject?
//interface Content{}

///*
//一件家具
//*/
//interface PieceOfFurniture{}

///*
//instanceof  打洞可以共用
//获得墙的厚度
//*/
//interface DoorOrWidnow extends PieceOfFurniture{}

////窗框,门框
//class Sash{}

////文字样式
//class TextStyle{}

//interface Selectable{}

////获得所在层
//interface Elevatable{}

//class Level{}

////描图
//class BackgroundImage{}

////文字面积
//class Label implements Elevatable,Selectable{}

////尺寸线
//class DimensionLine implements Elevatable,Selectable{}

//class Wall implements Elevatable,Selectable{}

//class HomePieceOfFurniture implements Elevatable,Selectable,PieceOfFurniture{}

//interface TextureImage {}
//interface Compareable<T>{}

//class CatalogTexture implements TextureImage,Compareable<CatalogTexture>{}

//class HomeTexture implements TextureImage{}

////踢脚线
//class BaseBorad{}

////材质？
//class HomeMaterial{}

//interface CatalogItem{}

//class CatalogPieceOfFurniture implements Compareable<CatalogPieceOfFurniture>,PieceOfFurniture,CatalogItem{}

//class CatalogDoorOrWindow implements DoorOrWidnow{}

//class Room implements Selectable,Elevatable{}

////光源
//class LightSource{}

//interface Light extends PieceOfFurniture{}

//class CatalogLight extends CatalogPieceOfFurniture implements Light{}

//class HomeLight extends HomePieceOfFurniture implements Light{}

//class Camera{}

//enum AspectRatio{}

////光 背景 网格 地面网格 纹理
//class HomeEnvironment{}

//class ObserverCamera extends Camera implements Selectable{}

//class Polyline implements Selectable,Elevatable{}

//class EventObject{}

////事件队列？
//class CollectionEvent<T> extends EventObject{}

////家具目录
//class FurnitureCatalog{}

////家具分类列表
//class FurnitureCategory implements Compareable<FurnitureCategory>{}

////指北针
//class Compass implements Selectable{}

////打印相关设置
//class HomePrint{}

//class EventListener{}

//class SelectionListener extends EventListener{}

//class HomeDoorOrWindow extends HomePieceOfFurniture implements DoorOrWidnow{}

//class HomeFurnitureGroup extends HomePieceOfFurniture {}

//class CollectionListener<T> extends EventListener{}

//class CollectionChangeSupport<T>{}

//class TexturesCategory implements Compareable<TexturesCategory>{}

//class PatternsCatalog{}

//class Home{}

//class Exception{}

//class RecorderException extends Exception{}

//class PrintException extends Exception{}

//class DamagedHomeRecorderException extends RecorderException{}

//class InterruptedRecorderException extends PrintException{}

//class NotEnoughSpaceRecorderException extends RecorderException{}

//interface HomeRecorder{}

////提供增加额外功能的库
//interface Library{}

//enum LengthUnit{}

////用户环境设置
//class UserPreferences{}

////管理home 添加 管理 删除 序列化存储等。
//class HomeApplication{}

////同名异常
//class IllegalHomonymException{}

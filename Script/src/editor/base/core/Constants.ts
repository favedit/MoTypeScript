declare var hsw_dir: string;

export class Constants {
	public static BEGIN = 0;
	public static PIXEL_TO_M_FACTOR = 136.7;
	public static PIXEL_TO_M_FACTOR_CANVAS2D = 136.7;
	public static DEFAULT_WALL_3D_HEIGHT = 2.6;
	public static DEFAULT_PARTIAL_WALL_3D_HEIGHT = 1.3;
	public static DEFAULT_WALL_WIDTH = 0.1524;
	public static DEFAULT_INTERIOR_WALL_WIDTH = 0.1524;
	public static DEFAULT_MOLDING_PARAM = {
		ID: "molding_none",
		HEIGHT: 0.1,
		MIN_HEIGHT: 0,
		MAX_HEIGHT: 0.5,
		THICKNESS: 0.015
	};
	public static DEFAULT_WALL_MATERIAL = {
		textureURI: hsw_dir + "res/wall_stucco.jpg",
		seekId: "local"
	};
	public static DEFAULT_FLOOR_MATERIAL = {
		textureURI: hsw_dir + "res/wood.png",
		tileSize: 3
	};
	public static DEFAULT_CEILING_MATERIAL = {
		textureURI: hsw_dir + "res/white.jpg"
	};
	public static DEFAULT_FLOOR_COLOR = "#91d4ff";
	public static DEFAULT_FLOOR_SELECTED_COLOR = "#a8ceec";
	public static DEFAULT_FLOOR_HIGHLIGHT_COLOR = "#55acee";
	public static DEFAULT_POINT_COLOR = "#909090";
	public static DEFAULT_POINT_SELECTED_COLOR = "#a8ceec";
	public static DEFAULT_WALL_COLOR = "#acacac";
	public static DEFAULT_WALL_HOVOR_COLOR = "#c5daeb";
	public static DEFAULT_WALL_SELECTED_COLOR = "#a8ceec";
	public static DEFAULT_WALL_HIGHLIGHT_COLOR = "#4c8dbd";
	public static DEFAULT_WALLBORDER_COLOR = "#333333";
	public static DEFAULT_WALLBORDER_HOVOR_COLOR = "#257ab9";
	public static DEFAULT_WALLBORDER_SELECTED_COLOR = "#257ab9";
	public static DEFAULT_WALLBORDER_HIGHLIGHT_COLOR = "#008bc8";
	public static LOADBEARING_WALL_COLOR = "#444b52";
	public static LOADBEARING_WALL_HOVOR_COLOR = "#85afc3";
	public static LOADBEARING_WALL_SELECTED_COLOR = "#769aaa";
	public static LOADBEARING_WALL_HIGHLIGHT_COLOR = "#4d9ab8";
	public static DEFAULT_WINDOW_ELEVATION = 0.7;
	public static MINIMUM_ROOMSIZE = 0.1;
	public static TOLERANCE = 0.001;
	public static Canvas_Width = 100;
	public static Grid_Spacing = 0.5;
	public static Canvas_Height = 100;
	public static Major_Lines_Every_Nth_Grid_Line = 5;
	public static MIN_WALL_3D_HEIGHT = 1.5;
	public static MAX_WALL_3D_HEIGHT = 8;
	public static FIRSTPERSON_CAMERA_HEIGHT = 1.56;
	public static FIRSTPERSON_CAMERA_PITCH = 0;
	public static FIRSTPERSON_CAMERA_TARGET_X = 1;
	public static FIRSTPERSON_CAMERA_TARGET_Y = 1;
	public static FIRSTPERSON_CAMERA_HORIZONTAL_FOV = 60;
	public static FIRSTPERSON_CAMERA_HORIZONTAL_FOV_MIN = 12;
	public static FIRSTPERSON_CAMERA_HORIZONTAL_FOV_MAX = 110;
	public static AERIALVIEW_CAMERA_PITCH = -45;
	public static AERIALVIEW_CAMERA_DISTANCE = 10;
	public static AERIALVIEW_CAMERA_TARGET_X = 0;
	public static AERIALVIEW_CAMERA_TARGET_Y = 0;
	public static AERIALVIEW_CAMERA_X = -5;
	public static AERIALVIEW_CAMERA_Y = -5;
	public static AERIALVIEW_CAMERA_Z = 7;
	public static AERIALVIEW_CAMERA_HORIZONTAL_FOV = 60;
	public static AERIALVIEW_CAMERA_HORIZONTAL_FOV_MIN = 12;
	public static AERIALVIEW_CAMERA_HORIZONTAL_FOV_MAX = 110;
	public static AERIALVIEW_CAMERA_MAX_DISTANCE = 15;
	public static AERIALVIEW_CAMERA_MIN_DISTANCE = 2;
	public static CAMERA_CONTINOUS_TIMER = 300;
	public static DEFAULT_ENVIRONMENT_COLOR = 16777215;
	public static MIN_WALL_THICKNESS = 0.05;
	public static DISPLAY_PRECISION_DIGITS = 2;
	public static MAX_WALL_THICKNESS = 1;
	public static MIN_WALL_LENGTH = 0;
	public static MAX_WALL_LENGTH = 100;
	public static END = 0;
}

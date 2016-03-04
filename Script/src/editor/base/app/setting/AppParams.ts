export const ModeTypeEnum = {
    normal: "normal",
    iframe: "iframe",
    readonly: "readonly"
};

export class AppParams {
	tenant: string;

	locale: string;

	set: (config: any) => {}

	debug = false;

	svgCanvas;

	webglCanvas;
	seekid;
	mode;
}

//===========================================================
// <T>资源压缩方式。</T>
//
// @enum
// @author maocy
// @version 150317
//===========================================================
export class EResourceCompress {
    // @attribute 未压缩
    public static None: string = 'none';
    // @attribute DEFLATE压缩
    public static Deflate: string = 'deflate';
    // @attribute LZMA压缩
    public static Lzma: string = 'lzma';
}

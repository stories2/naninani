export interface CanvasDrawImageModel {
  image: HTMLImageElement;
  sx: number;
  sy: number;
  sWidth: number;
  sHeight: number;
  dx: number;
  dy: number;
  dWidth: number;
  dHeight: number;
}

export interface CroppedImageModel {
  x: number;
  y: number;
  width: number;
  height: number;
}

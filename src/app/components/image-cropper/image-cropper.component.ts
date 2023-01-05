import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import {
  Dimensions,
  ImageCroppedEvent,
  ImageTransform,
  base64ToFile,
} from 'ngx-image-cropper';
declare var $: any;
@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css'],
})

/**
 * @param: croppedResult => avatar image (default)
 * @param: ratio => aspect ratio for the cropper
 */

export class ImageCropperComponent {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  @ViewChild('container') container!: ElementRef;

  @Input('img') croppedResult!: string;
  @Input('ratio') ratio!: number;

  //* Style image
  @Input('width') width!: number
  @Input('height') height!: number
  @Input('br') br!: number

  styleObject(): Object { //* los estilos para la imagen
    return {'height.px': this.height, 'width.px': this.width, 'border-radius.px': this.br}
  }

  imageUrl!: string;
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  //* Call the input file click (this element is hidden)
  call() {
    this.input.nativeElement.click();
  }

  //* Get the image and put it in the cropperComponent:
  onSelectedFile(event: any) {
    this.imageUrl = event;
    this.container.nativeElement.classList.add('visible'); //* Shows container
  }

  //* Restore the input and hide the container
  cancel() {
    this.container.nativeElement.classList.remove('visible');
    this.input.nativeElement.value = '';
  }

  //* Transform image into Base64 (native from ngx-image-cropper dependency)
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(event, base64ToFile(event.base64!));
  }

  imageLoaded() { //* Loading the image
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) { //* When cropper is ready
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() { //* Image load failure
    console.log('Load failed');
  }

  rotateLeft() { //* Rotate image
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() { //* Rotate image
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() { //* Flip image
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH,
    };
  }

  flipHorizontal() { //* Flip image
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH,
    };
  }

  flipVertical() { //* Flip image
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV,
    };
  }

  resetImage() { //* Restore image default size and position
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() { //* Zoom
    this.scale -= 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  zoomIn() { //* Zoom
    this.scale += 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation,
    };
  }

  getImage() {
    //* Get the image cropped and return it
    this.croppedResult = this.croppedImage;
    this.cancel();
  }

  ngOnInit() {
    //* Image tooltip
    $(document).ready(function () {
      $('[data-bs-toggle="tooltip"]').tooltip();
    });
  }
}

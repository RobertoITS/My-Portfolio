import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CropperComponent } from 'angular-cropperjs';
import Cropper from 'cropperjs';
import { Dimensions, ImageCroppedEvent, ImageTransform, base64ToFile } from 'ngx-image-cropper';
declare var $: any


@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css'],
})
export class ImageCropperComponent {

  @ViewChild('input') input!: ElementRef <HTMLInputElement>
  @ViewChild('container') container!: ElementRef

  @Input('img') croppedResult!: string

  imageUrl!: string
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  call(){
    this.input.nativeElement.click()
  }

  //* Obtenemos el archivo y mostramos en la etiqueta:
  onSelectedFile(event:any){
    this.imageUrl = event
    this.container.nativeElement.classList.add('visible') //* Mostramos el contendor para cortar la imagen
  }

  cancel(){
    this.container.nativeElement.classList.remove('visible')
    this.input.nativeElement.value = ''
  }



  //Pasa la imagen a base 64 desde el cropper
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      console.log(event, base64ToFile(event.base64!));
  }

  imageLoaded() {
      this.showCropper = true;
      console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
      console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
      console.log('Load failed');
  }

  rotateLeft() {
      this.canvasRotation--;
      this.flipAfterRotate();
  }

  rotateRight() {
      this.canvasRotation++;
      this.flipAfterRotate();
  }

  private flipAfterRotate() {
      const flippedH = this.transform.flipH;
      const flippedV = this.transform.flipV;
      this.transform = {
          ...this.transform,
          flipH: flippedV,
          flipV: flippedH
      };
  }


  flipHorizontal() {
      this.transform = {
          ...this.transform,
          flipH: !this.transform.flipH
      };
  }

  flipVertical() {
      this.transform = {
          ...this.transform,
          flipV: !this.transform.flipV
      };
  }

  resetImage() {
      this.scale = 1;
      this.rotation = 0;
      this.canvasRotation = 0;
      this.transform = {};
  }

  zoomOut() {
      this.scale -= .1;
      this.transform = {
          ...this.transform,
          scale: this.scale
      };
  }

  zoomIn() {
      this.scale += .1;
      this.transform = {
          ...this.transform,
          scale: this.scale
      };
  }

  toggleContainWithinAspectRatio() {
      this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
      this.transform = {
          ...this.transform,
          rotate: this.rotation
      };
  }

  getImage(){
    this.croppedResult = this.croppedImage
    this.cancel()
  }
}

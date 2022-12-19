import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { CropperComponent } from 'angular-cropperjs';
import { blob } from 'stream/consumers';


@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css'],
})
export class ImageCropperComponent {
  @ViewChild('angularCropper') angularCropper!: CropperComponent
  @ViewChild('canvas') canvas!: ElementRef
  imageUrl!: string
  croppedResult!: string
  cropper!: Cropper
  config = {
    zoomable: true,
    aspectRatio: 1,
    viewMode: 1,
  }

  //* Obtenemos el archivo y mostramos en la etiqueta:
  onSelectedFile(event:any){
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = () => {
        this.imageUrl = reader.result as string
      }
    }
  }

  getCroppedImage() {

    const rounded = this.getRoundedCanvas(this.angularCropper.cropper.getCroppedCanvas())
    rounded.toBlob((blob:any) => {
      const reader = new FileReader()
      reader.readAsDataURL(blob!)
      reader.onload = () => {
        this.croppedResult = reader.result as string
        console.log(this.croppedResult); //* Nos da la ubicacion del archivo jpeg

      }
    }, "image/jpeg", 0.95)
  }

  rotateLeft() {
    this.angularCropper.cropper.rotate(-45)
  }

  rotateRight() {
    this.angularCropper.cropper.rotate(45)
  }

  zoomIn() {
    this.angularCropper.cropper.zoom(0.1)
  }

  zoomOut() {
    this.angularCropper.cropper.zoom(-0.1)
  }

  getRoundedCanvas(sourceCanvas:any) {
    var context = this.canvas.nativeElement.getContext('2d')!;
    var width = sourceCanvas.width;
    var height = sourceCanvas.height;

    this.canvas.nativeElement.width = width;
    this.canvas.nativeElement.height = height;
    context.imageSmoothingEnabled = true;
    context.drawImage(sourceCanvas, 0, 0, width, height);
    context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
    context.fill();
    return this.canvas.nativeElement;
  }
}

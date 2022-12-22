import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CropperComponent } from 'angular-cropperjs';
import Cropper from 'cropperjs';
declare var $: any


@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css'],
})
export class ImageCropperComponent {

  constructor(public sanitizer: DomSanitizer){}

  @ViewChild('angularCropper') angularCropper!: CropperComponent
  @ViewChild('canvas') canvas!: ElementRef
  @ViewChild('input') input!: ElementRef <HTMLInputElement>
  @ViewChild('container') container!: ElementRef

  @ViewChild('ipt') ipt!: ElementRef <HTMLInputElement>

  @Input('img') croppedResult!: string
  imageUrl!: string
  //croppedResult: string = '../assets/img/mf-avatar.svg'
  cropper!: Cropper
  config = {
    zoomable: true,
    aspectRatio: 1,
    viewMode: 1,
    minCanvasWidth: 100,
    minCanvasHeight: 100
  }

  call(){
    this.input.nativeElement.click()
  }

  //* Obtenemos el archivo y mostramos en la etiqueta:
  onSelectedFile(event:any){
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = () => {
        this.imageUrl = reader.result as string
        this.container.nativeElement.classList.add('visible') //* Mostramos el contendor para cortar la imagen
      }
    }
  }

  cancel(){
    this.container.nativeElement.classList.remove('visible')
    this.input.nativeElement.value = ''
    this.angularCropper.cropper.reset() //* Resetea el cropper
  }

  getCroppedImage(event:any) {
    //* Rounded image
    //const rounded = this.getRoundedCanvas(this.angularCropper.cropper.getCroppedCanvas())
    /*rounded.toBlob((blob:any) => {
      const reader = new FileReader()
      reader.readAsDataURL(blob!)
      reader.onload = () => {
        this.croppedResult = reader.result as string
        console.log(this.croppedResult); //* Nos da la ubicacion del archivo jpeg

      }
    }, "image/jpeg", 0.95)*/

    this.angularCropper.cropper.getCroppedCanvas().toBlob((blob:any) => {
      const reader = new FileReader()
      reader.readAsDataURL(blob!)
      reader.onload = () => {

        this.croppedResult = reader.result as string

        //! console.log(this.croppedResult); //* Nos da la ubicacion del archivo jpeg
        this.cancel() //* Cierra la ventana
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

  /*getRoundedCanvas(sourceCanvas:any) {
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
  }*/

  /*ngAfterViewInit(){

    function getRoundedCanvas(sourceCanvas:any) {
      var canvas = document.createElement('canvas')
      var context = canvas.getContext('2d')!;
      var width = sourceCanvas.width;
      var height = sourceCanvas.height;

      canvas.width = width;
      canvas.height = height;
      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = 'destination-in';
      context.beginPath();
      context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
      context.fill();
      return canvas;
    }

    var croppable = false
    var image = <HTMLImageElement> document.getElementById('image')
    var button = <HTMLButtonElement> document.getElementById('button')
    var result = <HTMLImageElement> document.getElementById('result')
    var cropper = new Cropper(image, {
      aspectRatio:1,
      viewMode: 1,
      ready: function(){
        croppable = true
      }
    })

    button.onclick = function(){
      var croppedCanvas
      var roundedCanvas
      var roundedImage

      if(!croppable){return}

      //* Crop
      croppedCanvas = cropper.getCroppedCanvas()
      //* Round
      roundedCanvas = getRoundedCanvas(croppedCanvas)
      //* Show
      roundedImage = document.createElement('img');
      roundedImage.src = roundedCanvas.toDataURL()
      result.innerHTML = '';
      result.appendChild(roundedImage);
    }



  }*/
  ngOnInit(){
    //* Tooltip para el img!
    $(document).ready(function() {
      $('[data-bs-toggle="tooltip"]').tooltip();
    })
  }

  getFile(event:any){
    console.log(event.target.files);
  }
}

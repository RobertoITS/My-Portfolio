import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import Cropper from 'cropperjs'

import * as $ from 'jquery'

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css']
})
export class ImageCropperComponent {
  private cropper!: Cropper;
  /*@ViewChild("image", { static: false })
    public imageElement!: ElementRef;

    @Input("src")
    public imageSource!: string;

    public imageDestination: string;
    private cropper!: Cropper;

    public constructor() {
        this.imageDestination = "";
    }

    public ngAfterViewInit() {
        this.cropper = new Cropper(this.imageElement.nativeElement, {
            zoomable: false,
            scalable: false,
            aspectRatio: 1,
            crop: () => {
                const canvas = this.cropper.getCroppedCanvas();
                this.imageDestination = canvas.toDataURL("image/png");
            }
        });*/

    ngAfterViewInit(){
      document.getElementById('crop_button')!.addEventListener('click', () =>{
        var imgurl =  this.cropper.getCroppedCanvas().toDataURL();
        var img = document.createElement("img");
        img.src = imgurl;
        document.getElementById("cropped_result")!.appendChild(img);
      })
      function initCropper(){
        var image = <HTMLImageElement>document.getElementById('blah');
        var cropper = new Cropper(image, {
          aspectRatio: 1 / 1,
          crop: function(e) {
            console.log(e.detail.x);
            console.log(e.detail.y);
          }
        });
    }
    function readURL(input:any) {

      if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {

              $('#blah').attr('src', e.target?.result!)
          };
          reader.readAsDataURL(input.files[0]);
          setTimeout(initCropper, 1000);
      }
  }
    }

    public ngOnInit() { }
}

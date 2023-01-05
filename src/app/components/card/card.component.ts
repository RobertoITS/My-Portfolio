import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input('title') title!: string
  @Input('descrip') descrip!: string
  @Input('url') url!: string
  @Input('img') img!: string
}

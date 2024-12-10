import {Component, ElementRef, Input, Renderer2} from '@angular/core';

@Component({
  selector: 'app-button-component',
  imports: [],
  templateUrl: './button-component.component.html',
  styleUrl: './button-component.component.scss'
})
export class ButtonComponentComponent {

  @Input() label!: string;
  @Input() labelColor!: string;
  @Input() color!: string;

}

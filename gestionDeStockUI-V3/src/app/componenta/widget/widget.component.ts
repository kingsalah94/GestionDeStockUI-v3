import {Component, input, signal} from '@angular/core';
import {Widget} from '../../models/dashboard';
import {NgComponentOutlet} from '@angular/common';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  host:{
    '[style.grid-area]':
      '"span " + (data().rows ?? 1) + "/span " + (data().columns ?? 1)'
  },
  styleUrl: './widget.component.css'
})

export class WidgetComponent {
  data = input.required<Widget>();
  showOptions = signal(false)
}

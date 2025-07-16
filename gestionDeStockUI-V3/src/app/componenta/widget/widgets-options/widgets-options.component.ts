import {Component, inject, input, model, signal} from '@angular/core';
import {Widget} from '../../../models/dashboard';
import {DashboardService} from '../../../services/dashboard.service';

@Component({
  selector: 'app-widgets-options',
  templateUrl: './widgets-options.component.html',
  styleUrl: './widgets-options.component.css'
})
export class WidgetsOptionsComponent {
  data = input.required<Widget>()
  showOptions = model<boolean>(false)
  store = inject(DashboardService);


}

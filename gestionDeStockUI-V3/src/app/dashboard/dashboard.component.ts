import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class DashboardComponent {

}

import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // standalone: true,
  // imports:[FontAwesomeModule],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rwa-front';
  //kad hocu da dodjaem ikonice iy fontawesome dodajem ovde prvo
}

import { Component } from '@angular/core';
import { PoemListComponent } from './poem-list/poem-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PoemListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'bluestaq-poet-challenge';
}

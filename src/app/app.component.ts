import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrnReaderComponent } from './prn-reader/prn-reader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PrnReaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hospitalManagement';

  getThePRNFile=()=>{

  }
}

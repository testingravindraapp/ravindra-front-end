import { Component, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RavindraAdmin';

  constructor(private router: Router, private route: ActivatedRoute) {}
  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHander(evt) {
  
  }
}

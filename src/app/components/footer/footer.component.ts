import { Component } from '@angular/core';
import { FadeRouterService } from '../../services/servicios/fade-rooter/fade-router.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentRoute: string = '';
  constructor(private fadeRouter: FadeRouterService, private router: Router) {
        this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  goTo(url: string): void {
    this.fadeRouter.navigateWithFade(url);
  }
}

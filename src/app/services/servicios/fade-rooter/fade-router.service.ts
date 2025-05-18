import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';

@Injectable({ providedIn: 'root' })
export class FadeRouterService {
  constructor(private router: Router) {}

  async navigateWithFade(url: string): Promise<void> {
    const overlay = document.getElementById('transition-overlay');

    if (!overlay) {
      this.router.navigateByUrl(url);
      return;
    }

    await gsap.to(overlay, { opacity: 1, duration: 0.6 });
    await new Promise(resolve => setTimeout(resolve, 300));
    await this.router.navigateByUrl(url);
    gsap.to(overlay, { opacity: 0, duration: 0.6 });
  }
}

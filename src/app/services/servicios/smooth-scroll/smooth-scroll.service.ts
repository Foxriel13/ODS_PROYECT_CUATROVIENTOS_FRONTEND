import { Injectable } from '@angular/core';
import { gsap } from 'gsap';

@Injectable({
  providedIn: 'root',
})
export class SmoothScrollService {
  constructor() {}

  scrollTo(element: HTMLElement): void {
    gsap.to(window, {
      scrollTo: element,
      duration: 1, // Duración del scroll
      ease: 'power2.inOut', // Efecto de suavizado
    });
  }
}

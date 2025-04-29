import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, RouterOutlet } from '@angular/router';
import { gsap } from 'gsap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    const hasVisited = localStorage.getItem('hasVisitedIntro');
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    const logo = document.querySelector('#logo img');

    if (!hasVisited) {
      gsap.timeline({
        onComplete: () => {
          localStorage.setItem('hasVisitedIntro', 'true');
          if (introScreen) introScreen.style.display = 'none';
          if (mainContent) mainContent.style.display = 'block';
        }
      })
      .to(logo, { opacity: 1, duration: 1.2, ease: 'power2.out' })
      .to(introScreen, { opacity: 0, duration: 1, delay: 1, ease: 'power2.in' });
    } else {
      if (introScreen) introScreen.style.display = 'none';
      if (mainContent) mainContent.style.display = 'block';
    }
  }
}
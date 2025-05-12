import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewChildren,
  QueryList,
  inject
} from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SmoothScrollService } from '../../services/servicios/smooth-scroll/smooth-scroll.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/data-access/auth.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MenuComponent implements OnInit, AfterViewInit, OnDestroy {
  authService = inject(AuthService)
  
  constructor(private smoothScrollService: SmoothScrollService, private el: ElementRef) {}

  @ViewChild('bg1', { static: true }) bg1!: ElementRef;
  @ViewChild('bg2', { static: true }) bg2!: ElementRef;

  private images: string[] = [
    '/main/primero.jpg',
    '/main/segundo.jpg',
  ];

  private currentIndex = 0;
  private activeLayer = 1;
  private backgroundIntervalId: any;

  @ViewChild('card', { static: true }) cardElement!: ElementRef;
  @ViewChild('track', { static: true }) track!: ElementRef<HTMLDivElement>;


  ngAfterViewInit(): void {
    const tl = gsap.timeline();

    tl.from(this.el.nativeElement.querySelector('.hero-text'), {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    tl.from('.device-area', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    }, '-=0.6'); // Empieza antes que termine el texto

    gsap.from(this.cardElement.nativeElement, {
      opacity: 0,
      y: 60,
      duration: 1.2,
      ease: 'power3.out',
    });


    const track = this.track.nativeElement;
    const totalWidth = track.scrollWidth / 2;

    gsap.to(track, {
      x: -totalWidth,
      duration: 20,
      ease: 'none',
      repeat: -1,
      onRepeat: () => {
        gsap.set(track, { x: 0 });
      } 
    });
  }

  ngOnInit(): void {
    if (this.images.length > 0) {
      this.bg1.nativeElement.style.backgroundImage = `url(${this.images[0]})`;
    }

    this.bg2.nativeElement.style.opacity = '0';
    this.bg2.nativeElement.style.transform = 'translateY(0%)';

    this.backgroundIntervalId = setInterval(() => {
      this.changeBackground();
    }, 5000);

    if(this.authService.getCurrentUser()){
      console.log(this.authService.getCurrentUser())
    }
    
  }


  ngOnDestroy(): void {
    if (this.backgroundIntervalId) {
      clearInterval(this.backgroundIntervalId);
    }
  }

  changeBackground(): void {
    const nextIndex = (this.currentIndex + 1) % this.images.length;
    const currentBg = this.activeLayer === 1 ? this.bg1.nativeElement : this.bg2.nativeElement;
    const nextBg = this.activeLayer === 1 ? this.bg2.nativeElement : this.bg1.nativeElement;
    const currentText = currentBg.querySelector('.background-text') as HTMLElement;
    const nextText = nextBg.querySelector('.background-text') as HTMLElement;

    nextBg.style.backgroundImage = `url(${this.images[nextIndex]})`;
    nextBg.style.opacity = '1';
    nextBg.style.transform = 'translateY(100%)';
    nextText.style.transform = 'translateY(100%)';
    nextText.style.opacity = '0';

    gsap.to(nextBg, {
      y: '0%',
      duration: 1.2,
      ease: 'power4.out'
    });

    gsap.to(currentBg, {
      y: '-100%',
      duration: 1.2,
      ease: 'power4.in',
      onComplete: () => {
        currentBg.style.opacity = '0';
        currentBg.style.transform = 'translateY(0%)';
      }
    });

    gsap.to(currentText, {
      y: '-100%',
      opacity: 0,
      duration: 1,
      ease: 'power2.in'
    });

    gsap.to(nextText, {
      y: '0%',
      opacity: 1,
      duration: 1,
      delay: 0.3,
      ease: 'power2.out'
    });

    this.currentIndex = nextIndex;
    this.activeLayer = this.activeLayer === 1 ? 2 : 1;
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      this.smoothScrollService.scrollTo(element);
    }
  }

  
}

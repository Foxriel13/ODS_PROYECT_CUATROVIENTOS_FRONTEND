import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewChildren,
  QueryList
} from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SmoothScrollService } from '../../services/servicios/smooth-scroll/smooth-scroll.service';
import { CommonModule } from '@angular/common';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MenuComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private smoothScrollService: SmoothScrollService) {}

  @ViewChild('bg1', { static: true }) bg1!: ElementRef;
  @ViewChild('bg2', { static: true }) bg2!: ElementRef;

  private images: string[] = [
    '/main/primero.jpg',
    '/main/segundo.jpg',
  ];

  private currentIndex = 0;
  private activeLayer = 1;
  private backgroundIntervalId: any;

  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
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

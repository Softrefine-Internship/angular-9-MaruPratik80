import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appObserver]',
})
export class ObserverDirective implements OnInit {
  @Output() visible: EventEmitter<void> = new EventEmitter<void>();
  @Input() threshold = 0.95;
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.observer = new IntersectionObserver(this.observerCallback.bind(this), {
      root: null,
      threshold: this.threshold,
    });
    this.observer.observe(this.el.nativeElement);
  }

  observerCallback(entries: IntersectionObserverEntry[]) {
    const [entry] = entries;
    if (entry.isIntersecting) {
      this.visible.emit();
    }
  }
}

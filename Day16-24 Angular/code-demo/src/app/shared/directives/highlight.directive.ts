import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appHighlight]',
    standalone: true
})
export class HighlightDirective {
    @Input() appHighlight = '';

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    @HostListener('mouseenter') onMouseEnter() {
        this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.appHighlight || 'rgba(99, 102, 241, 0.1)');
        this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'background-color 0.2s');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
        this.renderer.removeStyle(this.el.nativeElement, 'cursor');
    }
}

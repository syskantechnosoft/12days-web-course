import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';

@Directive({
    selector: '[appHighlight]'
})
export class HighlightDirective {
    private el = inject(ElementRef);

    @Input() appHighlight = '';

    @HostListener('mouseenter') onMouseEnter() {
        this.highlight(this.appHighlight || 'lightgreen');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.highlight('');
    }

    private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }
}

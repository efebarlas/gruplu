import { Directive, ElementRef, Output, HostListener, EventEmitter } from '@angular/core';
@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {
    wait: boolean;
    constructor(private _elementRef: ElementRef) {
        this.wait = false;
        setTimeout(() => this.wait = true, 10);
    }

    @Output()
    public clickOutside = new EventEmitter();

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
        console.log('a');
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside && this.wait) {
            this.clickOutside.emit(null);
        }
    }
}
import { HostListener, Output, EventEmitter } from '@angular/core';

export class ClickAway {
    private wasInside = true;
    constructor() {}

    @Output() onClose: EventEmitter<boolean> = new EventEmitter();

    @HostListener('click') clickInside() {
        this.wasInside = !this.wasInside;
      }
    
    @HostListener('document:click') clickOutside() {
        if (!this.wasInside) {
          this.onClose.emit(true);
    
        }
        this.wasInside = false;
    }
}
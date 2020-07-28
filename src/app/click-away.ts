import { HostListener, Output, EventEmitter } from '@angular/core';

export class ClickAway {
    
    private wasInside = false;
    constructor() {}

    @Output() onClose: EventEmitter<boolean> = new EventEmitter();

    @HostListener('click') clickInside() {
        this.wasInside = true;
      }
    
    @HostListener('document:click') clickOutside() {
        if (!this.wasInside) {
          this.onClose.emit(true);
        }
        this.wasInside = false;
    }

}

import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appCopyPaste]'
})
export class CopyPasteDirective {
  @HostListener('document:keydown.control.c', ['$event'])
  onCopy(event: KeyboardEvent) {
    event.preventDefault();
  }

  @HostListener('document:keydown.control.v', ['$event'])
  onPaste(event: KeyboardEvent) {
    event.preventDefault();
  }
}

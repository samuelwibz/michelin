import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appButtonDropdown]'
})
export class ButtonDropdownDirective {

  @HostBinding ('class.open') isOpen = false;
  
  constructor() { }
  
  @HostListener ('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  /* Solution to close the dropdown when clicking anywhere on the page 
  
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}

  
  */



}

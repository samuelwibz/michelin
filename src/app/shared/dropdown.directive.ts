import { Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  @Input() defaultClass: string = '';
  @Input() openClass: string = 'open';
  @HostBinding ('class') class: string;
  constructor() { }

  ngOnInit(){
  
  }
  
  
  @HostListener ('mouseenter') mouseover (eventData: Event){
    this.class = this.openClass;
  }
  @HostListener ('mouseleave') mouseleave (eventData: Event){
    this.class = this.defaultClass;
  } 


  /* ALTERNATIVE SOLUTION!

  @HostBinding ('class.open') isOpen  = false;

  @HostListener ('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  */


  

}

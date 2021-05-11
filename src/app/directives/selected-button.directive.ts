import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appSelectedButton]"
})
export class SelectedButtonDirective {
  constructor(private el: ElementRef, private r: Renderer2) {
  }
  @HostBinding("style.box-shadow") elBoxShadow = null;
  @HostBinding("style.transform") elScale = null;
  @HostListener("mouseenter") onEnter(): void {
    this.elBoxShadow = "inset 0 0 0 2px #53ea93";
    this.elScale = "scale(1.1)";
  }
  @HostListener("mouseleave") onLeave(): void {
    this.elBoxShadow = null;
    this.elScale = null;
  }
}

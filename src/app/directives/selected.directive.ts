import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, Renderer2 } from "@angular/core";
import { StudentsArgs } from "../app.component";

@Directive({
  selector: "[appSelected]"
})
export class SelectedDirective {
  @Input() selectStud: StudentsArgs;
  @Output() onDoubleClick: EventEmitter<StudentsArgs> = new EventEmitter<StudentsArgs>();
  constructor(private el: ElementRef, private r: Renderer2) {
  }
  @HostBinding("style.outline") elOutline = null;
  @HostBinding("style.transform") elScale = null;
  @HostBinding("style.cursor") elCursor = null;

  @HostListener("mouseenter") onEnter(): void {
    this.elCursor = "pointer";
    this.elScale = "scale(1.01)";
    this.elOutline = "2px solid SteelBlue";
  }
  @HostListener("dblclick") onDblClick(): void {
    this.onDoubleClick.emit(this.selectStud);
  }
  @HostListener("mouseleave") onLeave(): void {
    this.elCursor = null;
    this.elScale = null;
    this.elOutline = null;
  }

}

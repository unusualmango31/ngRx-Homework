import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Output,
  Renderer2, SimpleChanges,
} from "@angular/core";
import { StudentsArgs } from "../app.component";

@Directive({
  selector: "[appSelectForDelete]"
})
export class SelectForDeleteDirective implements OnChanges {
  @Input() studentForDelete: StudentsArgs;
  @Input() needToDelete: boolean;
  @Output() onClickStudent: EventEmitter<number> = new EventEmitter<number>();
  constructor(private el: ElementRef, private r: Renderer2) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.needToDelete) {
      this.r.setStyle(this.el.nativeElement.firstElementChild, "color", null);
    }
  }

  @HostListener("click") onClick(): void {
    if (this.needToDelete) {
      this.r.setStyle(this.el.nativeElement.firstElementChild, "color", "SteelBlue");
      this.onClickStudent.emit(this.studentForDelete.id);
    }
  }

}

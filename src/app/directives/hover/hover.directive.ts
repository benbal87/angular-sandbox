import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2
} from '@angular/core'

@Directive({
  selector: '[hoverDirective]'
})
export class HoverDirective implements OnInit {
  @Input() defaultColor: string = 'grey'
  @Input() highlightColor: string = 'blue'
  @HostBinding('style.color') color?: string

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    // this.renderer.setStyle(
    //   this.elementRef.nativeElement,
    //   'color',
    //   'blue'
    // )
    this.color = this.defaultColor
  }

  @HostListener('mouseenter') mouseenter(eventData: Event) {
    // this.renderer.setStyle(
    //   this.elementRef.nativeElement,
    //   'color',
    //   'blue'
    // )
    this.color = this.highlightColor
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(
    //   this.elementRef.nativeElement,
    //   'color',
    //   'grey'
    // )
    this.color = this.defaultColor
  }
}


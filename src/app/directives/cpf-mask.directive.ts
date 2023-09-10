import { Directive, HostListener, ElementRef } from '@angular/core';


@Directive({
  selector: '[appCpfMask]'
})
export class CpfMaskDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const input = event.target;
    const value = input.value.replace(/\D/g, ''); // Remove non-digit characters

    if (value.length <= 11) {
      input.value = this.formatCpf(value);
    } else {
      
      input.value = value.slice(0, 11);
      input.value = this.formatCpf(input.value) 
    }
  }

  private formatCpf(value: string): string {
    return value
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

}

import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPhoneMask]'
})
export class PhoneMaskDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const input = event.target;
    const value = input.value.replace(/\D/g, ''); // Remove non-digit characters

    if (value.length <= 11) {
      input.value = this.formatPhone(value);
    } else {
      
      input.value = value.slice(0, 11);
      input.value = this.formatPhone(input.value) 
    }
  }

  private formatPhone(value: string): string {
    return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

}

import { Directive, HostListener, ElementRef } from '@angular/core';


@Directive({
    selector: '[appCnpjMask]'
})
export class CnpjMaskDirective {

    constructor(private el: ElementRef) { }

    @HostListener('input', ['$event'])
    onInput(event: any): void {
        const input = event.target;
        let value = input.value.replace(/\D/g, ''); // Remove non-digit characters

        //     if (value.length <= 14) {
        //         input.value = this.formatCnpj(value);
        //     } else {

        //         input.value = value.slice(0, 14);
        //         input.value = this.formatCnpj(input.value)
        //     }
        // }

        // private formatCnpj(value: string): string {
        //     return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
        // }

        if (value.length > 14) {
            value = value.slice(0, 14);
        }

        if (value.length >= 3) {
            value = value.substring(0, 2) + '.' + value.substring(2);
        }
        if (value.length >= 6) {
            value = value.substring(0, 6) + '.' + value.substring(6);
        }
        if (value.length >= 10) {
            value = value.substring(0, 10) + '/' + value.substring(10);
        }
        if (value.length >= 15) {
            value = value.substring(0, 15) + '-' + value.substring(15);
        }

        input.value = value
    }

}

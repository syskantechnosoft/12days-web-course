import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phoneFormat',
    standalone: true
})
export class PhoneFormatPipe implements PipeTransform {
    transform(value: string): string {
        if (!value) return '';
        // Example: 1-770-736-8031 x56442 -> 1-770-736-8031 ext. 56442
        return value.replace('x', 'ext. ');
    }
}

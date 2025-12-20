import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'role'
})
export class RolePipe implements PipeTransform {

    transform(value: string | undefined): string {
        if (!value) return 'Unknown';
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

}

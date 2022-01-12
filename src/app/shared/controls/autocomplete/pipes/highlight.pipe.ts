import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, search: string): string {
    const resp = new RegExp(search, 'gi');

    return value.replace(resp, (match): string => `<b>${match}</b>`);
  }
}

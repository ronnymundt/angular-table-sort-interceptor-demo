import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortOrderIndicator',
})
export class SortOrderIndicatorPipe implements PipeTransform {
  transform(
    asc: boolean | null | undefined,
    currentKey: string,
    activeKey: string | null | undefined,
  ): string {
    if (currentKey !== activeKey) {
      return '';
    }
    return asc ? 'arrow_upward' : 'arrow_downward';
  }
}

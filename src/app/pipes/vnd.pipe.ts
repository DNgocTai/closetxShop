import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vnd',
})
export class VndPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null) return '';
    return value.toLocaleString('vi-VN') + 'đ';
  }
}

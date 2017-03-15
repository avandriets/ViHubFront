import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortTex'
})
export class ShortTexPipe implements PipeTransform {

  transform(value: string, charNumbers?: number): string {
    if(value && charNumbers > 0){
      if(value.indexOf(" ", charNumbers) > 0)
        return value.substr(0, value.indexOf(" ", charNumbers)) + " ...";
      else
        return value;
    }
    else
      return value;
  }

}

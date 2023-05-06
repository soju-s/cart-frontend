import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allProduct:any[],searchTerm:string,PropertyName:string): any[] {

    const result:any=[]

    if(!allProduct || searchTerm=='' || PropertyName==''){
      return allProduct
    }
    allProduct.forEach((item:any)=>{

      if(item[PropertyName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){

        result.push(item)
      }
    })

    return result;
  }

}

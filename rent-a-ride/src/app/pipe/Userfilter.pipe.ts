import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      // Add additional checks to handle null or undefined values
      return (
        (item._id && item._id.toLowerCase().includes(searchText)) ||
        (item.userName && item.userName.toLowerCase().includes(searchText)) ||
        (item.email && item.email.toLowerCase().includes(searchText)) ||
        (item.phone && item.phone.toLowerCase().includes(searchText)) ||
        (item.gender && item.gender.toLowerCase().includes(searchText)) ||
        (item.age && item.age.toString().toLowerCase().includes(searchText)) // Convert age to string before comparing
      );
    });
  }
}
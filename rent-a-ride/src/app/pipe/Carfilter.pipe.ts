import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modelFilter'
})
export class ModelFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      // Add additional checks to handle null or undefined values
      return (
        (item.userId && item.userId.toLowerCase().includes(searchText)) ||
        (item._id && item._id.toLowerCase().includes(searchText)) ||
        (item.carBrand && item.carBrand.toLowerCase().includes(searchText)) ||
        (item.carModel && item.carModel.toLowerCase().includes(searchText)) ||
        (item.carYear && item.carYear.toString().toLowerCase().includes(searchText)) ||
        (item.carNoPlate && item.carNoPlate.toString().toLowerCase().includes(searchText)) ||
        (item.carCapacity && item.carCapacity.toString().toLowerCase().includes(searchText)) ||
        (item.carType && item.carType.toLowerCase().includes(searchText)) ||
        (item.carFuelType && item.carFuelType.toLowerCase().includes(searchText)) ||
        (item.carPricePerHour && item.carPricePerHour.toString().toLowerCase().includes(searchText))
      );
    });
  }
}

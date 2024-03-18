import { Component, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @Output() deliveryInfo:EventEmitter<any> = new EventEmitter<any>()

  pickupLocation:string = ''
  dropLocation:string = ''
  pickupDate:Date = new Date()
  dropOffDate:Date = new Date()
  submitDeliveryInfo(){
    const deliveryInfoObject = {
      pickupLocation:this.pickupLocation,
      dropLocation:this.dropLocation,
      pickupDate:this.pickupDate,
      dropOffDate:this.dropOffDate
    }
    this.deliveryInfo.emit(deliveryInfoObject)

  }

}

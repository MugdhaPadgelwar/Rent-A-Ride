import { Component } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  isLoading:Observable<boolean>;  

  constructor(private loaderService: LoaderService) {
    this.isLoading = this.loaderService.isLoading.asObservable();
  }
}
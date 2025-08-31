import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import VendorModel from '../../models/vendor.model';
import {selectVendorsState} from '../../stores/vendors-store/vendors.selector';
import {JsonPipe} from '@angular/common';
import {setIsLoading, updateVendorsState} from '../../stores/vendors-store/venors.actions';

@Component({
  selector: 'app-vendors-view',
  imports: [
    JsonPipe
  ],
  templateUrl: './vendors-view.component.html',
  standalone: true,
  styleUrl: './vendors-view.component.css'
})
export class VendorsViewComponent implements OnInit{
  // private httpClient = inject(HttpClient);
  // private destroyRef = inject(DestroyRef);
  private store = inject(Store<{vendors: VendorModel[]}>);

  vendors = this.store.selectSignal(selectVendorsState);

  ngOnInit(): void {
    console.log(this.vendors());

  //   const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE3NTY1NzgyMTgsImV4cCI6MTc1NjU4MTgxOCwibmJmIjoxNzU2NTc4MjE4LCJqdGkiOiJWWGpZbXBRZnZmeEFzVlIzIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJwZXJtaXNzaW9ucyI6W3siaWQiOjEsIm5hbWUiOiJzdXBlcnVzZXIifV19.FPkxCtQsorv87wIyMDSJCFY17y8rjefTjdGW75nUCGg';
  //   const subscription = this.httpClient.get('http://127.0.0.1:8001/api/v1/vendors?page=1&per_page=10', {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   }).subscribe({
  //     next: response => {
  //       console.log(response);
  //     }
  //   });
  //
  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  }

  test() {
    const newVendors: VendorModel[] = [
      { id: 1, name: 'Vendor 1' },
      { id: 2, name: 'Vendor 2' }
    ];

    this.store.dispatch(setIsLoading({ isLoading: true }));
  }
}

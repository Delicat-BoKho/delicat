import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, combineLatest, map } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private fireStore: AngularFirestore,
    private fireStorage: AngularFireStorage
  ) {}

  //get order by id
  getOrderById(id: string): Observable<Order> {
    const orderDoc = this.fireStore.collection('/Order').doc(id);
    const order = orderDoc.valueChanges() as Observable<Order>;
    const saleProducts = orderDoc
      .collection<any>('saleProducts')
      .valueChanges();
    return combineLatest([order, saleProducts]).pipe(
      map(([orderData, saleProducts]) => ({
        ...orderData,
        saleProducts: saleProducts,
      }))
    );
  }
}

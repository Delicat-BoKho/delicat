import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, combineLatest, map, switchMap, forkJoin } from 'rxjs';
import { User } from '../models/user';
import { CartItem } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(
    private fireStore: AngularFirestore,
    private fireStorage: AngularFireStorage
  ) {}

  // get item by id
  getCustomerById(customerId: any): Observable<User> {
    const customerDoc = this.fireStore.collection('/Customer').doc(customerId);
    const customer = customerDoc.valueChanges() as Observable<User>;
    const cart = customerDoc.collection<any>('cart').valueChanges();
    return combineLatest([customer, cart]).pipe(
      map(([customerData, cartData]) => ({
        ...customerData,
        cart: cartData,
      }))
    );
  }

  // post and put item
  saveMetaDataOfFile(customer: User) {
    // create new or put item parameter
    const myDoc = this.fireStore.collection('/Customer').doc(customer.id);

    const subCollection = myDoc.collection('cart').doc(customer.cart[0].id).ref;

    const customerMeta = {
      id: customer.id,
      userName: customer.userName,
      fullName: customer.fullName,
      phone: customer.phone,
      address: customer.address,
      wishlist: customer.wishlist,
      order: customer.order,
    };

    // push data to firebase
    myDoc
      .set(customerMeta)
      .then(() => {
        console.log('myDoc successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });

    // push data to subCollection
    // LỖI - LỖI - LỖI

    customer.cart.forEach((cartItem) => {
      console.log(cartItem.id);
      subCollection
        .set({
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          description: cartItem.description,
        })
        .then(() => {
          console.log('subCollection successfully written!');
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    });
  }

  // post and put item
  saveCart(customerId: string, cartItem: CartItem) {
    // create new or put item parameter
    const myDoc = this.fireStore.collection('/Customer').doc(customerId);

    const subCollection = myDoc.collection('cart').doc(cartItem.productId).ref;

    subCollection
      .set({
        // id: cartItem.id,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        description: cartItem.description,
      })
      .then(() => {
        console.log('subCollection successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }

  // post and put item
  deleteCartItem(customerId: string, cartItem: CartItem) {
    // create new or put item parameter
    const myDoc = this.fireStore.collection('/Customer').doc(customerId);

    const subCollection = myDoc.collection('cart').doc(cartItem.productId);
    subCollection
      .delete()
      .then(() => {
        console.log('CartItem successfully deleted!');
      })
      .catch((error) => {
        console.error('Error deleting document: ', error);
      });
  }

  // post and put item
  saveWishlist(customerId: string, cartItem: CartItem) {
    // create new or put item parameter
    const myDoc = this.fireStore.collection('/Customer').doc(customerId);

    const subCollection = myDoc.collection('cart').doc(cartItem.productId).ref;

    subCollection
      .set({
        // id: cartItem.id,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        description: cartItem.description,
      })
      .then(() => {
        console.log('subCollection successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }

  saveOrder(customer: User) {
    // create new or put item parameter
    const myDoc = this.fireStore.collection('/Customer').doc(customer.id);

    const customerMeta = {
      id: customer.id,
      userName: customer.userName,
      fullName: customer.fullName,
      phone: customer.phone,
      address: customer.address,
      wishlist: customer.wishlist,
      order: customer.order,
    };

    // push data to firebase
    myDoc
      .set(customerMeta)
      .then(() => {
        console.log('myDoc successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { BannerComponent } from './banner/banner.component';
import { PolicyComponent } from './policy/policy.component';
import { ShopComponent } from './shop/shop.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PaymentComponent } from './payment/payment.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BasketComponent } from './basket/basket.component';
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { ProductBasketComponent } from './product-basket/product-basket.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ContactComponent } from './contact/contact.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    ProductItemComponent,
    BannerComponent,
    PolicyComponent,
    ShopComponent,
    LoginComponent,
    SignUpComponent,
    AboutUsComponent,
    ProductDetailComponent,
    PaymentComponent,
    BlogComponent,
    BlogDetailComponent,
    ForgotPasswordComponent,
    BasketComponent,
    ReviewDetailComponent,
    ProductBasketComponent,
    AccountInfoComponent,
    ResetPasswordComponent
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

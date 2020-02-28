import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { environment } from "src/environments/environment";

import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule, FirestoreSettingsToken } from "@angular/fire/firestore";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import * as firebase from "firebase";

firebase.initializeApp(environment.firebaseConfig);

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AngularFireDatabaseModule,
        HttpClientModule
    ],
    providers: [StatusBar, SplashScreen, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule {}

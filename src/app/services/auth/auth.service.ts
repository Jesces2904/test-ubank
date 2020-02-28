import { Injectable } from "@angular/core";

import * as firebase from "firebase/app";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    isLogged: boolean = false;
    users: AngularFireList<any>;
    dataUser: any = [];

    constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                this.isLoggin = true;
            } else {
                this.isLoggin = false;
            }
        });
        this.users = this.db.list('users');
    }

    googleWeb() {
        return new Promise<any>((resolve, reject) => {
            this.userIsLogged();
            if (this.isLogged) {
                resolve(this.getUserLogged());
            } else {
                const provider = new firebase.auth.GoogleAuthProvider();
                firebase
                    .auth()
                    .signInWithPopup(provider)
                    .then(
                        res => {
                            this.users.push({
                                uid: res.user.uid,
                                displayName: res.user.displayName,
                                email: res.user.email,
                                photoUrl: res.user.photoURL,
                                phoneNumber: res.user.phoneNumber,
                                providerId: res.user.providerId,
                                profile: 1
                            });
                            localStorage.setItem("user", res.user.uid);
                            localStorage.setItem("photoUrl", res.user.photoURL);
                            resolve(res);
                        },
                        err => {
                            resolve(err);
                        }
                    );
            }
        });
    }

    userIsLogged() {
        if (!firebase.auth().currentUser) {
            this.isLogged = false;
        } else {
            this.isLogged = true;
        }

        return this.isLogged;
    }

    getUserLogged() {
        return this.db.list("users", ref => ref.orderByChild("uid").equalTo(localStorage.getItem("user")));
    }
}

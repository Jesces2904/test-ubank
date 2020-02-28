import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { MainService } from "../../services/main/main.service";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.page.html",
    styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit {
    dataUser: any;
    displayName: any;
    email: any;
    photoUrl: any;
    allGoals: any;

    constructor(private authServ: AuthService, private mainServ: MainService) {}

    ngOnInit() {
        let s = this.authServ.getUserLogged();
        s.snapshotChanges().subscribe(data => {
            this.dataUser = [];
            data.forEach(item => {
                let a = item.payload.toJSON();
                a["$key"] = item.key;
                this.dataUser = a;
            });
            this.displayName = this.dataUser.displayName;
            this.email = this.dataUser.email;
            this.photoUrl = this.dataUser.photoUrl;
        });

        let g = this.mainServ.getAllGoals();
        g.snapshotChanges().subscribe(data => {
            this.allGoals = [];
            data.forEach(item => {
                let a = item.payload.toJSON();
                a["$key"] = item.key;
                switch (a["type"]) {
                    case "1":
                        a["typeName"] = "Comprar Algo";
                        break;
                    case "2":
                        a["typeName"] = "Viajar";
                        break;
                    case "3":
                        a["typeName"] = "Hacer Algo";
                        break;
                    case "4":
                        a["typeName"] = "Solo Ahorrar";
                        break;
                    default:
                        break;
                }
                this.allGoals.push(a);
            });
        });
    }
}

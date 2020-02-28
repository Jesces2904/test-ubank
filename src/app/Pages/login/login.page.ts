import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.page.html",
    styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
    constructor(private authServ: AuthService) {}

    ngOnInit() {}

    loginGoogle() {
        this.authServ.googleWeb().then(res => {
            if (typeof res.code != "undefined") {
                alert(res.message);
            } else {
                location.href = "/dashboard";
            }
        });
    }
}

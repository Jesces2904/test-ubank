import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MainService } from "src/app/services/main/main.service";

@Component({
    selector: "app-new-rule",
    templateUrl: "./new-rule.page.html",
    styleUrls: ["./new-rule.page.scss"]
})
export class NewRulePage implements OnInit {
    idGoal: any;
    allTeams: any;
    rules: any;
    photoUrl: any;

    constructor(private route: ActivatedRoute, private mainServ: MainService, private router: Router) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.idGoal = params["id"];
        });
        this.photoUrl = localStorage.getItem('photoUrl');
        let s = this.mainServ.getRulesByGoal(this.idGoal);
        s.snapshotChanges().subscribe(data => {
            this.rules = [];
            data.forEach(item => {
                let a = item.payload.toJSON();
                a["$key"] = item.key;
                switch (a["event"]) {
                    case "1":
                        a["eventName"] = "Jugar";
                        break;
                    case "2":
                        a["eventName"] = "Ganar";
                        break;
                    case "3":
                        a["eventName"] = "Por Gol";
                        break;
                    default:
                        break;
                }
                this.rules.push(a);
            });
        });

        this.mainServ.getAllTeams().subscribe(res => {
            this.allTeams = res.teams;
        });
    }

    onSubmit(e) {
        this.mainServ.createRule(e.value, this.idGoal).then(
            res => {
                // this.router.navigate(["/dashboard"]);
            },
            error => {
                alert("Error");
            }
        );
    }
}

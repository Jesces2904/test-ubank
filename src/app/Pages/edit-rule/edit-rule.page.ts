import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MainService } from "src/app/services/main/main.service";

@Component({
    selector: "app-edit-rule",
    templateUrl: "./edit-rule.page.html",
    styleUrls: ["./edit-rule.page.scss"]
})
export class EditRulePage implements OnInit {
    idRule: any;
    team: any;
    event: any;
    amount: any;
    allTeams: any;
    idGoal: any;
    constructor(private route: ActivatedRoute, private mainServ: MainService, private router: Router) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.idRule = params["id"];
        });
        let s = this.mainServ.getRuleById(this.idRule);
        s.snapshotChanges().subscribe((data: any) => {
            let a = data.payload.toJSON();
            a["$key"] = data.key;
            this.team = a["team"];
            this.event = a["event"];
            this.amount = a["amount"];
            this.idGoal = a["idGoal"];
        });
        this.mainServ.getAllTeams().subscribe(res => {
            this.allTeams = res.teams;
        });
    }

    onSubmit(e) {
      this.mainServ.updateRule(e.value, this.idRule, this.idGoal).then(
        res => {
            this.router.navigate(["/dashboard"]);
        },
        error => {
            alert("Error");
        }
    );
    }
}

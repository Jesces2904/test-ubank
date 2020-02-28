import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MainService } from "src/app/services/main/main.service";

@Component({
    selector: "app-edit-goal",
    templateUrl: "./edit-goal.page.html",
    styleUrls: ["./edit-goal.page.scss"]
})
export class EditGoalPage implements OnInit {
    idGoal: any;
    data: any;
    date: any;
    amount: any;
    type: any;

    constructor(private route: ActivatedRoute, private mainServ: MainService, private router: Router) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.idGoal = params["id"];
        });
        let s = this.mainServ.getGoalById(this.idGoal);
        s.snapshotChanges().subscribe((data: any) => {
            this.data = [];
            let a = data.payload.toJSON();
            a["$key"] = data.key;
            this.date = a["date"];
            this.amount = a["amount"];
            this.type = a["type"];
        });
    }

    onSubmit(e) {
          this.mainServ.updateGoal(e.value, this.idGoal).then(
            res => {
                this.router.navigate(["/dashboard"]);
            },
            error => {
                alert("Error");
            }
        );
    }

    onChange(e) {
      this.type = e.target.value;
    }
}

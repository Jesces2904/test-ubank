import { Component, OnInit } from "@angular/core";
import { MainService } from "../../services/main/main.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-new-goal",
    templateUrl: "./new-goal.page.html",
    styleUrls: ["./new-goal.page.scss"]
})
export class NewGoalPage implements OnInit {
    photoUrl: any;
    
    constructor(private mainServ: MainService, private router: Router) {}

    ngOnInit() {
        this.photoUrl = localStorage.getItem('photoUrl');
    }

    onSubmit(e) {
        this.mainServ.createGoal(e.value).then(
            res => {
                this.router.navigate(["/dashboard"]);
            },
            error => {
                alert("Error");
            }
        );
    }
}

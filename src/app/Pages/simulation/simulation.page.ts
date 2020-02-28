import { Component, OnInit } from "@angular/core";
import { MainService } from "src/app/services/main/main.service";

@Component({
    selector: "app-simulation",
    templateUrl: "./simulation.page.html",
    styleUrls: ["./simulation.page.scss"]
})
export class SimulationPage implements OnInit {
    allGoals: any;
    matches: any = [];
    activations: number = 0;
    sumTotal: number = 0;
    photoUrl: any;

    constructor(private mainServ: MainService) {}

    ngOnInit() {
        let g = this.mainServ.getAllGoals();
        this.photoUrl = localStorage.getItem('photoUrl');
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
                // Juegos

                // Reglas
                a["rules"] = [];

                a['matches'] = [];
                a['activations'] = 0;
                a['sumTotal'] = 0;
                var sum = 0;
                this.mainServ
                    .getRulesByGoal(a["$key"])
                    .snapshotChanges()
                    .subscribe(data2 => {
                        data2.forEach(item2 => {
                            let b = item2.payload.toJSON();

                            b["$key"] = item2.key;
                            this.mainServ.getMatchesByDate(a["createAt"], a["date"]).subscribe((res: any) => {
                                res.matches.filter(item => {
                                    let teamRule = item.homeTeam.id === parseInt(b["team"]) ? item.homeTeam.id : item.awayTeam.id;
                                    let teamRuleName = item.homeTeam.id === parseInt(b["team"]) ? item.homeTeam.name : item.awayTeam.name;

                                    let teamRival = item.homeTeam.id === parseInt(b["team"]) ? item.awayTeam.id : item.homeTeam.id;
                                    let teamRivalName = item.homeTeam.id === parseInt(b["team"]) ? item.awayTeam.name : item.homeTeam.name;
                                    let teamWinner = item.score.winner === "HOME_TEAM" ? item.homeTeam.id : item.awayTeam.id;

                                    if (
                                        (item.status === "FINISHED" || item.status === "LIVE" || item.status === "IN_PLAY" || item.status === "PAUSED") &&
                                        (item.homeTeam.id === parseInt(b["team"]) || item.awayTeam.id === parseInt(b["team"]))
                                    ) {
                                        switch (b["event"]) {
                                            case "1":
                                                a['matches'].push({
                                                    event: "1",
                                                    eventName: "Jugar",
                                                    teamRival: teamRival,
                                                    date: item.utcDate,
                                                    amount: b["amount"],
                                                    message: "Jugar: $" + b["amount"] + " ahorrado por jugar contra " + teamRivalName + " el día " + item.utcDate
                                                });
                                                sum += parseInt(b["amount"]);
                                                break;
                                            case "2":
                                                if (teamWinner === teamRule) {
                                                  a['matches'].push({
                                                        event: "2",
                                                        eventName: "Ganar",
                                                        teamRival: teamRival,
                                                        date: item.utcDate,
                                                        amount: b["amount"],
                                                        message: "Ganar: $" + b["amount"] + " ahorrado por ganar contra " + teamRivalName + " el día " + item.utcDate
                                                    });
                                                    sum += parseInt(b["amount"]);
                                                }
                                                break;
                                            case "3":
                                                let goals = item.homeTeam.id === parseInt(b["team"]) ? item.score.fullTime.homeTeam : item.score.fullTime.awayTeam;
                                                if (goals > 0) {
                                                  a['matches'].push({
                                                        event: "3",
                                                        eventName: "Gol",
                                                        teamRival: teamRival,
                                                        date: item.utcDate,
                                                        amount: parseInt(b["amount"]) * goals,
                                                        goals: goals,
                                                        message: "Goles: $" + parseInt(b["amount"]) * goals + " por anotar " + goals + " contra " + teamRivalName + " el día " + item.utcDate
                                                    });
                                                    sum += parseInt(b["amount"]) * goals;
                                                }
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                });
                                a['activations'] = Object.keys(a['matches']).length;
                                a['sumTotal'] = sum;
                            });

                            a["rules"].push(b);
                        });
                    });
                this.allGoals.push(a);
            });
        });
    }
}

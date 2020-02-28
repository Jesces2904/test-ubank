import { Injectable } from "@angular/core";

import * as firebase from "firebase/app";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const endpoint = "http://api.football-data.org/v2/";
const httpOptions = {
    headers: new HttpHeaders({
        "X-Auth-Token": environment.apiKeyFutballData
    })
};

@Injectable({
    providedIn: "root"
})
export class MainService {
    goals: AngularFireList<any>;
    rules: AngularFireList<any>;
    userLogged: any;

    constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private http: HttpClient) {
        this.userLogged = localStorage.getItem("user");
        this.goals = this.db.list("goals");
        this.rules = this.db.list("rules");
    }

    leftpad(val, resultLength = 2, leftpadChar = "0"): string {
        return (String(leftpadChar).repeat(resultLength) + String(val)).slice(String(val).length);
    }

    createGoal(data: any) {
        return new Promise((resolve, reject) => {
            if (data.type != "" && data.amount > 0 && data.date != "") {
                data.idUser = this.userLogged;
                let newDate = new Date();
                data.createAt = newDate.getFullYear() + "-" + this.leftpad(newDate.getMonth() + 1, 2) + "-" + this.leftpad(newDate.getDate(), 2);
                resolve(this.goals.push(data));
            } else {
                reject();
            }
        });
    }

    createRule(data: any, idGoal: any) {
        let dataOption = [];
        return new Promise((resolve, reject) => {
            let dataGoal = this.db.list("rules", ref => ref.orderByChild("idGoal").equalTo(idGoal));
            dataGoal.snapshotChanges().subscribe(data2 => {
                data2.forEach(item => {
                    let a = item.payload.toJSON();
                    a["$key"] = item.key;
                    dataOption.push(a);
                });
                let validation = dataOption.filter(item => item.team === data.team && item.event === data.event);
                if (Object.keys(validation).length < 1 && Object.keys(dataOption).length < 5) {
                    data.idGoal = idGoal;
                    this.getTeamById(data.team).subscribe((res: any) => {
                        data.teamName = res.name;
                        data.photo = res.crestUrl;
                        if (data.team != "" && data.amount > 0 && data.event != "" && idGoal != "") {
                            resolve(this.rules.push(data));
                        } else {
                            reject();
                        }
                    });
                }
            });
        });
    }

    updateGoal(data, idGoal) {
        return new Promise((resolve, reject) => {
            data.idUser = this.userLogged;
            resolve(this.db.object("/goals/" + idGoal).update(data));
        });
    }

    updateRule(data, idRule, idGoal) {
        let dataOption = [];
        return new Promise((resolve, reject) => {
            let dataGoal = this.db.list("rules", ref => ref.orderByChild("idGoal").equalTo(idGoal));
            dataGoal.snapshotChanges().subscribe(data2 => {
                data2.forEach(item => {
                    let a = item.payload.toJSON();
                    a["$key"] = item.key;
                    dataOption.push(a);
                });
                let validation = dataOption.filter(item => item.team === data.team && item.event === data.event);
                if (Object.keys(validation).length < 1) {
                    data.idGoal = idGoal;
                    this.getTeamById(data.team).subscribe((res: any) => {
                        data.teamName = res.name;
                        data.photo = res.crestUrl;
                        if (data.team != "" && data.amount > 0 && data.event != "" && idGoal != "") {
                            resolve(this.db.object("/rules/" + idRule).update(data));
                        } else {
                            reject();
                        }
                    });
                }
            });
        });
    }

    getAllGoals() {
        return this.db.list("goals", ref => ref.orderByChild("idUser").equalTo(this.userLogged));
    }

    getGoalById(idGoal: any) {
        let data = this.db.object("/goals/" + idGoal);
        return data;
    }

    getAllTeams(): Observable<any> {
        return this.http.get(endpoint + "competitions/CL/teams?season=2019", httpOptions);
    }

    getTeamById(idTeam: any) {
        return this.http.get(endpoint + "teams/" + idTeam, httpOptions);
    }

    getRulesByGoal(idGoal: any) {
        return this.db.list("rules", ref => ref.orderByChild("idGoal").equalTo(idGoal));
    }

    getRuleById(idRule: any) {
        let data = this.db.object("/rules/" + idRule);
        return data;
    }

    getMatchesByDate(dateFrom, dateTo) {
        return this.http.get(endpoint + "competitions/CL/matches?dateFrom=" + dateFrom + "&dateTo=" + dateTo + "", httpOptions);
    }
}

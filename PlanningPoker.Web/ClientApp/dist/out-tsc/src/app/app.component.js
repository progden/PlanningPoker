import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { tap } from 'rxjs/operators';
import { HubConnectionBuilder } from '@microsoft/signalr';
let AppComponent = class AppComponent {
    constructor() {
        this.title = 'ClientApp';
        this.userName = "測試人員";
        this.option = "0|0.5|1|2|3|5|8|13|20|40|100|coffee|infinity|?".split("|");
        this.pick = "";
    }
    ngOnInit() {
        var connection = new HubConnectionBuilder().withUrl("/game/hub").build();
        connection.on("ReceiveGame", (games) => {
            var _a, _b;
            console.log("ReceiveGame");
            console.log(games);
            this.games = games;
            this.game = (_a = this.games) === null || _a === void 0 ? void 0 : _a.find(g => g.id == this.gameId);
            this.players = (_b = this.game) === null || _b === void 0 ? void 0 : _b.players;
            // this.player = this.players?.find(p => p.name = this.userName);
        });
        connection.start()
            .then(() => {
            console.log("connection start!");
            this.loadGame();
        })
            .catch((err) => {
            return console.error(err.toString());
        });
    }
    loadGame() {
        ajax({
            url: "game",
        })
            .pipe(tap(x => console.log("game loaded!")))
            .subscribe(d => {
        });
    }
    newGame() {
        console.log("New Game");
        ajax({
            url: `game/${this.userName}`,
            method: "post"
        })
            .subscribe();
    }
    pickGame(gameId) {
        var _a, _b;
        this.gameId = gameId;
        this.game = (_a = this.games) === null || _a === void 0 ? void 0 : _a.find(g => g.id == this.gameId);
        this.players = (_b = this.game) === null || _b === void 0 ? void 0 : _b.players;
    }
    dropGame(gameId) {
        if (this.gameId == gameId)
            this.gameId = undefined;
        ajax({
            url: `game/${gameId}`,
            method: "delete"
        })
            .pipe(tap(x => console.log(`delete game ${gameId}`)))
            .subscribe(d => {
        });
    }
    addUser() {
        var _a;
        ajax({
            url: `game/${(_a = this.game) === null || _a === void 0 ? void 0 : _a.id}/user/${this.userName}`,
            method: 'post',
        })
            .pipe(tap(x => console.log(`add user ${this.userName}`)))
            .subscribe(d => {
        });
    }
    kickUser(userId) {
        ajax({
            url: `game/${this.gameId}/user/${userId}`,
            method: 'delete',
        })
            .pipe(tap(x => console.log(`kick user`)))
            .subscribe(d => {
        });
    }
    DoCancel() {
        let player = this.GetUser();
        this.pick = "";
        ajax({
            url: `game/${this.gameId}/user/${player === null || player === void 0 ? void 0 : player.id}/cancel`,
            method: "post"
        })
            .pipe(tap(d => console.log(`user: ${player === null || player === void 0 ? void 0 : player.name}, cancel`)))
            .subscribe();
    }
    DoPick(card) {
        let player = this.GetUser();
        this.pick = card;
        ajax({
            url: `game/${this.gameId}/user/${player === null || player === void 0 ? void 0 : player.id}/poll/${card}`,
            method: "post"
        })
            .pipe(tap(d => console.log(`user: ${player === null || player === void 0 ? void 0 : player.name}, pick: ${this.pick}`)))
            .subscribe();
    }
    GetUser() {
        var _a;
        return (_a = this.game) === null || _a === void 0 ? void 0 : _a.players.find(p => p.name == this.userName);
    }
    GameSet() {
        var _a;
        return ((_a = this.game) === null || _a === void 0 ? void 0 : _a.players.findIndex(p => p.pick == "not-yet")) == -1;
    }
    IsJoinGame() {
        var _a;
        return ((_a = this.players) === null || _a === void 0 ? void 0 : _a.findIndex(p => p.name == this.userName)) != -1;
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.sass']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map
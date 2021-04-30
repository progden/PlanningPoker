import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { tap } from 'rxjs/operators';
let AppComponent = class AppComponent {
    constructor() {
        this.title = 'ClientApp';
        this.userName = "測試人員";
        this.option = "0|0.5|1|2|3|5|8|13|20|40|100|coffee|infinity|?".split("|");
        this.pick = "";
    }
    ngOnInit() {
        this.loadGame();
    }
    loadGame() {
        ajax({
            url: "game",
        })
            .pipe(tap(x => console.log(x)))
            .subscribe(d => {
            this.games = d.response;
        });
    }
    pickGame(gameId) {
        this.gameId = gameId;
        ajax({
            url: "game",
        })
            .pipe(tap(x => console.log(x)))
            .subscribe(d => {
            var _a, _b;
            this.games = d.response;
            this.game = (_a = this.games) === null || _a === void 0 ? void 0 : _a.find(g => g.id == this.gameId);
            this.players = (_b = this.game) === null || _b === void 0 ? void 0 : _b.players;
        });
    }
    dropGame(gameId) {
        if (this.gameId == gameId)
            this.gameId = undefined;
        ajax({
            url: `game/${gameId}`,
            method: "delete"
        })
            .pipe(tap(x => console.log(x)))
            .subscribe(d => {
            var _a, _b;
            this.games = d.response;
            this.game = (_a = this.games) === null || _a === void 0 ? void 0 : _a.find(g => g.id == this.gameId);
            this.players = (_b = this.game) === null || _b === void 0 ? void 0 : _b.players;
        });
    }
    addUser() {
        var _a;
        ajax({
            url: `game/${(_a = this.game) === null || _a === void 0 ? void 0 : _a.id}/user/${this.userName}`,
            method: 'post',
        })
            .pipe(tap(x => console.log(x)))
            .subscribe(d => {
            var _a;
            this.game = d.response;
            this.players = (_a = this.game) === null || _a === void 0 ? void 0 : _a.players;
            this.loadGame();
        });
    }
    isInGame() {
        if (!this.game)
            return false;
        if (this.game.players.findIndex(p => p.name == this.userName) != -1)
            return true;
        return false;
    }
    DoCancel() {
        this.pick = "";
    }
    DoPick(card) {
        this.pick = card;
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
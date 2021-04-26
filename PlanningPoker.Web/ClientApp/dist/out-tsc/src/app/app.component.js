import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AppComponent = class AppComponent {
    constructor() {
        this.title = 'ClientApp';
        this.option = "0|0.5|1|2|3|5|8|131|20|40|100|coffee|infinity|?".split("|");
        this.pick = "";
        this.player = [
            { name: "小丹", color: "purple", pick: "wait" },
            { name: "老胡", color: "green", pick: "wait" },
            { name: "阿良", color: "blue", pick: "not-yet" },
        ];
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
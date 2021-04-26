import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
let CardComponent = class CardComponent {
    constructor() {
        this.data = new Map([
            ["0", { value: "0", icon: "" }],
            ["0.5", { value: "0.5", icon: "" }],
            ["1", { value: "1", icon: "" }],
            ["2", { value: "2", icon: "" }],
            ["3", { value: "3", icon: "" }],
            ["5", { value: "5", icon: "" }],
            ["8", { value: "8", icon: "" }],
            ["13", { value: "13", icon: "" }],
            ["20", { value: "20", icon: "" }],
            ["40", { value: "40", icon: "" }],
            ["100", { value: "100", icon: "" }],
            ["coffee", { value: "", icon: "assets/img/mug-hot.svg" }],
            ["inf", { value: "", icon: "assets/img/infinity.svg" }],
            ["infinity", { value: "", icon: "assets/img/infinity.svg" }],
            ["Q", { value: "?", icon: "" }],
            ["?", { value: "?", icon: "" }],
            ["wait", { value: "", icon: "assets/img/pen.svg" }],
        ]);
        this.set = "custom";
        this.color = "red";
    }
    ngOnInit() {
        var _a, _b;
        if (this.set != "" && this.data.has(this.set)) {
            this.value = (_a = this.data.get(this.set)) === null || _a === void 0 ? void 0 : _a.value;
            this.icon = (_b = this.data.get(this.set)) === null || _b === void 0 ? void 0 : _b.icon;
        }
        else {
            this.value = "?";
        }
    }
};
__decorate([
    Input()
], CardComponent.prototype, "set", void 0);
__decorate([
    Input()
], CardComponent.prototype, "value", void 0);
__decorate([
    Input()
], CardComponent.prototype, "icon", void 0);
__decorate([
    Input()
], CardComponent.prototype, "color", void 0);
CardComponent = __decorate([
    Component({
        selector: 'app-card',
        templateUrl: './card.component.html',
        styleUrls: ['./card.component.sass'],
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], CardComponent);
export { CardComponent };
//# sourceMappingURL=card.component.js.map
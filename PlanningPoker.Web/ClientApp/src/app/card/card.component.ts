import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faInfinity, faMugHot } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {
  data = new Map([
                   ["0", { value: "0", icon: ""}],
                   ["0.5", { value: "0.5", icon: ""}],
                   ["1", { value: "1", icon: ""}],
                   ["2", { value: "2", icon: ""}],
                   ["3", { value: "3", icon: ""}],
                   ["5", { value: "5", icon: ""}],
                   ["8", { value: "8", icon: ""}],
                   ["13", { value: "13", icon: ""}],
                   ["20", { value: "20", icon: ""}],
                   ["40", { value: "40", icon: ""}],
                   ["100", { value: "100", icon: ""}],
                   ["coffee", { value: "", icon: "assets/img/mug-hot.svg"}],
                   ["inf", { value: "", icon: "assets/img/infinity.svg"}],
                   ["infinity", { value: "", icon: "assets/img/infinity.svg"}],
                   ["Q", { value: "?", icon: ""}],
                   ["?", { value: "?", icon: ""}],
                   ["wait", { value: "", icon: "assets/img/pen.svg"}],
                ]);

  @Input()
  set: string = "custom";

  @Input()
  value?:string;

  @Input()
  icon?:string;

  @Input()
  color: string = "red";

  constructor() { }

  ngOnInit(): void {
    if(this.set != "" && this.data.has(this.set))
    {
      this.value = this.data.get(this.set)?.value;
      this.icon = this.data.get(this.set)?.icon;
    }
    else
    {
      this.value = "?";
    }
  }

}

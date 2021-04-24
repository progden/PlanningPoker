import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'ClientApp';

  option = "0|0.5|1|2|3|5|8|131|20|40|100|coffee|infinity|?".split("|");
  pick = "";

  player?: Player[] = [
    {name: "小丹", color: "purple", pick: "wait"},
    {name: "老胡", color: "green", pick: "wait"},
    {name: "阿良", color: "blue", pick: "not-yet"},
  ];

  DoCancel()
  {
    this.pick = "";
  }
  DoPick(card: string)
  {
    this.pick = card;
  }
}

interface Player
{
  name: string;
  color: string;
  pick: string
}

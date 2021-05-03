import { Component, OnInit, NgModule } from '@angular/core';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map, catchError, tap } from 'rxjs/operators';
import { interval, Observable, of, Subject } from 'rxjs';
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  connection: HubConnection = new HubConnectionBuilder().withUrl("/game/hub").build();

  title = 'ClientApp';

  games?: Game[] ;
  players?: Player[];

  gameId?: string;
  game?: Game;
  userName: string = "測試人員";
  player?: Player;

  option = "0|0.5|1|2|3|5|8|13|20|40|100|coffee|infinity|?".split("|");
  pick = "";

  ngOnInit()
  {
    this.loadGame();
    this.connection.on("ReceiveGame", (games: Game[]) => {
      console.log("ReceiveGame");
      console.log(games);
      this.games = games;
    });

    this.connection.start().then(() => {
      console.log("connection start!");
    }).catch((err) => {
      return console.error(err.toString());
    });
  }

  loadGame()
  {
    ajax({
      url: "game",
    })
    .pipe(
      tap(x => console.log(x))
    )
    .subscribe(d => {
      this.games = d.response;
    });
  }

  pickGame(gameId: string)
  {
    this.gameId = gameId;
    ajax({
      url: "game",
    })
    .pipe(
      tap(x => console.log(x))
    )
    .subscribe(d => {
      this.games = d.response;
      this.game = this.games?.find(g => g.id == this.gameId);
      this.players = this.game?.players;
    });
  }

  dropGame(gameId: string)
  {
    if(this.gameId == gameId)
      this.gameId = undefined;
    ajax({
      url: `game/${gameId}`,
      method: "delete"
    })
    .pipe(
      tap(x => console.log(x))
    )
    .subscribe(d => {
      this.games = d.response;
      this.game = this.games?.find(g => g.id == this.gameId);
      this.players = this.game?.players;
      this.player = this.game?.players?.find(p => p.name == this.userName);
    });
  }

  addUser()
  {
    ajax({
      url: `game/${this.game?.id}/user/${this.userName}`,
      method: 'post',
    })
    .pipe(
      tap(x => console.log(x)),
    )
    .subscribe(d => {
      this.game = d.response;
      this.players = this.game?.players;
      this.player = this.game?.players?.find(p => p.name == this.userName);
      this.loadGame();
    });
  }
  isInGame()
  {
    if(!this.game) return false;
    if(this.game.players.findIndex(p => p.name == this.userName) != -1)
      return true;
    return false;
  }
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
  id: string;
  name: string;
  color: string;
  pick: string
}

interface Game
{
  id: string
  players: Player[];
}

import { Component, OnInit, NgModule } from '@angular/core';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map, catchError, tap } from 'rxjs/operators';
import { interval, Observable, of, Subject} from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  title = 'ClientApp';

  games?: Game[] ;
  game?: Game;
  players?: Player[];
  // player?: Player;

  gameId?: string;
  userName: string = "測試人員";

  option = "0|0.5|1|2|3|5|8|13|20|40|100|coffee|infinity|?".split("|");
  pick = "";

  ngOnInit()
  {

    var connection: HubConnection = new HubConnectionBuilder().withUrl("/game/hub").build();
    connection.on("ReceiveGame", (games: Game[]) => {
      console.log("ReceiveGame");
      console.log(games);
      this.games = games;
      this.game = this.games?.find(g => g.id == this.gameId);
      this.players = this.game?.players;
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

  loadGame()
  {
    ajax({
      url: "game",
    })
    .pipe(
      tap(x => console.log("game loaded!"))
    )
    .subscribe(d => {
    });
  }

  newGame()
  {
    console.log("New Game");
    ajax({
      url: `game/${this.userName}`,
      method: "post"
    })
    .subscribe();
  }

  pickGame(gameId: string)
  {
    this.gameId = gameId;
    this.game = this.games?.find(g => g.id == this.gameId);
    this.players = this.game?.players;
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
      tap(x => console.log(`delete game ${gameId}`))
    )
    .subscribe(d => {
    });
  }

  addUser()
  {
    ajax({
      url: `game/${this.game?.id}/user/${this.userName}`,
      method: 'post',
    })
    .pipe(
      tap(x => console.log(`add user ${this.userName}`)),
    )
    .subscribe(d => {
    });
  }

  kickUser(userId?: string)
  {
    ajax({
      url: `game/${this.gameId}/user/${userId}`,
      method: 'delete',
    })
    .pipe(
      tap(x => console.log(`kick user`)),
    )
    .subscribe(d => {
    });
  }

  DoCancel()
  {
    let player = this.GetUser()
    this.pick = "";
    ajax({
      url: `game/${this.gameId}/user/${player?.id}/cancel`,
      method: "post"
    })
    .pipe(
      tap(d => console.log(`user: ${player?.name}, cancel`))
    )
    .subscribe();
  }
  DoPick(card: string)
  {
    let player = this.GetUser()
    this.pick = card;
    ajax({
      url: `game/${this.gameId}/user/${player?.id}/poll/${card}`,
      method: "post"
    })
    .pipe(
      tap(d => console.log(`user: ${player?.name}, pick: ${this.pick}`))
    )
    .subscribe();
  }

  GetUser()
  {
    return this.game?.players.find(p => p.name == this.userName);
  }

  GameSet():boolean
  {
    return this.game?.players.findIndex(p => p.pick == "not-yet") == -1;
  }

  IsJoinGame(): boolean
  {
    return this.players?.findIndex(p => p.name == this.userName) != -1;
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

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {animate, state, style, transition, trigger, keyframes} from '@angular/animations';
import { GameService } from './game.service';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ScheduleComponent implements OnInit {
    columnsToDisplay = ['Start time', 'Team 1', 'Team 2', 'Winner'];
    expandedGame: any | null;
  
    constructor(private gameService: GameService) { }
  
    games: any;
    team1: any;
    team2: any;
    beginDate: string;
    endDate: string;
    playerCountTeam1: number;
    playerCountTeam2: number;
    
  
  
    ngOnInit() {
      this.gameService.getGamesThisWeek().subscribe((data)=> {this.games = data}
      );
    }
  
    onSelect(game: any): void {

      this.gameService.getTeamOne(game).subscribe((data)=> {
        this.team1 = data[0];
        this.playersCountTeam1(this.team1);
        console.log(this.team1)
      });

      this.gameService.getTeamTwo(game).subscribe((data)=>  {
        this.team2 = data[0];
        this.playersCountTeam2(this.team2);
      });
    }

    playersCountTeam1(team: any) {
      this.playerCountTeam1 = team.players.length;
    }

    playersCountTeam2(team: any) {
      this.playerCountTeam2 = team.players.length;
    }

}
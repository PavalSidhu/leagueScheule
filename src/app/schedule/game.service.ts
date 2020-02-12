import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class GameService {
    private api: string = 'https://api.pandascore.co/lol';

    constructor( private http: HttpClient ) { }

    public getGamesThisWeek(): Observable<any> {
        let startDate = this.getDateIsoFromToday( -3 );
        let endDate = this.getDateIsoFromToday( 3 );

        let httpParams: HttpParams = new HttpParams()
            .set('range[begin_at]', `${startDate}T00:00:00Z,${endDate}T23:00:00Z` )
            .set('sort', '-begin_at' )
            .set( 'page[size]', '100')
            .set('token', 'yEtQPshzOwR659lfHwZbvyZFCWHA_E5pS5n8sRtjLylDDUHf_2k');

        return this.http.get( `${this.api}/matches`, { params: httpParams } );
    };

    private getDateIsoFromToday( difference: number ): string {
        let date = new Date();
        date.setDate(date.getDate() + difference);
        
        return date.toISOString().slice(0,10);
    }

    public getTeamOne(game: any): Observable<any> {

        let httpParams: HttpParams = new HttpParams()
            .set('filter[acronym]', `${game.opponents[0].opponent.acronym}` )
            .set('token', 'yEtQPshzOwR659lfHwZbvyZFCWHA_E5pS5n8sRtjLylDDUHf_2k');

        return this.http.get( `${this.api}/teams`, { params: httpParams } );
  
    };

    public getTeamTwo(game: any): Observable<any> {

        let httpParams: HttpParams = new HttpParams()
            .set('filter[acronym]', `${game.opponents[1].opponent.acronym}` )
            .set('token', 'yEtQPshzOwR659lfHwZbvyZFCWHA_E5pS5n8sRtjLylDDUHf_2k');

        return this.http.get( `${this.api}/teams`, { params: httpParams } );
  
    };
}
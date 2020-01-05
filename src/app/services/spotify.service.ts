import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()

export class SpotifyService{
    //api config
    private searchUrl: string;
    private client_id = '31e0d5a667364240b361557d4d217ebe';
    private client_secret = 'ed3f3c0dae2643888642209cf8eca775';
    private ArtistUrl: string;
    private AlbumsUrl: string;
    private AlbumUrl: string;
    private encoded = btoa(this.client_id + ':' + this.client_secret);

    constructor(private _http: Http){
        
    }

    //get permission to use api
    getToken() {
        //type of access-- only allows for public resources
        var params = ('grant_type=client_credentials');

        var headers = new Headers();

        headers.append('Authorization', 'Basic ' + this.encoded);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        //return the result of the post
        return this._http.post('https://accounts.spotify.com/api/token', params, {headers: headers} )
        .map(res => res.json());
    }

    //search artists
    searchMusic(str:string, type='artist', token:string){

        //query
        this.searchUrl= 'https://api.spotify.com/v1/search?query='+str+'&offset=0&limit=20&type='+type+'&market=US';

        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);

        //return result of the get
        return this._http.get(this.searchUrl, {headers : headers})
        .map((res: Response) => res.json());
    }

    //get artist
    getArtist(id:string, token:string){

        //query
        this.ArtistUrl= 'https://api.spotify.com/v1/artists/'+id;

        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);

        //return result of the get
        return this._http.get(this.ArtistUrl, {headers : headers})
        .map((res: Response) => res.json());
    }

    //get albums
    getAlbums(artistId:string, token:string){

        //query
        this.AlbumsUrl= 'https://api.spotify.com/v1/artist/'+ artistId + 'albums/?query=&limit=20';

        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);

        //return result of the get
        return this._http.get(this.AlbumsUrl, {headers : headers})
        .map((res: Response) => res.json());
    }
}
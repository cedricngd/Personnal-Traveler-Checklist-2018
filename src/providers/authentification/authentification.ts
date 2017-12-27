import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
//import 'rxjs/add/operator/toPromise';
@Injectable()
export class AuthentificationProvider {

  private url = 'http://127.0.0.1:8000/get_auth_token/';
  private credentials={username:"cedric",password:"azertyuiop"}; //TODO donner la possibilité de les changer
  private token=null;

  constructor(public http: HttpClient) {
    console.log('Hello AuthentificationProvider Provider');
  }

  public requestToken(){

    this.http.post( this.url, this.credentials)
      .subscribe(
        (data: any) => {
          this.token=data;
          console.log("post terminé: on a le token ",data);
        }
      );
  }


  public createHeader(){
    /*
    let headers = new HttpHeaders(
    {
      "Content-type" : "application/json",
      'Authorization' : 'token '+ this.token
    });
    */
    let headers = new HttpHeaders()
    .set('Authorization','Token '+ this.token.token)
    .set("Content-type", "application/json");

    console.log("les headers que j'envoie:",headers );
    return headers;

  }

}
/*
import { Http,RequestOptions  } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class AuthentificationProvider {

  private url = 'http://127.0.0.1:8000/get_auth_token/';
  private credentials={username:"cedric",password:"azertyuiop"}; //TODO donner la possibilité de les changer
  private token=null;

  constructor(public http: Http) {
    console.log('Hello AuthentificationProvider Provider');
  }

  public requestToken(){

    this.http.post( this.url, this.credentials)
      //.map(returnedValue=>returnedValue.json())
      .subscribe(
        (data: any) => {
          this.token=data;
          console.log("post terminé: on a le token ",data);
        }
      );
  }

  public getToken(){
    return this.token;
  }

  public createHeader(){

    let headers = new Headers(
    {
      "Content-type" : "application/json",
      'Authorization' : 'token '+ this.token

    });

    return headers;

  }

}
*/

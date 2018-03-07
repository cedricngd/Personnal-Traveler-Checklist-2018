import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
//import 'rxjs/add/operator/toPromise';
@Injectable()
export class AuthentificationProvider {

  private url = 'http://127.0.0.1:8000/get_auth_token/';
  private credentials={username:"cedric",password:"azertyuiop"}; //TODO donner la possibilité de les changer
  private token=null;
  public tokenReceived=false;

  constructor(public http: HttpClient) {
  }

  public requestToken(){
    this.http.post( this.url, this.credentials)
      .subscribe(
        (data: any) => {
          this.token=data;
        }
      );

  }



  public createHeader(){
    let headers = new HttpHeaders()
    .set('Authorization','Token '+ this.token.token)
    .set("Content-type", "application/json");
    return headers;

  }

}

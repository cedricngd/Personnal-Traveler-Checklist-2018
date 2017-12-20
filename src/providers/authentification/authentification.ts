import { Http,RequestOptions  } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class AuthentificationProvider {

  private url = 'http://127.0.0.1:8000/get_auth_token/';
  private credentials={username:"cedric",password:"azertyuiop"}; //TODO donner la possibilité de les changer
  private token:any;

  constructor(public http: Http) {
    console.log('Hello AuthentificationProvider Provider');
  }

  public getToken(){

return this.http.post( this.url, this.credentials);
  }

}

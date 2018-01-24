import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthentificationProvider } from '../../providers/authentification/authentification';


@Injectable()
export class ProfileProvider {

  constructor(public http: HttpClient,public authProvider: AuthentificationProvider) {
    console.log('Hello ProfileProvider Provider');
  }


  public getRemoteProfile(){
    return this.http.get("http://127.0.0.1:8000/profiles/1/",{headers:this.authProvider.createHeader()})
}


}

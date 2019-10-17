import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { NewModel } from '../models/new.model';
import { map } from 'rxjs/operators';
import { SourceModel } from '../models/soruce.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  public country: any;

  constructor(private http: HttpClient) {}

  public async getTopNews(): Promise<NewModel[]> {
    let country: any = await this.getCountry();
    return this.http
      .get(`${environment.api}/top-headlines?country=${country.countryCode}&apiKey=${environment.apiKey}`)
      .pipe(map((response: any) => response.articles.map(article => article as NewModel)))
      .toPromise()
  }

  private async getCountry() {
    return this.http.get(`${environment.apiCountry}`).toPromise()
  }

  public async getSources(): Promise<SourceModel[]> {
    let country: any = await this.getCountry();
    return this.http
      .get(`${environment.api}/sources?country=${country.countryCode}&apiKey=${environment.apiKey}`)
      .pipe(map((response: any) => response.sources.map(source => source as SourceModel)))
      .toPromise()
  }

  public async filterNews(category: string): Promise<NewModel[]> {
    return this.http
      .get(`${environment.api}/everything?apiKey=${environment.apiKey}&q=${category}`)
      .pipe(map((response: any) => response.articles.map(article => article as NewModel)))
      .toPromise()
  }

  public async searchNews(search: string): Promise<NewModel[]> {
    return this.http
      .get(`${environment.api}/everything?apiKey=${environment.apiKey}&q=${search}`)
      .pipe(map((response: any) => response.articles.map(article => article as NewModel)))
      .toPromise()
  }

  public async getPriceBitcoin() {
    return this.http.get('http://bitso-api-v3.herokuapp.com/api/ticker?book=btc_mxn').toPromise();
  }
}

import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { NewModel } from '../models/new.model';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent {

  public topNew: NewModel;
  public topNews: NewModel[] = [];

  constructor(private newsService: NewsService) {
    this.getTopNews();
  }

  public async getTopNews() {
    let topNews = await this.newsService.getTopNews();
    this.topNew = topNews.shift();
    this.topNews = topNews;
  }

}

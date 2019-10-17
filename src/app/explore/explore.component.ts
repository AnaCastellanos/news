import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { NewModel } from '../models/new.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  public categories = [
    'all',
    'bitcoin',
    'business',
    'health',
    'entertainment',
    'science'
  ];
  public news: NewModel[] = [];
  public filterBy: string;
  public quantityBitcoin = new FormControl(1);
  public currentPrice: number;

  constructor(private newsService: NewsService) {
    this.filterByCategory(this.categories[0]);
  }

  ngOnInit() {
    this.calculate();
  }

  public async filterByCategory(category: string) {
    this.filterBy = category;
    this.news = await this.newsService.filterNews(category);
  }

  public async calculate() {
    let price: any = await this.newsService.getPriceBitcoin();
    this.currentPrice = price.payload.last * this.quantityBitcoin.value;
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Response {
  time: {
    updated: string;
  };
  bpi: {
    USD: {
      rate: string;
    };
    BRL: {
      rate: string;
    };
  };
}

const TEN_SECONDS = 60000;

@Injectable()
export class BitcoinService {
  current: Response;
  list: Response[] = [];
  timer: number;
  constructor(private http: HttpClient) {
    this.update();
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => this.update(), TEN_SECONDS);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  update() {
    this.http
      .get<Response>('https://api.coindesk.com/v1/bpi/currentprice/BRL.json')
      .subscribe((data) => {
        this.current = data;

        if (
          this.current?.time.updated !==
          this.list[this.list.length - 1]?.time.updated
        ) {
          this.list.push(this.current);
        }
      });
  }
}

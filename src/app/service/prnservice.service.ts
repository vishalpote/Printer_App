import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrnserviceService {

  constructor() { }
  httpClient=inject(HttpClient);
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CarService {

    constructor(private http: HttpClient ) {}

    getCarsSmall() {
        return this.http.get('assets/cars-small.json');
//                    .toPromise()
//                    .then(res => <Car[]> res.json().data)
//                    .then(data => { return data; });
    }
}

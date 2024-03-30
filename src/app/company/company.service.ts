import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from './company.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpClient: HttpClient) { }
  apiURL = "http://localhost:8080/companies";


createCompany({ company }: { company: Company }): Observable<Company> {
  return this.httpClient.post<Company>(this.apiURL, company);
}

  getCompany(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.apiURL);
  }

  

deleteCompany(id: number, company: Company): Observable<Company> {
  return this.httpClient.delete<Company>(this.apiURL + "/" + id);
}


  updateCompany(id: number, company: Company): Observable<Company> {
    return this.httpClient.put<Company>(this.apiURL + "/" + id, company);
  }
}
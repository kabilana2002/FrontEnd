import { Component, OnInit } from '@angular/core';
import { Company } from './company.model';
import { CompanyService } from './company.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit  {
  constructor(private compService: CompanyService){}
  ngOnInit(): void {
    this.getCompany();
  }

  newCompany : Company = {name:"", industry:"",location:"",contactInfo:"" }
  compList: Company[] = [];
  deleteComp:Company={name:"", industry:"", location:"", contactInfo:""}
  editingCompany:Company | null = null;
  updateCompany:Company={name:"", industry:"", location:"", contactInfo:""};

  createCompany() {
  this.compService.createCompany({ company: this.newCompany }).subscribe(result => {
    this.compList.push(result);
  });

  this.newCompany = { name: "", industry: "", location: "", contactInfo: "" };
}


getCompany() {
  this.compService.getCompany().subscribe(
    (result: Company | Company[]) => {
      if (Array.isArray(result)) {
        this.compList = result;
      } else {
        // If result is a single Company object, wrap it in an array
        this.compList = [result];
      }
    },
    (error) => {
      // Handle the error as needed
    }
  );
}

editCompany(editCompany: Company){
    this.editingCompany = editCompany;
    this.updateCompany = {...editCompany};
  }

  deletingCompany(company:Company):void {
    this.deleteComp=company;
  }
  deleteCompany(companyId: number) {
    this.compService.deleteCompany(companyId, {
      name: '',
      industry: '',
      location: '',
      contactInfo: ''
    }).subscribe(() => {
      // Remove the deleted company from the compList array
      this.compList = this.compList.filter(company => company.companyId!== companyId);
    });
  }
  updateCompanyById() {
  this.compService.updateCompany(this.editingCompany!.companyId!, this.updateCompany ).subscribe(result => {
    const index=this.compList.findIndex(company => company.companyId==this.editingCompany!.companyId);
    if(index==-1){
      this.compList[index] =result;
    }
  });

  this.newCompany = { name: "", industry: "", location: "", contactInfo: "" };
}


}

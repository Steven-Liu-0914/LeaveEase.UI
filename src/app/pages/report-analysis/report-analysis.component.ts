import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ReportAnalysisStore } from '../../shared/report-analysis/report-analysis.store';
import { ReportFilter } from '../../api/report-analysis/report-analysis.service';


@Component({
  selector: 'app-report-analysis',
  standalone: true,
  templateUrl: './report-analysis.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [ReportAnalysisStore]
})
export class ReportAnalysisComponent implements OnInit {
  private store = inject(ReportAnalysisStore);
  private fb = inject(FormBuilder);

  reportList = this.store.reportList;

  filterForm = this.fb.group({
    startDate: [''],
    endDate: [''],
    department: [''],
    keyword: ['']
  });

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const query = {
      startDate: null,
      endDate: null,
      department: null,
      keyword: null
    } as ReportFilter;
    this.store.filterReports(query);
  }

  search() {
    const raw = this.filterForm.getRawValue();
    const query = {
      startDate: raw.startDate || null,
      endDate: raw.endDate || null,
      department: raw.department || null,
      keyword: raw.keyword || null
    } as ReportFilter;
    this.store.filterReports(query);
  }

  exportToExcel() {
    const raw = this.filterForm.getRawValue();
    const query = {
      startDate: raw.startDate || null,
      endDate: raw.endDate || null,
      department: raw.department || null,
      keyword: raw.keyword || null
    } as ReportFilter;
    this.store.exportToExcel(query);
  }
}

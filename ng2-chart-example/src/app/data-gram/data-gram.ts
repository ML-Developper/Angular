import { Component } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { ChartOptions } from 'chart.js';
import {TableDiagramme} from '../table-diagramme/table-diagramme';

@Component({
  selector: 'app-data-gram',
  standalone: false,
  templateUrl: './data-gram.html',
  styleUrl: './data-gram.css'
})
export class DataGram {
  isBrowser: boolean;
  
  fornisseur = new TableDiagramme();


  pieChartDat = {
    
    labels: [ this.fornisseur.fournisseur + ' 1' , this.fornisseur.fournisseur + ' 2' , this.fornisseur.fournisseur + ' 3' ,
       this.fornisseur.fournisseur + ' 4', this.fornisseur.fournisseur + ' 5' , this.fornisseur.fournisseur + ' 6' , this.fornisseur.fournisseur + ' 7'],
    datasets: [
      {
        data: [ this.fornisseur.profit  , this.fornisseur.profit  , this.fornisseur.profit  ,
       this.fornisseur.profit , this.fornisseur.profit , this.fornisseur.profit , this.fornisseur.profit],
        label: 'Sales Percent',
        hoverOffset: 50,
        backgroundColor: [
          '#ffd902ff',
          '#1e06f8ff',
          '#f806d8ff',
          'rgba(0, 247, 255, 1)',
          '#ff0000ff',
          '#06f84fff',
          '#06f89b3a',
        ],  
      }      
    ]   
  } 


pieChartOption: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      enabled: true,
      bodyFont: { size: 20, family: "'Helvetica Neue', 'Arial'" },
      titleFont: { size: 25 },
      padding: 10,
    },
    legend: {
      
      position: 'right',
      labels: {
        font: {
          size: 20,   //rith labels size            
        },
        color: 'white',
        padding: 30,  // padding rith labels
        usePointStyle: true,
        pointStyle: 'rectRounded',       
      },      
    },    
  },  
   animation: {
    animateScale: true,
    animateRotate: true
  },
  layout: {
    padding: 30,   
  }
  
  
}as ChartOptions<'pie'>;

constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  ngOnit():void{

  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Income-app';

  grossHourlyIncome: null | number = null;
  netHourlyIncome : null | number = null;
  grossMonthlyIncome: null | number = null;
  netMonthlyIncome: null | number = null;
  grossAnnualIncome: null | number = null;
  netAnnualIncome: null | number = null;
  netMonthlyIncomeAfterTaxAndBonuses: null | number = null;
  netAnnualIncomeAfterTaxAndBonuses: null | number = null;

  employeeStatusTax: number = 22;
  executiveEmployeeStatusTax : number = 25;
  publicServiceEmployeeStatustax: number = 15;
  liberalProfessionStatusRelatedTax: number = 45;
  portageSalarialStatusRelatedTax: number = 51;
  statusRelatedTax: number = this.employeeStatusTax;

  noAdditionnalMonthlyIncomeBonus: number = 0;
  oneAdditionnalMonthlyIncomeBonus: number = 1;
  twoAdditionnalMonthlyIncomeBonus: number = 2;
  threeAdditionnalMonthlyIncomeBonus: number = 3;
  fourAdditionnalMonthlyIncomeBonus: number = 4;
  additionalMonthlyIncomeBonusNumber: number = this.noAdditionnalMonthlyIncomeBonus;

  prelevementALaSourceRate: number = 0;
  workingTimeRate: number = 100;

  constructor() { }

  ngOnInit() {}

  determinePrelevementALaSourceRate(netMonthlyIncome: number) {
    if (netMonthlyIncome < 1518) {
      return 0;
    } else if (netMonthlyIncome >= 1518 && netMonthlyIncome < 1577) {
      return 0.5;
    } else if (netMonthlyIncome >= 1577 && netMonthlyIncome < 1678) {
      return 1.3;
    } else if (netMonthlyIncome >= 1678 && netMonthlyIncome < 1791) {
      return 2.1;
    } else if (netMonthlyIncome >= 1791 && netMonthlyIncome < 1914) {
      return 2.9;
    } else if (netMonthlyIncome >= 1914 && netMonthlyIncome < 2016) {
      return 3.5;
    } else if (netMonthlyIncome >= 2016 && netMonthlyIncome < 2150) {
      return 4.1;
    } else if (netMonthlyIncome >= 2150 && netMonthlyIncome < 2544) {
      return 5.3;
    } else if (netMonthlyIncome >= 2544 && netMonthlyIncome < 2912) {
      return 7.5;
    } else if (netMonthlyIncome >= 2912 && netMonthlyIncome < 3317) {
      return 9.9;
    } else if (netMonthlyIncome >= 3317 && netMonthlyIncome < 3734) {
      return 11.9;
    } else if (netMonthlyIncome >= 3734 && netMonthlyIncome < 4357) {
      return 13.8;
    } else if (netMonthlyIncome >= 4357 && netMonthlyIncome < 5224) {
      return 15.8;
    } else if (netMonthlyIncome >= 5224 && netMonthlyIncome < 6537) {
      return 17.9;
    } else if (netMonthlyIncome >= 6537 && netMonthlyIncome < 8165) {
      return 20;
    } else if (netMonthlyIncome >= 8165 && netMonthlyIncome < 11333) {
      return 24;
    } else if (netMonthlyIncome >= 11333 && netMonthlyIncome < 15349) {
      return 28;
    } else if (netMonthlyIncome >= 15349 && netMonthlyIncome < 24094) {
      return 33;
    } else if (netMonthlyIncome >= 24094 && netMonthlyIncome < 51611) {
      return 38;
    } else if (netMonthlyIncome >= 51611) {
      return 43;
    } else {
      return 0;
    }
  }

  calculateGrossIncome(netIncome: number, statusRelatedTax: number) {
    return Math.round(((netIncome / (1 - (statusRelatedTax / 100))) + Number.EPSILON) * 100) / 100;
  }

  calculateGrossAnnualIncomeWithBonus(grossMonthlyIncome: number, numberOfAdditionalMonthlyIncomeBonus: number) {
    return Math.round(((grossMonthlyIncome * 12) + Number.EPSILON) * 100) / 100 + (grossMonthlyIncome * numberOfAdditionalMonthlyIncomeBonus);
  }

  calculateGrossIncomeWithWorkingTimeRate(netIncome: number, statusRelatedTax: number, workingTimeRate: number) {
    return Math.round(((netIncome / (1 - (statusRelatedTax / 100))) + Number.EPSILON) * 100) / 100 * workingTimeRate / 100;
  }

  calculateNetIncome(grossIncome: number, statusRelatedTax: number) {
    return Math.round(((grossIncome - (grossIncome * statusRelatedTax) / 100) + Number.EPSILON) * 100) / 100;
  }

  calculateNetIncomeWithWorkingTimeRate(grossIncome: number, statusRelatedTax: number, workingTimeRate: number) {
    return Math.round(((grossIncome - (grossIncome * statusRelatedTax) / 100) + Number.EPSILON) * 100) / 100 * workingTimeRate / 100;
  }

  calculateNetIncomeAfterPrelevementALaSourceAndBonuses(netIncome: number, prelevementALaSourceRate: number, numberOfAdditionalMonthlyIncomeBonus: number) {
    return Math.round(((netIncome - (netIncome * prelevementALaSourceRate) / 100) + Number.EPSILON) * 100) / 100 + (this.annualIncomeToMonthlyIncome(netIncome) * numberOfAdditionalMonthlyIncomeBonus);
  }

  calculateNetIncomeAfterPrelevementALaSource(netIncome: number, prelevementALaSourceRate: number) {
    return Math.round(((netIncome - (netIncome * prelevementALaSourceRate) / 100) + Number.EPSILON) * 100) / 100;
  }

  hourlyIncomeToMonthlyIncome(hourlyIncome: number) {
    return Math.round(((hourlyIncome * (35 * 52) / 12) + Number.EPSILON) * 100) / 100;
  }

  hourlyIncomeToMonthlyIncomeWithWorkingTimeRate(hourlyIncome: number, workingTimeRate: number) {
    return Math.round(((hourlyIncome * (35 * 52) / 12) + Number.EPSILON) * 100) / 100 * workingTimeRate / 100;
  }

  monthlyIncomeToAnnualIncome(monthlyIncome: number) {
    return Math.round(((monthlyIncome * 12) + Number.EPSILON) * 100) / 100;
  }

  monthlyIncomeToHourlyIncome(monthlyIncome: number) {
    return Math.round(((monthlyIncome / ((35 * 52) / 12)) + Number.EPSILON) * 100) / 100;
  }

  annualIncomeToHourlyIncome(annualIncome: number) {
    return Math.round(((annualIncome / (35 * 52)) + Number.EPSILON) * 100) / 10;
  }

  annualIncomeToMonthlyIncome(annualIncome: number) {
    return Math.round(((annualIncome / 12) + Number.EPSILON) * 100) / 100;
  }

  onGrossHourlyIncomeChange() {
    if (this.grossHourlyIncome) {
      this.netHourlyIncome = this.calculateNetIncome(this.grossHourlyIncome, this.statusRelatedTax);
      this.grossMonthlyIncome = this.hourlyIncomeToMonthlyIncome(this.grossHourlyIncome);
      this.netMonthlyIncome = this.calculateNetIncome(this.grossMonthlyIncome, this.statusRelatedTax);
      this.grossAnnualIncome = this.monthlyIncomeToAnnualIncome(this.grossMonthlyIncome);
      this.netAnnualIncome = this.calculateNetIncome(this.grossAnnualIncome, this.statusRelatedTax);

      if (this.netMonthlyIncome) {
        this.prelevementALaSourceRate = this.determinePrelevementALaSourceRate(this.netMonthlyIncome);
      }

      this.netMonthlyIncomeAfterTaxAndBonuses = this.calculateNetIncomeAfterPrelevementALaSourceAndBonuses(this.netMonthlyIncome, this.prelevementALaSourceRate, this.additionalMonthlyIncomeBonusNumber);
      this.netAnnualIncomeAfterTaxAndBonuses = this.calculateNetIncomeAfterPrelevementALaSourceAndBonuses(this.netAnnualIncome, this.prelevementALaSourceRate, this.additionalMonthlyIncomeBonusNumber);

    } else {
      this.clearValues();
    }
  }

  onNetHourlyIncomeChange() {
    if (this.netHourlyIncome) {
      this.grossHourlyIncome = this.calculateGrossIncome(this.netHourlyIncome, this.statusRelatedTax);
      this.grossMonthlyIncome = this.hourlyIncomeToMonthlyIncome(this.grossHourlyIncome);
      this.netMonthlyIncome = this.calculateNetIncome(this.grossMonthlyIncome, this.statusRelatedTax);
      this.grossAnnualIncome = this.monthlyIncomeToAnnualIncome(this.grossMonthlyIncome);
      this.netAnnualIncome = this.calculateNetIncome(this.grossAnnualIncome, this.statusRelatedTax);

      if (this.netMonthlyIncome) {
        this.prelevementALaSourceRate = this.determinePrelevementALaSourceRate(this.netMonthlyIncome);
      }

      this.netMonthlyIncomeAfterTaxAndBonuses = this.calculateNetIncomeAfterPrelevementALaSourceAndBonuses(this.netMonthlyIncome, this.prelevementALaSourceRate, this.additionalMonthlyIncomeBonusNumber);
      this.netAnnualIncomeAfterTaxAndBonuses = this.calculateNetIncomeAfterPrelevementALaSourceAndBonuses(this.netAnnualIncome, this.prelevementALaSourceRate, this.additionalMonthlyIncomeBonusNumber);

    } else {
      this.clearValues();
    }
  }

  onGrossMonthlyIncomeChange() {
    if (this.grossMonthlyIncome) {
      this.netMonthlyIncome = this.calculateNetIncome(this.grossMonthlyIncome, this.statusRelatedTax);
      this.grossHourlyIncome = this.monthlyIncomeToHourlyIncome(this.grossMonthlyIncome);
      this.netHourlyIncome = this.calculateNetIncome(this.grossHourlyIncome, this.statusRelatedTax);
      this.grossAnnualIncome = this.monthlyIncomeToAnnualIncome(this.grossMonthlyIncome);
      this.netAnnualIncome = this.calculateNetIncome(this.grossAnnualIncome, this.statusRelatedTax);

      if (this.netMonthlyIncome) {
        this.prelevementALaSourceRate = this.determinePrelevementALaSourceRate(this.netMonthlyIncome);
      }

      this.netMonthlyIncomeAfterTaxAndBonuses = this.calculateNetIncomeAfterPrelevementALaSourceAndBonuses(this.netMonthlyIncome, 0, this.additionalMonthlyIncomeBonusNumber);
      this.netAnnualIncomeAfterTaxAndBonuses = this.calculateNetIncomeAfterPrelevementALaSourceAndBonuses(this.netAnnualIncome, 0, this.additionalMonthlyIncomeBonusNumber);

    } else {
      this.clearValues();
    }
  }

  onNetMonthlyIncomeChange() {
    if (this.netMonthlyIncome) {
      this.grossMonthlyIncome = this.calculateGrossIncome(this.netMonthlyIncome, this.statusRelatedTax);
      this.grossHourlyIncome = this.monthlyIncomeToHourlyIncome(this.grossMonthlyIncome);
      this.netHourlyIncome = this.calculateNetIncome(this.grossHourlyIncome, this.statusRelatedTax);
      this.grossAnnualIncome = this.monthlyIncomeToAnnualIncome(this.grossMonthlyIncome);
      this.netAnnualIncome = this.calculateNetIncome(this.grossAnnualIncome, this.statusRelatedTax);

      this.prelevementALaSourceRate = this.determinePrelevementALaSourceRate(this.netMonthlyIncome);

      this.netMonthlyIncomeAfterTaxAndBonuses = this.calculateNetIncomeAfterPrelevementALaSourceAndBonuses(this.netMonthlyIncome, this.prelevementALaSourceRate, this.additionalMonthlyIncomeBonusNumber);
      this.netAnnualIncomeAfterTaxAndBonuses = this.calculateNetIncomeAfterPrelevementALaSourceAndBonuses(this.netAnnualIncome, this.prelevementALaSourceRate, this.additionalMonthlyIncomeBonusNumber);
    } else {
      this.clearValues();
    }
  }

  onGrossAnnualIncomeChange() {
    if (this.grossAnnualIncome) {
      this.netAnnualIncome = this.calculateNetIncome(this.grossAnnualIncome, this.statusRelatedTax);
      this.grossHourlyIncome = this.annualIncomeToHourlyIncome(this.grossAnnualIncome);
      this.netHourlyIncome = this.calculateNetIncome(this.grossHourlyIncome, this.statusRelatedTax);
      this.grossMonthlyIncome = this.hourlyIncomeToMonthlyIncome(this.grossHourlyIncome);
      this.netMonthlyIncome = this.calculateNetIncome(this.grossMonthlyIncome, this.statusRelatedTax);

      if (this.netMonthlyIncome) {
        this.prelevementALaSourceRate = this.determinePrelevementALaSourceRate(this.netMonthlyIncome);
      }

      this.netMonthlyIncomeAfterTaxAndBonuses = this.calculateNetIncomeAfterPrelevementALaSourceAndBonuses(this.netMonthlyIncome, this.prelevementALaSourceRate, this.additionalMonthlyIncomeBonusNumber);
      this.netAnnualIncomeAfterTaxAndBonuses = this.calculateNetIncomeAfterPrelevementALaSourceAndBonuses(this.netAnnualIncome, this.prelevementALaSourceRate, this.additionalMonthlyIncomeBonusNumber);
    } else {
      this.clearValues();
    }
  }

  onNetAnnualIncomeChange() {
    if (this.netAnnualIncome) {
      this.netHourlyIncome = this.annualIncomeToHourlyIncome(this.netAnnualIncome);
      this.grossHourlyIncome = this.calculateGrossIncome(this.netHourlyIncome, this.statusRelatedTax);
      this.grossMonthlyIncome = this.hourlyIncomeToMonthlyIncome(this.grossHourlyIncome);
      this.netMonthlyIncome = this.calculateNetIncome(this.grossMonthlyIncome, this.statusRelatedTax);
      this.grossAnnualIncome = this.monthlyIncomeToAnnualIncome(this.grossMonthlyIncome);

      if (this.netMonthlyIncome) {
        this.prelevementALaSourceRate = this.determinePrelevementALaSourceRate(this.netMonthlyIncome);
      }

      this.netMonthlyIncomeAfterTaxAndBonuses = this.calculateNetIncomeAfterPrelevementALaSourceAndBonuses(this.netMonthlyIncome, this.prelevementALaSourceRate, this.additionalMonthlyIncomeBonusNumber);
      this.netAnnualIncomeAfterTaxAndBonuses = this.calculateNetIncomeAfterPrelevementALaSourceAndBonuses(this.netAnnualIncome, this.prelevementALaSourceRate, this.additionalMonthlyIncomeBonusNumber);
    } else {
      this.clearValues();
    }
  }

  onStatusRelatedTaxChange(selectedStatusTaxRate: number) {
    this.statusRelatedTax = selectedStatusTaxRate;

    if (this.grossHourlyIncome) {
      this.netHourlyIncome = this.calculateNetIncome(this.grossHourlyIncome, this.statusRelatedTax);
    }

    if (this.grossMonthlyIncome) {
      this.netMonthlyIncome = this.calculateNetIncome(this.grossMonthlyIncome, this.statusRelatedTax);

      if (this.netMonthlyIncome) {
        this.prelevementALaSourceRate = this.determinePrelevementALaSourceRate(this.netMonthlyIncome);
      }

      this.netMonthlyIncomeAfterTaxAndBonuses = this.calculateNetIncomeAfterPrelevementALaSource(this.netMonthlyIncome, this.prelevementALaSourceRate);
    }

    if (this.grossAnnualIncome) {
      this.netAnnualIncome = this.calculateNetIncome(this.grossAnnualIncome, this.statusRelatedTax);
      this.netAnnualIncomeAfterTaxAndBonuses = this.calculateNetIncomeAfterPrelevementALaSourceAndBonuses(this.netAnnualIncome, this.prelevementALaSourceRate, this.additionalMonthlyIncomeBonusNumber);
    }
  }

  onNumberOfAdditionalMonthlyIncomeBonusChange(selectedNumberOfAdditionalMonthlyIncomeBonus: number) {
    this.additionalMonthlyIncomeBonusNumber = selectedNumberOfAdditionalMonthlyIncomeBonus;

    if (this.grossMonthlyIncome) {
      this.grossAnnualIncome = this.calculateGrossAnnualIncomeWithBonus(this.grossMonthlyIncome, this.additionalMonthlyIncomeBonusNumber);
    }

    if (this.grossAnnualIncome) {
      this.netAnnualIncome = this.calculateNetIncome(this.grossAnnualIncome, this.statusRelatedTax);
    }

    if (this.netAnnualIncome) {
      this.netAnnualIncomeAfterTaxAndBonuses = this.calculateNetIncomeAfterPrelevementALaSource(this.netAnnualIncome, this.prelevementALaSourceRate);
    }
  }

  onPrelevementALaSourceRateChange(selectedPrelevementALaSourceRate: string | number) {
    selectedPrelevementALaSourceRate = Number(selectedPrelevementALaSourceRate);
    this.prelevementALaSourceRate = selectedPrelevementALaSourceRate;

    if (this.netMonthlyIncome) {
      this.netMonthlyIncomeAfterTaxAndBonuses = this.calculateNetIncomeAfterPrelevementALaSource(this.netMonthlyIncome, this.prelevementALaSourceRate); 
    }

    if (this.netAnnualIncome) {
      this.netAnnualIncomeAfterTaxAndBonuses = this.calculateNetIncomeAfterPrelevementALaSource(this.netAnnualIncome, this.prelevementALaSourceRate);
    }
  }

  onWorkingTimeRateChange(selectedWorkingTimeRate: string | number) {
    selectedWorkingTimeRate = Number(selectedWorkingTimeRate);
    this.workingTimeRate = selectedWorkingTimeRate;

    if (this.grossHourlyIncome) {
      this.grossMonthlyIncome = this.hourlyIncomeToMonthlyIncomeWithWorkingTimeRate(this.grossHourlyIncome, this.workingTimeRate);
    }

    if (this.grossMonthlyIncome) {
      this.netMonthlyIncome = this.calculateNetIncome(this.grossMonthlyIncome, this.statusRelatedTax);
      this.grossAnnualIncome = this.monthlyIncomeToAnnualIncome(this.grossMonthlyIncome);
    }

    if (this.grossAnnualIncome) {
      this.netAnnualIncome = this.calculateNetIncome(this.grossAnnualIncome, this.statusRelatedTax);
    }

    if (this.netMonthlyIncome) {
      this.prelevementALaSourceRate = this.determinePrelevementALaSourceRate(this.netMonthlyIncome);
      this.netMonthlyIncomeAfterTaxAndBonuses = this.calculateNetIncomeAfterPrelevementALaSourceAndBonuses(this.netMonthlyIncome, this.prelevementALaSourceRate, this.additionalMonthlyIncomeBonusNumber);
    }

    if (this.netAnnualIncome) {
      this.netAnnualIncomeAfterTaxAndBonuses = this.calculateNetIncomeAfterPrelevementALaSourceAndBonuses(this.netAnnualIncome, this.prelevementALaSourceRate, this.additionalMonthlyIncomeBonusNumber);
    }
  }


  clearValues() {
    this.grossHourlyIncome = null;
    this.netHourlyIncome = null;
    this.grossMonthlyIncome = null;
    this.netMonthlyIncome = null;
    this.grossAnnualIncome = null;
    this.netAnnualIncome = null;
    this.netMonthlyIncomeAfterTaxAndBonuses = null;
    this.netAnnualIncomeAfterTaxAndBonuses = null;
  }
}

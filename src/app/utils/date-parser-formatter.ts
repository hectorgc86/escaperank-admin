import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class CustomNgbDateParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct | null{
    const dateParts = value.trim().split('/');
    if (dateParts.length !== 3) {
      return null;
    }
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return null;
    }
    return { year, month, day };
  }

  format(date: NgbDateStruct): string {
    if (!date) {
      return '';
    }
    const day = date.day.toString().padStart(2, '0');
    const month = date.month.toString().padStart(2, '0');
    const year = date.year.toString();
    return `${year}/${month}/${day}`;

  }
}

export class CustomAdapter extends NgbDateAdapter<string> {
	readonly DELIMITER = '-';

	fromModel(value: string | null): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}

	toModel(date: NgbDateStruct | null): string | null {
		return date ? date.year + this.DELIMITER + date.month + this.DELIMITER + date.day : null;
	}
}

export class NgbdDatepickerAdapter {
	model1: string;
	model2: string;

	constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>) {}

	get today() {
		return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
	}
}
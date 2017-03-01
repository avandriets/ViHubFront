
export abstract class FormViHub {

  inProcess = false;
  hasError: boolean = false;
  errorMessage: string = '';

  SetError(error: any): void {
    if (error != null) {
      this.hasError = true;
      if (error.json().detail) {
        this.errorMessage = error.json().detail;
      } else {
        this.errorMessage = "Ошибка";
      }

    } else {
      this.hasError = false;
    }
  }
}

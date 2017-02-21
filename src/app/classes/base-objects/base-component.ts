export class BaseComponent {
  hasError: boolean = false;
  errorMessage: string = '';

  showInfo: boolean = false;
  infoMessage: string = '';

  SetError(error: any): void {
    if (error != null) {
      this.hasError = true;

      try {
        let error_detail = JSON.parse(error);
        if (error_detail.error_description) {
          this.errorMessage = error_detail.error_description;
        } else if(error_detail.detail){
          this.errorMessage = error_detail.detail;
        } else {
          this.errorMessage = "Ошибка " + error;
        }
      } catch (e) {
        this.errorMessage = "Ошибка сервера";
      }

    } else {
      this.hasError = false;
    }
  }

  HideError(){
    this.hasError = false;
  }

  HideMessage(): void{
    this.showInfo = false;
  }

  ShowMessage(message: string): void {
    this.showInfo = true;
    this.infoMessage = message;
  }
}

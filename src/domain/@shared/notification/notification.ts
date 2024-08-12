export type NotificationErrorProps = {
  message: string;
  context: string;
};

export default class Notification {
  private errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps): void {
    this.errors.push(error);
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  getErrors(): NotificationErrorProps[] {
    return this.errors;
  }

  messages(context?: string): string {
    if (!context) {
      return this.errors.map((error) => `${error.context}: ${error.message}`).join(",");
    }
    return this.errors
      .filter((error) => error.context === context)
      .map((error) => `${error.context}: ${error.message},`)
      .join("");
  }
}

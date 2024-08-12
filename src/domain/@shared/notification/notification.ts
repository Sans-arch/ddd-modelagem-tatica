export type NotificationError = {
  message: string;
  context: string;
};

export default class Notification {
  private errors: NotificationError[] = [];

  addError(error: NotificationError): void {
    this.errors.push(error);
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

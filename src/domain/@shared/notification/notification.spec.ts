import Notification, { NotificationErrorProps } from "./notification";

describe("Unit test for notification", () => {
  it("should create errors", () => {
    const notification = new Notification();
    const error: NotificationErrorProps = {
      message: "error message",
      context: "customer",
    };
    notification.addError(error);

    expect(notification.messages("customer")).toBe("customer: error message,");

    const error2: NotificationErrorProps = {
      message: "error message2",
      context: "customer",
    };
    notification.addError(error2);

    expect(notification.messages("customer")).toBe("customer: error message,customer: error message2,");

    const error3: NotificationErrorProps = {
      message: "error message3",
      context: "order",
    };
    notification.addError(error3);

    expect(notification.messages("customer")).toBe("customer: error message,customer: error message2,");
    expect(notification.messages()).toBe("customer: error message,customer: error message2,order: error message3");
  });

  it("should check if notification has at least one error", () => {
    const notification = new Notification();
    const error: NotificationErrorProps = {
      message: "error message",
      context: "customer",
    };
    notification.addError(error);

    expect(notification.hasErrors()).toBeTruthy();
  });

  it("should get all errors props", () => {
    const notification = new Notification();
    const error: NotificationErrorProps = {
      message: "error message",
      context: "customer",
    };
    notification.addError(error);

    expect(notification.getErrors()).toEqual([error]);
  });
});

import Address from "../../entity/address";
import EventDispatcher from "../@shared/event-dispatcher";
import EventHandlerInterface from "../@shared/event-handler.interface";
import ChangedAddressEvent from "./changed-address.event";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLog1Handler from "./handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log-2.handler";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";

describe("Customer events tests", () => {
  it("should register customer events handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const enviaConsoleLog1Handler: EventHandlerInterface = new EnviaConsoleLog1Handler();
    const enviaConsoleLog2Handler: EventHandlerInterface = new EnviaConsoleLog2Handler();
    const enviaConsoleLogHandler: EventHandlerInterface = new EnviaConsoleLogHandler();

    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);
    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog2Handler);
    eventDispatcher.register("ChangedAddressEvent", enviaConsoleLogHandler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toHaveLength(2);
    expect(eventDispatcher.getEventHandlers["ChangedAddressEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ChangedAddressEvent"]).toHaveLength(1);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(enviaConsoleLog1Handler);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(enviaConsoleLog2Handler);
    expect(eventDispatcher.getEventHandlers["ChangedAddressEvent"][0]).toMatchObject(enviaConsoleLogHandler);
  });

  it("should unregister customer events handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const enviaConsoleLog1Handler: EventHandlerInterface = new EnviaConsoleLog1Handler();
    const enviaConsoleLog2Handler: EventHandlerInterface = new EnviaConsoleLog2Handler();
    const enviaConsoleLogHandler: EventHandlerInterface = new EnviaConsoleLogHandler();

    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);
    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog2Handler);
    eventDispatcher.register("ChangedAddressEvent", enviaConsoleLogHandler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(enviaConsoleLog1Handler);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(enviaConsoleLog2Handler);
    expect(eventDispatcher.getEventHandlers["ChangedAddressEvent"][0]).toMatchObject(enviaConsoleLogHandler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toHaveLength(2);

    eventDispatcher.unregister("CustomerCreatedEvent", enviaConsoleLog1Handler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toHaveLength(1);

    eventDispatcher.unregister("CustomerCreatedEvent", enviaConsoleLog2Handler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toHaveLength(0);

    expect(eventDispatcher.getEventHandlers["ChangedAddressEvent"]).toHaveLength(1);

    eventDispatcher.unregister("ChangedAddressEvent", enviaConsoleLogHandler);

    expect(eventDispatcher.getEventHandlers["ChangedAddressEvent"]).toHaveLength(0);
  });

  it("should unregister all customer event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const enviaConsoleLog1Handler: EventHandlerInterface = new EnviaConsoleLog1Handler();
    const enviaConsoleLog2Handler: EventHandlerInterface = new EnviaConsoleLog2Handler();
    const enviaConsoleLogHandler: EventHandlerInterface = new EnviaConsoleLogHandler();

    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);
    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog2Handler);
    eventDispatcher.register("ChangedAddressEvent", enviaConsoleLogHandler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(enviaConsoleLog1Handler);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(enviaConsoleLog2Handler);
    expect(eventDispatcher.getEventHandlers["ChangedAddressEvent"][0]).toMatchObject(enviaConsoleLogHandler);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers).toMatchObject({});
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
    expect(eventDispatcher.getEventHandlers["ChangedAddressEvent"]).toBeUndefined();
  });

  it("should notify all customer event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const enviaConsoleLog1Handler: EventHandlerInterface = new EnviaConsoleLog1Handler();
    const enviaConsoleLog2Handler: EventHandlerInterface = new EnviaConsoleLog2Handler();
    const enviaConsoleLogHandler: EventHandlerInterface = new EnviaConsoleLogHandler();

    const spyEnviaConsoleLog1Handler = jest.spyOn(enviaConsoleLog1Handler, "handle");
    const spyEnviaConsoleLog2Handler = jest.spyOn(enviaConsoleLog2Handler, "handle");
    const spyEnviaConsoleLogHandler = jest.spyOn(enviaConsoleLogHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler);
    eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog2Handler);
    eventDispatcher.register("ChangedAddressEvent", enviaConsoleLogHandler);

    const customerCreatedEvent = new CustomerCreatedEvent({ name: "João Alberto", idade: 42 });
    const changedAddressEvent = new ChangedAddressEvent({
      customerId: "123",
      customerName: "João Alberto",
      newAddress: new Address("Rua 1", 123, "88270140", "Cidade 1"),
    });

    eventDispatcher.notify(customerCreatedEvent);
    eventDispatcher.notify(changedAddressEvent);

    expect(spyEnviaConsoleLog1Handler).toHaveBeenCalled();
    expect(spyEnviaConsoleLog2Handler).toHaveBeenCalled();
    expect(spyEnviaConsoleLogHandler).toHaveBeenCalled();
  });
});

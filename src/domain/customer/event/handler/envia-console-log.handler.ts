import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import ChangedAddressEvent from "../changed-address.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<ChangedAddressEvent> {
  handle(event: ChangedAddressEvent): void {
    const { customerId: id, customerName: nome, newAddress: endereco } = event.eventData;
    console.log(`Endereço do cliente: ${id}, ${nome} alterado para: ${endereco.toString()}`);
  }
}

import Address from "../../entity/address";
import EventInterface from "../@shared/event.interface";

type ChangedAddressEventData = {
  customerId: string;
  customerName: string;
  newAddress: Address;
};

export default class ChangedAddressEvent implements EventInterface {
  dataTimeOccured: Date;
  eventData: ChangedAddressEventData;

  constructor(eventData: ChangedAddressEventData) {
    this.dataTimeOccured = new Date();
    this.eventData = eventData;
  }
}

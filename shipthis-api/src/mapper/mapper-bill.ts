import { MapperPersonInfo } from './mapper-person-info';
import { BillDto } from './../modules/ordersheet/dto/bill.dto';
import { Ordersheet } from './../modules/ordersheet/entities/ordersheet.entity';
import { MapperPackage } from './mapper-package';
export class MapperBill {
  static generateBillFromOrder(order: Ordersheet): BillDto {
    const bill: BillDto = new BillDto();
    bill.ordersheet_id = order.ordersheet_id;
    bill.creation_date = order.creation_date;
    bill.origin = order.origin_office.place.address;
    bill.destination = order.origin_office
      ? order.origin_office.place.address
      : order.destination_place.address;
    bill.order_type = order.order_price_hist.order_type.name;
    bill.ignore_holidays = order.ignore_hollydays
      ? order.ignore_hollydays
      : false;
    bill.discount = order.discount ? order.discount.discount.percentage : 0;
    bill.facturation_amount = order.facturation_amount;
    bill.shipper = MapperPersonInfo.genratePersonInfoDtoFromUserdata(
      order.user,
    );
    bill.receiver = MapperPersonInfo.generatePersonInfoFromReceiver(
      order.receiver,
    );
    bill.packages = MapperPackage.generatePackageDtoArrayFromItemArray(
      order.items,
    );

    return bill;
  }
}

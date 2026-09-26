import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency, getOrderStatusStyle } from '@/lib/functions';
import dayjs from 'dayjs/esm';
import AssignDeliveryPartner from './AssignDeliveryPartner';
import useGetActiveDeliveryPartners from '@/hooks/admin/useGetActiveDeliveryPartners';
const Header = ['ORDER', 'CUSTOMER', 'TOTAL', 'DELIVERY PARTNER', 'STATUS'];

type User = {
  firstName: string;
  lastName: string;
  email: string;
};

type DeliveryBoy = {
  name: string;
  vehicle: 'BIKE' | 'CAR' | 'SCOOTER';
};

type OrderStatus = 'PLACED' | 'CONFIRMED' | 'ASSIGNED' | 'PACKED' | 'OUT_FOR_DELIVERY' | 'DELIVERED';

type Order = {
  id: string;
  code: string;
  createdAt: string;
  totalPrice: string;
  orderStatus: OrderStatus;
  user: User;
  deliveryBoy: DeliveryBoy;
  paymentMethod: string;
};

interface Props {
  orders: Order[];
}
const OrdersList = ({ orders }: Props) => {
  const { data, isPending: isGetting } = useGetActiveDeliveryPartners();

  return (
    <div className="overflow-x-auto p-5 my-5 w-full rounded-2xl bg-card shadow-[0_10px_30px_rgba(0,0,0,0.05)] ">
      <Table className="min-w-225 ">
        <TableCaption>A list of orders</TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-white">
            {Header.map((el, i) => (
              <TableHead className={`text-left font-semibold text-accent`} key={el}>
                {el}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="hover:bg-white w-full ">
              <TableCell className="py-3 px-2 hover:bg-white ">
                <h4 className="text-sm font-semibold">#{order.code}</h4>
                <span className="text-xs text-gray-400">{dayjs(order.createdAt).format('MMMM D, YYYY h:mm A')}</span>
              </TableCell>
              <TableCell className="py-3 px-2 hover:bg-white">
                <h4 className="text-sm font-semibold">
                  {order.user.firstName} {order.user.lastName}
                </h4>
                <span className="text-xs text-gray-400">{order.user.email}</span>
              </TableCell>
              <TableCell className="py-3 px-2 hover:bg-white ">
                <h4 className="text-sm font-semibold">{formatCurrency(Number(order.totalPrice))}</h4>
                <span className="text-xs text-gray-400">{order.paymentMethod === 'CREDIT' ? 'CARD' : 'CASH'}</span>
              </TableCell>
              <TableCell className="py-3 px-2 hover:bg-white">
                {order.deliveryBoy ? (
                  <div className="flex items-center gap-3">
                    <div className="h-8! w-8! rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      {order.deliveryBoy.name[0].toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">{order.deliveryBoy.name}</h4>
                      <span className="text-xs text-gray-400">{order.deliveryBoy.vehicle}</span>
                    </div>
                  </div>
                ) : (
                  <AssignDeliveryPartner orderId={order.id} deliveryBoys={data ?? []} isGetting={isGetting} />
                )}
              </TableCell>
              <TableCell className="py-3 px-2 hover:bg-white">
                <span
                  className={`font-semibold  py-1! text-center block max-w-38.75 rounded-lg
                     ${getOrderStatusStyle(order.orderStatus).color}
                         ${getOrderStatusStyle(order.orderStatus).bg} `}
                >
                  {getOrderStatusStyle(order.orderStatus).text}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="w-full ">
          <TableRow className="w-full hover:bg-white">
            <TableCell colSpan={5} className="py-3">
              Total
            </TableCell>
            <TableCell className="text-right py-3">{orders.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default OrdersList;

{
  /* <TableCell className="py-3 px-2 hover:bg-whiteflex items-center mr-5">
  {user.picture ? (
    <img src={user.picture.url} alt="user picture" className="w-10 h-10 object-cover rounded-full mr-3" />
  ) : (
    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
      {user.firstName.charAt(0)}
    </div>
  )}
</TableCell>; */
}

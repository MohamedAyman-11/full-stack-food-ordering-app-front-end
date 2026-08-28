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

import { MoreHorizontalIcon, Pen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Gmail, Google } from '@thesvg/react';
import Loading from '../extras/Loading';
import useGetUsers from '@/hooks/admin/useGetUsers';
import type { User } from '@/interfaces';
import dayjs from '../../../../node_modules/dayjs/esm/index';
import DeleteUser from './DeleteUser';
import UpdateUser from './UpdateUser';

const Header = ['User', 'Email', 'Role', 'Provider', 'Joined date', 'Actions'];
const CustomersList = () => {
  const { data, isPending } = useGetUsers();
  if (isPending) return <Loading />;
  return (
    <div className="my-5 w-full">
      <div className="w-full overflow-x-auto rounded-md ">
        <Table className="min-w-212.5 md:min-w-0">
          <TableCaption>A list of customers</TableCaption>
          <TableHeader>
            <TableRow>
              {Header.map((el, i) => (
                <TableHead className={`${el === 'Actions' ? 'text-right' : 'text-left'} font-medium`} key={i}>
                  {el}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((user: User) => (
                <TableRow key={user.id}>
                  <TableCell className="py-3 px-2 flex items-center mr-5">
                    {user.picture ? (
                      <img src={user.picture.url} alt="user picture" className="w-10 h-10 rounded-full mr-3" />
                    ) : (
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {user.firstName.charAt(0)}
                        {user.lastName.charAt(0)}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="py-3 px-2 ">
                    <h4 className="text-sm">{user.email.length > 20 ? `${user.email.slice(0, 20)}...` : user.email}</h4>
                  </TableCell>
                  <TableCell className="py-3 px-2 ">
                    <h4 className="text-sm ">
                      {user.role === 'ADMIN' ? 'Admin' : user.role === 'CUSTOMER' ? 'Customer' : 'Other'}
                    </h4>
                  </TableCell>
                  <TableCell className="py-3 px-2  ">
                    <h4 className="text-sm">
                      {user.provider === 'GOOGLE' ? <Google className="h-6 w-6" /> : <Gmail className="h-6 w-6" />}
                    </h4>
                  </TableCell>
                  <TableCell className="py-3 px-2 ">
                    <h4 className="text-sm">{dayjs(user.createdAt).format('DD/MM/YYYY')}</h4>
                  </TableCell>
                  <TableCell className="text-right py-3 px-2 ">
                    <div className="flex items-center gap-3 justify-end">
                      <UpdateUser id={user.id} />
                      <DeleteUser user={user} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <h2>No Users Found</h2>
            )}
          </TableBody>
          <TableFooter className="w-full ">
            <TableRow className="w-full ">
              <TableCell colSpan={5} className="py-3">
                Total
              </TableCell>
              <TableCell className="text-right py-3">{data.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default CustomersList;

const users = [
  {
    user: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    user: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    user: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    user: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    user: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    user: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    user: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
];

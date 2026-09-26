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

import { Gmail, Google } from '@thesvg/react';
import Loading from '../Loading';
import useGetUsers from '@/hooks/admin/useGetUsers';
import type { User } from '@/interfaces';
import dayjs from '../../../../node_modules/dayjs/esm/index';
import DeleteUser from './DeleteUser';
import UpdateUser from './UpdateUser';
import EmptyState from '@/components/ui/EmptyState';
import { Info } from 'lucide-react';

const Header = ['USER', 'EMAIL', 'ROLE', 'PROVIDER', 'JOINED DATE', 'ACTIONS'];
const CustomersList = () => {
  const { data, isPending } = useGetUsers();
  if (isPending) return <Loading />;
  return (
    <div className="my-5 w-full">
      {data && data.length > 0 ? (
        <div className="w-full overflow-x-auto rounded-md ">
          <Table className="min-w-200">
            <TableCaption>A list of Users</TableCaption>
            <TableHeader>
              <TableRow>
                {Header.map((el, i) => (
                  <TableHead
                    className={`${el === 'Actions' ? 'text-right' : 'text-left'} font-semibold text-accent`}
                    key={i}
                  >
                    {el}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((user: User) => (
                <TableRow key={user.id}>
                  <TableCell className="py-3 px-2 flex items-center mr-5">
                    {user.picture ? (
                      <img
                        src={user.picture.url}
                        alt="user picture"
                        className="w-10 h-10 object-cover rounded-full mr-3"
                      />
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
              ))}
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
      ) : (
        <EmptyState
          title="No Users found!"
          description="There are no users to display yet. New users will appear here once they sign up."
          icon={<Info className="size-6" />}
          className="mt-10"
        />
      )}
    </div>
  );
};

export default CustomersList;

import useGetCurrentUser from '@/hooks/auth/useGetCurrentUser';

const Banner = () => {
  const { data: user } = useGetCurrentUser();
  return (
    <div className="space-y-2">
      <p className="text-xl font-medium text-primary">{user.role === 'ADMIN' ? 'Admin Dashboard' : 'Welcome back'}</p>

      <h2 className="text-3xl font-bold tracking-tight text-foreground">
        {user.firstName} {user.lastName} 👋
      </h2>

      <p className="max-w-lg text-sm leading-6 text-muted-foreground">
        {user.role === 'ADMIN'
          ? 'Manage your store, products, orders, customers, and account settings all in one place.'
          : 'Manage your account, explore our menu, and enjoy a seamless experience with Craveo.'}
      </p>
    </div>
  );
};

export default Banner;

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-sky-500 to-indigo-500">
      {children}
    </div>
  );
};
export default AuthLayout;

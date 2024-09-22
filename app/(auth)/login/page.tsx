import UserAuthForm from '@/components/user-auth-form';
import Link from 'next/link';
import React from 'react';

const Login = () => {
  return (
    <div className="container flex flex-col justify-center h-screen items-center w-screen">
      <div className="mx-auto w-full sm:w-[350px] flex flex-col justify-center space-y-6">
        <div className="text-center space-y-2">
          <h1 className="font-semibold text-2xl tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            メールアドレスを入力してログインできます。
          </p>
        </div>
        <UserAuthForm />
        <p className="text-muted-foreground px-8 text-center text-sm">
          <Link href={'/register'} className="underline underline-offset-4">
            アカウントを持っていませんか？
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

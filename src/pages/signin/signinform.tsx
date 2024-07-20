import Logo from '../../../public/login.svg?react';
import { Input, Button } from '@/_components';

export const SignInForm = () => {
  return (
    <section className="flex flex-col gap-4 p- 5 mi">
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto bg-white rounded-xl shadow-lg">
        <p className="mt-6 text-2xl text-SLATE font-bold">회원가입</p>
        <Logo width={150} height={150} />
        <div style={{ margin: '0 auto' }}>
          <Input
            placeholder="이름"
            id="name"
            name="name"
            className="w-[350px]"
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500 flex justify-center">
            <span className="font-medium"></span>
          </p>
          <Input
            placeholder="이메일"
            id="email"
            name="email"
            className="w-[350px]"
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500 flex justify-center">
            <span className="font-medium"></span>
          </p>
          <Input
            placeholder="비밀번호"
            id="password"
            name="password"
            className="w-[350px]"
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500 flex justify-center">
            <span className="font-medium"></span>
          </p>
        </div>
      </div>
    </section>
  );
};

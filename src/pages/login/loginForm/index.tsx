import Logo from '../../../../public/login.svg?react';
import { z, ZodError } from 'zod';
import { ChangeEvent, useState } from 'react';
import { LoginBanner } from '@/pages/login/loginButton';
import { Button, Input } from '@/_components';

interface LoginFormProps {
  onSubmit: (data: z.infer<typeof loginSchema>) => void;
}

export const loginSchema = z.object({
  name: z.string().min(1, '이름은 1글자 이상 입력해주세요.'),
  email: z.string().email('올바른 이메일 형식으로 입력해주세요.'),
  password: z
    .string()
    .min(8, '비밀번호는 8글자 이상 입력해주세요.')
    .max(16, '비밀번호는 16글자 이하로 입력해주세요.')
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      '비밀번호에는 최소 한 개의 특수문자가 포함되어야 합니다.'
    ),
});

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [formData, setFormData] = useState<z.infer<typeof loginSchema>>({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<ZodError | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="flex flex-col gap-4 p-5">
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto bg-white rounded-xl shadow-lg">
        <Logo className="w-40 h-40 mt-6" />
        <p className="mt-6 text-2xl text-SLATE font-bold">
          로그인 하여 즐겨보세요
        </p>

        <div style={{ margin: '0 auto' }}>
          <Input
            placeholder="이름"
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            className="w-[350px]"
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500 flex justify-center">
            <span className="font-medium">
              {error?.flatten().fieldErrors['name']}
            </span>
          </p>
          <Input
            placeholder="이메일"
            id="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className="w-[350px]"
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500 flex justify-center">
            <span className="font-medium">
              {error?.flatten().fieldErrors['email']}
            </span>
          </p>
          <Input
            placeholder="비밀번호"
            id="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            className="w-[350px]"
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500 flex justify-center">
            <span className="font-medium">
              {error?.flatten().fieldErrors['password']}
            </span>
          </p>

          <Button
            block
            onClick={() => {
              try {
                const a = loginSchema.parse(formData);
                setError(null);
                onSubmit(a); // 폼 제출 함수 호출
              } catch (e) {
                if (e instanceof ZodError) {
                  setError(e);
                }
              }
            }}
            variant={'primary'}
            size="md"
          >
            로그인
          </Button>
          <LoginBanner />
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/useAuthStore';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  gender: z.enum(['male', 'female'], {
    required_error: 'Please select your gender',
  }),
  birthDate: z.string()
    .refine((date) => {
      const age = new Date().getFullYear() - new Date(date).getFullYear();
      return age >= 18;
    }, 'You must be at least 18 years old'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm: React.FC = () => {
  const { register: registerUser, loading, error } = useAuthStore();
  const [step, setStep] = useState(1);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    await registerUser(data);
  };

  const renderStep1 = () => (
    <>
      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label="Password"
        type="password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Button
        type="button"
        onClick={() => setStep(2)}
        className="w-full"
      >
        Continue
      </Button>
    </>
  );

  const renderStep2 = () => (
    <>
      <Input
        label="Full Name"
        error={errors.name?.message}
        {...register('name')}
      />
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Gender
        </label>
        <div className="mt-1 space-y-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="female"
              {...register('gender')}
              className="form-radio"
            />
            <span className="ml-2">Female</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              value="male"
              {...register('gender')}
              className="form-radio"
            />
            <span className="ml-2">Male</span>
          </label>
        </div>
        {errors.gender && (
          <p className="text-sm text-red-600">{errors.gender.message}</p>
        )}
      </div>
      <Input
        label="Birth Date"
        type="date"
        max={format(new Date(), 'yyyy-MM-dd')}
        error={errors.birthDate?.message}
        {...register('birthDate')}
      />
      <div className="flex space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep(1)}
          className="w-full"
        >
          Back
        </Button>
        <Button
          type="submit"
          loading={loading}
          className="w-full"
        >
          Create Account
        </Button>
      </div>
    </>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {step === 1 ? renderStep1() : renderStep2()}
    </form>
  );
};
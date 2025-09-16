import * as z from 'zod';
import Form from '@/ui/Form';
import { useHookForm } from '@/hooks/useHookForm';
import Input from '@/ui/Input';
import Button from '@/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '@/store/counterSlice';
import { RootState } from '@/store/store';
import { useState } from 'react';
import { registerUser } from '@/api/auth/registerUser';
import toast from 'react-hot-toast';


const schema = z.object({
  fullName: z.string({ required_error: 'Full name is required' }).min(1, 'Full name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string({ required_error: 'Email is required' }).email('Invalid email').min(1, 'Email is required'),
  password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required'),
  confirmPassword: z.string({ required_error: 'Confirm password is required' }).min(1, 'Confirm Password is required'),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Passwords do not match',
      path: ['confirmPassword']
    });
  }
});


type FormValues = z.infer<typeof schema>

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
    '& input': {
      backgroundColor: '#ffffff',
      boxShadow: '0px 0px 2px 0px rgb(0 0 0 / 0.1)',
      borderRadius: '4px',
      color: '#09090b',
    },
  },
}

const Register = () => {

  const navigate = useNavigate();
  const { methods } = useHookForm(schema);
  const { formState, control } = methods;
  const [loading, setLoading] = useState<boolean>(false);

  // react  redux toolkit example

  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();


  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setLoading(true);
      const res = await registerUser(values);
      if (res?.data) {
        toast.success('User registered successfully');
        navigate('/auth/login')
      }
    } catch (error) {
      console.log('Error in register', error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-semibold text-gray-800">Welcome back</h3>
      <p className="text-gray-500 text-sm font-medium mt-1">Please enter your details to sign up</p>
      <div className="w-full mt-5">
        <Form<FormValues>
          methods={methods}
          onSubmit={onSubmit}
        >
          <Input
            type='text'
            name='fullName'
            label='Full Name'
            control={control}
            sx={inputStyles as React.CSSProperties}
            error={formState.errors['fullName']}
          />
          <div className='mt-5'>
            <Input
              type='email'
              name='email'
              label='Email address'
              control={control}
              className='outline-none'
              sx={inputStyles as React.CSSProperties}
              error={formState.errors['email']}
            />
          </div>
          <div className='mt-5'>
            <Input
              type='password'
              name='password'
              label='Password'
              control={control}
              sx={inputStyles as React.CSSProperties}
              error={formState.errors['password']}
            />
          </div>
          <div className='mt-5'>
            <Input
              type='password'
              name='confirmPassword'
              label='Confirm Password'
              control={control}
              sx={inputStyles as React.CSSProperties}
              error={formState.errors['confirmPassword']}
            />
          </div>
          <div className="my-5">
            <Button
              type="submit"
              loading={loading}
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </Button>
          </div>
          <div className="my-5">
            <Button
              type="submit"
              onClick={() => dispatch(increment())}
            >
              Increment (+)
            </Button>
          </div>
          <div className="my-5">
            <Button
              type="submit"
              onClick={() => dispatch(decrement())}
            >
              Decrement (-)
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Register

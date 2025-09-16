import * as z from 'zod';
import Form from '@/ui/Form';
import { useHookForm } from '@/hooks/useHookForm';
import Input from '@/ui/Input';
import Button from '@/ui/Button';
import { getLogInUser } from '@/api/auth/getLogInUser';
import toast from 'react-hot-toast';
import { useAuth } from '@/provider/AuthProvider';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z.string({ required_error: 'Email is required' }).email('Invalid email').min(1, 'Email is required'),
  password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required')
})

export type LoginFormValues = z.infer<typeof schema>

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

const Login = () => {
  const navigate = useNavigate();
  const { methods } = useHookForm(schema);
  const { formState, control } = methods;
  const [isLoading, setLoading] = useState<boolean>(false);
  const { loginFn, logoutFn } = useAuth();

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setLoading(true)
      const res = await loginFn(values);
      if (res) {
        navigate('/');
        toast.success('Login successfully')
      }
    } catch (error) {
      console.log('Error in login form', error)
    } finally {
      setLoading(false)
    }
  }

  const testApi = async () => {
    await getLogInUser();
  }

  const logoutUser = async () => {
    await logoutFn();
    console.log('Logout successfully')
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-semibold text-gray-800">Welcome back</h3>
      <p className="text-gray-500 text-sm font-medium mt-1">Please enter your details to sign in</p>
      <div className="w-full mt-8">
        <Form<LoginFormValues>
          methods={methods}
          onSubmit={onSubmit}
        >
          <Input
            type='email'
            name='email'
            label='Email address'
            control={control}
            className='outline-none'
            sx={inputStyles as React.CSSProperties}
            error={formState.errors['email']}
          />
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
          <div className="my-5">
            <Button
              type="submit"
              loading={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
          <div className="my-5">
            <Button
              onClick={testApi}
            >
              Test
            </Button>
          </div>
          <div className="my-5">
            <Button
              onClick={logoutUser}
            >
              Logout
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login

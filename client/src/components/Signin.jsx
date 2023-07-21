import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const Signin = () => {
  const signInSchema = yup.object({
    email: yup
      .string()
      .email()
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .max(255, 'Password must not exceed 255 characters'),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(signInSchema)
  });
  const onSubmit = data => {
    console.log(data);
    reset();
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Signin Form</h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4 pb-2">
                    <div className="form-outline">
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        {...register('email')}
                      />
                      <label className="form-label" htmlFor="email">Email</label>
                      <div>{errors.email?.message}</div>
                    </div>
                  </div>
                  <div className="mb-4 pb-2">
                    <div className="form-outline">
                      <input
                        type="password"
                        id="password"
                        className="form-control form-control-lg"
                        {...register('password')}
                      />
                      <label className="form-label" htmlFor="password">Password</label>
                      <div>{errors.password?.message}</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-2">
                    <input className="btn btn-primary btn-lg" type="submit" value="Sign In" />
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signin
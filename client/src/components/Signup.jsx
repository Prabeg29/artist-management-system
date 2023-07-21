import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const Signup = () => {
  const signUpSchema = yup.object({
    first_name: yup
      .string()
      .required('First name is required')
      .max(255, 'First name must not exceed 255 characters'),
    last_name: yup
      .string()
      .required('Last name is required')
      .max(255, 'Last name must not exceed 255 characters'),
    email: yup
      .string()
      .email()
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .max(255, 'Password must not exceed 255 characters'),
    dob: yup
      .string()
      .required('Dob is required'),
    phone: yup
      .string()
      .required('Phone is required')
      .max(20, 'Phone must not exceed 20 characters'),
    address: yup
      .string()
      .required('Address is required')
      .max(255, 'Address must not exceed 20 characters'),
    role: yup
      .string()
      .required('Role is required')
      .oneOf(['artist_manager', 'artist']),
  });

  const { register, handleSubmit, reset,formState: { errors } } = useForm({
    resolver: yupResolver(signUpSchema)
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
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Signup Form</h3>

                <form onSubmit={handleSubmit(onSubmit)}>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="firstName"
                          className="form-control form-control-lg"
                          {...register('first_name')}
                        />
                        <label className="form-label" htmlFor="firstName">First Name</label>
                        <div>{errors.first_name?.message}</div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="lastName"
                          className="form-control form-control-lg"
                          {...register('last_name')}
                        />
                        <label className="form-label" htmlFor="lastName">Last Name</label>
                        <div>{errors.last_name?.message}</div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
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
                    <div className="col-md-6 mb-4 pb-2">
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
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <input
                          type="tel"
                          id="phone"
                          className="form-control form-control-lg"
                          {...register('phone', { required: 'Phone required', maxLength: 20 })}
                        />
                        <label className="form-label" htmlFor="phone">Phone</label>
                        <div>{errors.phone?.message}</div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline datepicker w-100">
                        <input
                          type="date"
                          id="dob"
                          className="form-control form-control-lg"
                          {...register('dob', { required: 'DOB required' })}
                        />
                        <label className="form-label" htmlFor="dob">DOB</label>
                        <div>{errors.dob?.message}</div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 d-flex align-items-center">
                      <div className="form-outline datepicker w-100">
                        <input
                          type="text"
                          id="address"
                          className="form-control form-control-lg"
                          {...register('address', { required: 'Address required', maxLength: 255 })}
                        />
                        <label className="form-label" htmlFor="password">Address</label>
                        <div>{errors.address?.message}</div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <h6 className="mb-2 pb-1">Gender: </h6>

                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input" 
                          type="radio" 
                          name="inlineRadioOptions" 
                          id="femaleGender"
                          value="female" 
                          checked
                          {...register('gender')} 
                        />
                        <label className="form-check-label" htmlFor="femaleGender">Female</label>
                      </div>

                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input" 
                          type="radio" 
                          name="inlineRadioOptions" 
                          id="maleGender"
                          value="male" 
                          {...register('gender')} 
                        />
                        <label className="form-check-label" htmlFor="maleGender">Male</label>
                      </div>

                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input" 
                          type="radio" 
                          name="inlineRadioOptions" 
                          id="otherGender"
                          value="other" 
                          {...register('gender')} 
                        />
                        <label className="form-check-label" htmlFor="otherGender">Other</label>
                      </div>

                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="role">Role</label>
                        <select className="select form-control-lg" {...register("role")}>
                          <option value="1" disabled>Choose Role</option>
                          <option value="artist_manager">Artist Manager</option>
                          <option value="artist">artist</option>
                        </select>
                        <div>{errors.role?.message}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-2">
                    <input className="btn btn-primary btn-lg" type="submit" value="Sign Up" />
                  </div>

                  <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to='/signin'
                    className="fw-bold text-body"><u>Sign In here</u></Link></p>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup
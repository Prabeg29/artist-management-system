import { object, string } from "yup";

export const RegistrationSchema = object({
  first_name: string().ensure().max(255, "Must not be greater than 255 characters").required("Is a required field"),
  last_name: string().ensure().max(255, "Must not be greater than 255 characters").required("Is a required field"),
  email: string()
    .ensure()
    .email("Must be a valid email")
    .max(255, "Must not be greater than 255 characters")
    .required("Is a required field"),
  password: string()
    .ensure()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$/,
      "Must have at least 1 uppercase, 1 lowercase, 1 digit, and 1 special character"
    )
    .required("Is a required field"),
  phone: string().ensure().max(20, "Must not be greater than 20 characters").required("Is a required field"),
  gender: string()
    .matches(/(male|female|other)/)
    .required("Is a required field"),
  address: string().ensure().max(255, "Must not be greater than 255 characters").required("Is a required field"),
  role: string()
    .matches(/(artist|artist_manager)/)
    .required("Is a required field"),
  dob: string().required("Is a required field"),
}).required();

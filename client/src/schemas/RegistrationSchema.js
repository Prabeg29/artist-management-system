import * as yup from "yup";

export const RegistrationSchema = yup
  .object({
    firstName: yup
      .string()
      .ensure()
      .max(255, "Must not be greater than 255 characters")
      .required("Is a required field"),
    lastName: yup.string().ensure().max(255, "Must not be greater than 255 characters").required("Is a required field"),
    email: yup
      .string()
      .ensure()
      .email("Must be a valid email")
      .max(255, "Must not be greater than 255 characters")
      .required("Is a required field"),
    password: yup
      .string()
      .ensure()
      .min(8, "Must not be less than 8 character")
      .max(255, "Must not be greater than 255 characters")
      .required("Is a required field"),
    phone: yup.string().ensure().max(20, "Must not be greater than 20 characters").required("Is a required field"),
    gender: yup
      .string()
      .ensure()
      .matches(/(male|female|other)/)
      .required("Is a required field"),
    address: yup.string().ensure().max(255, "Must not be greater than 255 characters").required("Is a required field"),
    role: yup
      .string()
      .ensure()
      .matches(/(artist|artist_manager)/)
      .required("Is a required field"),
  })
  .required();
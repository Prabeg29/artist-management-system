import { Controller } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";

const FormInputSelect = ({ name, control, label, options }) => {
    const menuItems = () => {
       return options.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))
    };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          autoFocus
          fullWidth
          label={label}
          select
          value={value}
          onChange={onChange}
          error={Boolean(error)}
          helperText={error?.message}
        >
          {menuItems()}
        </TextField>
      )}
    />
  );
};

export default FormInputSelect;

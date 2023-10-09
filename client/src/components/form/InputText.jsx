import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

const InputText = ({ name, control, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          autoFocus
          fullWidth
          label={label}
          type={name === 'password' ? name : ''}
          value={value}
          onChange={onChange}
          error={Boolean(error)}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default InputText;

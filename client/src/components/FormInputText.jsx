import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

const FormInputText = ({ name, control, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          label={label}
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : null}
        />
      )}
    />
  );
};

export default FormInputText;

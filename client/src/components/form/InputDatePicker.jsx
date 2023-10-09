import { Controller } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";

const InputDatePicker = ({ name, control, label, options }) => {
    const menuItems = () => {
       return options.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))
    };
  return (
        <Controller
            control={control}
            name="dob"
            defaultValue={null}
            render={({ field: {value, onChange}, fieldState: { error } }) => (
                <DatePicker 
                    label="Date of Birth"
                    disableFuture
                    value={value} 
                    onChange={onChange}
                    slotProps={{ 
                        textField: { 
                            error: !!error,
                                helperText: error?.message
                            }
                        }}
                    />
                )}
              />
    />
  );
};

export default InputDatePicker;

'use client';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import { forwardRef } from 'react';

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'hsl(240, 3.7%, 12%)',
    color: 'var(--color-foreground)',
    '& fieldset': { borderColor: 'var(--color-border)' },
    '&:hover fieldset': { borderColor: 'var(--color-primary)' },
    '&.Mui-focused fieldset': { borderColor: 'var(--color-primary)' },
  },
  '& .MuiInputLabel-root': { color: 'var(--color-muted-foreground)' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'var(--color-primary)' },
  '& .MuiFormHelperText-root': { color: 'hsl(0, 62.8%, 60%)' },
};

type FormFieldProps = TextFieldProps;

const FormField = forwardRef<HTMLDivElement, FormFieldProps>((props, ref) => {
  return (
    <TextField
      ref={ref}
      fullWidth
      variant="outlined"
      size="small"
      sx={{ ...fieldSx, ...(props.sx as object) }}
      {...props}
    />
  );
});

FormField.displayName = 'FormField';

export default FormField;

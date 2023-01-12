import React, { useState } from 'react';

export function useInput(initialValue: string) {
  const [value, setValue] = useState('');

  const onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (e) => {
    setValue(e.target.value);
  }

  return { value, onChange };
}

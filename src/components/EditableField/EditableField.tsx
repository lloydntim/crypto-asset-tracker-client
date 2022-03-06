import React, { FC, ReactElement, useState, useEffect, useRef } from 'react';

interface EditableFieldProps {
  defaultValue?: number | string,
  type: string;
}

const EditableField: FC<EditableFieldProps> = ({ defaultValue = '', type }): ReactElement<EditableFieldProps> => {
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditable) inputRef.current.focus();
  }, [isEditable]);

  return !isEditable ? (
    <div onClick={() => {
      setIsEditable(true);
    }}>
      {value}
    </div>
  ) : (
    <div>
      <input
        type={type}
        value={value}
        ref={inputRef}
        onChange={({ target: { value } }) => {
          setValue(value);
        }}
        onBlur={() => {
          setIsEditable(false);
        }}
      />
    </div>
  );
};

export default EditableField;

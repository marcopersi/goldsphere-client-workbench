import React from 'react';
import { FormControl, Select, MenuItem, Checkbox, ListItemText } from '@mui/material';
import PropTypes from "prop-types";

const MultiSelectDropDown = ({ options, selected, onChange }) => {
  const handleSelectChange = (event) => {
    const value = event.target.value;
    onChange(value);
  };

  return (
    <FormControl variant="outlined" fullWidth style={{ width: '150px', marginBottom: '20px' }}>
      <Select
        multiple
        value={selected}
        onChange={handleSelectChange}
        renderValue={(selected) => selected.join(', ')}
        style={{ background: 'linear-gradient(to bottom, silver, black)', color: 'white', border: '1px solid silver' }}
        MenuProps={{
          PaperProps: {
            style: {
              backgroundColor: 'silver',
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.name} value={option.name}>
            <Checkbox checked={selected.indexOf(option.name) > -1} style={{ color: 'white' }} />
            <ListItemText primary={option.name} style={{ color: 'white' }} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

MultiSelectDropDown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.func.isRequired,
};


export default MultiSelectDropDown;
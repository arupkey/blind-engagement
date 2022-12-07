import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { setDayOfYear } from 'date-fns';

interface DictionaryValue {
    name: string;
    selected: boolean;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names2 = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MultipleSelectChip2(props) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [dictionary, setDictionary] = React.useState(props.dictionary);

  //to do personName should be initialized to be all selected from dictionary at start so can load form with some shit already picked

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        
    const {
      target: { value },
    } = event;

    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

    if(typeof value === 'string'){
        setDictionary((state) => ({...state, [value]: {...dictionary[value], selected: true}}))
    }else{
        value.map((val) => {
            setDictionary((state) => ({...state, [val]: {...dictionary[val], selected: true}}))
        });
    }

    props.dictChange(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-chip-label">{props.label}</InputLabel>
        <Select
          labelId="multiple-chip-label"
          id="multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={props.label} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {Object.keys(props.dictionary).map((key) => (
            <MenuItem
              key={key}
              value={key}
              style={getStyles(key, personName, theme)}
            >
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default MultipleSelectChip2;
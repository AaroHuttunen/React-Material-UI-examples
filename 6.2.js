import React from 'react';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

function App() {

    //Setting locales.
    const [localeEn] = React.useState("en");
	const [localeFin] = React.useState("fi");
	const [locale, setLocale] = React.useState("fi");
	
	//Formating date.
    const dateformat = new Intl.DateTimeFormat(locale, {year: "numeric", month: "long", weekday: "long", day: "numeric"});
	
	//Setting numbers.
	const [input, setInput] = React.useState("");
	const [output, setOutput] = React.useState("");
	const [myValue, setMyValue] = React.useState(' ')
	
	//Setting radio buttons.
	const [value, setValue] = React.useState('€ = £');

	const handleChange = event => {
		setInput(myValue)
		setValue(event.target.value);
		if (value == "Euro") {
			setLocale(localeEn);
			setOutput(input * 1.14)
		} else {
			setLocale(localeFin);
			setOutput(input * 0.88)
		}
	  };



    return (
        <Box>
            <Box border={1} padding={2} style={{zIndex: 1, position: "fixed", left: 50, top: 50}}>
				Exhange rate at
				<Box>
				{dateformat.format(new Date())}
				</Box>
				<Box>
					<Box border={1} width="50%">
						<TextField id="input" value={myValue}  type="numbers" variant="outlined" defaultValue="1" onChange={(e) => setMyValue(e.target.value)}/>
						equals
						<TextField id="output" disabled={true} value={output} variant="outlined"/>
				    </Box>
				</Box>
				<Box border={1} padding={2}>
					<FormControl component="fieldset">
					<FormLabel component="legend">Direction</FormLabel>
					<RadioGroup aria-label="currency" name="ExhangeRate" value={value} onChange={handleChange}>
					<FormControlLabel value="Euro" control={<Radio />} label="€ = £" />
					<FormControlLabel value="Pound" control={<Radio />} label="£ = €" />
					</RadioGroup>
					</FormControl>
				</Box>
            </Box>
        </Box>
    )
}

export default App;
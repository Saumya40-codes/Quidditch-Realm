import { FormGroup, FormControl } from "@mui/material";
import { TextField } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import { useState, useEffect } from "react";
import { Input } from "@mui/material";

const AboutRegister = ({ handleFormChange, formchanged }) => {
    const [deadline, setDeadline] = useState(formchanged.deadline);
    const [rules, setRules] = useState(formchanged.rules);

    return (
        <div>
            <Card style={{ marginTop: "40px" }}>
                <CardContent>
                    <h2 className="text-center mb-4">About Register</h2>
                    <FormGroup>
                        <FormControl>
                            <TextField id="date" type="date" variant="filled" onChange={(e) => handleFormChange('deadline', e.target.value)} value={deadline} required/>
                        </FormControl>
                        <FormControl>
                            <TextField id="outlined-search" label="Rules and regulation(if any)" type="search" style={{ marginTop: "40px" }} onChange={(e) => handleFormChange('rules', e.target.value)} value={rules} />
                        </FormControl>
                    </FormGroup>
                </CardContent>
            </Card>
        </div>
    );
}

export default AboutRegister;

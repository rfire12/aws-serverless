import React, { useEffect, useState } from "react";

import "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { v4 as uuidv4 } from "uuid";
import AlertDialog from "../Dialog/Dialog";

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";

const ReservationForm = () => {
  const [reservation, setReservation] = useState({lab: "networks"});
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (e, date = null, fieldName = null) => {
    const field = fieldName ? fieldName : e.target.name; // This condition exists because Datapickers don't send their event object
    const value = date ? date : e.target.value;
    const newReservation = {
      ...reservation,
      [field]: value,
    };
    setReservation(newReservation);
  };

  const createReservation = () => {
    setOpenDialog(true);
    const url = process.env.AWS_ENDPOINT;
    const params = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ reservationId: uuidv4(), ...reservation }),
    };

    fetch(url, params)
      .then((response) => response.json())
      .then((data) => {
        setOpenDialog(false);
        setTimeout(() => alert("Success!!!"), 0);
      })
      .catch((e) => {
        setOpenDialog(false);
        console.log(e);
        alert("Error!!!");
      });
  };

  return (
    <div>
      <TextField
        label="ID"
        style={{ margin: 8 }}
        placeholder="ID"
        fullWidth
        name="id"
        margin="normal"
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      <TextField
        label="Name"
        style={{ margin: 8 }}
        placeholder="Juan Cabrera"
        fullWidth
        margin="normal"
        name="name"
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      <TextField
        label="Field"
        style={{ margin: 8 }}
        placeholder="ISC or ITT"
        fullWidth
        margin="normal"
        name="field"
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      <FormControl className="lab-field">
        <InputLabel htmlFor="age-native-simple">Lab</InputLabel>
        <Select native onChange={handleChange} name="lab">
          <option value={"Networks"}>Networks</option>
          <option value={"Physics"}>Physics</option>
          <option value={"Chemistry"}>Chemistry</option>
        </Select>
      </FormControl>
      <br />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          className="date-field"
          margin="normal"
          id="date-picker-dialog"
          label="Date"
          format="MM-dd-yyyy"
          name="date"
          value={reservation["date"]}
          onChange={(e, date) => handleChange(e, date, "date")}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      <TextField
        label="From (hour)"
        style={{ margin: 8 }}
        placeholder="14:00"
        fullWidth
        margin="normal"
        name="time-start"
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      <TextField
        label="Until (hour)"
        style={{ margin: 8 }}
        placeholder="15:00"
        fullWidth
        margin="normal"
        name="time-end"
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      <br />
      <br />
      <Button variant="contained" color="primary" className="create-form-button" onClick={createReservation}>
        Create
      </Button>

      {openDialog && <AlertDialog />}
    </div>
  );
};

export default ReservationForm;

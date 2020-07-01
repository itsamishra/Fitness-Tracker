import React, { Component } from "react";

export class WeightTrackerInsert extends Component {
  // Submits weight to database
  submitWeight = () => {
    // Sets proper weight depending on if unit is lb or kg
    let unitList = document.getElementsByName("weight-unit");
    let weightLb = null;
    let weightKg = null;

    let date = document.getElementById("date-input").value;

    // Checks to see if lb is checked
    if (unitList[0].checked === true) {
      weightLb = document.getElementById("weight-input").value;
      weightKg = weightLb * 0.453592;
    }
    // Else assumes kg is checked
    else {
      weightKg = document.getElementById("weight-input").value;
      weightLb = weightKg * 2.20462;
    }

    console.log(weightLb);
    console.log(weightKg);
    console.log(date);

    this.props
      .addNewWeighIn(weightLb, weightKg)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h2 style={inputLabelStyle}>Insert Weight</h2>

        <h3 style={inputLabelStyle}>Weight</h3>
        <div style={inputDivStyle}>
          <input id="weight-input" style={inputStyle} type="number" />
        </div>
        <br />

        <h3 style={inputLabelStyle}>Unit</h3>
        <div style={inputDivStyle}>
          <input
            type="radio"
            id="lb"
            name="weight-unit"
            value="lb"
            checked
          ></input>
          <label for="lb">lb</label>
        </div>
        <div style={inputDivStyle}>
          <input type="radio" id="kg" name="weight-unit" value="kg"></input>
          <label for="kg">kg</label>
        </div>
        <br />

        <h3 style={inputLabelStyle}>Date</h3>
        <div style={inputDivStyle}>
          <input
            id="date-input"
            style={inputStyle}
            type="date"
            defaultValue={this.props.getDateXDaysBeforeToday(0)} // Adds today as default value
          />
        </div>
        <br />
        <br />
        <button style={buttonStyle} onClick={this.submitWeight}>
          Submit
        </button>
      </div>
    );
  }
}

const inputDivStyle = {
  textAlign: "center",
};

const inputLabelStyle = {
  textAlign: "center",
  color: "#2F2FA2",
};

const inputStyle = {
  width: "25%",
  borderRadius: "25px",
  border: "5px solid #2F2FA2",
};

const buttonStyle = {
  color: "black",
  backgroundColor: "#59aed9",
  fontSize: "25px",
  border: "5px solid #2F2FA2",
  padding: "15px 25px",
  borderRadius: "25px",
  fontWeight: "bold",
  display: "block",
  margin: "auto",
};

export default WeightTrackerInsert;

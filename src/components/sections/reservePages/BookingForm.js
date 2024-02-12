import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ReservationForm(props) {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    tel: "",
    people: 1,
    date: "",
    occasion: "",
    preferences: "",
    comments: "",
  });

  const [finalTime, setFinalTime] = useState(
    props.availableTimes.map(times => <option>{times}</option>)
  );

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = ({ target }) => {
    const { value } = target;
    setFormData(prevState => ({ ...prevState, date: value }));
    props.updateTimes(new Date(value));
    setFinalTime(props.availableTimes.map(times => <option>{times}</option>));
  };

  const requiredFields = ["fName", "lName", "email", "tel", "date"]; // Define required fields here

  const handleSubmit = e => {
    e.preventDefault();
    // Check if all required fields are filled out
    const isFormValid = requiredFields.every(
      field => formData[field].trim() !== ""
    );

    if (!isFormValid) {
      alert("Please fill out all required fields");
      return;
    }
  };

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fName">First Name</label> <br></br>
        <input
          type="text"
          id="fName"
          name="fName"
          placeholder="First Name"
          required
          minLength={2}
          maxLength={50}
          value={formData.fName}
          onChange={handleChange}
        ></input>
      </div>

      <div>
        <label htmlFor="lName">Last Name</label> <br />
        <input
          type="text"
          id="lName"
          name="lName"
          placeholder="Last Name"
          required
          minLength={2}
          maxLength={50}
          value={formData.lName}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="email">Email</label> <br />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          minLength={4}
          maxLength={200}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="phonenum">Phone Number</label> <br />
        <input
          type="tel"
          id="phonenum"
          name="tel"
          placeholder="(xxx)-xxx-xxxx"
          required
          value={formData.tel}
          minLength={10}
          maxLength={25}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="people">Number of People</label> <br />
        <input
          type="number"
          id="people"
          name="people"
          placeholder="Number of People"
          value={formData.people}
          required
          min={1}
          max={100}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="date">Select Date</label> <br />
        <input
          type="date"
          id="date"
          name="date"
          required
          value={formData.date}
          onChange={handleDateChange}
        />
      </div>

      <div>
        <label htmlFor="time">Select Time</label> <br />
        <select id="time" name="time" required>
          {finalTime}
        </select>
      </div>

      <div>
        <label htmlFor="occasion">Occasion</label> <br />
        <select
          id="occasion"
          name="occasion"
          value={formData.occasion}
          onChange={handleChange}
        >
          <option>None</option>
          <option>Birthday</option>
          <option>Anniversary</option>
          <option>Engagement</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="preferences">Seating preferences</label> <br />
        <select
          id="preferences"
          name="preferences"
          value={formData.preferences}
          onChange={handleChange}
        >
          <option>None</option>
          <option>Indoors</option>
          <option>Outdoor (Patio)</option>
          <option>Outdoor (Sidewalk)</option>
        </select>
      </div>

      <div>
        <label htmlFor="comments">Additional Comments</label> <br />
        <textarea
          id="comments"
          name="comments"
          rows={8}
          cols={50}
          placeholder="Additional Comments"
          value={formData.comments}
          onChange={handleChange}
        />
      </div>

      <div>
        <br />
        <small>
          <p>
            Note: You cannot edit your reservation after submission. Please
            double-check your answer before submitting your reservation request.
          </p>
        </small>
        {requiredFields.every(field => formData[field].trim() !== "") && (
          <Link className="action-button" to="/confirmation">
            Book Table
          </Link>
        )}
      </div>
    </form>
  );
}

import React, { useState } from "react";
import "./App.css"

const AdmissionForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [batch, setBatch] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validations

    if (age < 18 || age > 65) {
      alert("Age should be between 18 and 65");
      return;
    }
    if (!batch) {
      alert("Please select a batch");
      return;
    }

    // Prepare data for API call

    const data = {
      name,
      age,
      batch,
      paymentDetails,
    };

    // Make API call and handle response

    fetch("/api/enroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Enrollment successful");
          window.location.reload();
        } else {
          alert("Enrollment failed");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error occurred during enrollment");
      });
  };

  return (
    
    <form onSubmit={handleSubmit} className="dis">
        
      <label className="dis">
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className="dis">
        Age:
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </label>
      <label className="dis">
        Batch:
        <select value={batch} onChange={(e) => setBatch(e.target.value)}>
          <option value="">Select</option>
          <option value="6-7AM">6-7AM</option>
          <option value="7-8AM">7-8AM</option>
          <option value="8-9AM">8-9AM</option>
          <option value="5-6PM">5-6PM</option>
        </select>
      </label>
      <label className="dis">
        Payment Details:
        <input
          type="text"
          value={paymentDetails}
          onChange={(e) => setPaymentDetails(e.target.value)}
        />
      </label>
      <input type="submit" value="Enroll" />
    </form>
  );
};

export default AdmissionForm;
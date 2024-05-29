import './createPatient.css';
import React from 'react';
import { v5 as uuidv5 } from 'uuid';
// uuidv4();

export default function createPatient() {
  return (
    <>
    <main>
    <div class="crt-ptnt">
        <span class="form-heading">Create New Patient</span>
        <div class="inp">
        <input type="text" name="fname" class="fname inpf t" placeholder="First Name" required />
        <input type="text" name="lname" class="lname inpf t" placeholder="Last Name" required />
        <input type="text" name="uname" class="uname inpf t" placeholder="Unique Id" required />
        <div class="dob inpf">
            <label for="dob" class="d">Date of Birth: </label>
            <input type="date" class="dob t d" name="dob" />
        </div>
        <div class="gender inpf">
            <label for="Gender">Gender: </label>
            <input type="radio" name="Gender" class="male Gender" value="male" />Male
            <input type="radio" name="Gender" class="female Gender" value="female" />Female
        </div>
        <button class="sb t" onclick="alert('Patient Successfully Created')">Create</button>
        </div>
    </div>
</main>
</>
  );
}

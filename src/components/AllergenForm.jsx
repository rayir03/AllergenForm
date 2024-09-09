import { useState } from 'react';
import emailjs from 'emailjs-com';
import './AllergenForm.css';

function AllergenForm() {
  const [formData, setFormData] = useState({
    allergenDefinition: '',
    top8Allergens: '',
    allergensInFacility: '',
    allergyEffects: '',
    minimizeAllergens: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Aquí configuramos los parámetros para EmailJS
    emailjs
      .send(
        'YOUR_SERVICE_ID', // Service ID
        'YOUR_TEMPLATE_ID', // Template ID
        {
          allergenDefinition: formData.allergenDefinition,
          top8Allergens: formData.top8Allergens,
          allergensInFacility: formData.allergensInFacility,
          allergyEffects: formData.allergyEffects,
          minimizeAllergens: formData.minimizeAllergens,
        },
        'YOUR_USER_ID' // User ID
      )
      .then(
        (result) => {
          console.log('Email sent successfully!', result.text);
          alert('Email sent successfully!');
        },
        (error) => {
          console.log('Error sending email:', error.text);
          alert('Failed to send email. Please try again.');
        }
      );
  };

  return (
    <form onSubmit={sendEmail}>
      <h2>Allergen Questionnaire</h2>

      <label>
        1. What is an allergen?
        <textarea
          name="allergenDefinition"
          value={formData.allergenDefinition}
          onChange={handleChange}
          placeholder="Provide your definition of an allergen."
          rows="4"
        />
      </label>

      <label>
        2. What are the top 8 food allergens?
        <textarea
          name="top8Allergens"
          value={formData.top8Allergens}
          onChange={handleChange}
          placeholder="List the top 8 food allergens."
          rows="4"
        />
      </label>

      <label>
        3. How many of these allergens do we carry within our facility?
        <input
          type="number"
          name="allergensInFacility"
          value={formData.allergensInFacility}
          onChange={handleChange}
          placeholder="Number of allergens in the facility"
        />
      </label>

      <label>
        4. What are the effects of food allergies?
        <textarea
          name="allergyEffects"
          value={formData.allergyEffects}
          onChange={handleChange}
          placeholder="Describe the effects of food allergies."
          rows="4"
        />
      </label>

      <label>
        5. What can we do at Ymi to minimize the effects of food allergens?
        <textarea
          name="minimizeAllergens"
          value={formData.minimizeAllergens}
          onChange={handleChange}
          placeholder="Provide suggestions to minimize allergen risks."
          rows="4"
        />
      </label>

      <button type="submit">Send Email</button>
    </form>
  );
}

export default AllergenForm;

import { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import {useReactToPrint} from 'react-to-print';
import './AllergenForm.css';

function AllergenForm() {
  const [formData, setFormData] = useState({
    name: '',
    allergenDefinition: '',
    top8Allergens: '',
    allergensInFacility: '',
    allergyEffects: '',
    minimizeAllergens: '',
    cleaningMethods: '',
    handwashing: '',
    crossContamination: '',
    trueFalseSpace: '',
    trueFalseSegregation: '',


  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
    <form onSubmit={sendEmail} ref={componentRef}>
      <h2>Allergen Questionnaire</h2>
      <label>
        Name:
        <input 
            name='name'
            type='text'
            value={formData.name}
            onChange={handleChange}
            placeholder='Provide your Name please'
        />
      </label>

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
        5. What can we do at Yumi to minimize the effects of food allergens?
        <textarea
          name="minimizeAllergens"
          value={formData.minimizeAllergens}
          onChange={handleChange}
          placeholder="Provide suggestions to minimize allergen risks."
          rows="4"
        />
      </label>

      <label>
        6. What 2 cleaning methods do we use for Allergen Control?
        <textarea
          name="cleaningMethods"
          value={formData.cleaningMethods}
          onChange={handleChange}
          placeholder="Provide suggestions to minimize allergen risks."
          rows="4"
        />
      </label>

      <label>
        7. Why is handwashing important ?
        <textarea
          name="handwashing"
          value={formData.handwashing}
          onChange={handleChange}
          placeholder="Provide suggestions."
          rows="4"
        />
      </label>

      <label>
        8. What is Cross Contamination ?
        <textarea
          name="crossContamination"
          value={formData.crossContamination}
          onChange={handleChange}
          placeholder="Provide suggestions."
          rows="4"
        />
      </label>
      <label>
        9. We have 3 case of Bagged Shrimp left in the freezer, it is Ok to stack these cases on a pallet of Ice Cream to save freezer space?
      </label>
      <label>
        <input
          type="radio"
          name="trueFalseSpace"
          value={formData.trueFalseSpace}
          onChange={handleChange}
        />
        True
      </label>
      <label>
        <input
          type="radio"
          name="trueFalseSpace"
          value={formData.trueFalseSpace}
          onChange={handleChange}
        />
        False
      </label>
      

      <label>
        10. All products within the freezer should be Kept segregated in order to prevent cross contamination.
      </label>
      <label>
        
        <label>
        <input
          type="radio"
          name="trueFalseSegregation"
          value={formData.trueFalseSegregation}
          onChange={handleChange}
        />
        True
      </label>
      <label>
        <input
          type="radio"
          name="trueFalseSegregation"
          value={formData.trueFalseSegregation}
          onChange={handleChange}
        />
        False
      </label>
      </label>
   

      <button type="submit">Send Email</button>
      

      <button type="button" onClick={handlePrint}>Print</button>
    </form>
  );
}

export default AllergenForm;

import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import * as spotActions from "../../store/spots"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import './SpotForm.css'

function SpotFormModal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    
    // Hooks for creating a spot:
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    // const [lat, setLat] = useState("");
    // const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [errors, setErrors] = useState([]);
    const [previewImgUrl, setPreviewImgUrl] = useState(""); 
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation Checking:
        const newErrors = []; 

        if (name.length < 2) {
          newErrors.push("Name is too short, should be at least 2 characters.")
        }
        if (description.length < 2) {
          newErrors.push("Description is too short, should be at least 2 characters.")
        }
        if (address.length < 2) {
          newErrors.push("Address is too short, should be at least 2 characters.")
        }
        if (city.length < 2) {
          newErrors.push("City is too short, should be at least 2 characters.")
        }
        if (state.length < 2) {
          newErrors.push("State is too short, should be at least 2 characters.")
        }
        if (country.length < 2) {
          newErrors.push("Country is too short, should be at least 2 characters.")
        }
        if (+price === 0) {
          newErrors.push("Free housing?")
        }
        setErrors(newErrors);
        if (newErrors.length === 0) {
          const newSpot = await dispatch(spotActions.addSpot({
            name, 
            description,
            address, 
            city, 
            state, 
            country, 
            lat: 100, 
            lng: 100,
            price 
          }, previewImgUrl));
          closeModal();
  
          history.push(`/spots/${newSpot.id}`);
        }
    }

    return (
        <div className="create-spot-form-wrapper">
        <div className="create-form-header">
          <button className="close-out-button" onClick={closeModal}>
              <i className="fa-solid fa-x"></i>
            </button>
            <p>Create a Spot</p>
        </div>
        <form onSubmit={handleSubmit} className="create-spot-form">
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                <input
                  className="form-field"
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  required
                  placeholder="Address"
                />
            </label>
            <label>
                <input
                  className="form-field"
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  required
                  placeholder="City"
                />
            </label>
            <label>
                <input
                  className="form-field"
                  type="text"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  required
                  placeholder="State"
                />
            </label>
            <label>
                <input
                  className="form-field"
                  type="text"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  required
                  placeholder="Country"
                />
            </label>
            <label>
                <input
                  className="form-field"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="Name"
                />
            </label>
            <label>
                <input
                  className="form-field"
                  type="text"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                  placeholder="Description"
                />
            </label>
            <label>
                <input
                  className="form-field"
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  required
                  placeholder="Price per night"
                />
            </label>
            <label>
                <input
                 className="form-field"
                 type="url"
                 value={previewImgUrl}
                 onChange={e => setPreviewImgUrl(e.target.value)}
                 required
                 placeholder="Image URL"
                 />
            </label>
            <button type="submit" className="spot-submit-button">Create</button>
        </form>
        </div>
    )
}

export default SpotFormModal;
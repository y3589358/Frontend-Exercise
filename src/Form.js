import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import PopUp from "./components/PopUp"
import SubmitPopUp from "./components/SubmitPopUp";

const Form = () => {
    const [isPopUp, setIsPopUp] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [response, setResponse] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [occupation, setOccupation] = useState("");
    const [state, setState] = useState("");

    
    useEffect(() => {
        fetch("https://frontend-take-home.fetchrewards.com/form")
        .then((res) => res.json())
        .then((data) => {
            setResponse(data);
        })
        .catch((err) => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        setIsPending(true);
        const formSubmission = {name, email, password, occupation, state}
        fetch("https://frontend-take-home.fetchrewards.com/form", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formSubmission)
        }).then((res) => {
            console.log(res)
            setIsPopUp(false);
            resetFields();
            setIsPending(false);
            setIsSubmitted(true);
        }).catch((err) => console.log(err));
    }

    const resetFields = (e) => {
        setName("");
        setEmail("");
        setPassword("");
        setOccupation("");
        setState("");
    }

    const checkInputFields = (e) => {
        let confirm = false;
        if(name !== "" && email !== "" && password !== "" && occupation !== "" && state !== ""){
            confirm = true;
        }

        if(confirm){
            handleSubmit();
        }else{
            setIsSubmitted(false);
            setIsPopUp(true);
        }
    }


    return (
        <div className = "main">
            <h1>Creation Form</h1>
            <div className="form">
                <form>
                    <label className="formLabel">Name</label>
                    <input
                        className="inputBox"
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value = {name}
                        onChange = {(e) => setName(e.target.value)}
                    />

                    <label className="formLabel">Email</label>
                    <input
                        className="inputBox"
                        type="text"
                        required
                        placeholder="Your Email"
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                    />

                    <label className="formLabel">Password</label>
                    <input
                        className="inputBox"
                        type="text"
                        required
                        value = {password}
                        placeholder="Your Password"
                        onChange = {(e) => setPassword(e.target.value)}
                    />

                    <label className="formLabel">Occupation</label>
                    <select 
                    className="inputBox"
                    value = {occupation}
                    placeholder = "Select One"
                    onChange = {(e) => setOccupation(e.target.value)}
                    >
                        <option value = {"none"} defaultValue hidden>Select Occupation</option>
                        {response && response.occupations.map((currOccupation, i) => (
                            <option key={i}  value={currOccupation}>{currOccupation}</option>
                        ))}
                    </select>

                    <label className="formLabel">State</label>
                    <select
                    className="inputBox"
                    value = {state}
                    placeholder = {state}
                    onChange = {(e) => setState(e.target.value)}>
                        <option value={"none"} defaultValue hidden>Select State</option>
                        { response && response.states.map((currState) => (
                            <option key={currState.abbreviation} value={currState.abbreviation}>{currState.name}</option>
                        ))}
                    </select>
                </form>
                
                {!isPending && <Button className="btn btn-primary" style={{margin: '15px'}} onClick={checkInputFields}>Submit</Button>}
                {isPending && <Button className="btn btn-primary" style={{margin: '15px'}} disabled>Sending Form...</Button>}
                {isPopUp && <PopUp/>}
                {isSubmitted && <SubmitPopUp/>}
            </div>
        </div>
    );
}

export default Form;
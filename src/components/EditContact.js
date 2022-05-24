import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const EditContact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");

    const { id } = useParams();
    const navigate = useNavigate


    const contacts = useSelector(state => state);
    const dispatch = useDispatch();
    const currentContact = contacts.find(contact => contact.id === parseInt(id));

  useEffect(() => {
      if(currentContact) {
          setName(currentContact.name);
          setEmail(currentContact.email)
          setNumber(currentContact.number)
      }
  }, [currentContact]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkEmail = contacts.find(
        (contact) => contact.id === parseInt(id) && contact.email === email);

        const checkNumber = contacts.find(
            (contact) => contact.id === parseInt(id) && contact.number === parseInt(number));

    if(!name || !email || !number) {
        return toast.warning("Please fill in all fields !")
    }

    if(checkEmail) {
        return toast.error("This email already exists !")
    }

    if(checkNumber) {
        return toast.error("This number already exists !")
    }

    const data = {
        id: parseInt(id),
        name,
        email,
        number,
    }
    dispatch({type: "UPDATE_CONTACT", payload:data});
    toast.success("Student updated succesfully");
    navigate("/");
};
  

    return (
        <div className='container'>
            {currentContact ? (
                <>
                    <div className='row'>
                        <h1 className="display-3 my-5 text-center">
                            Edit Student {id}
                        </h1>
                    </div>
                    <div className='col-md-6 shadow mx-auto p-5'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group mb-3'>
                                <input type="name" placeholder='Name' className='form-control'
                                value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className='form-group mb-3'>
                                <input type="email" placeholder='Email' className='form-control' 
                                value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className='form-group mb-3'>
                                <input type="number" placeholder='Phone Number' className='form-control' 
                                value={number} onChange={e => setNumber(e.target.value)} />
                            </div>
                            <div className='form-group mb-3'>
                                <input type="submit" value='Update Student' className='btn btn-dark' />
                                <Link to="/" className="btn btn-danger ms-3">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </>
            )
                : (
                    <h1 className='display-3 my-5 text-center'>
                        Student with id {id} does not exists
                    </h1>
                )};
        </div>
    )
};

export default EditContact
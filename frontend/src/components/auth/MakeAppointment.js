import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import axios from 'axios';


const MakeAppointment = () => {

    const [formData, setFormData] = useState({
        date: '',
        time: '',
        name: '',
        email: '',
        serviceProvider: ''
    });

    const [dat, setData] = useState({
        names: ''
    });


    const { date, time, name, email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
    }
    let providers;

    const getData = async (e) => {

        const resApi = await axios.get('/serviceproviders');
        console.log(resApi);
        providers = resApi.data.map(provider => {
            return provider.name;
        });
        setData({ ...dat, names: providers });
    };

    const renderProviders = () => {
        let copy = [...dat.names];
        //console.log(copy);
        return copy.map((name, i) => {
            return <option key={i}>{name}{' '}</option>
        })
    };

    return (
        <Fragment>
            <h1 className="large text-primary">Make Appointment</h1>
            <p className="lead"><i className="fas fa-pen"></i> Make Your Appointment</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="date" placeholder="Date" name="date" value={date} onChange={e => onChange(e)} required />
                </div>

                <div className="form-group">
                    <input type="time" placeholder="Time" name="time" value={time} onChange={e => onChange(e)} required />
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />

                </div>

                <div className="form-group">
                    <select className="dropdown"
                        onClick={() => {
                            getData()
                        }
                        }>
                        <option>ServiceProviders</option>
                        {renderProviders()}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Book" />
            </form>

        </Fragment>
    )
};

MakeAppointment.propTypes = {
    setAlert: PropTypes.func.isRequired,

};


export default connect(null, { setAlert })(MakeAppointment);

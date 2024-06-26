import React from 'react';

const Contact = () => {
    //boiler plate contact form code. Also no functionality added to the form on purpose -dh
    return (
        <div className='m-5'>
            <h1 className="text-3xl text-center">Contact Us</h1>
            <div className="flex justify-center" style={{flexDirection:"column"}}>
            <form>
                <div className="mb-4">
                    <label htmlFor="name" className="block">Name</label>
                    <input type="text" className="input input-bordered w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block">Email</label>
                    <input type="text" className="input input-bordered w-full " />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block">Message</label>
                    <textarea className="textarea textarea-bordered textarea-md w-full" ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full">Submit</button>
            </form>
            </div>
        </div>
    );
}

export default Contact;

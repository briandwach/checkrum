import React from 'react';

const Contact = () => {
    return (
        <div className='m-5'>
            <h1 className="text-3xl text-white text-center">Contact Us</h1>
            <div className="flex justify-center" style={{flexDirection:"column"}}>
            <form>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-white">Name</label>
                    <input type="text" className="input input-bordered w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input type="text" className="input input-bordered w-full " />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-700">Message</label>
                    <textarea className="textarea textarea-bordered textarea-md w-full" ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full">Submit</button>
            </form>
            </div>
        </div>
    );
}

export default Contact;

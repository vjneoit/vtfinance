"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react'
import { useRouter } from "next/navigation";
import Input from "@/app/user/components/Input"
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';



const defaultData = {
    // Applicant
    userid: "",
    applicant_name: "",
    applicant_mobile: "",
    vehicle_name: "",
    applicant_aadharcard_number: "",
    applicant_aadharcard: "",
    applicant_pancard_number: "",
    applicant_pancard: "",
    applicant_dl_number: "",
    applicant_dl: "",
    applicant_udhyamcard_number: "",
    applicant_udhyamcard: "",
    applicant_photo: "",


    // Co-Applicant
    coapplicant_aadharcard_number: "",
    coapplicant_aadharcard: "",
    coapplicant_pancard_number: "",
    coapplicant_pancard: "",
    coapplicant_voterid_number: "",
    coapplicant_voterid: "",
    coapplicant_photo: "",

    // Guarantor
    guarantor_aadharcard_number: "",
    guarantor_aadharcard: "",
    guarantor_pancard_number: "",
    guarantor_pancard: "",
    guarantor_voterid_number: "",
    guarantor_voterid: "",
    guarantor_rc_number: "",
    guarantor_rc: "",
    guarantor_photo: "",


    // Vehicle
    vehicle_rc_number: "",
    vehicle_rc: "",
    vehicle_insurance_number: "",
    vehicle_insurance: "",
    vehicle_tax: "",
    vehicle_permit: "",
    saler_aadharcardnumber: "",
    saler_aadharcard: "",
    sale_agreement: "",



    // Other
    electricity_bill: "",
    agreement: "",
    banking: ""

};

export default function Loanform() {


    const { data: session } = useSession();
    // const [user, setUser] = useState('');
    const [data, setData] = useState(defaultData);
    // const [uploadedFiles, setUploadedFiles] = useState({});
    const [loading, setLoading] = useState(true); // Loading state

    const emailid = session?.user?.email;
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            if (emailid) { // Check if emailid is available
                try {
                    const response = await axios.get(`/api/user/find-user-byemail/${emailid}`);

                    setData((prevData) => ({ ...prevData, userid: response.data._id }));
                } catch (error) {
                    console.error('Error fetching user:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUser();
    }, [emailid]);

    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const fieldName = e.target.name;
        setData({ ...data, [fieldName]: e.target.files[0] });
    };

    const handleUpload = async (fileType) => {
        const formData = new FormData();
        formData.append('file', data[fileType]);

        try {
            const response = await axios.post('/api/user/upload', formData);
            return response.data.file.url; // Return the uploaded file URL
        } catch (error) {
            console.error('Error uploading file: ', error);
            return null;
        }
    };

    const onRegister = async (e) => {
        e.preventDefault();

        setLoading(true); // Set loading to true when registering

        const requiredFields = [

            'applicant_name',
            'applicant_mobile',
            'vehicle_name',
            'applicant_aadharcard_number',
            'applicant_aadharcard',
            'applicant_pancard_number',
            'applicant_pancard',
            'applicant_dl_number',
            'applicant_dl',
            'applicant_udhyamcard_number',
            'applicant_udhyamcard',
            'applicant_photo',
            'coapplicant_aadharcard_number',
            'coapplicant_aadharcard',
            'coapplicant_pancard_number',
            'coapplicant_pancard',
            'coapplicant_voterid_number',
            'coapplicant_voterid',
            'coapplicant_photo',
            'guarantor_aadharcard_number',
            'guarantor_aadharcard',
            'guarantor_pancard_number',
            'guarantor_pancard',
            'guarantor_voterid_number',
            'guarantor_voterid',
            'guarantor_rc_number',
            'guarantor_rc',
            'guarantor_photo',
            'vehicle_rc_number',
            'vehicle_rc',
            'vehicle_insurance_number',
            'vehicle_insurance',
            'vehicle_tax',
            'vehicle_permit',
            'saler_aadharcardnumber',
            'saler_aadharcard',
            'sale_agreement',
            'electricity_bill',
            'agreement',
            'banking'
        ];

        const missingFields = requiredFields.filter((field) => !data[field]);
        if (missingFields.length > 0) {
            alert('Please fill all fields');
            setLoading(false); // Reset loading state
            return;
        }

        const uploadedFiles = {};
        for (const fileType of ['applicant_aadharcard', 'applicant_pancard', 'applicant_dl', 'applicant_udhyamcard', 'applicant_photo',
            'coapplicant_aadharcard', 'coapplicant_pancard', 'coapplicant_voterid', 'coapplicant_photo',
            'guarantor_aadharcard', 'guarantor_pancard', 'guarantor_voterid', 'guarantor_rc', 'guarantor_photo',
            'vehicle_rc', 'vehicle_insurance', 'saler_aadharcard', 'sale_agreement',
            'electricity_bill', 'agreement', 'banking']) {
            if (data[fileType] instanceof File) {
                const fileUrl = await handleUpload(fileType);
                uploadedFiles[fileType] = fileUrl;
            }
        }

        try {
            const response = await axios.post('/api/loan/create', { ...data, ...uploadedFiles });
            setData(defaultData);

            if (response.status === 201) {
                toast.success("loan Created");
                window.location.reload();

            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <div className=' h-svh w-full  flex justify-center items-center gap-4 flex-col'>

                    <div class="w-24 h-24 rounded-full border-4 border-gray-100 border-t-gray-500 animate-spin"></div>
                    <p className=' font-medium text-2xl text-gray-400'>Processing Please wait...</p>
                </div>
            </>
        );
    }


    return (
        <>
            <ToastContainer />

            <div className="container mx-auto py-6 ">
                <div className=' lg:w-3/4  mx-auto px-6'>
                    <h1 className="text-5xl text-center  font-extrabold text-blue-950 mb-4">
                        Loan
                    </h1>
                </div>



                <div className=' mx-auto lg:w-2/3 px-4'>
                    <form method='post'>
                        <Tabs>
                            <TabList className=" justify-between flex flex-col md:flex-row gap-1">
                                <Tab>Applicant</Tab>
                                <Tab>Co Applicant</Tab>
                                <Tab>Guarantor</Tab>
                                <Tab>Vehicle</Tab>
                                <Tab>Other</Tab>
                            </TabList>

                            <TabPanel>
                                <div className=' my-5'>
                                    <div className=' grid lg:grid-cols-2 grid-cols-1 gap-4'>


                                        <div className=' lg:col-span-2'>

                                            <Input

                                                type="hidden"
                                                name="userid"
                                                id="userid"
                                                placeholder="userid"
                                                className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-red-500"
                                                value={data.userid}
                                                // readOnly
                                                onChange={(e) => onValueChange(e)}
                                            />
                                        </div>

                                        <div className=' lg:col-span-2'>

                                            <Input
                                                label="Name"
                                                type="text"
                                                name="applicant_name"
                                                id="applicant_name"
                                                placeholder="name"
                                                className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                                value={data.applicant_name}
                                                onChange={(e) => onValueChange(e)}
                                            />
                                        </div>






                                        <Input
                                            label="Mobile_no"
                                            type="tel"
                                            name="applicant_mobile"
                                            id="applicant_mobile"
                                            placeholder="mobile_no"
                                            className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            value={data.applicant_mobile}
                                            onChange={(e) => onValueChange(e)}
                                        />


                                        <Input
                                            label="Vehicle Name"
                                            type="text"
                                            name="vehicle_name"
                                            id="vehicle_name"
                                            placeholder="vehicle_name"
                                            className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            value={data.vehicle_name}
                                            onChange={(e) => onValueChange(e)}
                                        />


                                        <Input
                                            label="Aadharcard Number"
                                            type="number"
                                            name="applicant_aadharcard_number"
                                            id="applicant_aadharcard_number"
                                            placeholder="applicant_aadharcard_number"
                                            className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            value={data.applicant_aadharcard_number}
                                            onChange={(e) => onValueChange(e)}
                                        />

                                        <Input
                                            label="Aadharcard"
                                            type="file"
                                            name="applicant_aadharcard"
                                            id="applicant_aadharcard"

                                             className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"

                                            onChange={handleFileChange}
                                        />

                                        <Input
                                            label="Pancard Number"
                                            type="text"
                                            name="applicant_pancard_number"
                                            id="applicant_pancard_number"
                                            placeholder="applicant_pancard_number Number"
                                            className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            value={data.applicant_pancard_number}
                                            onChange={(e) => onValueChange(e)}
                                        />

                                        <Input
                                            label="Pancard"
                                            type="file"
                                            name="applicant_pancard"
                                            id="applicant_pancard"

                                             className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            onChange={handleFileChange}

                                        />


                                        <Input
                                            label=" Driving Licence Number"
                                            type="text"
                                            name="applicant_dl_number"
                                            id="applicant_dl_number"
                                            placeholder=" Driving Licence"
                                            className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            value={data.applicant_dl_number}
                                            onChange={(e) => onValueChange(e)}


                                        />

                                        <Input
                                            label=" Driving Licence"
                                            type="file"
                                            name="applicant_dl"
                                            id="applicant_dl"

                                             className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            onChange={handleFileChange}

                                        />


                                        <Input
                                            label="Udhyam"
                                            type="text"
                                            name="applicant_udhyamcard_number"
                                            id="applicant_udhyamcard_number"
                                            placeholder="applicant_udhyamcard_number"
                                             className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            value={data.applicant_udhyamcard_number}
                                            onChange={(e) => onValueChange(e)}


                                        />

                                        <Input
                                            label="Udhyam"
                                            type="file"
                                            name="applicant_udhyamcard"
                                            id="applicant_udhyamcard"

                                             className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            onChange={handleFileChange}

                                        />


                                        <Input
                                            label="Applicant Photo"
                                            type="file"
                                            name="applicant_photo"
                                            id="applicant_photo"

                                             className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            onChange={handleFileChange}

                                        />


                                    </div>


                                </div>
                            </TabPanel>
                            <TabPanel>


                                <div className=' my-5'>
                                    <div className=' grid lg:grid-cols-2 grid-cols-1 gap-4'>





                                        <Input
                                            label="Coapplicant Aadharcard Nnumber"
                                            type="number"
                                            name="coapplicant_aadharcard_number"
                                            id="coapplicant_aadharcard_number"
                                            placeholder="Coapplicant aadhar number"
                                            className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            value={data.coapplicant_aadharcard_number}
                                            onChange={(e) => onValueChange(e)}
                                        />



                                        <Input
                                            label="Coapplicant Aadharcard"
                                            type="file"
                                            name="coapplicant_aadharcard"
                                            id="coapplicant_aadharcard"

                                             className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"

                                            onChange={handleFileChange}
                                        />

                                        <Input
                                            label="CoApplicant Pancard Number"
                                            type="text"
                                            name="coapplicant_pancard_number"
                                            id="coapplicant_pancard_number"
                                            placeholder="coapplicant_pancard_number"
                                            className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            value={data.coapplicant_pancard_number}
                                            onChange={(e) => onValueChange(e)}
                                        />

                                        <Input
                                            label="Coapplicant Pancard"
                                            type="file"
                                            name="coapplicant_pancard"
                                            id="coapplicant_pancard"

                                             className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            onChange={handleFileChange}

                                        />


                                        <Input
                                            label="Coapplicant voterid number"
                                            type="text"
                                            name="coapplicant_voterid_number"
                                            id="coapplicant_voterid_number"
                                            placeholder=" Driving Licence"
                                            className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            value={data.coapplicant_voterid_number}
                                            onChange={(e) => onValueChange(e)}


                                        />

                                        <Input
                                            label="Coapplicant Voterid"
                                            type="file"
                                            name="coapplicant_voterid"
                                            id="coapplicant_voterid"

                                             className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            onChange={handleFileChange}

                                        />





                                        <Input
                                            label="Coapplicant Photo"
                                            type="file"
                                            name="coapplicant_photo"
                                            id="coapplicant_photo"

                                             className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            onChange={handleFileChange}

                                        />


                                    </div>


                                </div>


                            </TabPanel>
                            <TabPanel>
                                <div className=' my-5'>
                                    <div className=' grid lg:grid-cols-2 grid-cols-1 gap-4'>





                                        <Input
                                            label="Guarantor Aadharcard Nnumber"
                                            type="number"
                                            name="guarantor_aadharcard_number"
                                            id="guarantor_aadharcard_number"
                                            placeholder="guarantor_aadharcard_number"
                                            className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            value={data.guarantor_aadharcard_number}
                                            onChange={(e) => onValueChange(e)}
                                        />



                                        <Input
                                            label="Guarantor Aadharcard"
                                            type="file"
                                            name="guarantor_aadharcard"
                                            id="guarantor_aadharcard"

                                             className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"

                                            onChange={handleFileChange}
                                        />

                                        <Input
                                            label="Guarantor Pancard Number"
                                            type="text"
                                            name="guarantor_pancard_number"
                                            id="guarantor_pancard_number"
                                            placeholder="guarantor_pancard_number"
                                            className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            value={data.guarantor_pancard_number}
                                            onChange={(e) => onValueChange(e)}
                                        />

                                        <Input
                                            label="Guarantor Pancard"
                                            type="file"
                                            name="guarantor_pancard"
                                            id="guarantor_pancard"

                                             className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            onChange={handleFileChange}

                                        />


                                        <Input
                                            label="Guarantor voterid number"
                                            type="text"
                                            name="guarantor_voterid_number"
                                            id="guarantor_voterid_number"
                                            placeholder=" guarantor_voterid_number"
                                            className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            value={data.guarantor_voterid_number}
                                            onChange={(e) => onValueChange(e)}


                                        />

                                        <Input
                                            label="Guarantor Voterid"
                                            type="file"
                                            name="guarantor_voterid"
                                            id="guarantor_voterid"

                                             className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            onChange={handleFileChange}

                                        />


                                        <Input
                                            label="Guarantor Rc number"
                                            type="text"
                                            name="guarantor_rc_number"
                                            id="guarantor_rc_number"
                                            placeholder=" guarantor_rc_number"
                                            className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            value={data.guarantor_rc_number}
                                            onChange={(e) => onValueChange(e)}


                                        />

                                        <Input
                                            label="Guarantor Rc"
                                            type="file"
                                            name="guarantor_rc"
                                            id="guarantor_rc"

                                             className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            onChange={handleFileChange}

                                        />





                                        <Input
                                            label="Guarantor Photo"
                                            type="file"
                                            name="guarantor_photo"
                                            id="guarantor_photo"

                                             className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            onChange={handleFileChange}

                                        />


                                    </div>


                                </div>
                            </TabPanel>
                            <TabPanel>

                                <div className=' my-5'>
                                    <div className=' grid lg:grid-cols-2 grid-cols-1 gap-4'>





                                        <Input
                                            label="Vehicle rc Nnumber"
                                            type="text"
                                            name="vehicle_rc_number"
                                            id="vehicle_rc_number"
                                            placeholder="vehicle_rc_number"
                                            className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            value={data.vehicle_rc_number}
                                            onChange={(e) => onValueChange(e)}
                                        />



                                        <Input
                                            label="Vehicle Rc"
                                            type="file"
                                            name="vehicle_rc"
                                            id="vehicle_rc"

                                             className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"

                                            onChange={handleFileChange}
                                        />

                                        <Input
                                            label="Vehicle Insurance Number"
                                            type="text"
                                            name="vehicle_insurance_number"
                                            id="vehicle_insurance_number"
                                            placeholder="guarantor_pancard_number"
                                            className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            value={data.vehicle_insurance_number}
                                            onChange={(e) => onValueChange(e)}
                                        />

                                        <Input
                                            label="Vehicle Insurance"
                                            type="file"
                                            name="vehicle_insurance"
                                            id="vehicle_insurance"

                                             className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            onChange={handleFileChange}

                                        />


                                        <Input
                                            label="Vehicle tax"
                                            type="text"
                                            name="vehicle_tax"
                                            id="vehicle_tax"
                                            placeholder=" vehicle_tax"
                                            className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            value={data.vehicle_tax}
                                            onChange={(e) => onValueChange(e)}


                                        />



                                        <Input
                                            label="Vehicle Permit"
                                            type="text"
                                            name="vehicle_permit"
                                            id="vehicle_permit"
                                            placeholder=" vehicle_permit"
                                            className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            value={data.vehicle_permit}
                                            onChange={(e) => onValueChange(e)}


                                        />

                                        <Input
                                            label="Saler aadharcardnumber"
                                            type="number"
                                            name="saler_aadharcardnumber"
                                            id="saler_aadharcardnumber"
                                            placeholder=" saler_aadharcardnumber"
                                            className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            value={data.saler_aadharcardnumber}
                                            onChange={(e) => onValueChange(e)}


                                        />





                                        <Input
                                            label="Saler Aadharcard"
                                            type="file"
                                            name="saler_aadharcard"
                                            id="saler_aadharcard"

                                             className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            onChange={handleFileChange}

                                        />





                                        <Input
                                            label="Sale agreement"
                                            type="file"
                                            name="sale_agreement"
                                            id="sale_agreement"

                                             className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"
                                            onChange={handleFileChange}

                                        />


                                    </div>


                                </div>


                            </TabPanel>
                            <TabPanel>
                                <div className=' my-5'>
                                    <div className=' grid lg:grid-cols-2 grid-cols-1 gap-4'>
                                        <Input
                                            label="Electricity bill"
                                            type="file"
                                            name="electricity_bill"
                                            id="electricity_bill"

                                             className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"

                                            onChange={handleFileChange}
                                        />


                                        <Input
                                            label="Agreement"
                                            type="file"
                                            name="agreement"
                                            id="agreement"

                                             className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"

                                            onChange={handleFileChange}
                                        />


                                        <Input
                                            label="Banking"
                                            type="file"
                                            name="banking"
                                            id="banking"

                                             className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-blue-950"

                                            onChange={handleFileChange}
                                        />

                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <button
                            onClick={(e) => onRegister(e)}
                            type='submit'
                            className='w-full bg-red-500 text-white rounded-md py-1.5 hover:bg-red-700 mt-4'
                        >Submit</button>

                    </form>
                </div>




            </div>




        </>
    )
}

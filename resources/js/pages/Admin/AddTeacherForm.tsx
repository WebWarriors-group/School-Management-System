import { useState } from "react";

export default function AddTeacherForm() {
    
        const [step, setStep] = useState(1);
      
        const handleNextStep = () => setStep(step + 1);
        const handlePrevStep = () => setStep(step - 1);
    
    
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoName, setPhotoName] = useState<string>("");
    

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setPhoto(file);  // Store the file
            setPhotoName(file.name);  // Store the file name
        }
    };
    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Add Teacher</h2>
            <form action="Admin/teacher" method="get">
            {step === 1 && (
  <div>
    <h3 className="text-lg font-bold">Step 1: Teacher's Basic Information</h3>
    
    {/* Teacher NIC */}
    <div className="mb-4">
      <label htmlFor="teacher_NIC" className="block text-sm font-medium text-gray-700">
        Teacher NIC
      </label>
      <input
        type="text"
        id="teacher_NIC"
        className="w-full p-2 border rounded"
        placeholder="Enter Teacher NIC"
        required
      />
    </div>

    {/* Full Name */}
    <div className="mb-4">
      <label htmlFor="Full_name" className="block text-sm font-medium text-gray-700">
        Full Name
      </label>
      <input
        type="text"
        id="Full_name"
        className="w-full p-2 border rounded"
        placeholder="Enter Full Name"
        required
      />
    </div>

    {/* Full Name with Initials */}
    <div className="mb-4">
      <label htmlFor="Full_name_with_initial" className="block text-sm font-medium text-gray-700">
        Full Name with Initials
      </label>
      <input
        type="text"
        id="Full_name_with_initial"
        className="w-full p-2 border rounded"
        placeholder="Enter Full Name with Initials"
        required
      />
    </div>

    {/* Photo Upload */}
    <div className="mb-4">
      <label htmlFor="Photo" className="block text-sm font-medium text-gray-700">
        Upload Photo
      </label>
      <input
        type="file"
        id="Photo"
        className="w-full p-2 border rounded"
      />
    </div>

    {/* Gender */}
    <div className="mb-4">
      <label htmlFor="Gender" className="block text-sm font-medium text-gray-700">
        Gender
      </label>
      <select
        id="Gender"
        className="w-full p-2 border rounded"
        required
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>

    {/* Region */}
    <div className="mb-4">
      <label htmlFor="Region" className="block text-sm font-medium text-gray-700">
        Region
      </label>
      <input
        type="text"
        id="Region"
        className="w-full p-2 border rounded"
        placeholder="Enter Region"
        required
      />
    </div>

    {/* Ethnicity */}
    <div className="mb-4">
      <label htmlFor="Ethnicity" className="block text-sm font-medium text-gray-700">
        Ethnicity
      </label>
      <input
        type="text"
        id="Ethnicity"
        className="w-full p-2 border rounded"
        placeholder="Enter Ethnicity"
        required
      />
    </div>

    {/* Birthdate */}
    <div className="mb-4">
      <label htmlFor="Birthdate" className="block text-sm font-medium text-gray-700">
        Birthdate
      </label>
      <input
        type="date"
        id="Birthdate"
        className="w-full p-2 border rounded"
        required
      />
    </div>

    {/* Title */}
    <div className="mb-4">
      <label htmlFor="Title" className="block text-sm font-medium text-gray-700">
        Title
      </label>
      <input
        type="text"
        id="Title"
        className="w-full p-2 border rounded"
        placeholder="Enter Title"
        required
      />
    </div>

    {/* Marital Status */}
    <div className="mb-4">
      <label htmlFor="Marital_status" className="block text-sm font-medium text-gray-700">
        Marital Status
      </label>
      <select
        id="Marital_status"
        className="w-full p-2 border rounded"
        required
      >
        <option value="Single">Single</option>
        <option value="Married">Married</option>
        <option value="Divorced">Divorced</option>
        <option value="Widowed">Widowed</option>
      </select>
    </div>

    {/* Details About Family Members */}
    <div className="mb-4">
      <label htmlFor="Details_about_family_members" className="block text-sm font-medium text-gray-700">
        Details About Family Members
      </label>
      <textarea
        id="Details_about_family_members"
        className="w-full p-2 border rounded"
        placeholder="Enter Details About Family Members"
      />
    </div>

    {/* Emergency Telephone Number */}
    <div className="mb-4">
      <label htmlFor="Emergency_telephone_number" className="block text-sm font-medium text-gray-700">
        Emergency Telephone Number
      </label>
      <input
        type="tel"
        id="Emergency_telephone_number"
        className="w-full p-2 border rounded"
        placeholder="Enter Emergency Telephone Number"
        required
      />
    </div>

    {/* Email Address */}
    <div className="mb-4">
      <label htmlFor="Email_address" className="block text-sm font-medium text-gray-700">
        Email Address
      </label>
      <input
        type="email"
        id="Email_address"
        className="w-full p-2 border rounded"
        placeholder="Enter Email Address"
        required
      />
    </div>

    {/* Fixed Telephone Number */}
    <div className="mb-4">
      <label htmlFor="Fixed_telephone_number" className="block text-sm font-medium text-gray-700">
        Fixed Telephone Number (Optional)
      </label>
      <input
        type="tel"
        id="Fixed_telephone_number"
        className="w-full p-2 border rounded"
        placeholder="Enter Fixed Telephone Number"
      />
    </div>

    {/* Mobile Number */}
    <div className="mb-4">
      <label htmlFor="Mobile_number" className="block text-sm font-medium text-gray-700">
        Mobile Number
      </label>
      <input
        type="tel"
        id="Mobile_number"
        className="w-full p-2 border rounded"
        placeholder="Enter Mobile Number"
      />
    </div>

    {/* WhatsApp Number */}
    <div className="mb-4">
      <label htmlFor="Whatsapp_number" className="block text-sm font-medium text-gray-700">
        WhatsApp Number
      </label>
      <input
        type="tel"
        id="Whatsapp_number"
        className="w-full p-2 border rounded"
        placeholder="Enter WhatsApp Number"
      />
    </div>

    {/* Navigation Buttons */}
    <div className="flex justify-between">
      
      <button
        type="button"
        onClick={handleNextStep}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Next
      </button>
    </div>
  </div>
)}


            {step === 2 && (
                <div>
                   <h3 className="text-lg font-bold">Step 2: Address Info</h3>

                    <label className="block text-sm font-medium mt-4">Permanant Address:</label>
                    <input type="text" className="w-full p-2 border rounded mt-1" />

                    <label className="block text-sm font-medium mt-4">Residential Address:</label>
                    <input type="text" className="w-full p-2 border rounded mt-1" />

                    <label className="block text-sm font-medium mt-4">Grama Niladari Division:</label>
                    <input type="text" className="w-full p-2 border rounded mt-1" />

                    <label className="block text-sm font-medium mt-4">Grama Niladari Division Number:</label>
                    <input type="text" className="w-full p-2 border rounded mt-1" />

                    <label className="block text-sm font-medium mt-4">Election Division:</label>
                    <input type="text" className="w-full p-2 border rounded mt-1" />

                    <label className="block text-sm font-medium mt-4">Election Division Number:</label>
                    <input type="text" className="w-full p-2 border rounded mt-1" />


                    <div className="flex justify-between">
            <button type="button" onClick={handlePrevStep} className="bg-gray-600 text-white px-4 py-2 rounded-md">
              Back
            </button>
            <button type="button" onClick={handleNextStep} className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Next
            </button>
          </div>

                </div>
            )}


            
                {step === 3 && (
                    <div>
                      <h3 className="text-lg font-bold">Step 3: Teacher's Work Information</h3>
                  
                      {/* Appointed Date */}
                      <div className="mb-4">
                        <label htmlFor="appointed_date" className="block text-sm font-medium text-gray-700">
                          Appointed Date
                        </label>
                        <input
                          type="date"
                          id="appointed_date"
                          className="w-full p-2 border rounded"
                          required
                        />
                      </div>
                  
                      {/* Work Acceptance Date */}
                      <div className="mb-4">
                        <label htmlFor="work_acceptance_date" className="block text-sm font-medium text-gray-700">
                          Work Acceptance Date
                        </label>
                        <input
                          type="date"
                          id="work_acceptance_date"
                          className="w-full p-2 border rounded"
                          required
                        />
                      </div>
                  
                      {/* Appointment Type */}
                      <div className="mb-4">
                        <label htmlFor="appointment_type" className="block text-sm font-medium text-gray-700">
                          Appointment Type
                        </label>
                        <input
                          type="text"
                          id="appointment_type"
                          className="w-full p-2 border rounded"
                          placeholder="Enter Appointment Type"
                          required
                        />
                      </div>
                  
                      {/* Salary Increment Date */}
                      <div className="mb-4">
                        <label htmlFor="salary_increment_date" className="block text-sm font-medium text-gray-700">
                          Salary Increment Date
                        </label>
                        <input
                          type="date"
                          id="salary_increment_date"
                          className="w-full p-2 border rounded"
                          required
                        />
                      </div>
                  
                      {/* Current Grade of Teaching Service */}
                      <div className="mb-4">
                        <label htmlFor="current_grade_of_teaching_service" className="block text-sm font-medium text-gray-700">
                          Current Grade of Teaching Service
                        </label>
                        <select
                          id="current_grade_of_teaching_service"
                          className="w-full p-2 border rounded"
                          required
                        >
                          <option value="Grade I">Grade I</option>
                          <option value="Grade II">Grade II</option>
                          <option value="Grade III">Grade III</option>
                        </select>
                      </div>
                  
                      {/* Work Acceptance Date at School */}
                      <div className="mb-4">
                        <label htmlFor="work_acceptance_date_school" className="block text-sm font-medium text-gray-700">
                          Work Acceptance Date at School
                        </label>
                        <input
                          type="date"
                          id="work_acceptance_date_school"
                          className="w-full p-2 border rounded"
                          required
                        />
                      </div>
                  
                      {/* Temporary Attached School or Institute Name */}
                      <div className="mb-4">
                        <label htmlFor="temporary_attachedschool_or_institute_name" className="block text-sm font-medium text-gray-700">
                          Temporary Attached School or Institute Name
                        </label>
                        <input
                          type="text"
                          id="temporary_attachedschool_or_institute_name"
                          className="w-full p-2 border rounded"
                          placeholder="Enter School or Institute Name"
                          required
                        />
                      </div>
                  
                      {/* Appointed Subject */}
                      <div className="mb-4">
                        <label htmlFor="appointed_subject" className="block text-sm font-medium text-gray-700">
                          Appointed Subject
                        </label>
                        <input
                          type="text"
                          id="appointed_subject"
                          className="w-full p-2 border rounded"
                          placeholder="Enter Appointed Subject"
                          required
                        />
                      </div>
                  
                      {/* Which Grades Teaching Done */}
                      <div className="mb-4">
                        <label htmlFor="which_grades_teaching_done" className="block text-sm font-medium text-gray-700">
                          Which Grades Teaching Done
                        </label>
                        <input
                          type="text"
                          id="which_grades_teaching_done"
                          className="w-full p-2 border rounded"
                          placeholder="Enter Grades Teaching Done"
                          required
                        />
                      </div>
                  
                      {/* Current Teaching Subject */}
                      <div className="mb-4">
                        <label htmlFor="current_teaching_subject" className="block text-sm font-medium text-gray-700">
                          Current Teaching Subject
                        </label>
                        <input
                          type="text"
                          id="current_teaching_subject"
                          className="w-full p-2 border rounded"
                          placeholder="Enter Current Teaching Subject"
                          required
                        />
                      </div>
                  
                      {/* Other Subjects Taught */}
                      <div className="mb-4">
                        <label htmlFor="other_subjects_taught" className="block text-sm font-medium text-gray-700">
                          Other Subjects Taught
                        </label>
                        <input
                          type="text"
                          id="other_subjects_taught"
                          className="w-full p-2 border rounded"
                          placeholder="Enter Other Subjects Taught"
                          required
                        />
                      </div>
                  
                      {/* Assigned Class */}
                      <div className="mb-4">
                        <label htmlFor="assigned_class" className="block text-sm font-medium text-gray-700">
                          Assigned Class
                        </label>
                        <input
                          type="text"
                          id="assigned_class"
                          className="w-full p-2 border rounded"
                          placeholder="Enter Assigned Class"
                          required
                        />
                      </div>
                  
                      {/* Other Responsibilities Assigned */}
                      <div className="mb-4">
                        <label htmlFor="other_responsibilities_assigned" className="block text-sm font-medium text-gray-700">
                          Other Responsibilities Assigned
                        </label>
                        <input
                          type="text"
                          id="other_responsibilities_assigned"
                          className="w-full p-2 border rounded"
                          placeholder="Enter Other Responsibilities Assigned"
                          required
                        />
                      </div>
                  
                      {/* 150 Hours Tamil Course Completed */}
                      <div className="mb-4">
                        <label htmlFor="150_hrs_tamil_course_completed" className="block text-sm font-medium text-gray-700">
                          150 Hours Tamil Course Completed
                        </label>
                        <input
                          type="checkbox"
                          id="150_hrs_tamil_course_completed"
                          className="p-2"
                        />
                      </div>
                  
                      {/* Commuting From School */}
                      <div className="mb-4">
                        <label htmlFor="commuting_from_school" className="block text-sm font-medium text-gray-700">
                          Commuting From School
                        </label>
                        <select
                          id="commuting_from_school"
                          className="w-full p-2 border rounded"
                          required
                        >
                          <option value="Home">Home</option>
                          <option value="Boarding">Boarding</option>
                          <option value="Hostel">Hostel</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                  
                      {/* Distance From School */}
                      <div className="mb-4">
                        <label htmlFor="distance_from_school" className="block text-sm font-medium text-gray-700">
                          Distance From School
                        </label>
                        <input
                                  type="number"
                                  id="distance_from_school"
                                  className="w-full p-2 border rounded"
                                  placeholder="Enter Distance from School"
                                  required
                                />
                              </div>
                          
                              {/* Commuting Method to School */}
                              <div className="mb-4">
                                <label htmlFor="commuting_method_to_school" className="block text-sm font-medium text-gray-700">
                                  Commuting Method to School
                                </label>
                                <select
                                  id="commuting_method_to_school"
                                  className="w-full p-2 border rounded"
                                  required
                                >
                                  <option value="Bicycle">Bicycle</option>
                                  <option value="MotorBike">MotorBike</option>
                                  <option value="Car">Car</option>
                                  <option value="Bus">Bus</option>
                                  <option value="Threewheeler">Threewheeler</option>
                                  <option value="Walk">Walk</option>
                                  <option value="Other">Other</option>
                                </select>
                              </div>
                          
                              {/* Number in Sign Sheet */}
                              <div className="mb-4">
                                <label htmlFor="number_in_sign_sheet" className="block text-sm font-medium text-gray-700">
                                  Number in Sign Sheet
                                </label>
                                <input
                                  type="text"
                                  id="number_in_sign_sheet"
                                  className="w-full p-2 border rounded"
                                  placeholder="Enter Number in Sign Sheet"
                                  required
                                />
                              </div>
                          
                              {/* Number in Salary Sheet */}
                              <div className="mb-4">
                                <label htmlFor="number_in_salary_sheet" className="block text-sm font-medium text-gray-700">
                                  Number in Salary Sheet
                                </label>
                                <input
                                  type="text"
                                  id="number_in_salary_sheet"
                                  className="w-full p-2 border rounded"
                                  placeholder="Enter Number in Salary Sheet"
                                  required
                                />
                              </div>
                          
                              {/* Navigation Buttons */}
                              <div className="flex justify-between">
                                <button
                                  type="button"
                                  onClick={handlePrevStep}
                                  className="bg-gray-600 text-white px-4 py-2 rounded-md"
                                >
                                  Back
                                </button>
                                <button
                                  type="button"
                                  onClick={handleNextStep}
                                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          )}
                          
                  

{step === 4 && (
  <div>
    <h3 className="text-lg font-bold">Step 4: Teacher's Qualification</h3>

    {/* Teacher NIC */}
    <div className="mb-4">
      <label htmlFor="teacher_NIC" className="block text-sm font-medium text-gray-700">
        Teacher NIC
      </label>
      <input
        type="text"
        id="teacher_NIC"
        className="w-full p-2 border rounded"
        placeholder="Enter Teacher NIC"
        required
      />
    </div>

    {/* Type of Service in School */}
    <div className="mb-4">
      <label htmlFor="type_of_service_in_school" className="block text-sm font-medium text-gray-700">
        Type of Service in School
      </label>
      <input
        type="text"
        id="type_of_service_in_school"
        className="w-full p-2 border rounded"
        placeholder="Enter Type of Service"
        required
      />
    </div>

    {/* GCE AL Subject Stream */}
    <div className="mb-4">
      <label htmlFor="gce_al_subject_stream" className="block text-sm font-medium text-gray-700">
        GCE AL Subject Stream
      </label>
      <input
        type="text"
        id="gce_al_subject_stream"
        className="w-full p-2 border rounded"
        placeholder="Enter GCE AL Subject Stream"
        required
      />
    </div>

    {/* Highest Education Qualification */}
    <div className="mb-4">
      <label htmlFor="highest_education_qualification" className="block text-sm font-medium text-gray-700">
        Highest Education Qualification
      </label>
      <input
        type="text"
        id="highest_education_qualification"
        className="w-full p-2 border rounded"
        placeholder="Enter Highest Education Qualification"
        required
      />
    </div>

    {/* Basic Degree Stream */}
    <div className="mb-4">
      <label htmlFor="basic_degree_stream" className="block text-sm font-medium text-gray-700">
        Basic Degree Stream
      </label>
      <input
        type="text"
        id="basic_degree_stream"
        className="w-full p-2 border rounded"
        placeholder="Enter Basic Degree Stream"
        required
      />
    </div>

    {/* Highest Professional Qualification */}
    <div className="mb-4">
      <label htmlFor="highest_professional_qualification" className="block text-sm font-medium text-gray-700">
        Highest Professional Qualification
      </label>
      <input
        type="text"
        id="highest_professional_qualification"
        className="w-full p-2 border rounded"
        placeholder="Enter Highest Professional Qualification"
        required
      />
    </div>

    {/* Present Class */}
    <div className="mb-4">
      <label htmlFor="present_class" className="block text-sm font-medium text-gray-700">
        Present Class
      </label>
      <select id="present_class" className="w-full p-2 border rounded" required>
        <option value="class I">Class I</option>
        <option value="class II">Class II</option>
      </select>
    </div>

    {/* Present Grade */}
    <div className="mb-4">
      <label htmlFor="present_grade" className="block text-sm font-medium text-gray-700">
        Present Grade
      </label>
      <select id="present_grade" className="w-full p-2 border rounded" required>
        <option value="Grade I">Grade I</option>
        <option value="Grade II">Grade II</option>
        <option value="Grade III">Grade III</option>
      </select>
    </div>

    {/* Appointment Date for Current Class */}
    <div className="mb-4">
      <label htmlFor="appointment_date_for_current_class" className="block text-sm font-medium text-gray-700">
        Appointment Date for Current Class
      </label>
      <input
        type="date"
        id="appointment_date_for_current_class"
        className="w-full p-2 border rounded"
        required
      />
    </div>

    {/* Appointment Date for Current Grade */}
    <div className="mb-4">
      <label htmlFor="appointment_date_for_current_grade" className="block text-sm font-medium text-gray-700">
        Appointment Date for Current Grade
      </label>
      <input
        type="date"
        id="appointment_date_for_current_grade"
        className="w-full p-2 border rounded"
        required
      />
    </div>

    {/* Current Appointment Service Medium */}
    <div className="mb-4">
      <label htmlFor="current_appointment_service_medium" className="block text-sm font-medium text-gray-700">
        Current Appointment Service Medium
      </label>
      <select id="current_appointment_service_medium" className="w-full p-2 border rounded" required>
        <option value="Tamil">Tamil</option>
        <option value="English">English</option>
        <option value="Sinhala">Sinhala</option>
      </select>
    </div>

    {/* Appointed Subject Section */}
    <div className="mb-4">
      <label htmlFor="appointed_subject_section" className="block text-sm font-medium text-gray-700">
        Appointed Subject Section
      </label>
      <input
        type="text"
        id="appointed_subject_section"
        className="w-full p-2 border rounded"
        placeholder="Enter Appointed Subject Section"
        required
      />
    </div>

    {/* Subject Appointed */}
    <div className="mb-4">
      <label htmlFor="subject_appointed" className="block text-sm font-medium text-gray-700">
        Subject Appointed
      </label>
      <input
        type="text"
        id="subject_appointed"
        className="w-full p-2 border rounded"
        placeholder="Enter Subject Appointed"
        required
      />
    </div>

    {/* Current Service Appointed Date */}
    <div className="mb-4">
      <label htmlFor="currentservice_appointed_date" className="block text-sm font-medium text-gray-700">
        Current Service Appointed Date
      </label>
      <input
        type="date"
        id="currentservice_appointed_date"
        className="w-full p-2 border rounded"
        required
      />
    </div>

    {/* Subjects Taught Most and Second Most */}
    <div className="mb-4">
      <label htmlFor="subjects_taught_most_and_second_most" className="block text-sm font-medium text-gray-700">
        Subjects Taught Most and Second Most
      </label>
      <input
        type="text"
        id="subjects_taught_most_and_second_most"
        className="w-full p-2 border rounded"
        placeholder="Enter Subjects Taught Most and Second Most"
        required
      />
    </div>

    {/* Position in the School */}
    <div className="mb-4">
      <label htmlFor="position_in_the_school" className="block text-sm font-medium text-gray-700">
        Position in the School
      </label>
      <input
        type="text"
        id="position_in_the_school"
        className="w-full p-2 border rounded"
        placeholder="Enter Position in the School"
        required
      />
    </div>

    {/* Assign Date for the School */}
    <div className="mb-4">
      <label htmlFor="assign_date_for_the_school" className="block text-sm font-medium text-gray-700">
        Assign Date for the School
      </label>
      <input
        type="date"
        id="assign_date_for_the_school"
        className="w-full p-2 border rounded"
        required
      />
    </div>

    {/* Navigation Buttons */}
    <div className="flex justify-between">
      <button
        type="button"
        onClick={handlePrevStep}
        className="bg-gray-600 text-white px-4 py-2 rounded-md"
      >
        Back
      </button>
      <button
              type="button"
              onClick={handleNextStep}
           className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
            Next
             </button>
    </div>
  </div>
)}


{step === 5 && (
  <div>
    <h3 className="text-lg font-bold">Step 5: Additional Responsibilities and Memberships</h3>

    {/* Other Responsibilities in School */}
    <div className="mb-4">
      <label htmlFor="other_responsibilities_in_school" className="block text-sm font-medium text-gray-700">
        Other Responsibilities in School
      </label>
      <input
        type="text"
        id="other_responsibilities_in_school"
        className="w-full p-2 border rounded"
        placeholder="Enter Other Responsibilities"
      />
    </div>

    {/* EDCS Membership */}
    <div className="mb-4">
      <label htmlFor="EDCS_membership" className="block text-sm font-medium text-gray-700">
        EDCS Membership
      </label>
      <select id="EDCS_membership" className="w-full p-2 border rounded">
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>

    {/* WSOP Number */}
    <div className="mb-4">
      <label htmlFor="WSOP_Number" className="block text-sm font-medium text-gray-700">
        WSOP Number
      </label>
      <input
        type="number"
        id="WSOP_Number"
        className="w-full p-2 border rounded"
        placeholder="Enter WSOP Number"
      />
    </div>

    {/* Agrahara Insurance Membership */}
    <div className="mb-4">
      <label htmlFor="Agrahara_insuarence_membership" className="block text-sm font-medium text-gray-700">
        Agrahara Insurance Membership
      </label>
      <select id="Agrahara_insuarence_membership" className="w-full p-2 border rounded">
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>

    {/* Navigation Buttons */}
    <div className="flex justify-between">
      <button
        type="button"
        onClick={handlePrevStep}
        className="bg-gray-600 text-white px-4 py-2 rounded-md"
      >
        Back
      </button>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded-md"
      >
        Submit
      </button>
    </div>
  </div>
)}



            
            </form>
        </div>
    );
}


import React from 'react'

const UserAuthentication = () => {
    const [formData, setFormData] = useState({
        phone: "",
        securityQuestion: "",
        securityAnswer: "",
      });
      const [error, setError] = useState("");
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = () => {
        if (!formData.phone || !formData.securityQuestion || !formData.securityAnswer) {
          setError("All fields are required");
          return;
        }
        console.log("Submitted data:", formData);
      };
    
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Change Password
            </h2>
            {error && (
              <p className="text-red-600 text-sm text-center mb-4">{error}</p>
            )}
            <div className="space-y-4">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              <select
                name="securityQuestion"
                value={formData.securityQuestion}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">Select a Security Question</option>
                <option value="school">What is the name of your first school?</option>
                <option value="pet">What is your pet's name?</option>
                <option value="dob">What is your date of birth?</option>
              </select>
              <input
                type="text"
                name="securityAnswer"
                placeholder="Security Answer"
                value={formData.securityAnswer}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 mt-6 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Verify
            </button>
          </div>
        </div>
      );
}

export default UserAuthentication

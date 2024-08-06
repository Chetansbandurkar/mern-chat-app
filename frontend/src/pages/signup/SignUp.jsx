import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import useSignup from '../../hooks/useSignup';
const SignUp = () => {
  const [inputs,setInputs]=useState({
    fullName:"",
    username:"",
    password:"",
    confirmPassword:"",
    gender:""
  });
  const {loading,signup} = useSignup();
  const handleSubmit =async(e)=>{
    e.preventDefault();
    // console.log(inputs);
    await signup(inputs);
  }
  const handleCheckboxChange=(gender)=>{
    setInputs({...inputs,gender:gender})
  }
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto ">
      <div className="felx p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-white ">
          SignUp
          <span className="text-white text-bold"> ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className=" text-black  text-base label-text">FullName</span>
            </label>
            <input type="text" placeholder="Enter FullName" className="w-full input input-bordered h-10" 
             value={inputs.fullName}
             onChange={(e)=>setInputs({...inputs,fullName :e.target.value})}
            />
          </div>

          <div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='username'
							className='w-full input input-bordered h-10'
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
					</div>

          <div>
            <label className="label p-2">
              <span className=" text-black text-base label-text">Password</span>
            </label>
            <input type="password" placeholder="Enter Username" className="w-full input input-bordered h-10" 
            value={inputs.password}
            onChange={(e)=>setInputs({...inputs,password:e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className=" text-black text-base label-text">ConfirmPassword</span>
            </label>
            <input type="password" placeholder="Enter Username" className="w-full input input-bordered h-10" 
            value={inputs.confirmPassword}
            onChange={(e)=>setInputs({...inputs,confirmPassword:e.target.value})}
            />
          </div>

          {/* Gender CheckBox Goes here */}
          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>
          <Link to='/login' className=" text-black text-bold text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
            Already have an acount ?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-5 border-slate-700 "
            disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
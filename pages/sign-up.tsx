import React from 'react';
import Registration from '../components/auth/register';

const SignUpPage = () => {

  return (
    <>
      <div className='text-center text-2xl'>Welcome to TulipTech</div>
      <div className='container mx-auto px-4 h-full'>
        <Registration />
      </div>
    </>
  );
};

export default SignUpPage;
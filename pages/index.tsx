import React from 'react';
import Login from '../components/auth/login';

const LoginPage = () => {

  return (
    <>
      <div className='text-center text-2xl'>Welcome to TulipTech</div>
      <div className='container mx-auto px-4 h-full'>
        <Login />
      </div>
    </>
  );
};

export default LoginPage;

export async function getServerSideProps({req}:any) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
import React, { useEffect } from 'react';
import DashBoard from '../components/dashboard/list';
import { GetServerSideProps } from "next";
import { useNasa } from "../redux/nasa/action";

const DashBoardPage = () => {
  const { getNasaImage } = useNasa();
  useEffect(() => {
    getNasaImage()
  },[])

  return (
    <>
      <div className='container mx-auto px-4 h-full'>
        <DashBoard />
      </div>
    </>
  );
};

export default DashBoardPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  
  return {
    props: {
    },
  };
};
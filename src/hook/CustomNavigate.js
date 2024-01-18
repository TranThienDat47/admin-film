import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomNavigate = ({ to }) => {
   const navigate = useNavigate();

   useEffect(() => {
      navigate(to, { replace: false });
   }, [navigate, to]);

   return null;
};

export default CustomNavigate;

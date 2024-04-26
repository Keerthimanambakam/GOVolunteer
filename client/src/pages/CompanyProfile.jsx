import React from 'react'
import { Card } from '../UI/Card'
const CompanyProfile = () => {
  return (
    <div className='flex items-center justify-center flex-col '>
      <h5 className='mt-4 font-sans font-bold text-xl text-center '>Job Status</h5>
      <div className='flex items-center justify-start mt-6'>
        <ul>
          <Card name="Full Stack developer" date="2023-12-12" Number="13"/>
          <li>
            <Card name="Senior Software Developer" date="2023-12-12" Number="15"/>
          </li>
          <li>
            
          <Card name="Systems administator" date="2023-13-13" Number="17"/>
          </li>
          <li>
            <Card name="Hardware engineer" date="2027-12-11" Number="19"/>
          </li>
      
        </ul>
      </div>
    </div>
  );

}

export default CompanyProfile
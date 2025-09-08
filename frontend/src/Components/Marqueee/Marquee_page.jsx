import React from 'react';
import Marquee from "react-fast-marquee";
import './marquee.css';

// ✅ Import images properly so Vite includes them in build
import google from '../../assets/marquue/google.svg';
import infosys from '../../assets/marquue/infosys.svg';
import microsoft from '../../assets/marquue/microsoft.svg';
import unilever from '../../assets/marquue/unilever.svg';
import amul from '../../assets/marquue/amul.svg';
import britannia from '../../assets/marquue/britannia.svg';
import deloitte from '../../assets/marquue/deloitte.svg';
import itc from '../../assets/marquue/ITC.svg';
import kpmg from '../../assets/marquue/kpmg.svg';
import nabard from '../../assets/marquue/nabard.svg';

const Marquee_page = () => {
  return (
    <div>
      <div className="mar-container">
        <div className="mar-heading">
          <h1>Our Talent Partners & Industry Recruiters</h1>
        </div>

        <div className="mar-moving">
          <Marquee pauseOnHover speed={40}>
            <div className='mar-img'><img src={google} alt="Google" /></div>
            <div className='mar-img'><img src={infosys} alt="Infosys" /></div>
            <div className='mar-img'><img src={microsoft} alt="Microsoft" /></div>
            <div className='mar-img'><img src={unilever} alt="Unilever" /></div>
            <div className='mar-img'><img src={amul} alt="Amul" /></div>
            <div className='mar-img'><img src={britannia} alt="Britannia" /></div>
            <div className='mar-img'><img src={deloitte} alt="Deloitte" /></div>
            <div className='mar-img'><img src={itc} alt="ITC" /></div>
            <div className='mar-img'><img src={kpmg} alt="KPMG" /></div>
            <div className='mar-img'><img src={nabard} alt="NABARD" /></div>
          </Marquee>
        </div>
      </div>
    </div>
  )
}

export default Marquee_page;

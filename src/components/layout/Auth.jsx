import "../../assets/styles/Auth.css"
import Logo from "../../assets/svg/hortisol-logo-large.svg"
import { Navigate } from 'react-router-dom';
import { useAppContext } from "../../state";

export default function Auth({ children }) {

   const { user } = useAppContext() 


   if (user) {
    return <Navigate to='/dashboard' />
   }

  return <section className="flex">
    <div className="image-section w-7/12 h-screen">

    </div>
    <div className="content pt-8 pl-[26px]">
      <a href='/' className=' mr-32 '>
        <img src={Logo} alt="hortisol logo" />
      </a>

      <div className='mt-40'>
        {children}
      </div>
    </div>
  </section>
}
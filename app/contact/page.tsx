import Header from "../components/header";
import Footer from "../components/footer";
export default function Contact() {
    return ( 
        
    <>   <Header /> 
        <div className="max-w-sm mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden mt-20 mb-6">
  <div className="h-32 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
 
  <div className="relative flex flex-col items-center px-6 pb-6">
    <div className="-mt-16 mb-4">
      <img className="w-28 h-28 rounded-full border-4 border-white dark:border-slate-800 shadow-md object-cover"
           src="/images/sobest.jpg"
           alt="Sobest" />
    </div>

    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Siripong Thianmanee</h3>
    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Programer</p>
    <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-3">
      สาขาวิชา นวัตกรรมและธุรกิจดิจิทัล
    </p>
    <div className="mt-6 flex gap-3">
      <a href="mailto:siripong.thi@rmutto.ac.th" target="_blank"
      className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
        Contact Me
      </a>
      <a href="https://github.com/siripongthi-droid/best-next-app"target="_blank"
       className="px-5 py-2 border border-slate-300 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition">
        GitHub

      </a>
    </div> 


    
    </div></div> <Footer />
       </>

     );
}



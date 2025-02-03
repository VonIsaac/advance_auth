

const ResetForm = ({children}) => {
    return (
        <div  className="flex flex-col justify-center items-center h-screen border-2">
        <form action="" className="border-2 rounded-2xl border-none h-[355px] w-[350px] bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            {children}
        </form>
      </div>
    );
}

export default ResetForm;
import { useAppContext } from "../../state";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Navigate } from 'react-router-dom';

export default function Dashboard({ children }) {
    const { user } = useAppContext()

    if (!user) {
        return <Navigate to='/' />
    }

    return (
        <>
            <div>
                <header
                    className="fixed left-0 right-0"
                    style={{ background: "#F8F8FC" }}
                >
                    <Topbar />
                </header>

                <div className=" flex pr-8 pt-[100px]">
                    <nav className=" flex-1 fixed ml-[35px]">
                        <Sidebar />
                    </nav>

                    <main className=" w-[calc(100%-280px)] ml-[280px]">{children}</main>
                </div>
            </div>
        </>
    );
}

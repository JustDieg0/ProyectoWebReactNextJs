import UpNav from "../ui/up-nav";

export default function Layout({ children }: { children: React.ReactNode}){
    return (
        <div className="flex h-screen flex-col md:overflow-hidden">
            <div className="w-full flex">
                <UpNav/>
            </div>
            <div className=" md:overflow-y-auto">{children}</div>
        </div>
    );
}
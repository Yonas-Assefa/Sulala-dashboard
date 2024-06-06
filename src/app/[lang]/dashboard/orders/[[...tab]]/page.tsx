import { Link } from "@/i18n/navigation";
import Items from "../components/Items";
import Services from "../components/Services";

type Props = {
    params: {
        tab: string[];
    };
};

function OrdersPage({ params: { tab } }: Props) {
    const activeTab = tab ? tab[0] : 'items'
    const tabs = [
        { name: 'Items', id: 'items' },
        { name: 'Services', id: 'services' }
    ]
    return (
        <div className="text-black flex flex-col w-full h-full p-8 gap-10 overflow-y-scroll">
            <h1 className='text-5xl font-semibold font-serif'>Orders</h1>
            <div className="box-content border-b-2 border-secondary">
                <div className="self-start flex flex-row font-medium">
                    <Link href={'/dashboard/orders/items'} className={`tab border-b-2 px-6 -mb-[1px] ${activeTab == 'items' ? 'text-primary border-primary' : 'text-secondary border-transparent'}`}>Items</Link>
                    <Link href={'/dashboard/orders/services'} className={`tab border-b-2 px-6 -mb-[1px] ${activeTab == 'services' ? 'text-primary border-primary' : 'text-secondary border-transparent'}`}>Services</Link>

                </div>
            </div>

            {/* TAB CONTENTS HERE */}
            {activeTab == "items" ? (
                <Items />
            ) : activeTab == "services" ? (
                <Services />
            ) : null}
        </div>
    );
}

export default OrdersPage;

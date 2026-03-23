import Sidebar from "../Sidebar";
import Navbar from "../navbar";
import { usePublicstates } from "../../providers/PublicstatesProvider";

const LayoutGrid = ({ children }) => {
	const { Sidebar: sidebarState, setSidebar } = usePublicstates();

	const closeSidebar = () => {
		setSidebar((prev) => ({ ...prev, mobileOpen: false }));
	};

	return (
		<div className="chat-layout">
			<Sidebar />
			<button
				aria-hidden={!sidebarState.mobileOpen}
				className={`sidebar-backdrop ${sidebarState.mobileOpen ? "open" : ""}`}
				onClick={closeSidebar}
				tabIndex={sidebarState.mobileOpen ? 0 : -1}
				type="button"
			/>
			<div className="chat-main">
				<Navbar />
				<main className="chat-content">
					{children || (
						<section className="chat-empty-state">
							<h1>How can I help you today?</h1>
							<p>Start a new conversation from the sidebar.</p>
						</section>
					)}
				</main>
			</div>
		</div>
	);
};

export default LayoutGrid;

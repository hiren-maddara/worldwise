import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import styles from "./AppLayout.module.css";

function AppLayout() {
	// const { isAuthenticated } = useAuth();
	// const navigate = useNavigate();
	// useEffect(() => {
	// 	if (!isAuthenticated) return navigate("/");
	// }, [isAuthenticated]);

	return (
		<div className={styles.app}>
			<Sidebar />
			<Map />
			<User />
		</div>
	);
}

export default AppLayout;

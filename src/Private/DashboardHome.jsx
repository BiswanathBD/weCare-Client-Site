import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import useAxios from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";
import Loader from "../Components/Loader";
import { Link } from "react-router";
import NoDataFound from "../Components/NoDataFound";

const COLORS = ["#ec4899", "#60a5fa", "#34d399", "#fbbf24"];

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const [loading, setLoading] = useState(true);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [categoryChart, setCategoryChart] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const loadDashboardData = async () => {
      try {
        setLoading(true);

        const createdRes = await axiosInstance.get(`/events/user/${user.email}`);
        const joinedRes = await axiosInstance.get(`/joinedEvent/user/${user.email}`, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        });
        const allRes = await axiosInstance.get("/events");
        const allEvents = Array.isArray(allRes.data) ? allRes.data : [];

        const now = new Date();
        const upcoming = allEvents.filter(ev => ev.eventDate && new Date(ev.eventDate) > now);

        const grouped = upcoming.reduce((acc, ev) => {
          if (!ev.category) return acc;
          acc[ev.category] = (acc[ev.category] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.keys(grouped).map(key => ({
          category: key,
          count: grouped[key],
        }));

        setCreatedEvents(Array.isArray(createdRes.data) ? createdRes.data : []);
        setJoinedEvents(Array.isArray(joinedRes.data) ? joinedRes.data : []);
        setUpcomingEvents(upcoming);
        setCategoryChart(chartData);
      } catch (err) {
        console.error("Dashboard load failed:", err);
        setCreatedEvents([]);
        setJoinedEvents([]);
        setUpcomingEvents([]);
        setCategoryChart([]);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [axiosInstance, user]);

  if (loading) return <Loader />;

  const pieData = [
    { name: "Created", value: createdEvents.length },
    { name: "Joined", value: joinedEvents.length },
  ];

  // Get last 3 events created by user (sorted by eventDate descending)
  const lastThreeEvents = [...createdEvents]
    .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate))
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-3 gap-4">
        <OverviewCard title="Created Events" value={createdEvents.length} />
        <Link to={`/dashboard/joinedEvent/user/${user?.email}`}>
          <OverviewCard title="Joined Events" value={joinedEvents.length} />
        </Link>
        <Link to="/upcomingEvents">
          <OverviewCard title="Upcoming Events" value={upcomingEvents.length} />
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl bg-white/5">
          <h4 className="font-semibold mb-4">Events by Category</h4>
          <div className="h-[260px] w-full flex items-center justify-center">
            {categoryChart.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryChart}>
                  <XAxis dataKey="category" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#ec4899" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400 text-sm">No category data available</p>
            )}
          </div>
        </div>

        <div className="p-5 rounded-xl flex flex-col items-center bg-white/3">
          <h4 className="font-semibold mb-4">Participation</h4>
          <PieChart width={260} height={260}>
            <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={90} label>
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      <div className="rounded-xl">
        <h4 className="font-semibold mb-4">Your Latest Events</h4>
        {lastThreeEvents.length > 0 ? (
          <ul className="space-y-3">
            {lastThreeEvents.map(ev => (
              <li key={ev._id || ev.title} className="bg-white/5 p-3 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">{ev.title}</p>
                  <p className="text-sm text-gray-500">{ev.category} | {new Date(ev.eventDate).toLocaleDateString()}</p>
                </div>
                <Link
                  to={`/eventDetails/${ev._id || ""}`}
                  className="text-pink-400 hover:underline text-sm"
                >
                  View
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <NoDataFound/>
        )}
        <div className="mt-4 text-right">
          <Link
            to="/dashboard/manageEvents"
            className="px-4 py-2 bg-pink-400 text-white rounded-lg hover:opacity-90 transition"
          >
            View All
          </Link>
        </div>
      </div>
    </div>
  );
};

const OverviewCard = ({ title, value }) => (
  <div className="p-5 rounded-xl bg-linear-to-r from-pink-500/10 to-purple-500/10">
    <p className="text-gray-400 text-sm">{title}</p>
    <h3 className="text-3xl font-bold text-pink-400">{value}</h3>
  </div>
);

export default DashboardHome;

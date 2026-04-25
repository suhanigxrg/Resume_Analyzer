function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 hover:shadow-hover transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold text-gray-800 mt-2">
        {value}
      </h2>
    </div>
  );
}

export default StatCard;
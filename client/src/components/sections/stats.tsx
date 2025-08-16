export default function Stats() {
  const stats = [
    { value: "25+", label: "Years of Excellence" },
    { value: "10M+", label: "Customers Served" },
    { value: "800+", label: "Branch Network" },
    { value: "₹50K Cr+", label: "Assets Under Management" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center" data-testid={`stat-${index}`}>
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2" data-testid={`stat-value-${index}`}>
                {stat.value}
              </div>
              <p className="text-secondary" data-testid={`stat-label-${index}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

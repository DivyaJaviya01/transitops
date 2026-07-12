
interface KPICardProps {
  title: string;
  value: string | number;
}

export default function KPICard({ title, value }: KPICardProps) {
  return (
    <div className="kpi-card">
      <h3>{title}</h3>
      <p className="kpi-value">{value}</p>
    </div>
  );
}

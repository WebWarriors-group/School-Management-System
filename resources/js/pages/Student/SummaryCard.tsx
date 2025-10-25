type Props = {
  title: string;
  value: string | number;
};

export default function SummaryCard({ title, value }: Props) {
  return (
    <div className="bg-white shadow-md p-4 rounded-2xl">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
    </div>
  );
}

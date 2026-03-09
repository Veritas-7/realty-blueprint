interface QuickPointsProps {
  points: string[];
  title?: string;
}

export const QuickPoints = ({ points, title = "빠른 적용 포인트" }: QuickPointsProps) => {
  return (
    <div className="bg-trust/5 border border-trust/15 rounded-lg p-5 mb-8">
      <h3 className="text-sm font-semibold text-trust mb-3">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {points.map((point, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-foreground">
            <span className="text-trust font-bold text-xs mt-0.5">✓</span>
            {point}
          </div>
        ))}
      </div>
    </div>
  );
};

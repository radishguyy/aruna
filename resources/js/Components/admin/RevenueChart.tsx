import React, { useState, useRef, useMemo } from 'react';
import { RevenueDataPoint } from '@/types/admin';
import { TrendingUp, Calendar, ShoppingBag } from 'lucide-react';

interface RevenueChartProps {
  data: RevenueDataPoint[];
  height?: number;
}

export default function RevenueChart({ data, height = 320 }: RevenueChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  // SVG dimensions & padding
  const svgWidth = 1000;
  const svgHeight = 320;
  const padding = { top: 24, right: 32, bottom: 44, left: 72 };

  const chartWidth = svgWidth - padding.left - padding.right;
  const chartHeight = svgHeight - padding.top - padding.bottom;

  // Max value calculation with nice round headroom
  const maxRevenue = useMemo(() => {
    if (!data || data.length === 0) return 1000000;
    const max = Math.max(...data.map((d) => d.revenue));
    if (max <= 0) return 500000;
    // Round up to nice number
    const magnitude = Math.pow(10, Math.floor(Math.log10(max)));
    return Math.ceil((max * 1.15) / magnitude) * magnitude;
  }, [data]);

  // Generate 4 Y-axis ticks
  const yTicks = useMemo(() => {
    return [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
      const val = maxRevenue * ratio;
      const y = padding.top + chartHeight - ratio * chartHeight;
      return { val, y };
    });
  }, [maxRevenue, chartHeight, padding.top]);

  // Map data to SVG coordinates
  const points = useMemo(() => {
    if (!data || data.length === 0) return [];
    if (data.length === 1) {
      return [
        {
          x: padding.left + chartWidth / 2,
          y: padding.top + chartHeight - (data[0].revenue / maxRevenue) * chartHeight,
          item: data[0],
        },
      ];
    }

    return data.map((d, i) => {
      const x = padding.left + (i / (data.length - 1)) * chartWidth;
      const ratio = maxRevenue > 0 ? Math.min(1, Math.max(0, d.revenue / maxRevenue)) : 0;
      const y = padding.top + chartHeight - ratio * chartHeight;
      return { x, y, item: d };
    });
  }, [data, maxRevenue, chartWidth, chartHeight, padding.left, padding.top]);

  // Construct smooth SVG Bezier path
  const { pathD, areaD } = useMemo(() => {
    if (points.length === 0) return { pathD: '', areaD: '' };
    if (points.length === 1) {
      const p = points[0];
      return {
        pathD: `M ${padding.left} ${p.y} L ${padding.left + chartWidth} ${p.y}`,
        areaD: `M ${padding.left} ${p.y} L ${padding.left + chartWidth} ${p.y} L ${padding.left + chartWidth} ${padding.top + chartHeight} L ${padding.left} ${padding.top + chartHeight} Z`,
      };
    }

    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(points.length - 1, i + 2)];

      const tension = 0.2;
      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;
      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;

      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }

    const firstX = points[0].x;
    const lastX = points[points.length - 1].x;
    const bottomY = padding.top + chartHeight;
    const area = `${d} L ${lastX},${bottomY} L ${firstX},${bottomY} Z`;

    return { pathD: d, areaD: area };
  }, [points, chartHeight, padding.top, padding.left, chartWidth]);

  // Helper to format currency for Y-axis
  const formatCompactRupiah = (val: number) => {
    if (val === 0) return 'Rp 0';
    if (val >= 1000000) {
      const jt = val / 1000000;
      return `Rp ${jt % 1 === 0 ? jt : jt.toFixed(1)}jt`;
    }
    if (val >= 1000) {
      const rb = val / 1000;
      return `Rp ${rb % 1 === 0 ? rb : rb.toFixed(0)}rb`;
    }
    return `Rp ${val.toLocaleString('id-ID')}`;
  };

  // Determine X-axis labels interval to prevent crowding
  const xLabels = useMemo(() => {
    if (points.length <= 10) return points;
    const step = Math.ceil(points.length / 7);
    return points.filter((_, idx) => idx % step === 0 || idx === points.length - 1);
  }, [points]);

  // Handle Mouse Move for interactive crosshairs
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!containerRef.current || points.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const scale = svgWidth / rect.width;
    const svgX = clientX * scale;

    // Find closest point
    let closestIdx = 0;
    let minDiff = Infinity;
    points.forEach((p, idx) => {
      const diff = Math.abs(p.x - svgX);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    setHoveredIndex(closestIdx);
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setMousePos(null);
  };

  const activePoint = hoveredIndex !== null && points[hoveredIndex] ? points[hoveredIndex] : null;

  return (
    <div className="relative w-full select-none" ref={containerRef}>
      <div className="w-full overflow-hidden rounded-2xl bg-gradient-to-b from-white to-slate-50/50 p-2 sm:p-4">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto overflow-visible cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ maxHeight: height }}
        >
          <defs>
            {/* Smooth glowing area gradient */}
            <linearGradient id="revenueAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.28" />
              <stop offset="70%" stopColor="#f97316" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.0" />
            </linearGradient>

            {/* Line glow shadow */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#ea580c" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Horizontal Gridlines & Y-Axis Labels */}
          {yTicks.map(({ val, y }, idx) => (
            <g key={idx} className="transition-all duration-300">
              <line
                x1={padding.left}
                y1={y}
                x2={svgWidth - padding.right}
                y2={y}
                stroke="#e2e8f0"
                strokeDasharray={idx === 0 ? 'none' : '4 4'}
                strokeWidth={idx === 0 ? '1.5' : '1'}
              />
              <text
                x={padding.left - 12}
                y={y + 4}
                textAnchor="end"
                className="text-[11px] fill-slate-400 font-semibold tracking-tight font-mono"
              >
                {formatCompactRupiah(val)}
              </text>
            </g>
          ))}

          {/* Area Fill */}
          {areaD && (
            <path
              d={areaD}
              fill="url(#revenueAreaGrad)"
              className="transition-all duration-500 ease-out"
            />
          )}

          {/* Bezier Line */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="#ea580c"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              className="transition-all duration-500 ease-out"
            />
          )}

          {/* Subtle baseline points */}
          {points.length > 0 &&
            points.map((p, idx) => (
              <circle
                key={idx}
                cx={p.x}
                cy={p.y}
                r={hoveredIndex === idx ? '6' : '3'}
                fill="#ffffff"
                stroke="#ea580c"
                strokeWidth={hoveredIndex === idx ? '3.5' : '2'}
                className="transition-all duration-150"
              />
            ))}

          {/* Active Hover Crosshair Line & Target Marker */}
          {activePoint && (
            <g>
              <line
                x1={activePoint.x}
                y1={padding.top}
                x2={activePoint.x}
                y2={padding.top + chartHeight}
                stroke="#f97316"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="transition-all"
              />
              {/* Outer pulsing ring */}
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="10"
                fill="#f97316"
                fillOpacity="0.25"
                className="animate-ping"
              />
              {/* Center marker */}
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="6.5"
                fill="#ea580c"
                stroke="#ffffff"
                strokeWidth="2.5"
              />
            </g>
          )}

          {/* X-Axis Labels */}
          {xLabels.map((p, idx) => (
            <text
              key={idx}
              x={p.x}
              y={svgHeight - 14}
              textAnchor="middle"
              className="text-[11px] fill-slate-400 font-medium font-sans"
            >
              {p.item.label}
            </text>
          ))}
        </svg>

        {/* Floating Tooltip */}
        {activePoint && mousePos && (
          <div
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-2xl bg-slate-900/95 p-3.5 text-white shadow-xl backdrop-blur-md border border-slate-700/50 transition-transform duration-75 min-w-[170px]"
            style={{
              left: `${Math.min(
                Math.max(mousePos.x, 90),
                (containerRef.current?.getBoundingClientRect().width || 600) - 90
              )}px`,
              top: `${Math.max(mousePos.y - 12, 10)}px`,
            }}
          >
            <div className="flex items-center gap-1.5 text-slate-300 text-xs font-semibold mb-1">
              <Calendar className="w-3.5 h-3.5 text-orange-400" />
              <span>{activePoint.item.full_label || activePoint.item.label}</span>
            </div>
            <div className="flex items-baseline gap-1 text-base font-black text-white tracking-tight">
              <span className="text-orange-400">
                {activePoint.item.revenue_formatted}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-slate-300">
              <ShoppingBag className="w-3 h-3 text-slate-400" />
              <span>{activePoint.item.transactions} transaksi</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

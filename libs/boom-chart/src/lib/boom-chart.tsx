import { useEffect, useRef, useState } from 'react';
import styles from './boom-chart.module.css';

/* eslint-disable-next-line */
export interface BoomChartProps {
  data: {
    high: number;
    low: number;
    open: number;
    close: number;
    volume: number;
    time: number;
  }[];
}

export function BoomChart({ data }: BoomChartProps) {
  const [shake, setShake] = useState(false);
  const [chartData, setData] = useState({
    maxHigh: Math.max(...data.map((item) => item.high)),
    minLow: Math.min(...data.map((item) => item.low)),
    chartWidth: 400,
    chartHeight: 200,
    getX: (index: number) => (chartWidth / (data.length - 1)) * index,
    getY: (value: number) =>
      ((maxHigh - value) / (maxHigh - minLow)) * chartHeight,
    lastIndex: data.length - 1,
  });
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const flashingDot = svgRef.current?.querySelector('.flashing-dot');
    const animate = flashingDot?.animate([{ opacity: 1 }, { opacity: 0.2 }], {
      duration: 1000,
      iterations: Infinity,
    });

    return () => {
      animate?.cancel();
    };
  }, []);

  useEffect(() => {
    if (data[data.length - 1].close < data[data.length - 2].close) {
      setTimeout(() => {
        setShake(true);
      }, 0);
      setTimeout(() => {
        setShake(false);
      }, 500);
    }
    setData({
      maxHigh: Math.max(...data.map((item) => item.high)),
      minLow: Math.min(...data.map((item) => item.low)),
      chartWidth: 400,
      chartHeight: 200,
      getX: (index: number) => (chartWidth / (data.length - 1)) * index,
      getY: (value: number) =>
        ((maxHigh - value) / (maxHigh - minLow)) * chartHeight,
      lastIndex: data.length - 1,
    });
  }, [data]);
  const maxData = 50;
  const maxHigh = Math.max(...data.map((item) => item.high + 1));
  const minLow = Math.min(...data.map((item) => item.low - 1));
  const chartWidth = 400;
  const chartHeight = 200;
  const getX = (index: number) => (chartWidth / Math.max(0, maxData)) * index;
  const getY = (value: number) =>
    ((maxHigh - value) / (maxHigh - minLow)) * chartHeight;
  const pathData = data
    .slice(Math.max(0, data.length - maxData), data.length)
    .map((item, index) => `L${getX(index)} ${getY(item.close)}`)
    .join(' ')
    .replace(/^L/, 'M');
  const lastIndex = data.length - 1;
  return (
    <div
      className={`w-[400px] h-[300px] py-3 box-border ${
        shake ? styles['screen-shake'] : ''
      }				
		}`}
    >
      <svg
        className="w-full h-full "
        viewBox={`0 0 ${420} ${chartHeight}`}
        ref={svgRef}
      >
        <path
          d={pathData}
          fill="none"
          stroke={'currentColor'}
          strokeWidth="3"
        />
        <circle
          className={styles['flashing-dot']}
          cx={getX(Math.min(data.length - 1, maxData - 1))}
          cy={getY(data[lastIndex].close)}
          r="9"
          fill={
            data[lastIndex].close > data[lastIndex - 1].close
              ? 'green'
              : 'lightcoral'
          }
        />
        <PriceLabel
          value={data[lastIndex].close}
          x={getX(Math.min(data.length - 1, maxData - 1)) + 10}
          y={getY(data[lastIndex].close)}
          color={
            data[lastIndex].close > data[lastIndex - 1].close
              ? 'lightgreen'
              : 'red'
          }
        />
      </svg>
    </div>
  );
}

export default BoomChart;

function PriceLabel({ value, x, y, color }: any) {
  const [animationClass, setAnimationClass] = useState(styles['float-up']);

  useEffect(() => {
    setAnimationClass('');
    setTimeout(() => {
      setAnimationClass(styles['float-up']);
    }, 0);
  }, [value]);
  return (
    <g className={animationClass + ' bg-white'}>
      <text
        x={x}
        y={y}
        fill={color}
        textAnchor="middle"
        className="text-lg font-bold bg-white/10"
      >
        {value.toFixed(2)}
      </text>
    </g>
  );
}

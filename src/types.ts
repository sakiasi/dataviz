export interface DataPoint {
    year: number;
    value: number;
    country?: string
}

export interface chartData {
    rSquared: number;
    country: string;
    dataPointsCount: number;
    slope: number;
    intercept: number;
    correlation: number;
}

export interface ChartProps {
  lineData?: { countryName: string }[];
  chartData?: Record<string, any>[];
  units?: string;
  toolTipUnits?: string;
  slope?: Slope[]
}

export interface Slope {
    country: string;
    slope: number;
    lineFunction: (x: number) => number;
    predictYear: number;
}